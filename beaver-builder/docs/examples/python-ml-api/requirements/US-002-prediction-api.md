# US-002: Real-time Prediction API with Batch Processing

**Status:** In Progress (75% complete)
**Priority:** P0 (Critical)
**Created:** 2025-10-01
**Target Completion:** 2025-11-30
**Owner:** Marcus Johnson (Backend Engineer), Dr. Priya Sharma (ML Lead)

## User Story

**As an** API customer
**I want** to submit text for sentiment analysis and receive predictions in real-time
**So that** I can integrate sentiment analysis into my application workflows

## Context

Customers need a production-ready API for sentiment analysis. Must support both synchronous (real-time) and asynchronous (batch) prediction modes with high throughput, low latency, and 99.9% uptime.

## Acceptance Criteria

### AC1: Synchronous Prediction Endpoint

**Given** I have an API key
**When** I POST to `/v1/predict` with text: "I love this product!"
**Then** I receive a JSON response within 100ms (p95)
**And** response includes:

- `sentiment`: "positive" | "neutral" | "negative"
- `score`: 0.0-1.0 (sentiment strength)
- `confidence`: 0.0-1.0 (model confidence)
- `processing_time_ms`: latency in milliseconds

**Example Request:**

```json
POST /v1/predict
{
  "text": "I love this product!",
  "language": "en"
}
```

**Example Response:**

```json
{
  "sentiment": "positive",
  "score": 0.92,
  "confidence": 0.87,
  "processing_time_ms": 42,
  "model_version": "v2.1"
}
```

### AC2: Batch Prediction Endpoint

**Given** I have multiple texts to analyze (up to 1000)
**When** I POST to `/v1/predict/batch` with array of texts
**Then** request is accepted immediately (202 status)
**And** I receive a `batch_id` for tracking
**And** I can poll `/v1/batch/{batch_id}` for status
**And** when complete, I can download results from S3 presigned URL

**Batch Processing:**

- Accept up to 1000 texts per batch
- Process asynchronously via Celery
- Store results in S3
- Email notification when complete (optional)
- Results expire after 7 days

### AC3: Response Caching

**Given** the same text has been predicted recently
**When** I request prediction for that text
**Then** result is returned from Redis cache (< 5ms)
**And** response includes `cached: true` indicator
**And** cache expires after 1 hour

**Cache Strategy:**

- Key: SHA256 hash of text + model version
- TTL: 1 hour
- Cache hit rate target: > 20%

### AC4: Rate Limiting

**Given** I'm on the Starter plan (1000 requests/hour)
**When** I exceed my rate limit
**Then** I receive 429 Too Many Requests
**And** response includes `Retry-After` header
**And** rate limit resets every hour

**Rate Limits by Plan:**

- Starter: 1,000 req/hour
- Professional: 10,000 req/hour
- Enterprise: Unlimited

### AC5: Error Handling

**Given** I submit malformed input
**When** text is empty, too long (>5000 chars), or non-string
**Then** I receive 400 Bad Request with clear error message

**Error Scenarios:**

- Empty text: "Text field is required"
- Text too long: "Text must be less than 5000 characters"
- Invalid language: "Supported languages: en"
- Invalid API key: "Invalid API key"
- Model unavailable: "Service temporarily unavailable. Please retry."

### AC6: API Documentation

**Given** I'm a new customer
**When** I visit `/docs`
**Then** I see interactive OpenAPI (Swagger) documentation
**And** I can try API endpoints directly in browser
**And** I see example requests and responses
**And** Authentication requirements are clearly documented

## Technical Implementation

### FastAPI Endpoints

```python
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field
import onnxruntime as ort
from cachetools import TTLCache

app = FastAPI(title="SentimentPro API", version="1.0.0")

# Load ONNX model
session = ort.InferenceSession("models/sentiment-bert-v2.1.onnx")

# Cache
cache = TTLCache(maxsize=10000, ttl=3600)  # 1 hour TTL

class PredictionRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=5000)
    language: str = "en"

class PredictionResponse(BaseModel):
    sentiment: str
    score: float
    confidence: float
    processing_time_ms: int
    model_version: str
    cached: bool = False

@app.post("/v1/predict", response_model=PredictionResponse)
async def predict(
    request: PredictionRequest,
    api_key: str = Depends(verify_api_key)
):
    import time
    start = time.time()

    # Check cache
    cache_key = hash_text(request.text)
    if cache_key in cache:
        result = cache[cache_key]
        result["cached"] = True
        result["processing_time_ms"] = int((time.time() - start) * 1000)
        return result

    # Preprocess
    inputs = preprocess_text(request.text)

    # Inference
    outputs = session.run(None, inputs)
    sentiment, score, confidence = postprocess(outputs)

    result = {
        "sentiment": sentiment,
        "score": score,
        "confidence": confidence,
        "processing_time_ms": int((time.time() - start) * 1000),
        "model_version": "v2.1",
        "cached": False
    }

    # Cache result
    cache[cache_key] = result

    return result
```

### Celery Batch Processing

```python
from celery import Celery
import boto3

celery = Celery('tasks', broker='redis://localhost:6379/0')
s3 = boto3.client('s3')

@celery.task
def process_batch(batch_id, texts):
    results = []

    for text in texts:
        result = predict_single(text)
        results.append(result)

    # Save to S3
    s3.put_object(
        Bucket='sentimentpro-results',
        Key=f'batches/{batch_id}.json',
        Body=json.dumps(results)
    )

    # Update database
    update_batch_status(batch_id, 'completed')

    # Send email notification
    send_completion_email(batch_id)
```

## Performance Requirements

- **Synchronous API:**
  - Latency: p50 < 50ms, p95 < 100ms, p99 < 200ms
  - Throughput: > 1000 req/sec per pod
  - Error rate: < 0.1%

- **Batch API:**
  - Processing speed: > 100 texts/second
  - Queue wait time: < 1 minute during normal load
  - Completion time: < 10 minutes for 1000 texts

- **Caching:**
  - Cache hit rate: > 20%
  - Cache latency: < 5ms

## Success Metrics

**Completion Criteria:**

- [x] Synchronous endpoint implemented
- [x] Response caching working
- [x] Rate limiting middleware
- [ ] Batch endpoint (in progress, 60% complete)
- [ ] Integration tests passing
- [ ] Load testing passed

**Performance (Current):**

- Latency: p95 = 72ms (target: <100ms) ✅
- Throughput: 850 req/sec (target: >500) ✅
- Cache hit rate: 28% (target: >20%) ✅
- Error rate: 0.1% ✅

## Related Documents

- [Project Overview](../project-overview.md)
- [ADR-001: API Framework Choice](../architecture/ADR-001-api-framework.md)
- [US-001: Model Training Pipeline](./US-001-model-training-pipeline.md)

---

**Document Owner:** Marcus Johnson (Backend Lead)
**Last Updated:** 2025-11-18
**Implementation PRs:** #25, #28, #31 (in review)
