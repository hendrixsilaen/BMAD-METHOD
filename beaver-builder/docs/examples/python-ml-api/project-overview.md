# Project Overview: SentimentPro ML API

**Last Updated:** 2025-11-18
**Project Phase:** MVP Development (Month 2 of 5)
**Status:** Active Development

## Executive Summary

SentimentPro is a B2B sentiment analysis API service powered by machine learning. We provide real-time sentiment scoring (positive, neutral, negative) for customer feedback, product reviews, and social media content. Our API processes text and returns sentiment scores, confidence levels, and key phrase extraction.

**Target Launch:** February 2026 (3 months remaining)
**Target Scale:** 10M predictions/day by Month 6 post-launch
**Business Model:** Usage-based pricing ($0.001 per prediction + monthly base fee)

## Project Identity

### Basic Information

- **Project Name:** SentimentPro
- **Repository:** github.com/sentimentpro/ml-api (private)
- **API Domain:** api.sentimentpro.ai
- **Environment:**
  - Production: api.sentimentpro.ai
  - Staging: staging.sentimentpro.ai
  - Development: localhost:8000

### Team Composition

- **ML Team:** 2 people
  - ML Engineer: Dr. Priya Sharma (Lead)
  - Data Scientist: Alex Chen
- **Engineering:** 2 people
  - Backend Engineer: Marcus Johnson
  - DevOps Engineer: Sarah Kim

### Communication Channels

- **Daily Standups:** 10:00 AM PST via Zoom
- **ML Review:** Weekly Fridays, 2:00 PM PST (model performance review)
- **Slack:** #ml-team, #engineering, #data-science
- **Experiment Tracking:** MLflow dashboard (internal)
- **Code Review:** GitHub PRs (1 approval required, 2 for model changes)

## Technical Architecture

### Technology Stack

#### ML & Data Science

- **Language:** Python 3.11.6
- **ML Libraries:**
  - scikit-learn 1.3.2 (traditional ML: Logistic Regression, Random Forest)
  - PyTorch 2.1.0 (deep learning models)
  - Transformers 4.35.0 (Hugging Face: BERT, RoBERTa)
  - NLTK 3.8.1 (text preprocessing)
  - spaCy 3.7.2 (NER, POS tagging)
- **Experiment Tracking:** MLflow 2.8.0
- **Data Versioning:** DVC 3.30.0
- **Hyperparameter Tuning:** Optuna 3.4.0
- **Model Optimization:** ONNX Runtime 1.16.0

#### API & Backend

- **Web Framework:** FastAPI 0.104.1
- **Validation:** Pydantic 2.5.0
- **Async Tasks:** Celery 5.3.4
- **Task Queue:** Redis 7.2.3
- **WSGI Server:** Uvicorn 0.24.0
- **API Documentation:** OpenAPI 3.0 (FastAPI auto-generated)

#### Data Storage

- **Metadata DB:** PostgreSQL 15.4 (model versions, predictions log)
- **Cache:** Redis 7.2.3 (prediction caching, rate limiting)
- **Model Storage:** AWS S3 (model artifacts, training data)
- **Training Data:** DVC-tracked datasets in S3
- **Feature Store:** Custom implementation (considering AWS Feature Store)

#### Infrastructure & Deployment

- **Containers:** Docker 24.0
- **Orchestration:** Kubernetes 1.28 (AWS EKS)
- **CI/CD:** GitHub Actions
- **Cloud Provider:** AWS
  - EKS for API deployment
  - S3 for model/data storage
  - SageMaker for training (optional, considering)
  - ECR for Docker registry
- **Monitoring:**
  - Prometheus 2.47 (metrics collection)
  - Grafana 10.2 (dashboards)
  - Sentry (error tracking)
  - CloudWatch (AWS infrastructure metrics)

### System Architecture

```
┌─────────────────────────────────────────────────┐
│              Client Applications                 │
│     (Customer Apps, Dashboards, Services)       │
└────────────────────┬────────────────────────────┘
                     │ HTTPS/REST
┌────────────────────▼────────────────────────────┐
│             FastAPI Gateway                      │
│    (Authentication, Rate Limiting, Routing)     │
└──┬──────────┬──────────────┬───────────────────┘
   │          │              │
   ▼          ▼              ▼
┌────────┐ ┌────────┐  ┌──────────────┐
│Sync    │ │Async   │  │Batch         │
│Predict │ │Predict │  │Processing    │
│API     │ │API     │  │(Celery)      │
└───┬────┘ └───┬────┘  └──────┬───────┘
    │          │               │
    └──────────┴───────────────┘
                │
    ┌───────────▼───────────────┐
    │   Model Inference Layer    │
    │   (ONNX Runtime + Cache)   │
    └───────────┬───────────────┘
                │
        ┌───────┴────────┐
        ▼                ▼
┌──────────────┐  ┌─────────────┐
│ ML Models    │  │ Redis Cache │
│ (S3 Storage) │  │             │
└──────────────┘  └─────────────┘
        │
        ▼
┌──────────────────────────┐
│   PostgreSQL             │
│   (Predictions Log)      │
└──────────────────────────┘
```

