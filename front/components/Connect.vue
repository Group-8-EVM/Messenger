<script setup lang="ts">
import { useChainId, useConnect } from "@wagmi/vue";

const chainId = useChainId();
const { connect, connectors, error, status } = useConnect();
</script>

<template>
  <div class="flex flex-col justify-between text-center items-center h-full">
    <h1>Welcome</h1>
    <div class="flex flex-col gap-5 p-10 rounded-3xl bg-blue-400">
      <h2>Connect your wallet with:</h2>

      <div class="flex flex-row gap-5 h-full">
        <button
          class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          v-for="connector in connectors"
          :key="connector.id"
          type="button"
          @click="connect({ connector, chainId: 11155111 })"
        >
          {{ connector.name }}
        </button>
      </div>
    </div>
    <div>
      Status:
      {{ status }}
      {{ error?.message }}
    </div>
  </div>
</template>
