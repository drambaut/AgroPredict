from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
import os

app = FastAPI(title="AgroPredict API", description="API para predecir el rendimiento del maíz", version="1.0.0")

# Habilitar CORS para que el frontend pueda comunicarse
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En producción cambiar por el dominio del frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cargar modelo y columnas
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model", "agropredict_gb_model.joblib")
COLS_PATH = os.path.join(os.path.dirname(__file__), "model", "model_columns.joblib")

try:
    model = joblib.load(MODEL_PATH)
    model_columns = joblib.load(COLS_PATH)
    print("Modelo de ML cargado exitosamente.")
except Exception as e:
    print(f"Error cargando el modelo: {e}")
    model = None
    model_columns = None

class PredictionRequest(BaseModel):
    cod_dep: str
    desagregacion: str
    semestre: str
    anio: int
    precip_total_mm: float
    precip_dias_lluvia: int
    temp_media_c: float
    temp_max_media_c: float
    temp_min_media_c: float
    radiacion_media: float
    humedad_media_pct: float

class PredictionResponse(BaseModel):
    rendimiento_tha: float
    mensaje: str

@app.get("/")
def read_root():
    return {"message": "Bienvenido a la API de AgroPredict. Ve a /docs para la documentación."}

@app.post("/predict", response_model=PredictionResponse)
def predict_yield(request: PredictionRequest):
    if model is None or model_columns is None:
        raise HTTPException(status_code=500, detail="El modelo no está disponible.")
    
    # Crear un DataFrame con los datos de entrada
    input_data = pd.DataFrame([request.model_dump()])
    
    # Hacer One-Hot Encoding
    cat_cols = ['cod_dep', 'desagregacion', 'semestre']
    input_encoded = pd.get_dummies(input_data, columns=cat_cols)
    
    # Asegurar que el DataFrame de entrada tenga las mismas columnas que el modelo entrenado
    # Las columnas faltantes (ej. otros departamentos) se llenan con False o 0
    input_final = pd.DataFrame(columns=model_columns)
    for col in input_encoded.columns:
        if col in model_columns:
            input_final[col] = input_encoded[col]
            
    input_final = input_final.fillna(False) # En versiones recientes de pandas get_dummies devuelve booleanos
    
    # Realizar predicción
    try:
        prediction = model.predict(input_final)[0]
        return PredictionResponse(
            rendimiento_tha=round(prediction, 2),
            mensaje="Predicción calculada exitosamente basándose en datos climáticos y regionales."
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error durante la predicción: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
