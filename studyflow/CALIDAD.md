# CALIDAD

## Estrategia general

Decidimos implementar una estrategia de validación automática para asegurar que cada cambio realizado en StudyFlow no rompa funcionalidades existentes.

## Herramientas seleccionadas

* ESLint → detectar errores de sintaxis y buenas prácticas.
* Vitest → pruebas unitarias rápidas para funciones internas.
* Playwright → pruebas E2E simulando comportamiento real.
* GitHub Actions → automatización del pipeline.

## Tests desarrollados

### Test Unitario 1

Se verifica que un título válido de tarea sea aceptado.

### Test Unitario 2

Se verifica que un título vacío sea rechazado.

### Test Unitario 3

Se valida el límite máximo de caracteres.

### Test E2E

Se prueba login exitoso ingresando email y contraseña correctos.

## Cosas de las pantallas

* Registro
* Login
* Crear tarea
* Eliminar tarea
* Editar tarea

## Pipeline CI/CD

1. Lint
2. Tests
3. Build
4. Deploy

Si algún paso falla, el deploy no pasa.

## Producción

Aplicación desplegada en:

https://tu-app.vercel.app