# Example: Python FastAPI + ML API

**Domain:** Machine Learning, Data Science, AI Services
**Tech Stack:** Python 3.11, FastAPI, scikit-learn, PyTorch, PostgreSQL
**Project Type:** ML model training and prediction API service

## Overview

This example demonstrates a complete beaver-builder documentation setup for an ML/AI project. The project is "SentimentPro" - a sentiment analysis API that provides real-time sentiment scoring for customer feedback, product reviews, and social media content.

## What This Example Shows

### Architecture Decisions (3 ADRs)

- **ADR-001:** API framework choice (FastAPI vs Flask vs Django)
- **ADR-002:** ML framework selection (scikit-learn + PyTorch combination)
- **ADR-003:** Deployment strategy (Docker + Kubernetes on AWS)

### Requirements (2 Complete User Stories)

- **US-001:** Model training pipeline with experiment tracking
- **US-002:** Real-time prediction API with batch processing support

### ML-Specific Concerns

- Model versioning and A/B testing
- Training data management
- Model performance monitoring
- Feature engineering pipelines
- Inference optimization

## Key Features of This Documentation

- **ML Workflow Focus:** Complete ML lifecycle from training to deployment
- **Data Science Considerations:** Feature engineering, model selection, hyperparameter tuning
- **Production ML:** Monitoring, retraining, versioning, and rollback strategies
- **Performance Optimization:** Inference speed, batch processing, caching strategies
- **Realistic Metrics:** Accuracy, latency, throughput, drift detection

## How to Use This Example

1. **Review ML-Specific ADRs:** See how ML framework decisions are justified
2. **Study Training Pipeline:** Learn realistic model training workflows
3. **Check API Design:** Understand production ML API patterns
4. **Review Monitoring:** See comprehensive ML model monitoring approach
5. **Adapt for Your ML Project:** Copy structure for your ML/AI service

## Project Context

**Project Name:** SentimentPro
**Team Size:** 4 people (1 ML Engineer, 1 Data Scientist, 1 Backend Engineer, 1 DevOps)
**Stage:** MVP development (2 months in, 3 months to launch)
**Users:** B2B customers needing sentiment analysis at scale
**Scale Target:** 10M predictions/day by end of year 1

## Technologies Demonstrated

### ML & Data Science

- Python 3.11 for all ML code
- scikit-learn 1.3 for traditional ML models
- PyTorch 2.1 for deep learning models
- Transformers 4.35 (Hugging Face) for NLP
- MLflow 2.8 for experiment tracking
- DVC 3.30 for data versioning

### API & Backend

- FastAPI 0.104 for high-performance async API
- Pydantic 2.5 for data validation
- Celery 5.3 for async task processing
- Redis 7.2 for caching and queues
- PostgreSQL 15 for metadata storage

### Infrastructure

- Docker containers for reproducibility
- Kubernetes (EKS) for orchestration
- S3 for model storage
- SageMaker for training (optional)
- Prometheus + Grafana for monitoring

### ML Tools

- Weights & Biases for experiment tracking (alternative to MLflow)
- ONNX Runtime for optimized inference
- Ray Serve for model serving (considered)
- Feature Store (AWS Feature Store or Feast)

## Files in This Example

```
python-ml-api/
├── README.md (this file)
├── project-overview.md (complete ML project context)
├── project-progress.md (training and deployment tracking)
├── architecture/
│   ├── ADR-001-api-framework.md (FastAPI choice)
│   ├── ADR-002-ml-framework.md (scikit-learn + PyTorch)
│   └── ADR-003-deployment.md (Docker + K8s)
└── requirements/
    ├── US-001-model-training-pipeline.md (complete training workflow)
    └── US-002-prediction-api.md (API design and performance)
```

## ML Workflow Demonstrated

### 1. Data Collection & Preparation

- Data sources: Customer reviews, social media, support tickets
- Data labeling: Human annotations + weak supervision
- Train/validation/test split: 70/15/15
- Data versioning with DVC

### 2. Feature Engineering

- Text preprocessing (lowercasing, tokenization, lemmatization)
- Feature extraction (TF-IDF, word embeddings)
- Feature store for reusable features

### 3. Model Training

- Experiment tracking with MLflow
- Hyperparameter tuning with Optuna
- Cross-validation for model selection
- Model versioning and artifact storage

### 4. Model Evaluation

- Metrics: Accuracy, precision, recall, F1-score
- Confusion matrix analysis
- ROC curves and AUC
- Business metrics: Latency, throughput

### 5. Deployment

- Model serving via FastAPI endpoints
- Docker containerization
- Kubernetes deployment
- Blue-green deployment strategy

### 6. Monitoring

- Prediction latency tracking
- Model performance metrics
- Data drift detection
- Retraining triggers

## Next Steps After Reviewing

1. Copy ML-specific folder structure to your project
2. Adapt ADRs for your ML framework choices
3. Use training pipeline template for your models
4. Implement API design patterns shown
5. Set up model monitoring from day one

## Unique ML Considerations

This example shows:

- How to document ML experiments and decisions
- Model versioning strategy
- A/B testing infrastructure
- Retraining pipelines
- Data quality monitoring
- Inference optimization techniques
- Model explainability approaches
