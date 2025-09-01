<script setup lang="ts">
import { ref, watch } from 'vue';
import { useEmpleadoStore } from '@/stores/empleados';
// import { EmpleadoInterface } from '@/stores/empleados';

const props = defineProps({
  modelValue: Boolean,
  empleado: Object
})
const emit = defineEmits(['update:modelValue', 'saved']);

const {addEmpleado, updateEmpleado} = useEmpleadoStore();
const dialog = ref(false);
const user:any = ref({ nombre: '', apaterno: '', amaterno: '', direccion: '', telefono: '', ciudad: '', estado: '', email: '', usuario: '', password: '' });

watch(() => props.modelValue, (val) => {
  dialog.value = val;
  if(val && props.empleado) {
    user.value = { ...props.empleado };
  } else {
    user.value = {  nombre: '', apaterno: '', amaterno: '', direccion: '', telefono: '', ciudad: '', estado: '', email: '', usuario: '', password: ''  }
  }
})

const save = async() => {
  if(props.empleado?.id) {
    await updateEmpleado(props.empleado.id, { nombre: user.value.nombre, apaterno: user.value.apaterno, amaterno: user.value.amaterno, direccion: user.value.direccion, telefono: user.value.telefono, ciudad: user.value.ciudad, estado: user.value.estado, email: user.value.email, usuario: user.value.usuario, password: user.value.password });
  } else {
    await addEmpleado(user.value);
  }
  emit('update:modelValue', false);
  emit('saved');
}
</script>

<template>
  <v-dialog v-model="dialog" max-width="600px" persistent>
    <v-card >
      <v-card-title class="text-h6">
        {{ empleado?.id ? 'Editar Empleado' : 'Nuevo Empleado' }}
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="save">
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
          <v-btn color="secondary" block @click="save">
            Registrar
          </v-btn>
          <v-btn color="warning" block @click="dialog = false; emit('update:modelValue', false); ">
            Cancelar
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
</style>