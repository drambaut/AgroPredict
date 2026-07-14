# Diccionario de datos

## Objetivo

Este documento describe las principales variables utilizadas en el conjunto de datos consolidado para el entrenamiento del modelo de Inteligencia Artificial de AgroPredict.

El conjunto de datos integra información agrícola, territorial y climática proveniente de diferentes fuentes de información.

## Variable objetivo

| Variable | Descripción | Unidad |
|----------|-------------|--------|
| rendimiento_tha | Rendimiento agrícola del cultivo de maíz | toneladas/hectárea |

---

# Variables del modelo

## Variables territoriales

| Variable | Descripción |
|----------|-------------|
| cod_dep | Código DANE del departamento. |
| cod_mun | Código DANE del municipio. |
| semestre | Semestre agrícola (A o B). |

---

## Variables productivas

| Variable | Descripción | Unidad |
|----------|-------------|--------|
| desagregacion | Tipo de sistema productivo (Tradicional o Tecnificado). | - |
| area_sembrada_ha | Área sembrada. | hectáreas |
| area_cosechada_ha | Área cosechada. | hectáreas |
| produccion_t | Producción obtenida. | toneladas |

---

## Variables climáticas

| Variable | Descripción | Unidad |
|----------|-------------|--------|
| precip_total_mm | Precipitación acumulada del semestre. | mm |
| precip_dias_lluvia | Número de días con lluvia significativa. | días |
| temp_media_c | Temperatura media del semestre. | °C |
| temp_max_media_c | Temperatura máxima promedio. | °C |
| temp_min_media_c | Temperatura mínima promedio. | °C |
| radiacion_media | Radiación solar promedio. | W/m²  |
| humedad_media_pct | Humedad relativa promedio. | % |

---

## Observaciones

Las variables utilizadas corresponden al conjunto de datos consolidado generado después del proceso de limpieza, integración y transformación de la información agrícola y climática.
