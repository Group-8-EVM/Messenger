<script setup lang="ts">
import {
  useAccount,
  useDisconnect,
  useReadContract,
  useWriteContract,
} from "@wagmi/vue";
import { abi } from "../../contract/artifacts/contracts/Messenger.sol/Messenger.json";

const contractAddress = "0xbf58bd459f42d7ee77aa11bec4ac5b66d61c9f6c";

const { address, chainId, status } = useAccount();
const { disconnect } = useDisconnect();
const { writeContract } = useWriteContract();

const { data: messages, refetch } = useReadContract({
  abi,
  address: contractAddress,
  functionName: "getMyMessages",
  account: address,
});

const message = ref<string>("");
const destAddress = ref<`0x${string}`>();
const sendMessage = (): void => {
  writeContract({
    abi,
    address: contractAddress,
    functionName: "sendMessage",
    args: [destAddress.value, message.value],
  });
};
</script>

<template>
  <div class="flex flex-col justify-between gap-5 h-full">
    <div class="p-5 flex flex-row gap-2 rounded-3xl bg-blue-500">
      <div
        class="h-10 rounded-full bg-blue-300 w-full flex justify-center items-center"
      >
        {{ address }}
      </div>
      <div
        class="rounded-full bg-blue-300 w-20 flex justify-center items-center cursor-pointer hover:bg-red-300"
        @click="disconnect()"
      >
        X
      </div>
    </div>

    <div
      class="p-5 flex flex-col gap-2 bg-blue-500 rounded-3xl h-full overflow-auto"
    >
      <div v-for="message in messages" class="min-h-10">
        <div
          class="flex flex-row"
          :class="message.dst === address ? 'justify-start' : 'justify-end'"
        >
          <div class="px-2 bg-blue-300 rounded-3xl">
            <div class="text-[10px] pt-2">
              {{ message.dst === address ? message.src : message.dst }}
            </div>
            <div class="p-2">
              {{ message.message }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="p-5 flex flex-col gap-2 bg-blue-500 rounded-3xl">
      <input
        v-model="message"
        placeholder="message"
        class="h-10 rounded-full bg-blue-300 w-full text-center rounded-3xl"
      />
      <div class="flex flex-row gap-2">
        <input
          v-model="destAddress"
          placeholder="0x0000000000000000000000000000000000000000"
          class="h-10 rounded-full bg-blue-300 w-full text-center"
        />
        <div
          class="rounded-full bg-blue-300 hover:bg-blue-400 cursor-pointer w-20 flex justify-center items-center"
          @click="sendMessage()"
        >
          ➤
        </div>
      </div>
    </div>
  </div>
</template>
