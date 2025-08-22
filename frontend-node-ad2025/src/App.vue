<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';

const route = useRoute();
// const LayoutComponet = computed(() => route.meta.layout || null);
</script>

<template>
  <router-view />
</template>

<style lang="scss">
@use 'vuetify' as *;
@use './styles/main.scss';
</style>
