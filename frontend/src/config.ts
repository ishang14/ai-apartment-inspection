/*
 * Central place for the backend URLs.
 *
 * Everything is derived from a single env var, VITE_API_BASE_URL, which
 * Vite inlines at build time. Local dev can leave it unset and fall back
 * to the dev backend.
 */

const rawApiBase =
  import.meta.env.VITE_API_BASE_URL?.trim() ||
  "http://127.0.0.1:8000/api";

/** Backend API root, e.g. https://your-backend.onrender.com/api */
export const API_BASE_URL = rawApiBase.replace(/\/+$/, "");

/**
 * Origin the backend serves static uploads from (`/uploads/*`), i.e. the
 * API base without its trailing "/api" segment.
 */
export const SERVER_BASE_URL = API_BASE_URL.replace(/\/api$/, "");
