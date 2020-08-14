<template>
	<view class="live-box">
		<view class="live-head">
			<view class="head-left">
				<view class="title">在线学生</view>
				<view class="count">25人</view>
			</view>
			<view class="head-right">
				展开<image src="/static/turnBottom.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="video">
			<!-- <view class="play-time">已播时间：15:15</view> -->
			<video id="previewVideo" autoplay muted ></video>
			<view class="stop">结束</view>
		</view>
		<view class="chat-box">
			<scroll-view scroll-y="true"  class="chart">
				<view class="common-item">
					<view class="left">
						<view class="head-img">
							<image src="/static/logo.png" mode="aspectFill"></image>
							<image src="/static/gril.png" mode="aspectFill" class='sex'></image>
						</view>
						<view class="name">
							小王
						</view>
					</view>
					<view class="right">老师我不会</view>
				</view>
			</scroll-view>
			<!-- <view class="send-box">
				<button type="default" @click="handleEnter">预览</button>
			</view> -->
		</view>
	</view>
</template>

<script>
	import {ZegoExpressEngine} from 'zego-express-engine-webrtc'
	export default {
		data() {
			return {
				question:'',																					//回答问题
				atoken: "",																					//token
				roomId:'',																						//房间id
				uId:'',																						//用户id
				uName:'',																						//用户名
			};
		},
		onLoad(option) {
			// this.roomId = option.roomId
			// this.getToken()
			this.getUserInfo()
			this.startLive()
			
		},
		onShow() {
		},
		methods:{
			// 先获取token
			getToken(){
				this.$request.post('broadcast/sdk/token',{uid:this.$queue.getData('uid')}).then(res=>{
					this.atoken = res.result
				})
			},
			getUserInfo(){
				this.$request.post('teacher/index/profile').then(res=>{
					this.uId = res.result.uid,
					this.uName = res.result.name
				})
				
			},
			startLive(){
			let	zg = new ZegoExpressEngine(4269792966, 'wss://webliveroom-test.zego.im/ws')
			this.$request.post('broadcast/sdk/token',{uid:this.$queue.getData('uid')}).then(res =>{
				this.aceToken=res.result
				this.$request.post('teacher/index/profile').then(res =>{
					zg.loginRoom('0911', this.aceToken,{
						userID:res.result.uid, 
						userName:res.result.name,
					}).then(res =>{
						if(res){
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
			})
			}
		}
	}
</script>

<style lang="scss">
.live-box{
	.live-head{
		height:50rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 46rpx 0 30rpx;
		box-sizing: border-box;
		.head-left{
			display: flex;
			align-items: center;
			.title{
				width:120rpx;
				height:42rpx;
				font-size:30rpx;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:600;
				color:rgba(51,51,51,1);
			}
			.count{
				font-size:24rpx;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:600;
				color:rgba(0,0,0,0.25);
			}
		}
		.head-right{
			width: 100rpx;
			font-size:24rpx;
			color:#00B7F4 ;
			image{
				width: 28rpx;
				height: 28rpx;
			}
		}
	}
	.video{
		width:750rpx;
		height:504rpx;
		box-shadow:0rpx 4rpx 14rpx 0rpx rgba(0,0,0,0.25);
		border-radius:8rpx;
		position: relative;
		video{
			height: 100%;
			width: 100%;
			border-radius: 8rpx;
		}
		.stop{
			position: absolute;
			bottom: 28rpx;
			right:30rpx;
			z-index: 1;
			width:147rpx;
			height:68rpx;
			background:rgba(255,37,37,0.91);
			box-shadow:0rpx 4rpx 8rpx 0rpx rgba(245,36,36,0.5);
			border-radius:38rpx;
			font-size:28rpx;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:600;
			color:rgba(255,255,255,0.85);
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.chat-box{
		.chart{
			height: calc(100vh - 504rpx);
			background:rgba(245,245,245,1);
			padding: 48rpx 42rpx;
			box-sizing: border-box;
			.common-item{
				display: flex;
				align-items: flex-start;
			}
			.left{
				width: 88rpx;
				
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: center;
				
				.head-img{
					position: relative;
					width:88rpx;
					height:88rpx;
					image{
						width:100%;
						height:100%;
						border-radius: 50%;
					}
					.sex{
						position: absolute;
						bottom: 0;
						right: 12rpx;
						width:28rpx;
						height:28rpx;
					}
				}
				.name{
					margin: 0 auto;
					margin-top: 10rpx;
					font-size:24rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					color:rgba(0,0,0,0.85);
					line-height:34rpx;
				}
			}
			.right{
				margin-left: 12rpx;
				// height:62rpx;
				background:rgba(203,242,255,1);
				font-size:28rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(0,0,0,0.85);
				
				padding: 12rpx 24rpx;
				box-sizing: border-box;
			}
		}
		.send-box{
			width: 100%;
			position: fixed;
			bottom: 0;
			left: 0;
			height: 124rpx;
			padding: 24rpx 20rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			input{
				padding: 18rpx 28rpx;
				box-sizing: border-box;
				width:562rpx;
				height:76rpx;
				background:rgba(240,240,240,1);
				border-radius:38rpx;
				font-size:28rpx;
			}
			.send-btn{
				width:124rpx;
				height:76rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				background:rgba(0,183,244,1);
				border-radius:38rpx;
				font-size:28rpx;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:600;
				color:rgba(255,255,255,1);
			}
		}
		
	}
}
</style>
