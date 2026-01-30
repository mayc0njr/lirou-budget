<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen min-w-screen bg-gray-100 text-gray-800">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-6xl min-w-screen px-4 py-4 flex items-center justify-between">
        <h1 class="text-xl font-semibold">
          LirouFinance
        </h1>

        <nav class="flex gap-4">
          <router-link
            to="/dashboard"
            class="text-gray-600 hover:text-blue-600"
            active-class="text-blue-600 font-medium"
          >
            Dashboard
          </router-link>

          <router-link
            to="/monthly-summary"
            class="text-gray-600 hover:text-blue-600"
            active-class="text-blue-600 font-medium"
          >
            Resumo Mensal
          </router-link>
        </nav>
      </div>
    </header>

    <!-- Conteúdo -->
    <main class="max-w-6xl mx-auto px-4 py-6">
      <slot />
    </main>
  </div>
</template>
