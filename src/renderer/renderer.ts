import * as Vue from 'vue'
import * as SocketIO from "socket.io-client"

declare module 'vue/types/vue' {
  interface Vue {
    inputData: string;
    polingData: string;
  }
}

const socket = SocketIO('http://localhost:3000');

let vue

socket.on('news', (data) => {
  vue = new Vue({
    el: '#app',
    mounted: function() {
      console.log(this.$data)
    },
    data: function() {
      return {
        inputData: 'gya-n',
        polingData: ''
      }
    },
    mixins: [{
      data: function() {
        return {
          inputData: 'aaa',
          nyanChu: 123
        }
      }
    }],
    template: `<div v-on:click="sendMessage">
      <button>fire</button>
      <input type="text" v-on:change="changeInputData" v-bind:value="inputData"/>
      {{polingData}}
    </div>`,
    methods: {
      sendMessage() {
        socket.emit('my other event', {
          my: this.inputData
        })
      },
      changeInputData(event) {
        Vue.set(this, 'inputData', event.target.value)
      }
    }
  })
})

socket.on('poling', (data) => {
  console.log(data)
  Vue.set(vue, 'polingData', data);
})