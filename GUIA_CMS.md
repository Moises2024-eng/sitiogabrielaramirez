# 📝 Guía del CMS - Blog de SexoloGabi

## Acceso al CMS

Para acceder al panel de administración del blog, visita:
```
http://localhost:4322/admin (en desarrollo)
https://tu-sitio.com/admin (en producción)
```

## Configuración inicial

### 1. Autenticación con GitHub

Para que el CMS funcione, necesitas configurar la autenticación de GitHub:

1. Ve a tu repositorio en GitHub: https://github.com/BaironDev22/sitiogabrielaramirez
2. Ve a **Settings** → **Developer settings** → **OAuth Apps**
3. Click en **New OAuth App**
4. Completa los campos:
   - **Application name**: SexoloGabi CMS
   - **Homepage URL**: https://tu-sitio.com
   - **Authorization callback URL**: https://api.netlify.com/auth/done
5. Guarda el **Client ID** y genera un **Client Secret**

### 2. Configurar en Render (o tu hosting)

En el panel de Render, agrega estas variables de entorno:
- `GITHUB_CLIENT_ID`: [tu client id]
- `GITHUB_CLIENT_SECRET`: [tu client secret]

## Cómo crear un nuevo artículo

1. **Accede al CMS** en `/admin`
2. **Haz login** con tu cuenta de GitHub
3. Click en **"Artículos del Blog"**
4. Click en **"Nuevo Artículo del Blog"**
5. Completa el formulario:
   - **Título**: El título del artículo
   - **Descripción**: Un resumen corto (aparece en las cards)
   - **Fecha de Publicación**: Elige la fecha
   - **Categoría**: Selecciona una de las 4 categorías
   - **Imagen Destacada**: Sube una imagen (recomendado: 1200x800px)
   - **Autor**: Tu nombre (por defecto "Gabriela Ramírez")
   - **Contenido**: El cuerpo del artículo (usa el editor visual)
6. **Vista previa** (opcional) para ver cómo se verá
7. Click en **"Publicar"** o **"Guardar borrador"**

## Editar o eliminar artículos

1. Accede al CMS
2. Click en el artículo que quieres editar
3. Realiza los cambios
4. Click en **"Publicar"** para actualizar
5. Para eliminar, click en **"Eliminar"** en la parte superior

## Formato del contenido

El editor de contenido usa **Markdown**. Puedes usar:

### Títulos
```markdown
# Título H1
## Título H2
### Título H3
```

### Texto en negrita e itálica
```markdown
**negrita**
*itálica*
```

### Listas
```markdown
- Item 1
- Item 2
- Item 3

1. Primero
2. Segundo
3. Tercero
```

### Enlaces
```markdown
[Texto del enlace](https://ejemplo.com)
```

### Imágenes
```markdown
![Texto alternativo](url-de-la-imagen)
```

### Citas
```markdown
> Esta es una cita destacada
```

## Categorías disponibles

- **EDUCACIÓN**: Artículos educativos sobre sexualidad
- **MINDFULNESS**: Prácticas conscientes y meditación
- **LIFESTYLE**: Estilo de vida y bienestar general
- **PRÓXIMAMENTE**: Contenido que se publicará pronto

## Recomendaciones

### Imágenes
- Tamaño recomendado: **1200x800px** (ratio 3:2)
- Formato: JPG o PNG
- Peso máximo: 500KB (optimiza tus imágenes antes)
- Usa imágenes de alta calidad

### Títulos
- Máximo 60 caracteres
- Claros y atractivos
- Incluye palabras clave

### Descripciones
- Entre 120-160 caracteres
- Resume el artículo en 1-2 frases
- Genera curiosidad

### Contenido
- Longitud ideal: 800-1500 palabras
- Usa subtítulos para organizar el contenido
- Incluye listas y citas para mejor lectura
- Divide en párrafos cortos (3-4 líneas)

## Flujo de publicación

1. ✍️ Escribes el artículo en el CMS
2. 💾 Guardas (se crea un commit en GitHub)
3. 🚀 El sitio se reconstruye automáticamente
4. ✅ El artículo aparece en el blog

**Tiempo de publicación**: 2-5 minutos desde que guardas hasta que se ve en vivo.

## Modo local (desarrollo)

Si quieres probar el CMS localmente:

1. Abre el archivo `public/admin/config.yml`
2. Asegúrate de que `local_backend: true` esté habilitado
3. Ejecuta en la terminal:
   ```bash
   npm run dev
   ```
4. En otra terminal ejecuta:
   ```bash
   npx decap-server
   ```
5. Accede a `http://localhost:4322/admin` (o el puerto que Astro esté usando)

## Solución de problemas

### No puedo acceder al CMS
- Verifica que estés en la ruta correcta: `/admin`
- Asegúrate de tener configurada la autenticación de GitHub

### Los cambios no se ven reflejados
- El sitio tarda 2-5 minutos en reconstruirse
- Verifica que el commit se haya creado en GitHub
- Limpia la caché del navegador

### No puedo subir imágenes
- Verifica que la imagen sea menor a 5MB
- Usa formatos soportados: JPG, PNG, WebP
- Comprueba tu conexión a internet

## Contacto

Si tienes problemas técnicos con el CMS, contacta al desarrollador.

---

**¡Feliz escritura! 🎉**
