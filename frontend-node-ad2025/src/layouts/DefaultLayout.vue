<template>
  <v-app>
    <v-app-bar app density="comfortable">
      <v-toolbar-title>
        Dashboard
      </v-toolbar-title>
    </v-app-bar>
  </v-app>

  <v-main>
    <v-container>
      <slot />
    </v-container>
  </v-main>
</template>