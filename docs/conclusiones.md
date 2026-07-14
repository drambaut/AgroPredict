# Conclusiones

## Hallazgos

El desarrollo de AgroPredict permitió demostrar que la integración de información agrícola, datos climáticos y técnicas de Machine Learning puede apoyar la estimación del rendimiento potencial de los cultivos.

La utilización de una Plataforma Web Progresiva (PWA) también permitió facilitar el acceso a la herramienta y la consulta del historial de simulaciones en escenarios con conectividad limitada, como en zonas rurales.



## Limitaciones

Durante el desarrollo del proyecto se identificaron las siguientes limitaciones:

- El backend del prototipo se ejecuta en un entorno de desarrollo y requiere iniciarse manualmente para quedar disponible.
- Por esta razón, la solución no cuenta con disponibilidad continua como tendría un entorno de producción
- Actualmente el modelo predictivo fue desarrollado para el cultivo de maíz.
- La calidad de las predicciones depende de la disponibilidad y calidad de la información utilizada para el entrenamiento del modelo.
- La solución requiere incorporar nuevos conjuntos de datos para ampliar su cobertura hacia otros cultivos y regiones del país.
- La ejecución de simulaciones requiere conexión a Internet, ya que el modelo predictivo se encuentra alojado en la nube. Por lo tanto, no es posible generar predicciones completamente offline en la versión actual.


## Próximos pasos

Como trabajo futuro se plantea:

- Incorporar nuevos cultivos al modelo predictivo.
- Integrar nuevas fuentes de información agrícola y climática.
- Mejorar continuamente el modelo mediante el entrenamiento con nuevos datos.
- Implementar nuevas funcionalidades dentro de la plataforma para fortalecer la toma de decisiones de los productores.
- Escalar la solución a otras regiones del país.
- Desarrollar una aplicación nativa que integre el modelo entrenado, permitiendo ejecutar simulaciones sin conexión a Internet y sincronizar la información cuando se recupere el acceso a la red.
- Evaluar un modelo de negocio que contemple una versión gratuita con funcionalidades básicas y una versión de pago con herramientas avanzadas, análisis especializados y servicios adicionales.
