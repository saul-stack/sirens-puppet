<template>
  <div>
    <ul>
      <li v-for="(message, index) in messages" :key="index">
        {{ message.name }}: {{ message.message }}
      </li>
    </ul>
  </div>
</template>
<script>
import { ref, onMounted, onUnmounted } from 'vue';
import io from 'socket.io-client';
export default {
  setup() {
    const messages = ref([]);
    let socket;
    onMounted(() => {
      socket = io("http://127.0.0.1:5000"); // replace with your server URL
      socket.on("connect", (data) => {
        // replace "room_name" with the name of the room you want to join
        socket.emit("join_room", "DYBD");
        console.log(data)
      });
      socket.on("message", (message) => {
        console.log("Received 'message' event:", message);
        messages.value.push(message);
      });
    });
    onUnmounted(() => {
      if (socket) {
        socket.disconnect();
      }
    });
    return { messages };
  },
};
</script>