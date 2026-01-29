<script setup lang="ts">
import { onMounted } from 'vue'
import { useTransactionsStore } from './stores/transactions'
import AppLayout from './components/AppLayout.vue'

const store = useTransactionsStore() //store pinia de transactions

onMounted(() => { //Quando iniciar o APP, carregar da localStorage
  store.loadFromLocalStorage()
})
</script>

<template>
  <AppLayout>
    <router-view />
  </AppLayout>
</template>
