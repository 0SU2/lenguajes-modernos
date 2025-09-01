<script setup lang="ts">
import AuthLayout from '@/layouts/AuthLayout.vue';
import { useAuthStore } from '@/stores/auth';

const { logout } = useAuthStore()

</script>

<template>
  <v-app>
    <v-app-bar app density="comfortable">
      <v-toolbar-title> Dashboard </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer app>
      <v-list density="comfortable">
        <v-list-item title="Empleados" to="/empleados"></v-list-item>

        <v-spacer />
        <v-list-item class="mt-auto" @click="logout" title="Cerrar Sesion"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>