<template>
	<view class="reject">
		<block v-for="item in rejectList" :key="item.id">
			<view class="reject-item" @click="goDetails(item.id)">
				<view class="img">
					<video :src="item.video_url" :poster="item.cover" :data-id="item.id" @play="playing" :id="item.id" controls></video>
				</view>
				<view class="describe">
					{{item.content}}
				</view>
				<view class="send-time">
					创建时间：{{item.created_at|times}}
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pages:1,																			//页码
				pageSize:'',																	//页数
				count:'',																			//总量
				rejectList:[]																				//动态审核列表
			};
		},
		mounted() {
			this.getRejectDynamic()
		},
		methods:{
			playing(e){
				let currentId = e.currentTarget.dataset.id
				this.videoContent = uni.createVideoContext(currentId)
						// 获取json对象并遍历, 停止非当前视频
						for (let i = 0; i < this.rejectList.length; i++) {
							let temp = this.rejectList[i].id
							if (temp !== currentId) {
								uni.createVideoContext(temp).pause()
							}
						}
			},
			// 滚动加载
			scrollBottom(){
				if(this.pages*this.pageSize<this.count){
					this.getRejectDynamic()
				}else{
					this.$queue.showToast('没有更多了')
				}
			},
			// 获取列表
			getRejectDynamic(){
				this.$queue.showLoading('加载中...')
				this.$request.post('dynamic/dynamic/list',{
					pages:this.pages,
					status:2
				}).then(res=>{
					console.log(res)
					uni.hideLoading();
					this.count = res.result.count
					this.pageSize=res.result.PageSize
					this.rejectList = this.rejectList.concat(res.result.list) 
					this.pages++
				})
			},
			//详情
			goDetails(id){
				uni.navigateTo({
					url:'/pages/dynamicManage/rejectDynamic/rejectDetails?id='+id
				})
			}
		}
	}
</script>

<style lang="scss">
.reject{
	padding: 20rpx 0;
	box-sizing: border-box;
	.reject-item ~ .reject-item{
		margin-top: 48rpx;
	}
	.reject-item{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	
		.img{
			width:690rpx;
			height:352rpx;
			video{
				width: 100%;
				height: 100%;
				border-radius: 14rpx;
			}
		}
		.describe{
			margin: 20rpx 0 12rpx 0;
			width:672rpx;
			// height:80rpx;
			font-size:28rpx;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(153,153,153,1);
			line-height:40rpx;
		}
		.send-time{
			width:354rpx;
			height:34rpx;
			font-size:24rpx;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(153,153,153,1);
			line-height:34rpx;
		}
	}
}
</style>
