# US-001: Model Training Pipeline with Experiment Tracking

**Status:** Completed
**Priority:** P0 (Critical)
**Created:** 2025-09-20
**Completed:** 2025-11-15
**Owner:** Dr. Priya Sharma (ML Lead), Alex Chen (Data Scientist)

## User Story

**As a** data scientist
**I want** an automated model training pipeline with experiment tracking
**So that** I can efficiently train, evaluate, and compare multiple models while maintaining reproducibility

## Context

ML model development requires experimenting with different architectures, hyperparameters, and datasets. We need a systematic pipeline to track experiments, compare results, and select the best model for production.

## Acceptance Criteria

### AC1: Data Loading from DVC

**Given** training data is versioned in DVC
**When** I run the training script
**Then** the correct dataset version is automatically pulled from S3
**And** data integrity is verified with checksums
**And** train/val/test splits are loaded correctly (70/15/15)

### AC2: Experiment Tracking with MLflow

**Given** I'm training a new model
**When** the training starts
**Then** a new MLflow experiment run is created
**And** all hyperparameters are logged (learning rate, batch size, etc.)
**And** training metrics are logged every epoch (loss, accuracy, F1)
**And** the final model artifact is saved to MLflow registry
**And** I can view results in MLflow UI (http://localhost:5000)

**Logged Metrics:**

- Training loss per epoch
- Validation loss per epoch
- Validation accuracy per epoch
- Validation F1-score per epoch
- Training time
- Final test set metrics

**Logged Parameters:**

- Model architecture
- Learning rate
- Batch size
- Number of epochs
- Optimizer type
- Random seed

**Logged Artifacts:**

- Trained model (PyTorch .pt file)
- Tokenizer config
- Training config (YAML)
- Confusion matrix (PNG)
- ROC curve (PNG)

### AC3: Hyperparameter Tuning with Optuna

**Given** I want to optimize hyperparameters
**When** I run hyperparameter tuning
**Then** Optuna searches the defined parameter space
**And** each trial is logged as a separate MLflow run
**And** the best parameters are identified and saved
**And** I can see optimization history in Optuna dashboard

**Tuned Parameters:**

- Learning rate (1e-6 to 1e-4, log scale)
- Batch size (8, 16, 32)
- Warmup steps (100, 500, 1000)
- Weight decay (0.0 to 0.1)

**Optimization:**

- Objective: Maximize validation F1-score
- Trials: 50
- Sampler: TPE (Tree-structured Parzen Estimator)
- Pruner: Median pruner (stop poor trials early)

### AC4: Model Evaluation Pipeline

**Given** a trained model
**When** I run evaluation
**Then** the model is evaluated on the test set
**And** I see comprehensive metrics:

- Accuracy: 91.3%
- Precision per class
- Recall per class
- F1-score per class
- Confusion matrix
- ROC curves and AUC scores
  **And** results are logged to MLflow
  **And** visualizations are generated and saved

### AC5: Model Export to ONNX

**Given** a trained PyTorch model
**When** I export to ONNX
**Then** the model is converted to ONNX format
**And** ONNX model is validated (accuracy matches PyTorch)
**And** INT8 quantization is applied
**And** inference latency is benchmarked
**And** ONNX model is uploaded to S3

**Performance Requirements:**

- ONNX conversion success rate: 100%
- Accuracy degradation: < 0.5% after quantization
- Latency improvement: > 3x faster than PyTorch

## Technical Implementation

### Training Script Structure

```python
# train.py
import mlflow
import optuna
from transformers import AutoModelForSequenceClassification, TrainingArguments, Trainer

def train_model(config):
    # Start MLflow run
    with mlflow.start_run():
        # Log parameters
        mlflow.log_params(config)

        # Load data
        train_dataset = load_dataset("train")
        val_dataset = load_dataset("val")

        # Initialize model
        model = AutoModelForSequenceClassification.from_pretrained(
            "bert-base-uncased",
            num_labels=3
        )

        # Training
        training_args = TrainingArguments(
            output_dir="./results",
            learning_rate=config["learning_rate"],
            per_device_train_batch_size=config["batch_size"],
            num_train_epochs=4,
            evaluation_strategy="epoch",
            save_strategy="epoch",
            load_best_model_at_end=True,
            metric_for_best_model="f1",
        )

        trainer = Trainer(
            model=model,
            args=training_args,
            train_dataset=train_dataset,
            eval_dataset=val_dataset,
            compute_metrics=compute_metrics,
        )

        # Train
        trainer.train()

        # Evaluate on test set
        test_results = trainer.evaluate(load_dataset("test"))

        # Log metrics
        mlflow.log_metrics(test_results)

        # Save model
        mlflow.pytorch.log_model(model, "model")

        return test_results["f1"]

def hyperparameter_tuning():
    def objective(trial):
        config = {
            "learning_rate": trial.suggest_float("learning_rate", 1e-6, 1e-4, log=True),
            "batch_size": trial.suggest_categorical("batch_size", [8, 16, 32]),
            "warmup_steps": trial.suggest_categorical("warmup_steps", [100, 500, 1000]),
        }
        return train_model(config)

    study = optuna.create_study(direction="maximize")
    study.optimize(objective, n_trials=50)

    print(f"Best F1: {study.best_value}")
    print(f"Best params: {study.best_params}")
```

### DVC Data Pipeline

```yaml
# dvc.yaml
stages:
  preprocess:
    cmd: python preprocess.py
    deps:
      - data/raw/
    outs:
      - data/processed/

  train:
    cmd: python train.py --config configs/bert_config.yaml
    deps:
      - data/processed/
      - configs/bert_config.yaml
    outs:
      - models/sentiment-bert-v2.1/
    metrics:
      - metrics.json:
          cache: false
```

## Testing Strategy

### Unit Tests

- Data loading functions
- Preprocessing functions
- Metric computation
- ONNX conversion

### Integration Tests

- End-to-end training pipeline
- MLflow logging
- Model evaluation
- ONNX export validation

## Performance Requirements

- **Training time:** < 24 hours for full training (4 epochs)
- **Experiment logging:** < 1 second per metric log
- **Model save time:** < 30 seconds
- **ONNX conversion:** < 5 minutes

## Success Metrics

**Completion Criteria:**

- [x] Data pipeline loads from DVC
- [x] MLflow tracks all experiments
- [x] Hyperparameter tuning finds optimal params
- [x] Model evaluation generates all metrics
- [x] ONNX export successful

**Model Performance (Achieved):**

- Accuracy: 91.3% (target: >90%) ✅
- F1-score: 0.89 (target: >0.85) ✅
- Training time: 18 hours (target: <24h) ✅

## Related Documents

- [Project Overview](../project-overview.md)
- [ADR-002: ML Framework Selection](../architecture/ADR-002-ml-framework.md)
- [US-002: Prediction API](./US-002-prediction-api.md)

---

**Document Owner:** Dr. Priya Sharma (ML Lead)
**Last Updated:** 2025-11-15
**Implementation PRs:** #12, #15, #18, #21
