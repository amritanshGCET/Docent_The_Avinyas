# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Deploy On Cloudflare Pages

This project is configured for static deployment to Cloudflare Pages.

1. Install dependencies:

```bash
npm install
```

2. Login to Cloudflare:

```bash
npm run cf:login
```

3. Create the Cloudflare Pages project once (skip if it already exists):

```bash
npm run cf:project:create
```

4. Deploy:

```bash
npm run cf:deploy
```

After deploy, Cloudflare will print your site URL.

If you want a different Pages project name, change `sih-prototype` in `package.json` scripts (`cf:project:create` and `cf:deploy`).
