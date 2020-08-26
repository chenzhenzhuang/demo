<template>
	<view class="Already-live-box">
		<block v-for="item in alreadyLiveList" :key="item.id">
			<view class="to-be-Already-live" @click="goDetails(item.id)">
				<view class="Already-liveed-cover">
					<image :src="item.cover" mode="aspectFill"></image>
					<view class="tag-prive" v-if="item.ifopen==0">
						私有课
					</view>
					<view class="tag-common" v-if="item.ifopen==1">
						公开课
					</view>
				</view>
				<view class="Already-liveed-info">
					<view class="Already-liveed-title">
						{{item.name}}
					</view>
					<view class="Already-liveed-student">
						直播时间：{{item.started_at.slice(0,-3)|times}}
					</view>
					<view class="Already-liveed-time">
						直播时长：{{new Date(item.ended_at).getTime() - new Date(item.start).getTime()|liveTimes}}
					</view>
					<view class="watch">
						观看学生：{{item.learn}}人
					</view>
					<view class="Already-liveed-instatution">
						所属机构：{{item.institution.edu_name}}
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				alreadyLiveList: [],													//待录制列表
				pages:1,																			//页码
				pageSize:'',																	//页数
				count:''																			//总量
			};
		},
		mounted() {
			this.handlealreadyLive()
		},
		methods: {
			// 滚动加载
			scrollBottom(){
				if(this.pages*this.pageSize<this.count){
					this.handlealreadyLive()
				}else{
					this.$queue.showToast('没有更多了')
				}
			},
			// 已上线下课列表
			handlealreadyLive(){
				this.$queue.showLoading('加载中...')
				this.$request.post('broadcast/index/completed_list',{
					pages:this.pages,
				}).then(res=>{
					console.log(res)
					uni.hideLoading();
					this.count = res.result.count
					this.pageSize=res.result.PageSize
					this.alreadyLiveList = this.alreadyLiveList.concat(res.result.list) 
					this.pages++
				})
			},
			// 详情
			goDetails(id) {
				uni.navigateTo({
					url: '/pages/coursesTaken/alreadyLive/liveDetails?id='+id
				})
			}
		}
	}
</script>

<style lang="scss">
	.Already-live-box {
		margin-top: 52rpx;
		.to-be-Already-live {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 50rpx;

			.Already-liveed-cover {
				position: relative;
				width: 244rpx;
				height: 244rpx;

				image {
					width: 100%;
					height: 100%;
				}

				.tag-prive {
					position: absolute;
					top: 0;
					left: 0;
					width: 97rpx;
					height: 50rpx;
					background: rgba(219, 0, 0, 1);
					border-radius: 8rpx;
					// opacity: 0.56;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					color: rgba(255, 255, 255, 1);
				}

				.tag-common {
					position: absolute;
					top: 0;
					left: 0;
					width: 97rpx;
					height: 50rpx;
					background: rgba(0, 183, 244, 1);
					border-radius: 8rpx;
					// opacity: 0.56;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					color: rgba(255, 255, 255, 1);
				}
			}

			.Already-liveed-info {
				view~view {
					margin-top: 14rpx;
				}

				.Already-liveed-title {
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 600;
					color: rgba(51, 51, 51, 1);
					line-height: 44rpx;
				}

				.Already-liveed-time,
				.Already-liveed-student,
				.watch,
				.Already-liveed-instatution {
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
	}
</style>
