<template>
<div>
  <div class="col-md-4">
    <navigation-bar />
    <div class="container">
      <message-list :messages="messages" />
      <message-form/>
    </div>
  </div>
  <div class="col-md-2">
    <poll/>
  </div>
  <div class="col-md-6">
    <vote-chart :votes="votes"/>
  </div>
   <connection-status :isConnected="isConnected" />
</div>
</template>

<script>
import MessageList from './MessageList.vue';
import MessageForm from './MessageForm.vue';
import VoteChart from './VoteChart.vue';
import Poll from './Poll.vue';

export default {
  data() {
    return {
      isConnected: false,
      messages: [
        // {id : 1,
        // username: 'Paul',
        // message: 'Hey!',
        // },
        // {id : 2,
        // username: 'Evan',
        // message: 'How are you?',
        // },
      ],
      votes:[]
    };
  },
  components: {
    MessageList,
    MessageForm,
    VoteChart,
    Poll
  },
  sockets: {
    connect() {
      this.isConnected = true;
    },
    disconnect() {
      this.isConnected = false;
    },
    chatMessage(messages) {
      this.messages = messages;
    },
    pollMessage(votes){
      console.log(JSON.stringify(votes));
      this.votes = votes;
    }
  },
  mounted: function(){
    this.isConnected = this.$socket.connected;
  }
};

</script>

<style>
  .container {
    width: 300px;
    margin: 0 auto;
  }
</style>