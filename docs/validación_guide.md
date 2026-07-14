# Guía de validación

## Objetivo

Esta guía describe el proceso recomendado para validar el funcionamiento de AgroPredict y verificar que las principales funcionalidades de la solución operan correctamente.

## Recomendaciones

Para realizar una validación completa se recomienda utilizar un dispositivo móvil, ya que permite comprobar el proceso de instalación de la Plataforma Web Progresiva (PWA), el acceso a la interfaz en modo offline y la sincronización de los formularios cuando se recupera la conexión a Internet.

**Nota:** La validación desde un computador queda pendiente de confirmación para verificar si todas las funcionalidades offline están disponibles de la misma manera.



## Requisitos

Antes de iniciar la validación se recomienda contar con:

- Acceso a la aplicación AgroPredict.
- Verificar que el backend se encuentre iniciado y disponible, ya que en la versión actual del prototipo debe ejecutarse manualmente.
- Un navegador web actualizado.
- Conexión a Internet para el registro y para ejecutar simulaciones, ya que el modelo predictivo se encuentra alojado en la nube.
- Datos de prueba para realizar simulaciones.



## Casos de validación

### Caso 1. Registro e ingreso

**Objetivo**

Verificar que el usuario pueda acceder correctamente a la plataforma.

**Resultado esperado**

El usuario ingresa exitosamente y puede acceder al formulario de simulación.



### Caso 2. Simulación del cultivo

**Objetivo**

Verificar que el formulario permita registrar la información requerida y ejecutar una simulación.

**Resultado esperado**

La plataforma procesa la información y genera una estimación del rendimiento potencial del cultivo.


### Caso 3. Visualización de resultados

**Objetivo**

Verificar que los resultados de la simulación sean presentados correctamente.

**Resultado esperado**

El usuario visualiza la estimación del rendimiento y la información asociada a la simulación.



### Caso 4. Funcionamiento sin conexión

**Objetivo**

Verificar que la aplicación permita acceder a la interfaz y completar el formulario de simulación sin conexión a Internet.

**Resultado esperado**

El usuario puede acceder a la PWA y registrar la información de una nueva simulación sin conexión a Internet, quedando esta almacenada localmente. La predicción del rendimiento no se genera hasta que el dispositivo recupere la conexión, ya que el modelo se encuentra alojado en la nube.



### Caso 5. Sincronización

**Objetivo**

Verificar que los formularios registrados sin conexión sean sincronizados y procesados cuando el dispositivo recupere acceso a Internet.

**Resultado esperado**

Los formularios pendientes son enviados correctamente, procesados por el modelo y sus resultados quedan disponibles en la plataforma.



## Criterios de aceptación

La validación se considera satisfactoria cuando:

- El usuario puede acceder a la plataforma.
- Es posible ejecutar una simulación.
- La plataforma genera una estimación del rendimiento del cultivo.
- La aplicación permite acceder a la interfaz y registrar formularios sin conexión.
- Los formularios pendientes se sincronizan y procesan correctamente al recuperar la conexión.



## Evidencias

(**Falta comletar**)

- Capturas de pantalla.
- Resultados obtenidos durante las simulaciones.
- Registro de funcionamiento en modo offline.
- Registro del proceso de sincronización.
