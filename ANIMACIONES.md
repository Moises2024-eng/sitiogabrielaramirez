# Guía de Animaciones

## Mejoras Implementadas

### ✨ Sistema de Animaciones Profesional

Se ha actualizado completamente el sistema de animaciones del sitio para ofrecer una experiencia suave, profesional y consistente.

#### Características Principales:

1. **Animaciones Repetibles**: Las animaciones ahora se ejecutan cada vez que un elemento entra o sale del viewport durante el scroll, no solo la primera vez.

2. **Transiciones Suaves**: Se implementó un easing profesional (cubic-bezier) que proporciona movimientos naturales y elegantes.

3. **Scroll Natural**: Se eliminó Lenis y se implementó scroll nativo del navegador que funciona de manera consistente con todos los métodos de interacción (rueda, barra, teclado, touch).

4. **Performance Optimizada**: Se añadieron optimizaciones de renderizado para animaciones más fluidas.

## Animaciones Disponibles

### Fade Animations
- `data-animate="fade-up"` - Fade in desde abajo
- `data-animate="fade-down"` - Fade in desde arriba
- `data-animate="fade-in"` - Fade in simple

### Slide Animations
- `data-animate="slide-left"` - Slide desde la izquierda
- `data-animate="slide-right"` - Slide desde la derecha
- `data-animate="slide-up"` - Slide hacia arriba
- `data-animate="slide-down"` - Slide hacia abajo

### Special Effects
- `data-animate="scale"` - Zoom in elegante
- `data-animate="stagger"` - Animación secuencial de hijos

## Uso

```html
<!-- Ejemplo básico -->
<div data-animate="fade-up">
  Este contenido aparecerá con un fade up suave
</div>

<!-- Stagger para grupos -->
<div class="grid" data-animate="stagger">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <!-- Los items aparecerán secuencialmente -->
</div>
```

## Configuración Técnica

### Duración por defecto:
- **Fade**: 0.9-1.0s
- **Slide**: 0.9s
- **Scale**: 0.8s
- **Stagger**: 0.7s por item (+ 0.08s delay)

### Thresholds (Visibilidad Requerida):
- **Fade/Slide**: 35% del elemento visible antes de animar
- **FadeIn**: 30% del elemento visible
- **Stagger**: 25% para activación de grupos
- **Scale**: 40% del elemento visible

Los elementos ahora requieren estar más visibles en pantalla antes de animarse, proporcionando una experiencia más natural y menos abrupta.

### Easing:
- **Entrada**: `cubic-bezier(0.25, 0.1, 0.25, 1)` - Suave y profesional
- **Salida**: `cubic-bezier(0.25, 0.1, 0.25, 1)` - 0.4s (más rápida)

## Scroll Suave (Nativo)

El sitio ahora utiliza el scroll suave nativo del navegador (`scroll-behavior: smooth`) que ofrece:
- ✅ Funciona con todos los métodos de scroll (rueda, barra, teclado, touch)
- ✅ Experiencia consistente y predecible
- ✅ Sin comportamientos agresivos o saltos
- ✅ Compatible con todas las funcionalidades del navegador
- ✅ Mejor performance (no requiere JavaScript)

Además, se personaliza la scrollbar para una mejor estética que combina con el diseño del sitio.

## Cambios Realizados

### Archivo `motionInit.ts`
- ✅ Agregadas animaciones de entrada Y salida
- ✅ Implementado easing profesional
- ✅ Optimizadas duraciones y thresholds
- ✅ Nuevas animaciones: fade-down, slide-up, slide-down

### Archivo `Layout.astro`
- ✅ Eliminado Lenis en favor de scroll nativo
- ✅ Scroll suave con CSS `scroll-behavior: smooth`
- ✅ Scrollbar personalizada con los colores del sitio
- ✅ Estilos de performance mejorados
- ✅ will-change para optimización GPU

## Resultado

- ✨ Animaciones suaves y profesionales
- 🔄 Repetibles en cada scroll
- 🎯 Sin saltos ni experiencias bruscas
- 🚀 Optimizadas para performance
- 💎 Aspecto premium y pulido
