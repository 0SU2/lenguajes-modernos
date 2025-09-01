<script setup lang="ts">
import AuthLayout from '@/layouts/AuthLayout.vue';
// defineComponent es cuando no se usa setup
import { defineComponent, ref } from 'vue';
import { mapActions } from 'pinia';
import { useAuthStore } from '@/stores/auth';

const { login } = useAuthStore();
const user = ref({ usuario: '', password: '' });
const submit = () => {
  login({usuario: user.value.usuario, password: user.value.password});
}

</script>

<template>
  <AuthLayout>
    <v-card width="500">
      <v-card-title class="text-h6">
        Inicar Session
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="submit">
          <v-text-field
            v-model="user.usuario"
            required
            label="Usuario"
          />
          <v-text-field
            v-model="user.password"
            required
            label="Password"
            type="password"
          />
          <v-btn block @click="submit" color="secondary">
            Login
          </v-btn>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn variant="text" block to="/register">
          Registrarse
        </v-btn>
      </v-card-actions>
    </v-card>
  </AuthLayout>
</template>