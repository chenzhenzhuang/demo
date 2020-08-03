<template>
	<view class="online-class-details" v-if="courseDetails!=''">
		<view class="to-be-online-class">
			<view class="online-classed-cover">
				<image :src="courseDetails.cover" mode="aspectFill"></image>
				<view class="tag-prive" v-if="courseDetails.onlineCourse.ifopen==0">
					私有课
				</view>
				<view class="tag-common" v-if="courseDetails.onlineCourse.ifopen==1">
					公共课
				</view>
			</view>
			<view class="online-classed-info">
				<view class="online-classed-title">
					{{courseDetails.onlineCourse.name}}
				</view>
				<view class="online-classed-time">
					录制章节：{{courseDetails.title}}
				</view>
				<view class="online-classed-student">
					上线时间：{{courseDetails.delivery_at}}
				</view>
				<view class="online-classed-instatution">
					所属机构：{{courseDetails.onlineCourse.institution.edu_name}}
				</view>
			</view>
		</view>
		<view class="online-class-content">
			<view class="online-class-claim">
				<view class="claim-title">
					录制要求
				</view>
				<view class="claim-content">
					{{courseDetails.claim}}
				</view>
			</view>
			<view class="upload-calim">
				<view class="claim-title">
					录制视频
				</view>
				<view class="claim-content-upload">
					<view class="upload-video">
						<video src=""></video>
					</view>
				</view>
			</view>
			<view class="reject" v-if="courseDetails.status==3">
				<view class="reject-title">
					拒绝原因
				</view>
				<view class="reject-content">
					{{courseDetails.content}}
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cid:'',																					//课程id
				courseDetails:'',																//课程详情
			};
		},
		onLoad(option) {
			this.cid = option.id
			this.handleDetails()
		},
		methods:{
			// 详情
			handleDetails() {
				this.$request.post('catalog/index/completed_details', {
					id: this.cid
				}).then(res => {
					console.log(res)
					this.courseDetails = res.result
				})
			},
		}
	}
</script>

<style lang="scss">
	.online-class-details {
		width: 750rpx;
		min-height: 100vh;
		background: rgba(245, 245, 245, 1);

		.to-be-online-class {
			padding: 20rpx 0 36rpx 30rpx;
			box-sizing: border-box;
			background-color: #FFFFFF;
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;

			.online-classed-cover {
				position: relative;
				width: 244rpx;
				height: 244rpx;
				margin-right: 18rpx;

				image {
					width: 100%;
					height: 100%;
				}

				.tag-prive{
					position: absolute;
					top: 0;
					left: 0;
					width:97rpx;
					height:50rpx;
					background:rgba(219,0,0,1);
					border-radius:8rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size:24rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					color:rgba(255,255,255,1);
				}
				.tag-common{
					position: absolute;
					top: 0;
					left: 0;
					width:97rpx;
					height:50rpx;
					background:rgba(0,183,244,1);
					border-radius:8rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size:24rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					color:rgba(255,255,255,1);
				}
			}

			.online-classed-info {
				view~view {
					margin-top: 14rpx;
				}

				.online-classed-title {
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 600;
					color: rgba(51, 51, 51, 1);
					line-height: 44rpx;
				}

				.online-classed-time,
				.online-classed-student,
				.online-classed-instatution {
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

		.online-class-content {
			padding: 30rpx;
			min-height: calc(100vh - 320rpx);
			box-sizing: border-box;
			background-color: #FFFFFF;

			.online-class-claim {
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
			margin-top: 30rpx;
			width: 690rpx;
			// height: 580rpx;
			.claim-title {
					width: 128rpx;
					font-size: 32rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					color: rgba(51, 51, 51, 1);
					line-height: 78rpx;
				}

			.claim-content-upload {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 636rpx;

				.upload-video {
					margin: 0 auto;
					width: 690rpx;
					height: 412rpx;
					border-radius: 16rpx;
					overflow: hidden;
					background: rgba(0, 0, 0, 0.3);

					video {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		.reject{
			margin-top: 30rpx;
			.reject-title {
				width: 128rpx;
				height: 44rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
				line-height: 44rpx;
			}
			
			.reject-content {
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
</style>
