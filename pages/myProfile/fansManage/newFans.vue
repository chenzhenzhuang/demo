<template>
	<view class="new-fans">
		<view class="fans-item" v-for="(item,index) in newFanList" :key="index">
			<view class="left">
				<view class="img">
					<image :src="item.member.avatar" mode="aspectFill"></image>
					<image src="/static/boy.png" mode="aspectFill" class="sex" v-if="item.member.profile.sex==1"></image>
					<image src="/static/gril.png" mode="aspectFill" class="sex" v-if="item.member.profile.sex==0"></image>
				</view>
				<view class="info">
					<view class="name">{{item.member.nickname}}</view>
					<view class="age">学生年龄：{{item.member.profile.age}}岁</view>
				</view>
			</view>
			<view class="right" @click="deleteFans(item.id)">
				删除
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newFanList:[],														//粉丝
				pages:0,																			//页码
				pageSize:'',																	//页数
				count:''																			//总量
			};
		},
		mounted() {
			this.getFansList()
		},
		methods:{
			scrollBottom(){
				if(this.pages*this.pageSize<this.count){
					this.getFansList()
				}else{
					this.$queue.showToast('没有更多了')
				}
			},
			// 粉丝列表
			getFansList(){
				this.$request.post('attention/index/new_list',{
					pages:this.pages
				}).then(res=>{
					console.log(res)
					this.count = res.result.count
					this.pageSize=res.result.PageSize
					this.newFanList = this.newFanList.concat(res.result.list) 
					this.pages++
				})
			},
			// 删除粉丝
			deleteFans(id){
				uni.showModal({
				    content: '删除此学生？',
						confirmColor:'#333333',
				    success:res=> {
				        if (res.confirm) {
										this.$request.post('attention/index/del',{
											id:id
										}).then(res=>{
											this.newFanList =[]
											this.getFansList()
											this.$queue.showToast(res.msg)
											
										})
				        } else if (res.cancel) {
				            this.$queue.showToast('已取消')
				        }
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	.new-fans{
		.fans-item:first-child{
			border-top: 2rpx solid #EEEEEE;
		}
		.fans-item{
			border-bottom: 2rpx solid #EEEEEE;
			padding: 0 30rpx 0 34rpx;
			box-sizing: border-box;
			height: 140rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.left{
				display: flex;
				align-items: center;
				.img{
					position: relative;
					width:94rpx;
					height:94rpx;
					image{
						width: 100%;
						border-radius: 50%;
						height: 100%;
					}
					.sex{
						position: absolute;
						width:22rpx;
						height:22rpx;
						right:10rpx;
						bottom: 0;
					}
				}
				.info{
					margin-left: 18rpx;
					.name{
						font-size:32rpx;
						font-family:PingFangSC-Regular,PingFang SC;
						color:rgba(51,51,51,1);
						margin-bottom: 6rpx;
					}
					.age{
						font-size:24rpx;
						font-family:PingFangSC-Regular,PingFang SC;
						font-weight:400;
						color:rgba(0,0,0,0.25);
					}
				}
			}
			.right{
				width:120rpx;
				height:56rpx;
				border-radius:8rpx;
				border:2rpx solid rgba(226,67,75,1);
				font-size:28rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(226,67,75,1);
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>
