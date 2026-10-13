# Microfrontends with Vue (Host) and React (Remote)

A tiny demo of microfrontends. A **Vue** app loads a **React** component at runtime from a **separately deployed** app, using [Module Federation](https://module-federation.io/).

- Live demo (Vue host): https://microfronts-host.vercel.app
- React remote on its own: https://microfronts-remote.vercel.app
- Blog post: [Microfrontends in simple terms](https://portfolio-iamsomraj.vercel.app/blogs/microfrontends-vue-react-module-federation-vercel)

## How it works

```
 microfronts-host.vercel.app (Vue)        microfronts-remote.vercel.app (React)
┌───────────────────────────────┐        ┌───────────────────────────────┐
│ Count in Vue: 2               │  load  │ remoteEntry.js                │
│ ┌───────────────────────────┐ │ ◀───── │   exposes ./Header            │
│ │ <Header count={2} />      │ │        │                               │
│ └───────────────────────────┘ │        └───────────────────────────────┘
└───────────────────────────────┘
```

1. The **remote** (React) builds a `remoteEntry.js` that exposes `./Header`.
2. The **host** (Vue) fetches that file in the browser, imports `remote_app/Header` and renders it into a `<div>`.
3. The host passes props (`count`, `onAdd`), so Vue and React share the same counter.
4. `react` and `react-dom` are shared as singletons, so only one copy of React is loaded.
5. If the remote is down, the host still works and shows a message.

## Project structure

```
microfronts/
├── host/      # Vue 3 app (port 3000), consumes remote_app/Header
├── remote/    # React 19 app (port 3001), exposes ./Header
└── package.json + pnpm-workspace.yaml
```

## Run locally

```bash
pnpm install
pnpm dev        # host on http://localhost:3000, remote on http://localhost:3001
```

Production build: `pnpm build && pnpm preview`.

## Deploy on Vercel

The host and remote are 2 separate Vercel projects from the same repo:

| Project              | Root Directory | Notes                                                           |
| -------------------- | -------------- | --------------------------------------------------------------- |
| `microfronts-remote` | `remote`       | `remote/vercel.json` adds CORS headers                          |
| `microfronts-host`   | `host`         | Env var `VITE_REMOTE_URL=https://microfronts-remote.vercel.app` |

Each push to `main` redeploys both.

## Tech stack

Vue 3 · React 19 · Vite 8 · [`@module-federation/vite`](https://github.com/module-federation/vite) · pnpm workspaces · Vercel

## Developer

LinkedIn: [iamsomraj](https://www.linkedin.com/in/iamsomraj/) · Portfolio: [Somraj Mukherjee](https://portfolio-iamsomraj.vercel.app)

## License

[MIT](LICENSE)
