# ADR-002: ML Framework Selection (scikit-learn + PyTorch)

**Status:** Accepted
**Date:** 2025-09-12
**Deciders:** Dr. Priya Sharma (ML Lead), Alex Chen (Data Scientist)

## Context

Need to select ML frameworks for sentiment analysis models. Requirements:

- Support both traditional ML (baseline) and deep learning (production model)
- Training efficiency on GPU
- Production inference performance
- Model export capabilities (ONNX)
- Team expertise

## Decision

Use **scikit-learn 1.3** for baseline models and **PyTorch 2.1** for deep learning models.

## Options Considered

### Option 1: scikit-learn + PyTorch (CHOSEN)

**Pros:**

- scikit-learn: Fast prototyping, CPU-only baseline model
- PyTorch: Flexible, great for research, excellent Transformers support
- Both export to ONNX for optimized inference
- Team has strong PyTorch experience
- Hugging Face Transformers built on PyTorch

**Cons:**

- Two frameworks to maintain
- Different APIs for training/inference

### Option 2: TensorFlow/Keras only

**Pros:**

- Single framework for all models
- TensorFlow Serving for deployment
- Production-ready ecosystem

**Cons:**

- Less flexible than PyTorch for research
- Team prefers PyTorch
- TensorFlow 2.x still evolving

### Option 3: PyTorch only

**Pros:**

- Single framework
- Consistent API

**Cons:**

- Overkill for simple baseline models
- scikit-learn faster for traditional ML

## Rationale

- **Baseline model:** scikit-learn perfect for Logistic Regression (fast, CPU-only)
- **Production model:** PyTorch ideal for fine-tuning BERT
- **ONNX export:** Both frameworks support ONNX for optimized inference
- **Team expertise:** Team experienced with PyTorch, quick to learn scikit-learn

## Consequences

**Positive:**

- Best tool for each use case
- Flexible for future model experiments
- Fast prototyping with scikit-learn

**Negative:**

- Two frameworks to maintain
- Different training pipelines
- Mitigation: Use ONNX Runtime for unified inference

---

**Document Owner:** Dr. Priya Sharma
**Last Updated:** 2025-09-12
