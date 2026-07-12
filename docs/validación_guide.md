# Guía de validación

## Objetivo

Esta guía describe el proceso recomendado para validar el funcionamiento de AgroPredict y verificar que las principales funcionalidades de la solución operan correctamente.



## Requisitos

Antes de iniciar la validación se recomienda contar con:

- Acceso a la aplicación AgroPredict.
- Un navegador web actualizado.
- Conexión a Internet para el registro inicial y la primera simulación.
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

Verificar que la aplicación continúe funcionando en modo offline después de la primera sincronización.

**Resultado esperado**

El usuario puede registrar nuevas simulaciones sin conexión a Internet.



### Caso 5. Sincronización

**Objetivo**

Verificar que las simulaciones realizadas sin conexión sean sincronizadas cuando el dispositivo recupere acceso a Internet.

**Resultado esperado**

Las simulaciones pendientes son enviadas correctamente y quedan disponibles en la plataforma.



## Criterios de aceptación

La validación se considera satisfactoria cuando:

- El usuario puede acceder a la plataforma.
- Es posible ejecutar una simulación.
- La plataforma genera una estimación del rendimiento del cultivo.
- La aplicación funciona correctamente en modo online y offline.
- Las simulaciones pendientes se sincronizan correctamente al recuperar la conexión.



## Evidencias

Como evidencia del proceso de validación se recomienda registrar:

- Capturas de pantalla.
- Resultados obtenidos durante las simulaciones.
- Registro de funcionamiento en modo offline.
- Registro del proceso de sincronización.
