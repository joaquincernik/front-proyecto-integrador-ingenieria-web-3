<script setup>
import { ref } from 'vue'

const form = ref(null)
const isValid = ref(false)
const loading = ref(false)
const showPassword = ref(false)
const error = ref('')

const credentials = ref({
    username: '',
    password: '',
})

const rules = {
    required: value => !!value || 'Este campo es obligatorio',
}

const nombre = ref()
const handleSubmit = async () => {
    const { valid } = await form.value.validate()
    if (!valid) return

    loading.value = true;
    error.value = '';

    try {
        // Lógica de autenticación:
        // const response = await api.login(credentials.value)
        // guarda tokens, redirige, etc.
        console.log('Enviar credenciales', credentials.value);
        nombre.value = credentials.value.username

    } catch (err) {
        error.value = 'Usuario o contraseña incorrectos';
    } finally {
        loading.value = false;
    }
}
</script>
<template>
    <v-container class="py-16">
        <v-row justify="center">
            <v-col cols="12" sm="8" md="5">
                <v-card class="pa-8" elevation="3">
                    <v-card-title class="text-h5 font-weight-bold">Iniciar sesión</v-card-title>

                    <v-form ref="form" v-model="isValid" @submit.prevent="handleSubmit">
                        <v-text-field v-model="credentials.username" label="Usuario" prepend-inner-icon="mdi-account"
                            :rules="[rules.required]" autocomplete="username" />

                        <v-text-field v-model="credentials.password" :type="showPassword ? 'text' : 'password'"
                            label="Contraseña" prepend-inner-icon="mdi-lock"
                            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                            @click:append-inner="showPassword = !showPassword" :rules="[rules.required]"
                            autocomplete="current-password" />

                        <v-btn type="submit" color="danger" class="mt-4" :loading="loading"
                            :disabled="!isValid || loading" block>
                            Entrar
                        </v-btn>
                    </v-form>

                    <v-alert v-if="error" type="error" class="mt-4" border="start" density="comfortable">
                        {{ error }}
                    </v-alert>

                    <v-banner-text v-if="nombre">Hola {{ nombre }} !</v-banner-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>