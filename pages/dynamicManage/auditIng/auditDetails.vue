<template>
	<view class="audit">
		<view class="audit-item">
			<view class="img">
				<video :src="dynamicContent.video_url" :poster="dynamicContent.cover" :show-center-play-btn="false" controls></video>
			</view>
			<view class="describe">
				{{dynamicContent.content}}
			</view>
			<view class="send-time">
				创建时间：{{dynamicContent.created_at|times}}
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

		.audit-item~.audit-item {
			margin-top: 48rpx;
		}

		.audit-item {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;

			.img {
				width: 750rpx;
				height: 400rpx;

				video{
					width: 100%;
					height: 100%;
				}
			}

			.describe {
				margin: 20rpx 0 12rpx 0;
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
			}
		}
	}
</style>
