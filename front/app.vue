<script setup lang="ts">
import { useAccount } from "@wagmi/vue";
import Connected from "~/components/Connected.vue";
const { status } = useAccount();
</script>
<template>
  <div class="h-screen w-screen bg-blue-200 flex flex-row justify-center p-10">
    <div class="bg-blue-300 h-full w-[60vh] rounded-3xl p-10">
      <Connected v-if="status === 'connected'"></Connected>
      <Connect v-else></Connect>
    </div>
  </div>
</template>
