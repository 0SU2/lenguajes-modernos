<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useEmpleadoStore } from '@/stores/empleados';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import EmpleadoForm from '@/components/EmpleadoForm.vue';

const {fetchEmpleados} = useEmpleadoStore();

const headers = [
  { text: 'Nombre', value: 'nombre' },
  { text: 'A. Paterno', value: 'apaterno' },
  { text: 'A. Materno', value: 'amaterno' },
  { text: 'Email', value: 'email' },
  { text: 'Usuario', value: 'usuario' },
  { text: 'Acciones', value: 'actions', sortable: false }
];

const showForm = ref(false);
const selected = ref({ nombre: '', apaterno: '', amaterno: '', direccion: '', telefono: '', ciudad: '', estado: '', email: '', usuario: '', password: '' });
const openDelete = ref(false);

onMounted(async () => {
  await fetchEmpleados();
  showForm.value ? showForm.value = false : showForm.value = showForm.value
})

const edit = (item:any):void => {
  selected.value = {...item}
  showForm.value = true
}

const remove = (item:any):void => {
  // selected.value = {...data};
  openDelete.value = false;
}

const openAddModal = ():void => {
  selected.value = { nombre: '', apaterno: '', amaterno: '', direccion: '', telefono: '', ciudad: '', estado: '', email: '', usuario: '', password: ''  }
  showForm.value = true;
}

const onSaved = async() => {
  showForm.value = false;
  await fetchEmpleados();
}

</script>

<template>
  <DefaultLayout>
    <h1>CRUD Empleados</h1>
    <v-card class="mt-2">
      <v-card-title>
        <v-spacer/>
        <v-btn color="primary" @click="openAddModal">
          Nuevo Empleado
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="useEmpleadoStore().$state.empleados"
          loading-text="Cargando empleados..."
        >
        <template #item.actions="{ item }">
          <v-btn color="green" icon @click="edit(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn color="red" icon @click="openDelete = true; selected = { ...item }">
            <v-icon>mdi-delete</v-icon>
          </v-btn>

        </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- Componente para mostrar el modal -->
    <EmpleadoForm v-model="showForm" :empleado="selected" @saved="onSaved"/>

    <!-- Dialogo para mostrar el anuncio para borrar usuario -->
    <v-dialog v-model="openDelete" max-width="600px" persistent>
      <v-card
        prepend-icon="mdi-alert"
        title="Confirmacion de borrar al usuario"
      >
      <v-card-text>
        Confirmas que quierer eliminar al usuario: {{ selected.usuario }}
      </v-card-text>
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="openDelete = false">
            Cancelar
          </v-btn>
          <v-btn @click="remove(selected)">
            Continuar
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </DefaultLayout>
</template>