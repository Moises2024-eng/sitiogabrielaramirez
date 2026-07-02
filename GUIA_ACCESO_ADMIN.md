# 🔐 Guía de Acceso al Panel de Administración del Blog

## Para la Cliente (Gabriela)

### Cómo acceder al admin del blog en producción

#### **URL del Admin:**
```
https://tu-dominio.com/admin
```

---

## 📋 Configuración Inicial (Solo una vez)

### Opción 1: Acceso con GitHub (Recomendado)

Esta es la forma más segura y profesional. Requiere configuración inicial del desarrollador.

#### **Pasos para el Desarrollador:**

1. **Crear OAuth App en GitHub:**
   - Ir a: https://github.com/settings/developers
   - Click en "OAuth Apps" → "New OAuth App"
   - Completar:
     ```
     Application name: SexoloGabi CMS
     Homepage URL: https://tu-dominio-produccion.com
     Authorization callback URL: https://api.netlify.com/auth/done
     ```
   - Guardar el **Client ID** y **Client Secret**

2. **Configurar Netlify Identity (Método más simple):**
   
   a. Crear cuenta en https://netlify.com (gratis)
   
   b. Hacer deploy del sitio en Netlify (adicional a Render):
      - Conectar el repositorio de GitHub
      - Deploy automático
   
   c. Activar Netlify Identity:
      - Site Settings → Identity → Enable Identity
      - Registration preferences → **Invite only** (para seguridad)
   
   d. Activar Git Gateway:
      - Identity → Services → Git Gateway → Enable
      - Conectar con el OAuth App de GitHub
   
   e. Invitar al usuario:
      - Identity → Invite users
      - Ingresar email de la cliente
      - Cliente recibirá un email de invitación

3. **Actualizar `public/admin/config.yml`:**
   ```yaml
   backend:
     name: git-gateway
     branch: main
   
   # Remover o comentar local_backend en producción
   # local_backend: true
   
   media_folder: "public/images/blog"
   public_folder: "/images/blog"
   
   # ... resto de configuración
   ```

4. **Agregar Netlify Identity Widget al HTML:**
   
   Editar `public/admin/index.html` (agregar antes del cierre de `</head>`):
   ```html
   <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
   ```

#### **Pasos para la Cliente (después de recibir invitación):**

1. Revisar email de invitación de Netlify
2. Click en el enlace de invitación
3. Crear contraseña segura
4. Una vez confirmada, ir a: `https://tu-dominio.com/admin`
5. Click en "Login with Netlify Identity"
6. Ingresar email y contraseña
7. ¡Listo! Ya puedes crear artículos

---

### Opción 2: Acceso Directo con GitHub (Más técnico)

Si la cliente tiene cuenta de GitHub y es colaboradora del repositorio:

1. **Desarrollador debe:**
   - Agregar a la cliente como colaboradora del repo
   - En GitHub → Settings → Collaborators → Add people
   - Ingresar el usuario de GitHub de la cliente

2. **Actualizar `config.yml`:**
   ```yaml
   backend:
     name: github
     repo: BaironDev22/sitiogabrielaramirez
     branch: main
   
   # Comentar en producción:
   # local_backend: true
   ```

3. **Cliente accede:**
   - Ir a `https://tu-dominio.com/admin`
   - Click en "Login with GitHub"
   - Autorizar la aplicación
   - Acceso completo al CMS

---

### Opción 3: Edición Manual (Alternativa sin admin)

Si hay problemas con la configuración, la cliente puede editar directamente:

1. Acceder al repositorio de GitHub
2. Navegar a: `src/content/blog/`
3. Click en "Add file" → "Create new file"
4. Nombrar: `mi-nuevo-articulo.md`
5. Copiar formato de artículo existente:

