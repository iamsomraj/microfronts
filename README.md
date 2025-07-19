# Microfrontends with Vue (Host) and React (Remote)

A modern microfrontend architecture demonstration where a Vue.js host application consumes React components from a remote application using Module Federation. This showcases how different teams can work independently with different frameworks while maintaining seamless integration.

## Project Structure

```
microfronts/
├── host/           # Vue.js host application (port 5000)
│   ├── src/
│   │   ├── App.vue          # Main host component that loads remote components
│   │   └── main.js          # Vue app entry point
│   ├── package.json         # Host dependencies (Vue + federation)
│   └── vite.config.js       # Host configuration with remote imports
└── remote/         # React remote application (port 5001)
    ├── src/
    │   └── components/
    │       └── Header.jsx    # React component exposed to host
    ├── package.json         # Remote dependencies (React + federation)
    └── vite.config.js       # Remote configuration with component exports
```

## Run This Application

Following steps are required to run the application:

- Open Terminal

- Clone Microfrontends Repository

```bash
git clone https://github.com/iamsomraj/microfronts.git
```

- Go to Root Directory of microfronts

- Install Dependencies for Both Applications

```bash
# Install dependencies for host application
cd host
pnpm install

# Install dependencies for remote application
cd ../remote
pnpm install
```

- Start Microfrontend Applications

```bash
# Start remote application
cd remote && pnpm run serve

# Start host application
cd host && pnpm run serve
```

- Open your browser and visit http://localhost:5000 to see the Vue host application consuming the React component from the remote application.

## Tech Stack

**Host Application (Vue):**

- Vue.js 3
- Vite
- Module Federation Plugin (@originjs/vite-plugin-federation)
- React & React-DOM (for rendering remote React components)

**Remote Application (React):**

- React 19
- React-DOM
- Vite
- Module Federation Plugin (@originjs/vite-plugin-federation)

**Development Tools:**

- pnpm (Package Manager)
- Vite (Build Tool)
- Module Federation (Runtime Code Sharing)

**Language Used:**

- JavaScript
- Vue Template Syntax
- JSX

## How It Works (Step by Step)

### 1. Module Federation Setup

Module Federation allows different applications (built with different frameworks) to share code and components at runtime. Think of it as a way for your Vue app to "borrow" components from your React app.

### 2. Remote Application (React) Configuration

The remote application **exposes** components that other applications can use:

```javascript
// remote/vite.config.js
federation({
  name: 'remote_app', // Name of this remote application
  filename: 'remoteEntry.js', // File that contains the exposed components
  exposes: {
    './Header': './src/components/Header.jsx', // Expose Header component
  },
  shared: ['react', 'react-dom'], // Share these libraries to avoid duplicates
});
```

### 3. Host Application (Vue) Configuration

The host application **consumes** components from the remote application:

```javascript
// host/vite.config.js
federation({
  name: 'host_app',
  remotes: {
    // Connect to the remote app's exposed components
    remote_app: 'http://localhost:5001/assets/remoteEntry.js',
  },
  shared: ['react', 'react-dom', 'vue'], // Share these libraries
});
```

### 4. Loading Remote Components in Vue

```vue
<!-- host/src/App.vue -->
<script setup>
import { onMounted, ref } from 'vue';

const headerRef = ref(null);

onMounted(async () => {
  try {
    // Import React and ReactDOM (needed to render React components)
    const React = await import('react');
    const ReactDOM = await import('react-dom/client');

    // Import the Header component from the remote app
    const { default: Header } = await import('remote_app/Header');

    // Create a React root and render the component
    const root = ReactDOM.createRoot(headerRef.value);
    root.render(React.createElement(Header));
  } catch (error) {
    console.error('Failed to load remote component:', error);
  }
});
</script>

<template>
  <div class="app-container">
    <h1>Micro Frontends with Vue and React</h1>
    <div ref="headerRef"></div>
    <!-- React component will be rendered here -->
  </div>
</template>
```

## Key Benefits

1. **Technology Independence**: Host and remote can use different frameworks
2. **Independent Development**: Teams can work separately on different parts
3. **Independent Deployment**: Each application can be deployed separately
4. **Code Sharing**: Components can be shared across different applications
5. **Runtime Integration**: Applications are integrated at runtime, not build time

## Developer

LinkedIn : [iamsomraj](https://www.linkedin.com/in/iamsomraj/) 😊

Portfolio: [Somraj Mukherjee](https://iamsomraj.github.io/) 😊

## Show Your Support

Give me a star ⭐

if this project helped you 👦 👧

## Contributing

Pull requests are welcome. 🤝 For major changes, please open an issue first to discuss what you would like to change. 🙏

Please make sure to update tests as appropriate. ✌

## License

[MIT](https://choosealicense.com/licenses/mit/) 📰
