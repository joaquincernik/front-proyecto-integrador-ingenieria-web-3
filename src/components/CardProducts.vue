<script setup>
const props = defineProps({
    nombre: String,
    image: String,
    precio: Number,
    cantidad: Number,
    imagen: String
});

const formatoARS = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  minimumFractionDigits: 2
});

</script>
<template>
<v-card class="p-4 m-2" hover>
                    <v-img height="400px"
                        :src= "imagen"
                        cover></v-img>

                    <v-card-title style="font-weight: 600;">
                        {{nombre}}
                    </v-card-title>

                    <v-card-subtitle class="text-danger fw-bold" style="font-size: 1.2rem;" >
                        {{formatoARS.format(precio)}}
                    </v-card-subtitle>
                    <v-card-subtitle class="muted">
                        {{cantidad + " articulos disponibles"}}
                        <span v-if="!cantidad" class="ml-1 badge fw-bold bg-danger">Sin stock</span>
                    </v-card-subtitle>
                    


                      <v-card-actions>
                        <v-btn color="orange-lighten-2" text="Agregar a carrito"></v-btn>
                        
                        <v-btn icon="mdi-check"></v-btn>
                    </v-card-actions>

                 <!--    <v-expand-transition>
                        <div v-show="show">
                            <v-divider></v-divider>

                            <v-card-text>
                                I'm a thing. But, like most politicians, he promised more than he could deliver. You
                                won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then
                                we'll go with that data file! Hey, you add a one and two zeros to that or we walk!
                                You're going to do his laundry? I've got to find a way to escape.
                            </v-card-text>
                        </div>
                    </v-expand-transition>  -->
                </v-card>
</template>