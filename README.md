# Dunia Crypto Dashboard

## Penting untuk Deployment ke Vercel

1. **Asset Logo dan Gambar**
   - Pindahkan file `Asset/duniacrypto.png` ke folder `public/Asset/duniacrypto.png`.
   - Semua asset gambar yang ingin diakses di web harus berada di dalam folder `public/`.

2. **Proxy API (Vite)**
   - Untuk development lokal, proxy sudah bisa digunakan di `vite.config.js`.
   - Untuk deployment ke Vercel, gunakan [Vercel rewrites](https://vercel.com/docs/projects/project-configuration#project-configuration/rewrites) di file `vercel.json` agar request `/coingecko/*` dan `/gnews/*` diteruskan ke API eksternal.
   - Contoh `vercel.json`:
     ```json
     {
       "rewrites": [
         { "source": "/coingecko/:path*", "destination": "https://api.coingecko.com/:path*" },
         { "source": "/gnews/:path*", "destination": "https://gnews.io/:path*" }
       ]
     }
     ```
   - Letakkan file `vercel.json` di root project.

3. **Langkah Deploy ke Vercel**
   - Pastikan asset sudah di `public/Asset/`.
   - Tambahkan file `vercel.json` seperti di atas.
   - Push ke GitHub, lalu hubungkan repo ke Vercel.
   - Deploy!

---

## Sisa instruksi project ...

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
