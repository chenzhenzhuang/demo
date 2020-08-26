<template>
	<view class="audit" v-if="dynamicContent!=''">
		<view class="audit-item">
			<view class="img">
				<video :src="dynamicContent.video_url" :poster="dynamicContent.cover" :show-center-play-btn="false" controls></video>
			</view>
			<view class="describe">
				{{dynamicContent.content}}
			</view>
			<view class="send-time">
				创建时间：{{dynamicContent.created_at}}
			</view>
			<view class="reject-time">
				拒绝时间：{{dynamicContent.rejected_at}}
			</view>
		</view>
		<view class="reject-reason">
			<view class="title">拒绝原因</view>
			<view class="content">
				{{dynamicContent.review_content}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dynamicContent:'',													//动态内容
				id:'',																			//动态id
			};
		},
		onLoad(option) {
			this.id = option.id
			this.getDetails()
		},
		methods:{
			// 获取详情
			getDetails(){
				this.$request.post('dynamic/dynamic/details',{
					id:this.id
				}).then(res=>{
					console.log(res)
					this.dynamicContent = res.result
				})
			}
		}
	}
</script>

<style lang="scss">
	.audit {
		.audit-item {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;

			.img {
				width: 750rpx;
				height: 400rpx;

				video {
					width: 100%;
					height: 100%;
				}
			}

			.describe {
				margin: 72rpx 0 32rpx 0;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
				line-height: 40rpx;
				padding: 0 38rpx;
				box-sizing: border-box;
			}

			.send-time {
				padding: 0 38rpx;
				box-sizing: border-box;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
				line-height: 34rpx;
				margin-bottom: 12rpx;
			}
			.reject-time{
				padding: 0 38rpx;
				box-sizing: border-box;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
				line-height: 34rpx;
			}
		}
		.reject-reason{
			padding: 0 38rpx;
			box-sizing: border-box;
			.title{
				line-height: 132rpx;
				font-size:32rpx;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:600;
				color:rgba(0,0,0,0.85);
			}
			.content{
				width:692rpx;
				height:120rpx;
				background:rgba(245,245,245,1);
				border-radius:8px 12px 12px 12px;
				padding: 14rpx 22rpx;
				box-sizing: border-box;
				font-size:24rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				color:rgba(153,153,153,1);
				line-height:34rpx;
			}
		}
	}
</style>
