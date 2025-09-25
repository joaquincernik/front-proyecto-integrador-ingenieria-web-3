<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
let i = 0;
const products = ([
    {
        id: i++,
        imagen: "https://tiendariver.vtexassets.com/arquivos/ids/171862/IX5097_F.png?v=638761870320500000",
        nombre: "camiseta river titular",
        precio: 100000,
        cantidad: 15,

    },
    {
        id: i++,
        nombre: "camiseta river suplente",
        precio: 100000,
        cantidad: 0,
        imagen: "https://tiendariver.vtexassets.com/arquivos/ids/172384/JI9402_FR_Torso_eCom.png?v=638761883623730000",

    },
    {
        id: i++,
        nombre: "camiseta barcelona 2009",
        precio: 200000,
        cantidad: 1,
        imagen: "https://acdn-us.mitiendanube.com/stores/001/983/293/products/diseno-sin-titulo-2024-12-10t103809-272-38e93ee8eed0c7da8e17338379642094-640-0.png",

    },
    {
        id: i++,
        nombre: "camiseta argentina suplente",
        precio: 150000,
        cantidad: 5,
        imagen: "https://acdn-us.mitiendanube.com/stores/001/312/744/products/ttgtftftfrdrdrdrdrdrdrdrdrdrdrdrdrdrd1-ff193c346b90a116d116752025271684-640-0.png",

    },
])
const formatoARS = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2
});
const route = useRoute();
const product = computed(()=> products.find(p=>p.id === Number(route.params.id)))
console.log('====================================');
console.log(product.value);
console.log('====================================');
</script>

<template>
  <v-container class="py-12">
    <template v-if="product">
      <v-row class="g-8" align="stretch">
        <v-col cols="12" md="6">
          <v-card elevation="3" class="h-100">
            <v-img :src="product.imagen" height="800" cover />
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card elevation="3" class="pa-8 h-100 d-flex flex-column">
            <div class="d-flex align-center mb-4">
              <v-chip color="red-darken-1" class="text-uppercase font-weight-bold">
                Nuevo
              </v-chip>
              <v-chip
                v-if="!product.cantidad"
                color="error"
                class="ms-3 text-uppercase font-weight-bold"
              >
                Sin stock
              </v-chip>
            </div>

            <h1 class="text-h4 font-weight-bold mb-3">{{ product.nombre }}</h1>

            <p class="text-body-1 text-medium-emphasis mb-6">
              Equipamiento oficial premium. Incluye detalles de colección, tejido respirable
              y terminaciones de alta performance. Ideal para fanáticos y coleccionistas.
            </p>

            <div class="mb-6">
              <span class="text-h3 text-red-darken-1 font-weight-bold">
                {{ formatoARS.format(product.precio) }}
              </span>
            </div>

            <div class="mb-6">
              <p class="mt-2 text-medium-emphasis">
                {{ product.cantidad }} artículos disponibles
              </p>
            </div>

          </v-card>
        </v-col>
      </v-row>
    </template>

    <v-alert
      v-else
      type="warning"
      variant="tonal"
      border="start"
      class="mx-auto my-12"
      max-width="540"
    >
      <div class="d-flex justify-space-between align-center">
        <div>
          <p class="text-h6 mb-1">Producto no encontrado</p>
          <p class="text-body-2 text-medium-emphasis">
            Verifica el enlace o selecciona otro artículo desde el listado.
          </p>
        </div>
        <v-btn variant="outlined" @click="goBack">Volver</v-btn>
      </div>
    </v-alert>
  </v-container>
</template>