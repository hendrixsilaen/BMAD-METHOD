# ADR-001: API Framework Choice (FastAPI vs Flask vs Django)

**Status:** Accepted
**Date:** 2025-09-10
**Deciders:** Marcus Johnson (Backend Lead), Dr. Priya Sharma (ML Lead), Team
**Consulted:** External FastAPI expert

## Context

SentimentPro needs a high-performance Python web framework for serving ML model predictions. Requirements:

- **High throughput:** Target 10,000 predictions/second
- **Low latency:** p95 < 100ms for single predictions
- **Async support:** Non-blocking I/O for external calls (DB, cache, S3)
- **Type safety:** Reduce bugs with strong typing
- **Auto-documentation:** OpenAPI/Swagger for customers
- **ML integration:** Easy integration with PyTorch, scikit-learn, ONNX

## Decision

We will use **FastAPI 0.104** as our web framework.

## Options Considered

### Option 1: FastAPI (CHOSEN)

**Pros:**

- Async/await native support (ASGI) → excellent performance
- Automatic API documentation (OpenAPI/Swagger)
- Pydantic for request/response validation → type safety
- Modern Python 3.11+ features (type hints)
- Very fast: 2-3x faster than Flask
- Small learning curve for team (Python-native)
- Great ML community adoption (Hugging Face, etc.)

**Cons:**

- Younger ecosystem than Flask/Django (less mature)
- Fewer third-party plugins
- Breaking changes between versions (still evolving)

**Performance:** ~20,000 req/sec (single process)

### Option 2: Flask

**Pros:**

- Mature, stable ecosystem (13+ years)
- Large community and plugin ecosystem
- Simple, easy to learn
- Good for prototyping

**Cons:**

- Synchronous by default (WSGI) → blocks on I/O
- No automatic API documentation
- Manual validation needed
- Slower than FastAPI (7,000 req/sec)
- Less type safety

**Performance:** ~7,000 req/sec (single process)

### Option 3: Django + Django REST Framework

**Pros:**

- Full-featured framework (ORM, admin, auth built-in)
- Mature ecosystem
- Great for traditional web apps

**Cons:**

- Overkill for API-only service
- Slower than FastAPI (5,000 req/sec)
- Opinionated structure (less flexible)
- Synchronous by default
- Heavier framework (more dependencies)

**Performance:** ~5,000 req/sec (single process)

## Rationale

### Performance is Critical

ML inference APIs are latency-sensitive. FastAPI's async support and high throughput make it ideal. Benchmark results (our tests):

- FastAPI: 18,500 req/sec
- Flask: 6,800 req/sec
- Django: 4,200 req/sec

### Type Safety Prevents Bugs

Pydantic validation catches errors at API boundaries, critical for ML APIs where malformed inputs cause model errors.

### Auto-Documentation Saves Time

FastAPI generates OpenAPI docs automatically, essential for B2B customers integrating our API.

### Team Familiarity

Team comfortable with modern Python. FastAPI's Pythonic design reduces learning curve.

## Consequences

### Positive

- High performance meets scale requirements
- Type safety reduces production bugs
- Automatic docs improve customer experience
- Async support enables future real-time features

### Negative

- Ecosystem less mature (fewer plugins available)
- May encounter breaking changes in updates
- Mitigation: Pin versions, test thoroughly before upgrading

## Implementation Notes

```python
# Example FastAPI endpoint
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class PredictionRequest(BaseModel):
    text: str

class PredictionResponse(BaseModel):
    sentiment: str
    score: float
    confidence: float

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    # Model inference here
    return PredictionResponse(
        sentiment="positive",
        score=0.92,
        confidence=0.87
    )
```

## Monitoring & Review

- **Performance:** Track p95 latency weekly
- **Error Rate:** Monitor validation errors
- **Revisit if:**
  - Performance requirements not met
  - Breaking changes cause significant issues
  - Team struggles with async patterns

**Next Review:** March 2026 (6 months after launch)

---

**Document Owner:** Marcus Johnson (Backend Lead)
**Last Updated:** 2025-09-10
