<template>
  <v-app>
   <v-app-bar elevation="0" color="#D21312" density="comfortable">
  <v-app-bar-nav-icon variant="text" />
  <v-toolbar-title class="text-uppercase font-weight-bold text-white">
    Mi Tienda
  </v-toolbar-title>

  <v-spacer />

  <v-toolbar-items class="align-center">
    <router-link to="/" custom v-slot="{ navigate, isActive }">
      <v-btn variant="text" class="text-white" :class="{ 'text--secondary': isActive }" @click="navigate">
        Inicio
      </v-btn>
    </router-link>

    <router-link v-if="!isAuthenticated()" to="/login" custom v-slot="{ navigate, isActive }">
      <v-btn variant="outlined" color="white" class="ms-2" :class="{ 'text--secondary': isActive }" @click="navigate">
        Login
      </v-btn>
    </router-link>
    <router-link v-if="isAuthenticated()" to="/login" custom v-slot="{ navigate, isActive }">
      <v-btn variant="outlined" color="white" class="ms-2" :class="{ 'text--secondary': isActive }" @click="logout">
        Cerrar sesion
      </v-btn>
    </router-link>
    <v-banner-text v-if="nombre">Hola {{ nombre }}</v-banner-text>
  </v-toolbar-items>
</v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
const isAuthenticated = () => localStorage.getItem('auth:user')

const nombre = localStorage.getItem('auth:user')
console.log('====================================');
console.log(nombre);
console.log('====================================');

const logout = ()=>{
  localStorage.removeItem('auth:user');
  window.location.reload()
}
</script>

<style>
* {
  font-family: "Quicksand", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}
</style>