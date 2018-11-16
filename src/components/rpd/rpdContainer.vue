<template>
	<div class="scroll-wrapper">
	<!-- <div>
	  {{$data }}
	</div>  -->
	  <iframe ref="myrame" :src="src" frameborder="0" align="left" width="100%" scrolling="auto">
        <p>你的浏览器不支持iframe标签</p>
    </iframe>

    <connection-status :isConnected="isConnected" />
  </div>
</template>

<script>
import ENV from '../../config/env';
	//发送消息到子iframe窗口中
  function sendMessage2Child(data) {
	  window.frames[0].postMessage(data, ENV.RPD_LOCATION); // 触发跨域子页面的messag事件
	}

export default {

      data() {
        return {
          src:ENV.RPD_LOCATION+"example/template/pc/rpd/rural_power_domain.html",
          availHeight:window.screen.availHeight,
          remFs: getComputedStyle(document.querySelector("html"))["font-size"].replace("px",""),
          isConnected: false,
          messages: {}
        }
      },
      computed:{
        height: function(){
           return 0.8*this.availHeight;
        }
      },
      sockets: {
        connect() {
          this.isConnected = true;
        },
        disconnect() {
          this.isConnected = false;
        }
        ,controlMessage(messages) {
          this.messages = messages;
        }
      },
      mounted: function(){
      	this.isConnected = this.$socket.connected;
    		let self = this;
    		setTimeout(function(){
          //初始设置iframe的window的font-size
          sendMessage2Child({"remFs":self.remFs});

    			window.addEventListener('message', function(messageEvent) {
    			    let data = messageEvent.data; 
    			    console.info('message from child:', data);
              self.messages = data;
    			    self.$socket.emit('controlMessage', {
      					messages: self.messages
      				});
              //VM34261:1 Uncaught DOMException: Blocked a frame with origin "http://127.0.0.1:8081" from accessing a cross-origin frame.
              //设置iframe的Window的html字体大小  
              // self.$refs.myrame.document.querySelector("html").style.height = self.remFs;
    			}, false);
    		},1000);
      },
      watch: {
	    	messages: function (newMsg, oldMsg) {
	    		sendMessage2Child(newMsg);
		    }
	    }

}

</script>

<style>
.scroll-wrapper { 
    -webkit-overflow-scrolling: touch; 
    overflow-y: scroll; 
} 

.scroll-wrapper iframe{
	height:58rem;
}

</style>