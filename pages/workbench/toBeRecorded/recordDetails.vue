<template>
	<view class="record-details" v-if="recordDetails.length!==0">
		<view class="to-be-record">
			<view class="recorded-cover">
				<image :src="recordDetails.cover?recordDetails.cover:recordDetails.onlineCourse.cover" mode="aspectFill"></image>
				<view class="tag">
					{{recordDetails.onlineCourse.ifopen?'公开课':'私有课'}}
				</view>
			</view>
			<view class="recorded-info">
				<view class="recorded-title">
					{{recordDetails.onlineCourse.name}}
				</view>
				<view class="recorded-time">
					录制章节：{{recordDetails.title}}
				</view>
				<view class="recorded-student">
					交稿时间：{{recordDetails.record_at.slice(-8,-3)}}前
				</view>
				<view class="recorded-instatution">
					所属机构：{{recordDetails.onlineCourse.institution.edu_name}}
				</view>
			</view>
		</view>
		<view class="record-content">
			<view class="record-claim">
				<view class="claim-title">
					录制要求
				</view>
				<view class="claim-content">
					{{recordDetails.claim}}
				</view>
			</view>
			<view class="upload-calim">
				<view class="claim-title">
					上传录制
				</view>
				<!-- 未上传视频 -->
				<view class="claim-content" v-if="videoSrc==''">
					<view class="claim-upload" @click="handleUpload">
						<view class="img">
							<image src="/static/video.png" mode="aspectFill"></image>
						</view>
						<view class="content">
							点击上传视频
						</view>
					</view>
				</view>
				<!-- 已上传视频 -->
				<view class="claim-content-upload" v-if="videoSrc!=''">
					<view class="upload-video">
						<video :src="videoSrc" @loadedmetadata="getTimes"></video>
					</view>
					<view class="delete-video" @click="deleteVideo">
						<image src="/static/delete.png" mode=""></image>
						删除视频,重新上传
					</view>
				</view>
			</view>
			<view class="submit-btn" @click="submitRecord">
				确认提交
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rid:'',													//待录制id
				recordDetails:'',								//待录制详情
				videoSrc:'',										//录制视频源
				videoTimes:'',									//视屏时长
				videoCover:'',									//视屏封面
			};
		},
		onLoad(option) {
			this.rid = option.lid
			this.getDetails()
		},
		methods:{
			// 获取视屏时长
			getTimes(e){
				this.videoTimes = e.detail.duration
			},
			// 提交视频
		submitRecord(){
				if(this.videoCover!=''&&this.videoSrc!=''){
					this.$request.post('catalog/index/upload',{
						id:this.rid,
						video_url:this.videoSrc,
						cover:this.videoCover,
						duration:this.videoTimes
					}).then(res=>{
						this.$queue.showToast(res.msg)
						setTimeout(()=>{
						uni.navigateBack()	
						
						},500)
					})
				}else{
					this.$queue.showToast('上传视频不能为空')
				}
				
			},
			// 删除视频
			deleteVideo(){
				uni.showModal({
					title: '提示',
					content: '确定要删除视频吗',
					success: res=>{
						if (res.confirm) {
								this.videoSrc=''
						} else if (res.cancel) {
								this.$queue.showToast('已取消')
						}
					}
				});
			},
			// 上传视频
			handleUpload(){
				 uni.chooseVideo({
						count: 1,
						sourceType: ['camera', 'album'],
						success: res=> {
							this.src = res.tempFilePath
							this.$request.videoUpload(this.src).then(res=>{
								this.videoSrc = res.result.video_url
								this.videoCover = res.result.cover
							})
						}
				});
			},
			// 详情
			getDetails(){
				this.$request.post('catalog/index/details',{
					id:this.rid
				}).then(res=>{
					console.log(res)
					this.recordDetails = res.result
				})
			}
		}
	}
</script>

<style lang="scss">
	.record-details {
		width: 750rpx;
		min-height: 100vh;
		background: rgba(245, 245, 245, 1);

		.to-be-record {
			padding: 22rpx 0 36rpx 30rpx;
			box-sizing: border-box;
			background-color: #FFFFFF;
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;

			.recorded-cover {
				position: relative;
				width: 244rpx;
				height: 244rpx;
				margin-right: 18rpx;

				image {
					width: 100%;
					height: 100%;
				}

				.tag {
					position: absolute;
					top: 0;
					left: 0;
					width: 97rpx;
					height: 50rpx;
					background: rgba(219, 0, 0, 1);
					border-radius: 8rpx;
					opacity: 0.56;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					color: rgba(255, 255, 255, 1);
				}
			}

			.recorded-info {
				view~view {
					margin-top: 14rpx;
				}

				.recorded-title {
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 600;
					color: rgba(51, 51, 51, 1);
					line-height: 44rpx;
				}

				.recorded-time,
				.recorded-student,
				.recorded-instatution {
					width: 442rpx;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					color: rgba(0, 0, 0, 0.5);
				}
			}
		}

		.record-content {
			padding: 30rpx;
			box-sizing: border-box;
			background-color: #FFFFFF;

			.record-claim {
				margin-top: 30rpx;

				.claim-title {
					width: 128rpx;
					height: 44rpx;
					font-size: 32rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					line-height: 44rpx;
				}

				.claim-content {
					margin-top: 20rpx;
					width: 692rpx;
					padding: 20rpx 44rpx 32rpx 24rpx;
					box-sizing: border-box;
					background: #EEEEEE;
					border-radius: 12px;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					color: rgba(0, 0, 0, 0.25);
					line-height: 34rpx;
				}
			}
		}

		.upload-calim {
			margin-top: 60rpx;
			padding: 0 24rpx;
			box-sizing: border-box;
			width: 690rpx;
			height: 580rpx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0rpx 8rpx 28rpx 0rpx rgba(0, 0, 0, 0.1);
			border-radius: 16rpx;

			.claim-title {
				width: 128rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				color: rgba(51, 51, 51, 1);
				line-height: 78rpx;
			}

			.claim-content {
				width: 636rpx;
				height: 352rpx;
				background: #EEEEEE;
				border-radius: 12rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				.claim-upload {
					display: flex;
					flex-direction: column;
					align-items: center;

					.img {
						width: 120rpx;
						height: 78rpx;
						margin-bottom: 10rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.content {
						width: 144rpx;
						height: 34rpx;
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
						line-height: 34rpx;

					}
				}
			}

			.claim-content-upload {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 636rpx;

				.upload-video {
					width: 636rpx;
					height: 352rpx;
					border-radius: 16rpx;
					overflow: hidden;
					background: rgba(0, 0, 0, 0.3);

					video {
						width: 100%;
						height: 100%;
					}
				}

				.delete-video {
					margin-top: 40rpx;
					width: 304rpx;
					height: 66rpx;
					background: rgba(255, 255, 255, 1);
					border-radius: 33rpx;
					border: 1rpx solid rgba(226, 67, 75, 1);
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 24rpx;
					color: #E2434B;

					image {
						margin-right: 16rpx;
						width: 22rpx;
						height: 22rpx;
					}
				}
			}
			
		}
		.submit-btn {
				margin: 0 auto;
				width: 540rpx;
				height: 76rpx;
				background: rgba(0, 183, 244, 1);
				border-radius: 40rpx;
				font-size: 32rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #FFFFFF;
				margin-top: 44rpx;
			}
	}
</style>
