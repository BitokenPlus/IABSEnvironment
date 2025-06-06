# Accion Climatica ODS13 (Version React + API Python)

Esta es una version re-arquitecturada de la aplicacion original de Streamlit, usando React para el frontend y una Funcion Serverless de Python para el backend.

## Arquitectura

*   **Frontend**: Una aplicacion de una sola pagina (SPA) construida con **React** y **Vite**. Se encuentra en la carpeta raiz y `src/`.
*   **Backend**: Una Funcion Serverless de Python que se encuentra en `api/gemini.py`. Esta funcion recibe un `prompt` y se comunica con la API de Google Gemini.
*   **Despliegue**: Todo esta configurado para **Vercel** usando el archivo `vercel.json`.

## Como Ejecutar Localmente

**Importante!** El desarrollo local requiere ejecutar el frontend y el backend por separado.

### 1. Backend (API de Python)

Necesitaras tener `vercel` CLI instalado (`npm install -g vercel`).

Primero, instala las dependencias de Python:
`pip install -r requirements.txt`

Crea un archivo llamado `.env.local` en la raiz y anade tu clave:
`GOOGLE_API_KEY="tu_clave_aqui"`

Luego, inicia el servidor de desarrollo de Vercel para la API en el puerto 8000:
`vercel dev --listen 127.0.0.1:8000`

### 2. Frontend (React)

En **otra terminal**, instala las dependencias de Node.js:
`npm install`

Luego, inicia el servidor de desarrollo de Vite:
`npm run dev`

Abre tu navegador en la direccion que te indique Vite (normalmente `http://localhost:5173`).

## Despliegue en Vercel

1.  Sube todo el proyecto a GitHub.
2.  Importa el repositorio en Vercel.
3.  Configura las Variables de Entorno en el panel de Vercel:
    *   **Name:** `GOOGLE_API_KEY`
    *   **Value:** Pega tu clave de la API de Google Gemini.
4.  Despliega. Vercel se encargara de todo.