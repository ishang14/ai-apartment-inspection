/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Base URL of the backend API, including the `/api` suffix.
   * Unset in local dev (falls back to http://127.0.0.1:8000/api).
   * Set in production to e.g. https://your-backend.onrender.com/api
   */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
