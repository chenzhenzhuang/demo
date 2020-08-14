<template>
	<view class="send-dynamic">
		<block v-for="item in sendDynamicList" :key="item.id">
			<view class="dynamic-item" @click="goDetails(item.id)">
				<div class="img">
					<video :src="item.video_url" :poster="item.cover" :data-id="item.id" @play="playing" :id="item.id" controls></video>
				</div>
				<view class="right-info">
					<view class="send-times">发布时间：{{item.created_at|times}}</view>
					<view class="describe">
						{{item.content}}
					</view>
					<view class="operation">
						<view>点赞：{{item.like}}</view>
						<view>转发：{{item.share}}</view>
						<view>评论：{{item.comment}}</view>
					</view>
				</view>
			</view>
		</block>
		<view class="send-dynamic-btn" @click="sendDynamic">
			<image src="/static/send.png" mode="aspectFill"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sendDynamicList:[],														//已发布列表
				pages:0,																			//页码
				pageSize:'',																	//页数
				count:'',																			//总量
			};
		},
		mounted() {
			this.getDynamic()
		},
		methods:{
			playing(e){
				let currentId = e.currentTarget.dataset.id
				this.videoContent = uni.createVideoContext(currentId)
						// 获取json对象并遍历, 停止非当前视频
						for (let i = 0; i < this.sendDynamicList.length; i++) {
							let temp = this.sendDynamicList[i].id
							if (temp !== currentId) {
								uni.createVideoContext(temp).pause()
							}
						}
			},
			// 滚动加载
			scrollBottom(){
				if(this.pages*this.pageSize<this.count){
					this.getDynamic()
				}else{
					this.$queue.showToast('没有更多了')
				}
			},
			// 获取列表
			getDynamic(){
				this.$queue.showLoading('加载中...')
				this.$request.post('dynamic/dynamic/list',{
					pages:this.pages,
					status:3
				}).then(res=>{
					console.log(res)
					uni.hideLoading();
					this.count = res.result.count
					this.pageSize=res.result.PageSize
					this.sendDynamicList = this.sendDynamicList.concat(res.result.list) 
					this.pages++
				})
			},
			goDetails(id){
				uni.navigateTo({
					url:'/pages/dynamicManage/sendDynamic/sendDynamicDetails?id='+id
				})
			},
			// 发布动态
			sendDynamic(){
				uni.navigateTo({
					url:'/pages/dynamicManage/sendDynamic/sendDynamic'
				})
			}
		}
	}
</script>

<style lang="scss">
.send-dynamic{
	position: relative;
	min-height: 100vh;
	background-color: #FFFFFF;
	padding: 20rpx 0;
	box-sizing: border-box;
	.dynamic-item ~ .dynamic-item {
		margin-top: 40rpx;
	}
	.dynamic-item{
		display: flex;
		align-items: center;
		.img{
			width:322rpx;
			height:210rpx;
			overflow: hidden;
			video{
				width: 100%;
				height: 100%;
				border-radius: 14rpx;
			}
		}
		.right-info{
			margin-left: 12rpx;
			.send-times{
				width:354rpx;
				height:34rpx;
				font-size:24rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				color:rgba(153,153,153,1);
				line-height:34rpx;
				margin-bottom: 16rpx;
			}
			.describe{
				width:346rpx;
				font-size:24rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				color:rgba(102,102,102,1);
				line-height:34rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
				margin-bottom: 20rpx;
			}
			.operation{
				width: 346rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size:24rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				color:rgba(105,103,103,0.85);
				line-height:34rpx;
			}
		}
	}
	.send-dynamic-btn{
		width: 148rpx;
		height: 148rpx;
		position: fixed;
		bottom: 218rpx;
		right: 0;
		image{
			width: 100%;
			height: 100%;
		}
	}
}
</style>
