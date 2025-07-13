# Proyecto de Accesibilidad Web

Este proyecto contiene dos versiones de la misma aplicación web para demostrar la diferencia entre una página con problemas de accesibilidad y otra con accesibilidad completa.

## Estructura del Proyecto

```
a11y-crtw/
├── README.md
├── sin-accesibilidad/
│   ├── index.html
│   ├── styles.css
│   └── script.js
└── con-accesibilidad/
    ├── index.html
    ├── styles.css
    └── script.js
```

## Páginas

### 📁 sin-accesibilidad/
**Página con problemas de accesibilidad intencionados:**
- Solo usa `<div>` y `<span>` (sin elementos semánticos)
- Botones implementados como `<div>` (excepto menú hamburguesa)
- Tree view sin roles ARIA apropiados
- Formulario sin `<label>` ni relaciones semánticas
- Validaciones personalizadas con JavaScript
- Navegación por teclado bloqueada (solo Enter)
- Calendario personalizado complejo
- Outline de focus eliminado
- Sin atributos ARIA

### 📁 con-accesibilidad/
**Página con accesibilidad completa:**
- Elementos semánticos: `<header>`, `<nav>`, `<main>`, `<section>`, `<form>`
- Botones nativos `<button>` con atributos ARIA
- Tree view con roles ARIA apropiados (menu/menuitem)
- Formulario con `<label>` y relaciones semánticas
- Validaciones HTML5 nativas
- Navegación por teclado estándar
- `<input type="date">` nativo
- Estilos de focus visibles
- Atributos ARIA completos
- Skip link para navegación

## Funcionalidades

Ambas páginas incluyen:
- **Banner superior** con menú hamburguesa
- **Tree view** con géneros de películas (Drama, Comedia, Ciencia Ficción)
- **Selección de películas** visual y funcional
- **Formulario de registro** con validaciones:
  - Nombre: exactamente 4 letras
  - Password: debe comenzar con 3 números consecutivos
  - Provincia: selección requerida
  - Fecha: requerida
- **Dialog de resultados** mostrando los datos ingresados y película seleccionada
- **Diseño responsive** para móvil y desktop

## Cómo usar

1. Abrir cualquiera de los archivos `index.html` en un navegador web
2. Navegar por la interfaz y completar el formulario
3. Comparar la experiencia entre ambas versiones

## Tecnologías utilizadas

- HTML5
- CSS3 (con custom properties)
- JavaScript (ES6+)
- ARIA (Web Accessibility Initiative)

## Objetivo educativo

Este proyecto sirve para:
- Demostrar la importancia de la accesibilidad web
- Mostrar las diferencias entre código accesible y no accesible
- Enseñar mejores prácticas de desarrollo web inclusivo
- Ejemplificar el uso correcto de ARIA y elementos semánticos
