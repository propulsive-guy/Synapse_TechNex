from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import joblib
from xgboost import XGBRegressor
import os


# ======================================================
# 1. APP INITIALIZATION
# ======================================================
app = FastAPI(
    title="Mutual Fund Return Prediction API",
    description="Predict 1Y, 3Y, 5Y mutual fund returns using XGBoost",
    version="1.0.0"
)


# ======================================================
# 2. LOAD MODELS & METADATA
# ======================================================
BASE_DIR = "saved_models"
MODEL_DIR = os.path.join(BASE_DIR, "models")
ENCODER_DIR = os.path.join(BASE_DIR, "encoders")

# Load feature list
FEATURES = joblib.load(os.path.join(BASE_DIR, "features.pkl"))

# Load encoders
amc_encoder = joblib.load(os.path.join(ENCODER_DIR, "amc_name_encoder.pkl"))
category_encoder = joblib.load(os.path.join(ENCODER_DIR, "category_encoder.pkl"))
sub_category_encoder = joblib.load(os.path.join(ENCODER_DIR, "sub_category_encoder.pkl"))

# Load models
model_1yr = XGBRegressor()
model_3yr = XGBRegressor()
model_5yr = XGBRegressor()

model_1yr.load_model(os.path.join(MODEL_DIR, "xgb_returns_1yr.json"))
model_3yr.load_model(os.path.join(MODEL_DIR, "xgb_returns_3yr.json"))
model_5yr.load_model(os.path.join(MODEL_DIR, "xgb_returns_5yr.json"))


# ======================================================
# 3. REQUEST SCHEMA
# ======================================================
class FundInput(BaseModel):
    min_sip: float
    min_lumpsum: float
    expense_ratio: float
    fund_size_cr: float
    fund_age_yr: float
    sortino: float
    alpha: float
    sd: float
    beta: float
    sharpe: float
    risk_level: int
    amc_name: str
    rating: float
    category: str
    sub_category: str


# ======================================================
# 4. HEALTH CHECK ENDPOINT
# ======================================================
@app.get("/health")
def health_check():
    return {
        "status": "OK",
        "models_loaded": True
    }


# ======================================================
# 5. PREDICTION ENDPOINT
# ======================================================
@app.post("/predict")
def predict_returns(data: FundInput):
    try:
        # Encode categorical fields
        amc = amc_encoder.transform([data.amc_name])[0]
        category = category_encoder.transform([data.category])[0]
        sub_category = sub_category_encoder.transform([data.sub_category])[0]

        # Create dataframe
        input_df = pd.DataFrame([{
            "min_sip": data.min_sip,
            "min_lumpsum": data.min_lumpsum,
            "expense_ratio": data.expense_ratio,
            "fund_size_cr": data.fund_size_cr,
            "fund_age_yr": data.fund_age_yr,
            "sortino": data.sortino,
            "alpha": data.alpha,
            "sd": data.sd,
            "beta": data.beta,
            "sharpe": data.sharpe,
            "risk_level": data.risk_level,
            "amc_name": amc,
            "rating": data.rating,
            "category": category,
            "sub_category": sub_category
        }])[FEATURES]

        # Predictions
        pred_1yr = float(model_1yr.predict(input_df)[0])
        pred_3yr = float(model_3yr.predict(input_df)[0])
        pred_5yr = float(model_5yr.predict(input_df)[0])

        return {
            "returns_1yr": round(pred_1yr, 2),
            "returns_3yr": round(pred_3yr, 2),
            "returns_5yr": round(pred_5yr, 2)
        }

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
