# Marco metodológico

## Metodología

Para el desarrollo de AgroPredict se tomó como referencia la metodología CRISP-ML(Q), un enfoque para proyectos de Machine Learning que organiza el ciclo de vida del modelo desde la comprensión del problema hasta la validación de los resultados.


## 1. Comprensión del problema

Se identificó la necesidad de apoyar la planificación agrícola mediante una herramienta que permitiera estimar el rendimiento potencial de los cultivos, considerando variables agrícolas y climáticas, especialmente en regiones con limitaciones de conectividad como la Orinoquía colombiana.



## 2. Comprensión de los datos

Se recopilaron e integraron diferentes fuentes de información:

- Evaluaciones Agropecuarias Municipales (EVA).
- Datos climáticos obtenidos mediante NASA POWER.
- Información geográfica de los municipios para la consulta de variables climáticas.

Estas fuentes permitieron construir un conjunto de datos con variables agrícolas, territoriales y climáticas.



## 3. Preparación de los datos

Se realizó un proceso de preparación que incluyó:

- Limpieza y normalización de los datos.
- Conversión de variables numéricas.
- Tratamiento de valores faltantes.
- Identificación y tratamiento de valores atípicos.
- Integración de la información agrícola y climática.
- Codificación de variables categóricas.
- Construcción del conjunto de datos para entrenamiento.



## 4. Modelado

Se entrenaron diferentes modelos de regresión para estimar el rendimiento potencial del cultivo de maíz.

Entre los algoritmos evaluados se encuentran:

- Random Forest Regressor.
- Gradient Boosting Regressor.

El modelo seleccionado fue Gradient Boosting Regressor por presentar el mejor desempeño durante la evaluación.



## 5. Evaluación

El desempeño del modelo se evaluó mediante métricas de regresión, obteniendo los siguientes resultados:

- RMSE: 0.707 t/ha
- MAE: 0.510 t/ha
- R²: 0.747

Estas métricas permitieron seleccionar el modelo con mejor capacidad predictiva para el proyecto.



## 6. Implementación

El modelo fue integrado en AgroPredict, una Plataforma Web Progresiva (PWA) que permite a los usuarios realizar simulaciones del rendimiento potencial de los cultivos.

La ejecución de simulaciones requiere conexión a Internet, ya que el modelo se encuentra alojado en el backend en la nube. La PWA permite acceder a la interfaz y consultar el historial de simulaciones sin conexión. Como trabajo futuro, se plantea el desarrollo de una aplicación nativa que integre el modelo entrenado y permita ejecutar simulaciones sin conexión, sincronizando la información con la plataforma cuando el dispositivo recupere acceso a Internet.
