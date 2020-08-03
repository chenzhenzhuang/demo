<template>
	<view class="live-class-details">
		<view class="to-be-live-class">
			<view class="live-classed-cover">
				<image :src="liveDetails.cover" mode="aspectFill"></image>
				<view class="tag-prive" v-if="liveDetails.ifopen==0">
					私有课
				</view>
				<view class="tag-common" v-if="liveDetails.ifopen==1">
					公共课
				</view>
			</view>
			<view class="live-classed-info">
				<view class="live-classed-title">
					{{liveDetails.name}}
				</view>
				<view class="live-classed-time">
					直播时间：{{liveDetails.started_at|times}}
				</view>
				<view class="live-classed-student">
					已预约：{{liveDetails.reservation}}人
				</view>
				<view class="live-classed-student">
					上课人数：{{liveDetails.learn}}人
				</view>
				<view class="live-classed-instatution">
					所属机构：{{liveDetails.institution.edu_name}}
				</view>
			</view>
		</view>
		<view class="live-class-content">
			<view class="live-class-claim">
				<view class="claim-title">
					直播要求
				</view>
				<view class="claim-content">
					{{liveDetails.claim}}
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cid:'',																			//课程id
				liveDetails:''
			};
		},
		onLoad(option) {
			this.cid = option.id
			this.handleDetails()
		},
		methods:{
			// 详情
			handleDetails() {
				this.$request.post('broadcast/index/completed_details', {
					id: this.cid
				}).then(res => {
					console.log(res)
					this.liveDetails = res.result
				})
			},
		}
	}
</script>

<style lang="scss">
	.live-class-details {
		width: 750rpx;
		min-height: 100vh;
		background: rgba(245, 245, 245, 1);

		.to-be-live-class {
			padding: 20rpx 0 36rpx 30rpx;
			box-sizing: border-box;
			background-color: #FFFFFF;
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;

			.live-classed-cover {
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
					opacity:0.56;
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
					opacity:0.56;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size:24rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					color:rgba(255,255,255,1);
				}
			}

			.live-classed-info {
				view~view {
					margin-top: 14rpx;
				}

				.live-classed-title {
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 600;
					color: rgba(51, 51, 51, 1);
					line-height: 44rpx;
				}

				.live-classed-time,
				.live-classed-student,
				.live-classed-instatution {
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

		.live-class-content {
			padding: 30rpx;
			min-height: calc(100vh - 320rpx);
			box-sizing: border-box;
			background-color: #FFFFFF;

			.live-class-claim {
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
	}
</style>