#### Model Training Pipeline

```
Data Sources → Data Preprocessing → Feature Engineering
     │              │                       │
     ▼              ▼                       ▼
  DVC Track    Clean & Label        Extract Features
                     │                       │
                     └───────┬───────────────┘
                             ▼
                    Model Training (MLflow)
                   (scikit-learn + PyTorch)
                             │
                    ┌────────┴────────┐
                    ▼                 ▼
            Hyperparameter      Cross-Validation
              Tuning                  │
            (Optuna)                  │
                    │                 │
                    └────────┬────────┘
                             ▼
                    Model Evaluation
                 (Accuracy, F1, Latency)
                             │
                    ┌────────┴────────┐
                    ▼                 ▼
                ONNX Export      Version & Tag
                             (MLflow Registry)
                             │
                             ▼
                    Deploy to Production
                    (K8s Rolling Update)
                             │
                             ▼
                    A/B Testing (10% Traffic)
                             │
                             ▼
                    Full Rollout (100% Traffic)
```

## ML Models

### Current Production Model: Sentiment-BERT-v2.1

**Architecture:** Fine-tuned BERT-base-uncased
**Training Data:** 500K labeled customer reviews + social media posts
**Performance:**

- Accuracy: 91.3% (test set)
- F1-Score: 0.89 (macro average)
- Latency: 42ms (p95, ONNX optimized)
- Throughput: 1200 predictions/second (single GPU instance)

**Classes:**

- Positive (score: 0.7-1.0)
- Neutral (score: 0.3-0.7)
- Negative (score: 0.0-0.3)

**Model Size:** 420MB (original), 110MB (ONNX quantized)

### Baseline Model: Logistic Regression + TF-IDF

**Purpose:** Fallback model, cost-effective alternative
**Performance:**

- Accuracy: 84.2% (test set)
- Latency: 8ms (p95)
- Throughput: 5000 predictions/second (CPU only)
  **Model Size:** 45MB

**Use Case:** Cost-sensitive customers, high-volume low-accuracy needs

### Experimental Models (In Development)

**RoBERTa-large Fine-tuned (v3.0-alpha):**

- Training: In progress (Week 3/4)
- Expected accuracy: 93.5%
- Expected latency: 65ms
- Trade-off: Higher accuracy but slower

**Multi-lingual BERT:**

- Status: Research phase
- Target: Support 10 languages
- Timeline: Phase 2 (Month 6+)

## Data Pipeline

### Training Data

**Primary Dataset:** CustomerFeedback-v2.5

- **Size:** 500,000 labeled examples
- **Sources:**
  - Customer reviews (200K, Amazon, Yelp)
  - Social media (200K, Twitter, Reddit)
  - Support tickets (100K, internal customers)
