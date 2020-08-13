<template>
	<view class="live-box">
		<block v-for="(item,index) in toBelive" :key="index">
			<view class="to-be-live" @click="goLiveDetails(item.id)">
				<view class="live-cover">
					<image :src="item.cover" mode="aspectFill"></image>
					<view class="tag">
						{{item.ifopen?'公开课':'私有课'}}
					</view>
				</view>
				<view class="live-info">
					<view class="live-title">
						{{item.name}}
					</view>
					<view class="live-time">
						直播时间：{{item.started_at.slice(-8,-3)}}
					</view>
					<view class="live-instatution">
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
				toBelive:[],																	//待直播列表
				pages:0,																			//页码
				pageSize:'',																	//页数
				count:'',																			//总量
				date:this.dateS()
			};
		},
		mounted() {
			this.handleToBeLive()
		},
		methods:{
			dateS(){
				let year = new Date().getFullYear();
				let month = new Date().getMonth() + 1;
			let m =	month>10 ? month:'0'+month
				let date = new Date().getDate()
			let d=date>=9? date:'0'+date
				return year+ '-' + m +'-'+ d;
			},
			// 滚动加载
			scrollBottom(){
				if(this.pages*this.pageSize<this.count){
					this.handleToBeLive()
				}else{
					this.$queue.showToast('没有更多了')
				}
			},
			//待直播列表
			handleToBeLive(){
				this.$request.post('broadcast/index/wait_list',{
					started_at:this.date,
					pages:this.pages
				}).then(res=>{
					console.log(res)
					this.count = res.result.count
					this.pageSize=res.result.PageSize
					this.toBelive = this.toBelive.concat(res.result.list) 
					this.pages++
				})
			},
			// 跳转详情页
			goLiveDetails(id){
				uni.navigateTo({
					url:'/pages/workbench/toBeLive/liveDetails?lid='+id
				})
			}
		}
	}
</script>

<style lang="scss">
	.live-box{
		.to-be-live{
			display: flex;
			align-items: center;
			margin-bottom: 50rpx;
			.live-cover{
				position: relative;
				width:244rpx;
				height:244rpx;
				margin-right: 18rpx;
				image{
					width: 100%;
					height: 100%;
				}
				.tag{
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
			}
			.live-info{
				view ~ view {
					margin-top: 14rpx;
				}
				.live-title{
					font-size:32rpx;
					font-family:PingFangSC-Medium,PingFang SC;
					font-weight:600;
					color:rgba(51,51,51,1);
					line-height:44rpx;
					width: 420rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.live-time,
				.live-instatution{
					font-size:28rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					color:rgba(0,0,0,0.5);
					width: 420rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
	}
</style>
