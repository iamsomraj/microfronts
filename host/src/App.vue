<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';

const count = ref(0);
const status = ref('loading');
const target = ref(null);
let root;

const render = async () => {
  const React = await import('react');
  const { default: Header } = await import('remote_app/Header');
  root.render(React.createElement(Header, { count: count.value, onAdd: () => count.value++ }));
};

onMounted(async () => {
  try {
    const { createRoot } = await import('react-dom/client');
    root = createRoot(target.value);
    await render();
    status.value = 'ready';
  } catch (error) {
    console.error('Failed to load the remote:', error);
    status.value = 'error';
  }
});

watch(count, () => root && render());
onUnmounted(() => root?.unmount());
</script>

<template>
  <main>
    <small>Vue host</small>
    <h1>Microfrontends: Vue + React</h1>
    <p>The box below is a React component, loaded at runtime from another app.</p>
    <button @click="count++">Count in Vue: {{ count }}</button>

    <p v-if="status === 'loading'">Loading the React remote…</p>
    <p v-if="status === 'error'">The React remote is down. The Vue host still works.</p>
    <div ref="target"></div>
  </main>
</template>
