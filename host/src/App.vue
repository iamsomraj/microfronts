<script setup>
import { onMounted, ref } from 'vue';

const headerRef = ref(null);

onMounted(async () => {
  try {
    const React = await import('react');
    const ReactDOM = await import('react-dom/client');
    const { default: Header } = await import('remote_app/Header');
    const root = ReactDOM.createRoot(headerRef.value);
    root.render(React.createElement(Header));
  } catch (error) {
    console.error('Failed to load remote component:', error);
    if (headerRef.value) {
      headerRef.value.innerHTML = '<div>Failed to load remote component</div>';
    }
  }
});
</script>

<template>
  <div class="app-container">
    <h1>Micro Frontends with Vue and React</h1>
    <div ref="headerRef"></div>
  </div>
</template>
