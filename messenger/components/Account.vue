<script setup lang="ts">
import { useAccount, useDisconnect, useReadContract, useWriteContract } from '@wagmi/vue'
import { abi } from '../../contract/artifacts/contracts/Messenger.sol/Messenger.json'

const contractAddress = '0xbf58bd459f42d7ee77aa11bec4ac5b66d61c9f6c'

const { address, chainId, status } = useAccount()
const { disconnect } = useDisconnect()
const { writeContract } = useWriteContract();

const {data: messages} = useReadContract({
  abi,
  address: contractAddress,
  functionName: 'getMyMessages',
  account: address,
});

const message = ref<string>('')
const destAddress = ref<`0x${string}`>()
const sendMessage = (): void => {
  writeContract({
    abi,
    address: contractAddress,
    functionName: 'sendMessage',
    args: [destAddress.value, message.value],
  })
}

</script>

<template>
  <h2>Account</h2>

  <div>
    account: {{ address }}
    <br />
    chainId: {{ chainId }}
    <br />
    status: {{ status }}
  </div>

  <div v-if="status === 'connected'">
    <input v-model="message"/>
    <input v-model="destAddress"/>
    <button @click="sendMessage()">send</button>
    {{messages}}
  </div>

  <button v-if="status !== 'disconnected'" type="button" @click="disconnect()">
    Disconnect
  </button>
</template>
