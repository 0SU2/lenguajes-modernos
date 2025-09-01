<template>
  <AuthLayout>
    <v-card width="700">
      <v-card-title class="text-h6">
        Crear Nueva Cuenta
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submit">
          <v-text-field
            v-model="user.nombre"
            required
            label="Nombre"
          />
          <v-text-field
            v-model="user.apaterno"
            required
            label="Apellido Paterno"
          />
          <v-text-field
            v-model="user.amaterno"
            required
            label="Apellido Materno"
          />
          <v-text-field
            v-model="user.direccion"
            required
            label="Direccion"
          />
          <v-text-field
            v-model="user.telefono"
            required
            label="Telefono"
          />
          <v-text-field
            v-model="user.ciudad"
            required
            label="Ciudad"
          />
          <v-text-field
            v-model="user.estado"
            required
            label="Estado"
          />
          <v-text-field
            v-model="user.email"
            required
            label="Email"
          />
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
          <v-btn color="secondary" block @click="submit">
            Registrarme
          </v-btn>
        </v-form>
      </v-card-text>
        <v-btn variant="text" block to="/">
          Ya tengo cuenta
        </v-btn>
    </v-card>
  </AuthLayout>
</template>

<script setup lang="ts">
import AuthLayout from '@/layouts/AuthLayout.vue';
import { defineComponent, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const { register } = useAuthStore();
const user = ref({ nombre: '', apaterno: '', amaterno: '', direccion: '', telefono: '', ciudad: '', estado: '', email: '', usuario: '', password: '' });
const submit = async() => {
  register({ nombre: user.value.nombre, apaterno: user.value.apaterno, amaterno: user.value.amaterno, direccion: user.value.direccion, telefono: user.value.telefono, ciudad: user.value.ciudad, estado: user.value.estado, email: user.value.email, usuario: user.value.usuario, password: user.value.password })
}


</script>
