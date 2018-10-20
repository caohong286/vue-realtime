<template>
	<div class="poll" @submit.prevent="sendPollMessage">
    <h1>收入来源投票Demo</h1>
    <p>你喜欢的收入来源投票</p>
    <form id="vote-form" class="form-group">
        <p>
            <input type="radio" name="os" id="window" value="直接访问">
            <label for="window">直接访问</label>
        </p>
        <p>
            <input type="radio" name="os" id="macos" value="邮件营销">
            <label for="macos">邮件营销</label>
        </p>
        <p>
            <input type="radio" name="os" id="linux" value="联盟广告">
            <label for="linux">联盟广告</label>
        </p>
        <p>
            <input type="radio" name="os" id="other" value="视频广告">
            <label for="other">视频广告</label>
        </p>
        <p>
            <input type="radio" name="os" id="seo" value="搜索引擎">
            <label for="seo">搜索引擎</label>
        </p>
        <input type="submit" value="Vote" class="btn"/>
    </form>
    </div>
</template>


<script>
export default {
  data() {
    return {
      vote: {}
    };
  },
  methods: {
    sendPollMessage() {
    	const choice = document.querySelector('input[name=os]:checked').value;
    	this.vote = {name:choice,points:1};

		this.$socket.emit('pollMessage', {
			vote: this.vote
		});
    },
  },
};

</script>

<style scope>
input[type=radio] {
	width:30%;
}
</style>