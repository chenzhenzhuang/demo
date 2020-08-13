<template>
	<!-- demo测试 -->
	<view class="content">
		<video id="previewVideo" autoplay muted ></video>
		<button type="default" @click="handleEnter">enter</button>
		<button type="primary" @click="stopPushStream">停止推流</button>
	</view>
</template>

<script>
	import {
		ZegoExpressEngine
	} from 'zego-express-engine-webrtc'
	export default {
		data() {
			return {
				uId: '',
				uName: '', //用户名
				streamList: '',
				preivewStream: '',
				streamId:'',															//流id
			};
		},
		onLoad() {
			this.getUserInfo()
		},
		methods: {
			getUserInfo() {
				this.$request.post('teacher/index/profile').then(res => {
					this.uId = res.result.uid,
					this.uName = res.result.name
				})

			},
			stopPushStream(){
				let zg = new ZegoExpressEngine(4269792966, 'wss://webliveroom-test.zego.im/ws')
				zg.stopPublishingStream(this.streamId)
			},
			handleEnter() {
				let zg = new ZegoExpressEngine(4269792966, 'wss://webliveroom-test.zego.im/ws')
				this.$request.post('broadcast/sdk/token', {
					uid: this.$queue.getData('uid')
				}).then(res => {
					const atoken = res.result
					zg.loginRoom('909922', atoken, {
						userID: this.uId,
						userName: this.uName
					}).then(res => {
						if (res) {
							zg.createStream().then(res => {
								let previewStream = res
								this.streamId = res.id
								if(zg.startPublishingStream(this.streamId,previewStream)){
									let videoPlay =  document.querySelector('video');
									videoPlay.srcObject = previewStream;
								}
							}).catch(err => {
								console.log(err)
							})
						}
					})
				})
			},
		}
	}
</script>

<style lang="scss">
	.content {
		video {
			width: 750rpx;
			height: 450px;
		}
	}
</style>
