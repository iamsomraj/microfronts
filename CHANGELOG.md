# Changelog

## v1.0.0

[compare changes](https://github.com/iamsomraj/microfronts/compare/f13cda0...v1.0.0)

### 🚀 Enhancements

- Deploy the demo on Vercel as 2 projects: the [Vue host](https://microfronts-host.vercel.app) and the [React remote](https://microfronts-remote.vercel.app) ([#2](https://github.com/iamsomraj/microfronts/pull/2))
- Move to `@module-federation/vite` and read the remote URL from `VITE_REMOTE_URL` ([#2](https://github.com/iamsomraj/microfronts/pull/2))
- Share a counter between Vue and React through props, with a fallback when the remote is down ([#2](https://github.com/iamsomraj/microfronts/pull/2))

### 🏡 Chore

- Root pnpm workspace; upgrade to Vite 8, Vue 3.5 and React 19.3 ([#2](https://github.com/iamsomraj/microfronts/pull/2))