```markdown
---
title: "Título del Artículo"
description: "Breve descripción que aparece en la tarjeta"
pubDate: 2026-02-15T10:00:00.000Z
category: "EDUCACIÓN"
image: "/images/blog/nombre-imagen.jpg"
author: "Gabriela Ramírez"
---

## Introducción

Contenido del artículo aquí...

## Subtítulo

Más contenido...
```

6. Subir imágenes en: `public/images/blog/`
7. Commit changes → archivo se crea
8. El sitio se actualiza automáticamente

---

## 🎨 Usando el Panel de Admin

### Una vez dentro del admin:

1. **Crear nuevo artículo:**
   - Click en "Artículos del Blog"
   - Click en "New Artículos del Blog"
   - Llenar campos:
     - **Título**: Título principal
     - **Descripción**: Resumen corto (aparece en las tarjetas)
     - **Fecha**: Fecha de publicación
     - **Categoría**: Elegir entre opciones
     - **Imagen**: Subir imagen destacada
     - **Contenido**: Cuerpo del artículo (con editor visual)

2. **Editar artículo existente:**
   - Click en el artículo de la lista
   - Modificar campos necesarios
   - Click en "Publish" → "Publish now"

3. **Vista previa:**
   - Mientras editas, puedes ver preview en tiempo real

4. **Publicar:**
   - Click en "Publish" en la esquina superior derecha
   - Confirmar "Publish now"
   - Los cambios se reflejan en el sitio en 1-2 minutos

### Categorías disponibles:
- `EDUCACIÓN`: Artículos educativos sobre sexualidad
- `MINDFULNESS`: Contenido sobre consciencia y presencia
- `LIFESTYLE`: Estilo de vida y bienestar
- `PRÓXIMAMENTE`: Para anuncios de próximos contenidos

---

## 🚨 Solución de Problemas

### "Error de autenticación"
- Verificar que OAuth App esté configurado correctamente
- Confirmar que la URL de callback coincida
- Limpiar caché del navegador

### "No puedo subir imágenes"
- Verificar permisos en GitHub
- Confirmar que la carpeta `public/images/blog/` existe
- Comprobar tamaño de imagen (máx 5MB recomendado)

### "Los cambios no se reflejan"
- Esperar 2-3 minutos para el rebuild
- Limpiar caché del navegador (Ctrl + Shift + R)
- Verificar que el cambio se hizo commit en GitHub

---

## 📞 Soporte

**Para la cliente:**
Si tienes problemas para acceder o usar el admin, contacta al desarrollador con:
- Captura de pantalla del error
- Descripción de lo que intentabas hacer
- Navegador que estás usando

**Para el desarrollador:**
- Revisar logs de Render
- Verificar config.yml está correctamente configurado
- Confirmar variables de entorno en Render
- Probar acceso con `npx decap-server` localmente

---

## ✅ Checklist de Configuración

### Antes de entregar acceso a la cliente:

- [ ] OAuth App creado en GitHub
- [ ] Netlify Identity configurado (o autenticación alternativa)
- [ ] Cliente agregada como colaboradora (si aplica)
- [ ] `config.yml` actualizado para producción
- [ ] `local_backend: true` comentado o eliminado
- [ ] Invitación enviada a email de la cliente
- [ ] Probado login y creación de artículo de prueba
- [ ] URL del admin funcional: `https://tu-dominio.com/admin`
- [ ] Cliente recibió credenciales/instrucciones

---

## 🎓 Recursos Adicionales

- **Video tutorial Decap CMS**: https://www.youtube.com/watch?v=CbU4dUC5Xhg
- **Documentación oficial**: https://decapcms.org/docs/
- **Guía de Markdown**: https://www.markdownguide.org/basic-syntax/

---

## 🔒 Notas de Seguridad

- **Nunca compartir Client Secret públicamente**
- Usar **Invite Only** en Netlify Identity
- Cambiar contraseñas periódicamente
- Revisar logs de acceso regularmente
- Hacer backups del contenido del blog

---

**Última actualización:** Febrero 2026
**Versión:** 1.0
