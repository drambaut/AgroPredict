# Arquitectura de la solución

## Descripción

AgroPredict está compuesto por una Plataforma Web Progresiva (PWA), un backend encargado del procesamiento de la información, un modelo de Machine Learning para la predicción del rendimiento potencial de los cultivos y la integración de múltiples fuentes de información, incluyendo datos abiertos oficiales y fuentes externas de datos climáticos.
## Diagrama de arquitectura

<img width="1138" height="1360" alt="Diagrama en blanco - Página 1" src="https://github.com/user-attachments/assets/0ae51786-3ef5-46a5-8fed-6717dcc832da" />

## Componentes

### Frontend (PWA)

Aplicación Web Progresiva desarrollada para que los usuarios puedan registrar la información del cultivo, ejecutar simulaciones y consultar los resultados desde dispositivos móviles o de escritorio.

**Capacidades:**
- Acceso a la interfaz sin conexión a Internet una vez instalada como PWA.
- Almacenamiento local de formularios cuando no hay conectividad.
- Sincronización automática de datos cuando se recupera la conexión.

**Limitación actual:** Las predicciones requieren conexión a Internet, ya que el modelo de Machine Learning se ejecuta en el backend en la nube.

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

Los formularios de simulación pueden almacenarse localmente cuando la aplicación se utiliza sin conexión. Una vez el dispositivo recupera acceso a Internet, la información pendiente puede sincronizarse con la plataforma para procesarla y obtener las predicciones.

**Nota:** Dado que el modelo de predicción se encuentra en la nube, las simulaciones no pueden completarse completamente offline en la versión actual. El almacenamiento local permite guardar el estado del formulario para que el usuario no pierda su trabajo mientras no hay conexión.



## Flujo general

**Con conexión a Internet:**
1. El usuario registra la información del cultivo mediante un formulario.
2. La aplicación envía la información para su procesamiento.
3. El modelo de Machine Learning analiza las variables productivas y climáticas.
4. Se genera una estimación del rendimiento potencial del cultivo.
5. La plataforma presenta los resultados al usuario.

**Sin conexión a Internet:**
1. El usuario accede a la interfaz de la PWA (interfaz disponible offline).
2. El usuario registra la información del cultivo mediante un formulario.
3. La aplicación almacena el formulario localmente.
4. Cuando el dispositivo recupera acceso a Internet, la información se sincroniza automáticamente.
5. El servidor procesa la simulación y devuelve los resultados.

**Nota sobre funcionalidad offline:** En la versión actual, las predicciones no pueden completarse offline ya que requieren el modelo de Machine Learning que se encuentra en el backend en la nube. Se espera en futuras versiones integrar un modelo nativo que permita hacer predicciones completamente offline.
