# Arquitectura de la solución

## Descripción

AgroPredict está compuesto por una Plataforma Web Progresiva (PWA), un backend encargado del procesamiento de la información, un modelo de Machine Learning para la predicción del rendimiento potencial de los cultivos y la integración de múltiples fuentes de información, incluyendo datos abiertos oficiales y fuentes externas de datos climáticos.
## Diagrama de arquitectura

<img width="1138" height="1360" alt="Diagrama en blanco - Página 1" src="https://github.com/user-attachments/assets/0ae51786-3ef5-46a5-8fed-6717dcc832da" />

## Componentes

### Frontend (PWA)

Aplicación Web Progresiva desarrollada para que los usuarios puedan registrar la información del cultivo, ejecutar simulaciones y consultar los resultados desde dispositivos móviles o de escritorio. La aplicación permite continuar operando sin conexión a Internet una vez instalada como PWA.

**Tecnología:**
- React



### Backend

Componente encargado de procesar las solicitudes realizadas por la aplicación, gestionar la información utilizada durante las simulaciones y comunicarse con el modelo de Inteligencia Artificial para generar las predicciones.

**Tecnología:**
- Python



### Modelo de Inteligencia Artificial

Modelo de Machine Learning entrenado con información agrícola y climática para estimar el rendimiento potencial del cultivo de maíz.

**Tecnología:**
- Scikit-learn
- Gradient Boosting Regressor



### Fuentes de información

El modelo utiliza diferentes fuentes de información para su entrenamiento y funcionamiento.

**Datos abiertos**
- Evaluaciones Agropecuarias Municipales (EVA) del Ministerio de Agricultura y Desarrollo Rural de Colombia.

**Fuente externa**
- NASA POWER para variables climáticas históricas.

**Información geográfica**
- Centroides municipales utilizados para consultar información climática. (*POR CONFIRMAR)



### Almacenamiento

Las simulaciones realizadas por el usuario pueden almacenarse localmente cuando la aplicación se utiliza sin conexión. Una vez el dispositivo recupera acceso a Internet, la información pendiente puede sincronizarse con la plataforma.



## Flujo general

1. El usuario registra la información del cultivo mediante un formulario.
2. La aplicación envía la información para su procesamiento.
3. El modelo de Machine Learning analiza las variables productivas y climáticas.
4. Se genera una estimación del rendimiento potencial del cultivo.
5. La plataforma presenta los resultados al usuario.
6. Si la aplicación se encuentra sin conexión, la simulación se almacena localmente y se sincroniza cuando el dispositivo recupera acceso a Internet.
