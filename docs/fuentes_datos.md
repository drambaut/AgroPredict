# Fuentes de datos

## Descripción

AgroPredict integra información proveniente de diferentes fuentes para construir el conjunto de datos utilizado en el entrenamiento del modelo de Machine Learning.



## 1. Evaluaciones Agropecuarias Municipales (EVA)

**Tipo de fuente:** Datos abiertos oficiales.

**Entidad:** Ministerio de Agricultura y Desarrollo Rural de Colombia.

**Descripción:**

Fuente utilizada para obtener la información histórica de producción agrícola del cultivo de maíz, incluyendo variables como área sembrada, área cosechada, producción y rendimiento.

**Enlace:**





## 2. NASA POWER

**Tipo de fuente:** API pública externa.

**Entidad:** NASA POWER Project.

**Descripción:**

Fuente utilizada para consultar información climática histórica mediante coordenadas geográficas de los municipios.

Variables consultadas:

- Temperatura media
- Temperatura máxima
- Temperatura mínima
- Precipitación
- Radiación solar
- Humedad relativa

**Enlace:**

https://power.larc.nasa.gov/



## 3. Centroides municipales

**Tipo de fuente:** Archivo geográfico.

**Descripción:**

Archivo con las coordenadas geográficas aproximadas de los municipios colombianos utilizado para consultar la información climática en NASA POWER.

Variables principales:

- cod_dep
- cod_mun
- departamento
- municipio
- lat
- lon




## Observaciones

Las tres fuentes fueron integradas mediante procesos de limpieza, transformación y consolidación para construir el conjunto de datos utilizado durante el entrenamiento y evaluación del modelo de Machine Learning.
