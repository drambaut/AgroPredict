# AgroPredict
 Sistema inteligente de decisiones agrícolas basada en IA que predice rendimientos agrícolas considerando variables climáticas, uso del suelo y precios de mercado.
## Descripción 
AgroPredict es una Plataforma Web Progresiva (PWA) que utiliza Inteligencia Artificial y datos abiertos para apoyar la planificación agrícola mediante la estimación del rendimiento potencial de los cultivos. La solución permite realizar simulaciones considerando variables productivas y climáticas, y facilita la consulta de resultados e historial de simulaciones para su uso en regiones con limitaciones de conectividad, como el departamento de orinoquia de Colombia. Como trabajo futuro, se plantea el desarrollo de una aplicación nativa que permita realizar simulaciones sin conexión a Internet.
## Problema
El sector agrícola colombiano enfrenta un alto nivel de incertidumbre debido a la variabilidad climática y a la dificultad para estimar el rendimiento potencial de los cultivos. En la región de la Orinoquía, a este desafío se suman las limitaciones de conectividad y el acceso limitado a herramientas digitales que apoyen la planificación agrícola y la toma de decisiones.
## Objetivo
Desarrollar AgroPredict, una Plataforma Web Progresiva (PWA) que integra Machine Learning, datos abiertos e información climática para estimar el rendimiento potencial de los cultivos y apoyar la planificación agrícola mediante una solución web que facilite la consulta de simulaciones e historial de resultados. Como trabajo futuro, se plantea el desarrollo de una aplicación nativa que permita realizar simulaciones sin conexión y sincronizar la información cuando se recupere el acceso a Internet.
## Solución
AgroPredict permite al usuario registrar la información de su cultivo mediante un formulario, ejecutar una simulación y obtener una estimación del rendimiento potencial junto con indicadores que apoyan la toma de decisiones. La plataforma funciona como una PWA, lo que permite acceder a la interfaz y consultar el historial de simulaciones sin conexión a Internet. Como trabajo futuro, se plantea el desarrollo de una aplicación nativa que permita ejecutar simulaciones completas sin conexión y sincronizar la información mediante un CTA cuando se recupere el acceso a Internet.
## Ficha técnica

| Elemento | Información |
|----------|-------------|
| Nombre | AgroPredict |
| Categoría | Intermedio IA |
| Equipo | 287 |
| Tipo de solución | Plataforma Web Progresiva (PWA) |
| Tecnologías | React, Python, Scikit-learn  |
| Inteligencia Artificial | Machine Learning |
| Datos | Datos abiertos oficiales e información climática de fuentes externa |
| Región de aplicación | Orinoquía colombiana |
## Arquitectura de la solución
<img width="1138" height="1360" alt="Diagrama en blanco - Página 1" src="https://github.com/user-attachments/assets/f11bff25-7c0b-4507-a3b2-7bf6346ac63f" />

## Tecnologías

| Componente | Tecnología |
|------------|------------|
| Frontend | React |
| Backend | Python |
| Machine Learning | Scikit-learn |
| Base de datos | *(por confirmar)* |
| Fuentes de datos | *(por confirmar)* |
| Aplicación | Progressive Web App (PWA) |

## Funcionamiento de la PWA

La plataforma requiere conexión a Internet para el registro del usuario y para ejecutar simulaciones, ya que el modelo de predicción se encuentra alojado en la nube. 

**Capacidades actuales:**
- Una vez instalada como PWA, la aplicación permite acceder a la interfaz sin conexión a Internet.
- Los usuarios pueden completar y almacenar localmente formularios de simulación cuando no hay conexión.
- Al recuperar la conectividad, los formularios almacenados pueden enviarse al servidor para procesarlos.

**Limitación actual:** No es posible realizar predicciones completamente offline en esta versión, ya que el modelo de Machine Learning se ejecuta en el backend en la nube.

**Roadmap futuro:** Se planea desarrollar un modelo nativo (integrado en la aplicación frontend) que permita ejecutar predicciones directamente en el dispositivo del usuario, habilitando una experiencia completamente offline con sincronización automática de resultados cuando se recupere la conexión.

## Capturas de pantalla

*(Me falta agregar)*

- Inicio de sesión
- Formulario de simulación
- Resultados de la simulación
- Modo offline y sincronización
- 
## Demo
La demostración del funcionamiento de AgroPredict se encuentra disponible en la carpeta **RECURSOS** del repositorio.

## Resultados del proyecto

- ✓ Plataforma Web Progresiva (PWA) funcional.
- ✓ Simulación del rendimiento potencial de cultivos.
- ✓ Integración de datos abiertos oficiales.
- ✓ Acceso a interfaz offline (almacenamiento local de formularios).
- ✓ Sincronización de simulaciones cuando se recupera la conexión.
  
## Documentación
La documentación técnica del proyecto se encuentra disponible en la carpeta **docs**, donde se describen:

- Planteamiento del problema.
- Arquitectura.
- Fuentes de datos.
- Diccionario de datos.
- Metodología.
- Guía de validación.
- Conclusiones.

## Consideraciones
Esta versión corresponde a un prototipo funcional.
El backend se encuentra alojado en un servicio gratuito y debe iniciarse manualmente para quedar disponible. Por esta razón, la plataforma puede no estar disponible de forma continua como ocurriría en un entorno de producción.

## Equipo

| Integrante | Rol |
|------------|-----|
| Daniel Rambaut | Científico de Datos |
| Geraldine Galvis | Diseñadora UX/UI | 
