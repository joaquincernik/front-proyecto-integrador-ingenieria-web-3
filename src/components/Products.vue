<script setup>
import { ref, computed } from 'vue'

let i = 0
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

const query = ref('')
const normalized = (s) => String(s || '').toLowerCase().trim()
const filteredProducts = computed(() => {
    const q = normalized(query.value)
    if (!q) return products
    return products.filter((p) => normalized(p.nombre).includes(q))
});

const totalAcumulado = computed(()=>{
    let val = 0;
    cart.value.forEach(i =>{
        val = val + i.precio;
    })
    return val;
});

const cart = ref([]);
const addToCart = (product) => { 
    cart.value.push(product) 
};
const removeFromCart = (product) => { 
    cart.value.pop(product) 
};

const formatoARS = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  minimumFractionDigits: 2
});

</script>
<template>
    <div class="container">
        <div class="mt-5">
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
                rel="stylesheet">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <div class="search-container">
                            <input v-model="query" type="text" class="form-control search-input"
                                placeholder="Busca articulos por su nombre" />
                            <i class="fas fa-search search-icon"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex mt-5">

            <div v-for="articulo in filteredProducts" :key="articulo.id" class="col-3">
                <CardProducts :id="articulo.id" :imagen="articulo.imagen" :nombre="articulo.nombre" :precio="articulo.precio"
                    :cantidad="articulo.cantidad" @add="addToCart(articulo)" />
            </div>
        </div>

        <div v-if="filteredProducts.length === 0" class="text-center text-muted py-4 text-amber">
            No se encontraron artículos para "{{ query }}".
        </div>
    </div>

    <!--carrito-->
    <div class="container" >
        <h1 class="m-4">Carrito <span class="text-secondary" style="font-size: 1rem;">total acumulado: {{ formatoARS.format(totalAcumulado) }}</span></h1>
        <div class="d-flex row mt-5">

            <div v-for="articulo in cart" :key="articulo.id" class="col-3">
                <CardProducts :id="articulo.id" :imagen="articulo.imagen" :nombre="articulo.nombre" :precio="articulo.precio"
                    :cantidad="articulo.cantidad" @add="addToCart(articulo)" @remove="removeFromCart(articulo)" variants = "outlined" carrito="true"  />
            </div>
        </div>

        <div v-if="cart.length === 0" class="text-center text-muted py-4 text-amber">
            No agregaste nada al carrito todavia.
        </div>
    </div>


</template>

<style>
.search-container {
    position: relative;
}

.search-input {
    height: 50px;
    border-radius: 30px;
    padding-left: 35px;
    border: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.search-icon {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    color: #888;
}
</style>