- **Labels:** Manual annotation + weak supervision
- **Inter-annotator Agreement:** 0.87 (Cohen's kappa)
- **Class Distribution:**
  - Positive: 42%
  - Neutral: 31%
  - Negative: 27%
- **Storage:** S3, DVC-tracked
- **Version:** v2.5 (updated Oct 2025)

**Augmentation Strategies:**

- Back-translation (5 languages)
- Synonym replacement
- Random insertion/deletion

### Feature Engineering

**Text Preprocessing:**

1. Lowercasing
2. URL/email removal
3. Tokenization (BERT tokenizer)
4. Lemmatization (spaCy)
5. Stopword removal (optional, model-dependent)

**Features (for baseline model):**

- TF-IDF vectors (max 10,000 features)
- N-grams (1-3)
- Sentiment lexicon scores (VADER, TextBlob)
- Text statistics (length, punctuation, emoji count)

**Features (for BERT model):**

- Token embeddings (768-dim)
- Position embeddings
- Attention masks

### Data Quality Monitoring

**Checks:**

- Missing labels: Alert if > 1%
- Class imbalance: Alert if any class < 20%
- Duplicates: Remove if > 5% of dataset
- Outliers: Flag text length > 1000 chars or < 5 chars
- Language detection: English only (for MVP)

## Key Features

### Phase 1 (Current MVP - Month 2/5)

- ✅ Data collection and labeling pipeline
- ✅ Baseline model (Logistic Regression)
- 🔄 Fine-tuned BERT model (90% complete)
- 🔄 Synchronous prediction API (80% complete)
- ⏳ Batch processing API (planned Month 3)
- ⏳ Model versioning and rollback (planned Month 3)

### Phase 2 (Post-MVP - Months 6-8)

- A/B testing infrastructure
- Multi-lingual support (10 languages)
- Key phrase extraction
- Emotion detection (joy, anger, fear, sadness)
- Custom model training for enterprise customers

### Phase 3 (Growth - Months 9-12)

- Real-time streaming predictions
- Model explainability API (SHAP, LIME)
- AutoML for custom models
- On-premise deployment option

## Development Workflow

### Environment Setup

```bash
# Prerequisites
python --version  # 3.11.6
docker --version  # 24.0+
kubectl version  # 1.28+

# Clone and setup
git clone git@github.com:sentimentpro/ml-api.git
cd ml-api
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt
pip install -r requirements-dev.txt

# Setup DVC for data
dvc pull  # Downloads training data from S3

# Start local services
docker-compose up -d  # PostgreSQL, Redis, MLflow

# Run API server
uvicorn app.main:app --reload --port 8000
```

### ML Workflow

**1. Experiment (Data Scientist):**

```bash
# Create new experiment
mlflow experiments create -n "bert-fine-tuning-v3"

# Run training with tracking
python train.py --config configs/bert_config.yaml --experiment-name "bert-fine-tuning-v3"

# View results
mlflow ui  # http://localhost:5000
```

**2. Evaluate (ML Engineer):**

```bash
# Run evaluation on test set
python evaluate.py --model-path models/sentiment-bert-v2.1

# Check latency
python benchmark.py --model-path models/sentiment-bert-v2.1 --batch-size 32

# Compare models
python compare_models.py --baseline v2.0 --candidate v2.1
```

**3. Deploy (DevOps):**

```bash
# Export to ONNX for optimization
python export_onnx.py --model-path models/sentiment-bert-v2.1

# Build Docker image
docker build -t sentiment-api:v2.1 .

# Deploy to K8s (staging)
kubectl apply -f k8s/staging/deployment.yaml

# Run smoke tests
pytest tests/integration/test_api_smoke.py

# Promote to production (if tests pass)
kubectl apply -f k8s/production/deployment.yaml
```

### Git Workflow

- **Main Branch:** `main` (production-ready models)
- **Dev Branch:** `develop` (integration)
- **Feature Branches:** `feature/[ticket-id]-description`
- **Experiment Branches:** `experiment/[model-name]`

**ML-Specific Workflow:**

1. Create experiment branch
2. Track experiments with MLflow
3. Evaluate model performance
4. Create PR with model card
5. Review: Code + model performance + latency
6. Merge to develop
7. Deploy to staging for validation
8. Promote to production

### Testing Strategy

**Unit Tests:**

- Data preprocessing functions
- Feature engineering logic
- Model evaluation metrics
- API endpoint logic

**Integration Tests:**

- End-to-end prediction pipeline
- API response format validation
- Database writes
- Cache behavior

**Model Tests:**

- Accuracy on holdout test set (> 90%)
- Latency SLA (p95 < 50ms)
- Throughput test (> 1000 req/sec)
- Data drift detection (KS test)

**Load Tests:**

- Concurrent users: 1000
- Predictions/second: 10,000
- Duration: 30 minutes
- Error rate: < 0.1%

## Performance & Scalability

### Current Performance Metrics

**Model Performance:**

- Accuracy: 91.3% (BERT), 84.2% (baseline)
- Precision: 0.90 (macro avg)
- Recall: 0.88 (macro avg)
- F1-Score: 0.89 (macro avg)

**API Performance:**

- Latency: 42ms p50, 68ms p95, 110ms p99
- Throughput: 1200 predictions/sec (single instance)
- Error rate: 0.02%
- Uptime: 99.95% (last 30 days)

**Resource Usage:**

- CPU: 2 vCPU per instance (40% avg utilization)
- Memory: 4GB per instance (GPU: 16GB VRAM)
- GPU: NVIDIA T4 (for BERT model)
- Storage: 500GB S3 (models + data)

### Scaling Strategy

**Horizontal Scaling:**

- Auto-scaling: 2-10 pods based on CPU/GPU usage
- Target CPU: 70%
- Target latency: p95 < 100ms
- Scale up: Add pod if latency > 100ms for 2 min
- Scale down: Remove pod if CPU < 40% for 10 min

**Model Optimization:**

- ONNX quantization (INT8) → 4x faster inference
- Model distillation (planned) → smaller model, similar accuracy
- Batch processing → 5x throughput improvement
- Caching frequently predicted texts → 30% cache hit rate

### Monitoring & Alerting

**Model Metrics (Prometheus):**

- Prediction latency (histogram)
- Throughput (rate)
- Model accuracy (gauge, updated daily)
- Prediction confidence distribution

**Data Quality Metrics:**

- Input text length distribution
- Language detection failures
- Malformed input rate
- Data drift score (updated daily)

**Alerts (PagerDuty):**

- P0: API down (> 5xx error rate > 1% for 5 min)
- P1: Latency SLA violated (p95 > 200ms for 10 min)
- P1: Model accuracy drop (> 5% below baseline)
- P2: Data drift detected (KS statistic > 0.1)
- P3: Cache hit rate < 20%

## Project Timeline

### Historical Milestones

- **Month 0 (Sep 2025):** Project kickoff, architecture planning
- **Month 1 (Oct 2025):** Data collection, baseline model training, API skeleton
- **Month 2 (Nov 2025):** BERT fine-tuning, API development (current)

### Current Sprint (Nov 11-24, 2025)

- Complete BERT model fine-tuning
- Deploy synchronous prediction API to staging
- Implement prediction logging
- Set up Prometheus metrics

### Upcoming Milestones

- **Month 3 (Dec 2025):** Batch processing, model versioning, A/B testing framework
- **Month 4 (Jan 2026):** Beta testing with 5 pilot customers, monitoring dashboards
- **Month 5 (Feb 2026):** Production launch, documentation, customer onboarding
- **Launch (End of Feb 2026):** Public API release

### Post-Launch Roadmap

- Month 6: Multi-lingual support, key phrase extraction
- Month 7: Emotion detection, custom model training
- Month 8: Model explainability, enterprise features
- Month 9-12: Real-time streaming, AutoML capabilities

## Known Issues & Technical Debt

### P1 Issues (Must fix before launch)

1. BERT model loading time is 8 seconds (blocks pod startup)
2. No data drift detection in production
3. Model versioning not automated (manual process)

### P2 Issues (Should fix post-launch)

1. Cache invalidation strategy not implemented
2. No model retraining pipeline automation
3. Batch API missing (workaround: multiple sync requests)

### Technical Debt

1. Feature engineering code not modular (hard to add new features)
2. MLflow experiments not properly tagged
3. No model explainability (SHAP/LIME) in API
4. Training scripts lack comprehensive logging

## Risks & Mitigation

### Technical Risks

- **Risk:** BERT model latency too high under load
  - **Mitigation:** ONNX optimization, model distillation, GPU auto-scaling
- **Risk:** Data drift degrades model performance
  - **Mitigation:** Daily drift monitoring, automated retraining triggers

### Business Risks

- **Risk:** Pilot customers churn due to accuracy issues
  - **Mitigation:** Offer baseline model alternative, gather feedback, rapid iteration
- **Risk:** GPU costs exceed budget
  - **Mitigation:** Use baseline model for cost-sensitive customers, optimize inference

## Resources & References

### Documentation Links

- **MLflow Dashboard:** http://mlflow.internal.sentimentpro.ai
- **API Documentation:** https://api.sentimentpro.ai/docs (Swagger UI)
- **Model Cards:** Internal Confluence
- **Data Dictionary:** Internal Wiki

### External Documentation

- **FastAPI:** https://fastapi.tiangolo.com/
- **PyTorch:** https://pytorch.org/docs/
- **Transformers:** https://huggingface.co/docs/transformers/
- **MLflow:** https://mlflow.org/docs/
- **ONNX Runtime:** https://onnxruntime.ai/docs/

### Learning Resources

- **ML Engineering Best Practices:** https://ml-ops.org/
- **Hugging Face Course:** https://huggingface.co/course/
- **Full Stack Deep Learning:** https://fullstackdeeplearning.com/

## Decision History

Major decisions documented in ADRs:

- [ADR-001: API Framework Choice](./architecture/ADR-001-api-framework.md) - FastAPI selected
- [ADR-002: ML Framework Selection](./architecture/ADR-002-ml-framework.md) - scikit-learn + PyTorch
- [ADR-003: Deployment Strategy](./architecture/ADR-003-deployment.md) - Docker + Kubernetes

## Contact & Support

### Team Leads

- **ML Lead:** Dr. Priya Sharma (ml-lead@sentimentpro.ai)
- **Engineering Lead:** Marcus Johnson (eng-lead@sentimentpro.ai)
- **DevOps:** Sarah Kim (devops@sentimentpro.ai)

### Getting Help

- **ML Questions:** #ml-team Slack channel
- **API Questions:** #engineering Slack channel
- **Infrastructure Issues:** Tag @sarah-kim in Slack
- **Urgent Issues:** PagerDuty escalation

---

**Document Maintenance:** This document is reviewed and updated at the end of each sprint (biweekly).
