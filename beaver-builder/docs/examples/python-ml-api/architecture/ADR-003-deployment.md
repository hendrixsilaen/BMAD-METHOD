# ADR-003: Deployment Strategy (Docker + Kubernetes)

**Status:** Accepted
**Date:** 2025-09-15
**Deciders:** Sarah Kim (DevOps), Dr. Priya Sharma (ML Lead), Marcus Johnson

## Context

Need deployment strategy for ML API with requirements:

- Auto-scaling based on traffic (10-1000 pods)
- GPU support for BERT model
- Zero-downtime deployments
- Model versioning and A/B testing
- Cost optimization (GPU expensive)

## Decision

Deploy using **Docker containers** orchestrated by **Kubernetes (AWS EKS)** with mixed CPU/GPU node pools.

## Options Considered

### Option 1: Docker + Kubernetes (CHOSEN)

**Pros:**

- Industry standard, mature ecosystem
- Auto-scaling (HPA) based on CPU/GPU/custom metrics
- Rolling updates for zero-downtime
- GPU support via NVIDIA device plugin
- Can mix CPU pods (baseline model) with GPU pods (BERT)
- Easy A/B testing with Istio/traffic splitting

**Cons:**

- Complex setup and management
- Requires Kubernetes expertise
- Higher operational overhead

**Cost:** ~$3,000/month (3 GPU nodes + 5 CPU nodes)

### Option 2: AWS SageMaker

**Pros:**

- Fully managed ML deployment
- Built-in A/B testing
- Auto-scaling
- Model monitoring

**Cons:**

- Vendor lock-in to AWS
- 2-3x more expensive than EKS
- Less flexibility for custom logic
- Harder to integrate with FastAPI

**Cost:** ~$8,000/month

### Option 3: AWS Lambda + API Gateway

**Pros:**

- Serverless (no infrastructure management)
- Pay per invocation
- Auto-scaling built-in

**Cons:**

- 10GB memory limit (BERT model is 420MB, but tight)
- Cold start latency (3-5 seconds)
- 15-minute max execution time
- No persistent GPU support

**Cost:** Variable ($2,000-5,000/month depending on traffic)

## Rationale

### Kubernetes Flexibility

- Mix CPU-only pods for baseline model (cost-effective)
- GPU pods for BERT model (performance)
- Easy to add new models without infrastructure changes

### Cost Optimization

- Scale CPU pods independently of GPU pods
- Use spot instances for non-critical workloads
- GPU pods only for models that need them

### Team Expertise

- Sarah has K8s experience
- Can hire K8s consultant if needed
- Large community for troubleshooting

## Implementation

```yaml
# Deployment example
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sentiment-api
spec:
  replicas: 3
  template:
    spec:
      containers:
        - name: api
          image: sentiment-api:v2.1
          resources:
            limits:
              nvidia.com/gpu: 1
            requests:
              memory: '4Gi'
              cpu: '2'
```

## Consequences

**Positive:**

- Flexible, scalable infrastructure
- Cost-effective with mixed node pools
- Industry-standard tooling

**Negative:**

- Complex setup (1-2 weeks initial setup)
- Requires ongoing K8s maintenance
- Mitigation: Use managed EKS, hire consultant for setup

---

**Document Owner:** Sarah Kim (DevOps)
**Last Updated:** 2025-09-15
