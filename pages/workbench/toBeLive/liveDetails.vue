<template>
	<view class="live-details" v-if="liveDetails!=''">
		<view class="to-be-live">
			<view class="lived-cover">
					<image :src="liveDetails.cover" mode="aspectFill"></image>
				<view class="tag">
					<!-- 私有课 -->
					{{liveDetails.ifopen?'公开课':'私有课'}}
				</view>
			</view>
			<view class="lived-info">
				<view class="lived-title">
					{{liveDetails.name}}
				</view>
				<view class="lived-time">
					直播时间：{{liveDetails.started_at.slice(-8,-3)}}
				</view>
				<view class="lived-student">
					已预约：<text>{{liveDetails.reservation}}</text>人
				</view>
				<view class="lived-instatution" v-if="liveDetails!=''">
					所属机构：{{liveDetails.institution.edu_name}}
				</view>
			</view>
		</view>
		<view class="live-content">
			<view class="live-claim">
				<view class="claim-title">
					直播要求
				</view>
				<view class="claim-content">
					{{liveDetails.claim}}
				</view>
			</view>
			<view class="start-live">
				<view class="live-title">
					开始直播
				</view>
				<view class="live-content">
					<view class="live-box">
						<template v-if="!isLive">
							<view class="times" >
								剩余开课时间：
								<!-- 15:55 -->
								<countdown-timer :time="timeout" @finish='complate'>
								    <template v-slot="{day,hour,minute, second}">
								       <view>{{day}}天{{hour}}:{{minute}}:{{second}}</view>       
								    </template>
								</countdown-timer>
								</view>
							<view class="start-btn">待开播</view>
						</template>
						<template v-if="isLive">
							<view class="times">已到开播时间</view>
							<view class="immed-btn" @click="startLive">立即开播</view>
						</template>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import countdownTimer from '@/components/countdown-timer/countdown-timer.vue'
	export default {
		components:{
			countdownTimer
		},
		data() {
			return {
				isLive:false,
				lid:'',													//待录制id
				liveDetails:'',								//待录制详情
				aceToken:''										//获取access_token
			};
		},
		computed:{
			timeout(){
				return new Date(this.liveDetails.started_at).getTime() - new Date().getTime()
			}
		},
		onLoad(option) {
			this.lid = option.lid
			this.getDetails()
		},
		methods:{
			startLive(){
				this.$request.post('broadcast/index/start',{
					id:this.lid
				}).then(res=>{
					
					this.$queue.showToast(res.msg)
					uni.navigateTo({
						url:'/pages/workbench/toBeLive/living?roomId='+this.lid
					})
				})
			},
			// 倒计时
			complate () {
				console.log(this.timeout)
				this.isLive=true
			},
			// 详情
			getDetails(){
				this.$request.post('broadcast/index/details',{
					id:this.lid
				}).then(res=>{
					this.liveDetails = res.result
				})
			}
		}
	}
</script>

<style lang="scss">
	.live-details {
		width: 750rpx;
		height: 100vh;
		background: rgba(245, 245, 245, 1);
		overflow: hidden;
		.to-be-live {
			padding: 0rpx 0 36rpx 30rpx;
			box-sizing: border-box;
			background-color: #FFFFFF;
			display: flex;
			align-items: center;
			margin: 20rpx 0;

			.lived-cover {
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

			.lived-info {
				view~view {
					margin-top: 14rpx;
				}

				.lived-title {
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 600;
					color: rgba(51, 51, 51, 1);
					line-height: 44rpx;
				}

				.lived-time,
				.lived-student,
				.lived-instatution {
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					color: rgba(0, 0, 0, 0.5);
				}
			}
		}

		.live-content {
			padding: 30rpx;
			height: calc(100vh - 306rpx);
			box-sizing: border-box;
			background-color: #FFFFFF;

			.live-claim {
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
			.start-live{
				margin-top: 64rpx;
				.live-title {
					width: 128rpx;
					height: 44rpx;
					font-size: 32rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					line-height: 44rpx;
				}
				.live-content {
					margin-top: 20rpx;
					width: 690rpx;
					height:384rpx;
					background: #EEEEEE;
					border-radius: 20px;
					display: flex;
					align-items: center;
					justify-content: center;
					.live-box{
						display: flex;
						flex-direction: column;
						align-items: center;
						.times{
							font-size:32rpx;
							font-family:PingFangSC-Medium,PingFang SC;
							font-weight:600;
							color:rgba(49,49,49,1);
							line-height:44rpx;
							display: flex;
						}
						.start-btn{
							margin-top: 64rpx;
							width:540rpx;
							height:76rpx;
							background:rgba(0,0,0,0.25);
							border-radius:40rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							font-size:32rpx;
							font-family:PingFangSC-Medium,PingFang SC;
							font-weight:600;
							color:rgba(255,255,255,1);
						}
						.immed-btn{
							margin-top: 64rpx;
							width:540rpx;
							height:76rpx;
							background:rgba(0,183,244,1);
							border-radius:40rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							font-size:32rpx;
							font-family:PingFangSC-Medium,PingFang SC;
							font-weight:600;
							color:rgba(255,255,255,1);
						}
					}
				}
			}
		}
	}
</style>
