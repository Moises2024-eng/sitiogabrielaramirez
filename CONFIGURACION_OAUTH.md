# Configuración de Autenticación para Decap CMS

## Pasos para configurar GitHub OAuth

### 1. Crear OAuth App en GitHub

1. Ve a https://github.com/settings/developers
2. Click en **"OAuth Apps"** en el menú lateral
3. Click en **"New OAuth App"**
4. Completa el formulario:

   ```
   Application name: SexoloGabi CMS
   Homepage URL: https://sitiogabrielaramirez.onrender.com
   Application description: CMS para gestionar el blog
   Authorization callback URL: https://api.netlify.com/auth/done
   ```

5. Click en **"Register application"**
6. Copia el **Client ID**
7. Click en **"Generate a new client secret"** y copia el **Client Secret**

### 2. Configurar en Render

Dado que estás usando Render para el hosting, necesitas usar un proxy de autenticación. Tienes dos opciones:

#### Opción A: Usar Netlify Identity (Recomendado)

1. Crea una cuenta gratuita en https://netlify.com
2. Deploy tu sitio en Netlify (además de Render, solo para la autenticación)
3. Ve a **Site settings** → **Identity** → **Enable Identity**
4. En **Identity** → **Services** → **Git Gateway** → **Enable Git Gateway**
5. Configura los servicios de GitHub con tu OAuth App

#### Opción B: Usar tu propio proxy de autenticación

Si prefieres mantener todo en Render, necesitas configurar un servidor proxy. Aquí está el código:

**Crear archivo `netlify-cms-auth.js` en la raíz:**

```javascript
const express = require('express');
const axios = require('axios');
const app = express();

app.get('/auth', (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const redirectUri = `${process.env.APP_URL}/callback`;
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo`;
  res.redirect(authUrl);
});

app.get('/callback', async (req, res) => {
  const code = req.query.code;
  try {
    const response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code
    }, {
      headers: { Accept: 'application/json' }
    });
    
    const token = response.data.access_token;
    res.send(`
      <html>
        <body>
          <script>
            window.opener.postMessage(
              'authorization:github:success:{"token": "${token}"}',
              window.location.origin
            );
            window.close();
          </script>
        </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send('Error de autenticación');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(\`Servidor corriendo en puerto \${PORT}\`));
```

### 3. Actualizar config.yml del CMS

Edita `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: BaironDev22/sitiogabrielaramirez
  branch: main
  base_url: https://tu-sitio.com # o la URL de tu proxy
  auth_endpoint: /auth

# Para desarrollo local, mantén esto:
local_backend: true
```

### 4. Variables de entorno en Render

En el dashboard de Render, agrega estas variables de entorno:

```
GITHUB_CLIENT_ID=tu_client_id_aqui
GITHUB_CLIENT_SECRET=tu_client_secret_aqui
APP_URL=https://sitiogabrielaramirez.onrender.com
```

## Desarrollo local sin autenticación

Para trabajar localmente sin configurar la autenticación:

1. Asegúrate de tener `local_backend: true` en `config.yml`
2. En una terminal, ejecuta:
   ```bash
   npm run dev
   ```
3. En otra terminal, ejecuta:
   ```bash
   npx decap-server
   ```
4. Accede a `http://localhost:4322/admin`

Con el servidor local de Decap, puedes crear y editar artículos sin necesidad de autenticación.

## Alternativa simple: Editar archivos directamente

Si la configuración de OAuth es complicada, siempre puedes:

1. Crear archivos `.md` directamente en `src/content/blog/`
2. Seguir el formato de los archivos de ejemplo
3. Hacer commit y push a GitHub
4. El sitio se reconstruirá automáticamente en Render

Ejemplo de archivo:

```markdown
---
title: "Mi nuevo artículo"
description: "Descripción corta del artículo"
pubDate: 2025-02-02
category: "EDUCACIÓN"
image: "/images/blog/mi-imagen.jpg"
author: "Gabriela Ramírez"
---

## Contenido del artículo

Tu contenido aquí...
```

## Recursos adicionales

- [Documentación de Decap CMS](https://decapcms.org/docs/)
- [GitHub OAuth Apps](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [Render Environment Variables](https://render.com/docs/environment-variables)

## Soporte

Si encuentras problemas con la configuración, contacta al desarrollador o usa la alternativa de editar archivos directamente.
