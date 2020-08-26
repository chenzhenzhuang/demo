<template>
	<view class="send-dynamic">
		<!-- 未上传 -->
		<template v-if="!videoSrc">
			<view class="send-area" @tap="handleUpload" >
				<view class="send-img">
					<view class="img">
						<image src="/static/video.png" mode=""></image>
					</view>
					<view class="title">
						点击上传视频
					</view>
				</view>
			</view>
		</template>
		
		<!-- 已上传 -->
		<template v-else>
			<view class="show-area">
				<view class="img">
					<video :src="videoSrc" controls></video>
				</view>
				<view class="delete" @click="deleteVideo">
				<image src="/static/delete.png"></image>
					<view class="title">
						删除视频,重新上传
					</view>
				</view>
			</view>
		</template>
		
		<view class="dynamic-descri">
			<view class="title">动态描述</view>
			<view class="area">
				<textarea v-model="description" placeholder="请输入动态描述内容…" maxlength="30"/>
				<view class="count">{{description.length}}/30</view>
			</view>
		</view>
		<view class="send-btn" @tap="handleSend">
			确认发布
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				description:'',																	//描述
				videoSrc:'',																		//视频临时路径
				uploadVideo:'',																	//真实地址
				cover:''																				//封面图
			};
		},
		methods:{
			// 发布视频
			handleSend(){
				this.$request.post('dynamic/dynamic/increase',{
					cover:this.cover,
					video_url:this.uploadVideo,
					content:this.description
				}).then(res=>{
					this.$queue.showToast(res.msg)
					if(res.code==200){
						setTimeout(()=>{
							uni.navigateBack()
						},500)
					}
				})
			},
			// 删除视频
			deleteVideo(){
				uni.showModal({
					cancelColor:'#333333',
					confirmColor:'#333333',
					content:'放弃上传这个视频吗？',
					success: (res) => {
						if(res.confirm) {
							this.videoSrc = ''
						} else if (res.cancel) {
							this.$queue.showToast('已取消')
						}
					}
				})
			},
			// 上传视频
			handleUpload(){
				uni.chooseVideo({
					sourceType: ['拍摄', '相册', '拍摄或相册'],
					success: (res) => {
						console.log(res)
						this.videoSrc = res.tempFilePath
						this.$request.videoUpload(this.videoSrc).then(res=>{
							this.uploadVideo = res.result.video_url
							this.cover = res.result.cover
						})
					},
					fail: (err) => {
					console.log(err)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.send-dynamic{
	width: 750rpx;
	padding:30rpx;
	box-sizing: border-box;
	.send-area{
		width:690rpx;
		height:412rpx;
		background:rgba(238,238,238,1);
		border-radius:12rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		.send-img{
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: center;
			.img{
				width:120rpx;
				height:120rpx;
				padding: 20rpx 0;
				box-sizing: border-box;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.title{
				font-size:24rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(51,51,51,1);
			}
		}
	}
	.show-area{
		width:692rpx;
		height:546rpx;
		background:rgba(255,255,255,1);
		box-shadow:0rpx 8rpx 24rpx 0rpx rgba(0,0,0,0.1);
		border-radius:10rpx;
		padding: 32rpx 30rpx 36rpx 30rpx;
		box-sizing: border-box;
		border-radius: 14rpx;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		
		.img{
			width: 638rpx;
			height: 384rpx;
			video{
				width: 100%;
				height: 100%;
				
			}
		}
		.delete{
			margin-top: 28rpx;
			border:1rpx solid rgba(226,67,75,1);
			width:304rpx;
			height: 66rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius:33rpx;
				image{
					width: 24rpx;
					height: 24rpx;
				}
			.title{
				height:34rpx;
				font-size:24rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(226,67,75,1);
				line-height:34rpx;
			}
		}
	}
	.dynamic-descri{
		margin-top: 40rpx;
		.title{
			width:128rpx;
			height:44rpx;
			font-size:32rpx;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:600;
			color:rgba(0,0,0,0.85);
			line-height:44rpx;
			margin-bottom: 20rpx;
		}
		.area{
			width:690rpx;
			height:316rpx;
			border:2px solid rgba(238,238,238,1);
			position: relative;
			padding: 20rpx 30rpx;
			box-sizing: border-box;
			textarea{
				width: 100%;
				height: 100%;
				font-size:24rpx;
				font-family:PingFangSC-Regular,PingFang SC;
			}
			.count{
				position: absolute;
				right: 16rpx;
				bottom: 20rpx;
				font-size:24rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(153,153,153,1);
				line-height:34rpx;
			}
		}
	}
	.send-btn{
		// margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		width:540rpx;
		height:76rpx;
		background:rgba(0,183,244,1);
		border-radius:40rpx;
		font-size:32rpx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:600;
		color:rgba(255,255,255,0.85);
		line-height:44rpx;
		position: fixed;
		bottom: 60rpx;
		left: 50%;
		transform: translateX(-50%);
	}
}
</style>
