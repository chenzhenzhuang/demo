<template>
	<view class="batch-all">
				<view class="select-student">
					<view v-for="item in dataList" :key="item.id" class="student-info" @click="selectStudent(item.id)">
						<radio color="#00B7F4" :checked="item.isActive"></radio>
						<view class="right">
							<view class="right-box">
								<view class="head-img">
									<image :src="item.member.avatar" mode="aspectFill"></image>
									<image src="/static/boy.png" mode="aspectFill" class="sex" v-if="item.member.profile.sex==1"></image>
									<image src="/static/gril.png" mode="aspectFill" class="sex" v-if="item.member.profile.sex==0"></image>
								</view>
								<view class="infos">
									<view class="name">{{item.member.nickname}}</view>
									<view class="age">学生年龄：{{item.member.profile.age}}岁</view>
								</view>
							</view>
						</view>
		
					</view>
		</view>
		<view class="bot-fixed-wrap">
			<view class="no-back" v-if="selectStudentList.length == 0">取消</view>
			<view class="back" @click="handleback" v-if="selectStudentList.length > 0">取消</view>
			<view class="but" @click="deleteFans" :class="{'danger': selectStudentList.length > 0, 'un':selectStudentList.length<=0 }">{{selectStudentList.length > 0 ? `删除(${selectStudentList.length})` : '删除'}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pages:0,																			//页码
				pageSize:'',																	//页数
				count:'',																			//总量
				dataList: [],
				selectStudentList: [], 																//复选框选中的值
				allChecked: false 																		//是否全选
			}
			},
			onReachBottom() {
					if(this.pages*this.pageSize<this.count){
						this.getFansList()
					}else{
						this.$queue.showToast('没有更多了')
					}
			},
			onShow() {
				this.getFansList()
			},
			methods:{
				handleback(){
					this.dataList.forEach(item =>{
						item.isActive = false
					})
					this.selectStudentList=[]
				},
				deleteFans(id){
					uni.showModal({
					    content: '删除选中学生？',
							confirmColor:'#333333',
					    success:res=> {
					        if (res.confirm) {
					            // console.log('用户点击确定');
											this.$request.post('attention/index/batch_del',{
												ids:this.selectStudentList
											}).then(res=>{
												this.dataList = []
												this.getFansList()
												this.$queue.showToast(res.msg)
												
											})
					        } else if (res.cancel) {
					            this.$queue.showToast('已取消')
					        }
					    }
					});
				},
				// 选择学生
				selectStudent(sid){
					this.dataList.forEach(item=>{
						if(item.id==sid){
							// 选中时
							if(item.isActive){
								item.isActive = false
								this.allChecked = false										//全选取消
								this.selectStudentList.forEach((it,index)=>{
									console.log(it==sid)
									if(it==sid){
										this.selectStudentList.splice(index,1)
									}
								})
							}else{			//未选中
								item.isActive = true
								this.selectStudentList.push(item.id)
								if (this.selectStudentList.length > 0 && this.selectStudentList.length == this.dataList.length) {
										this.allChecked = true;
									}
							}
						}
					})
				},
				
				// 粉丝列表
				getFansList(){
					this.$request.post('attention/index/list',{
						pages:this.pages
					}).then(res=>{
						console.log(res)
						res.result.list.forEach(item=>{
							 item.isActive = false
						})
						this.count = res.result.count
						this.pageSize=res.result.PageSize
						this.dataList = this.dataList.concat(res.result.list) 
						this.pages++
					})
				},
				finish(e) {
						uni.showModal({
						    content: '删除此学生？',
								confirmColor:'#333333',
						    success:res=> {
						        if (res.confirm) {
												uni.showToast({
													title:'删除成功'
												})
						        } else if (res.cancel) {
						            console.log('用户点击取消');
						        }
						    }
						});
				}
			}
		
	}
</script>

<style lang="scss">
.batch-all{
	.select-student {
		height: calc(100vh - 100rpx);
		padding: 0 30rpx;
		box-sizing: border-box;
	
		.student-info {
			width: 688rpx;
			height: 130rpx;
			display: flex;
			align-items: center;
	
			radio {
				transform: scale(.7);
			}
	
			.right {
				margin-left: 12rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 632rpx;
	
				.right-box {
					display: flex;
					align-items: center;
	
					.head-img {
						width: 88rpx;
						height: 88rpx;
						position: relative;
	
						image {
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
	
						.sex {
							width: 21rpx;
							height: 21rpx;
							position: absolute;
							right: 10rpx;
							bottom: 2rpx;
						}
					}
	
					.infos {
						margin-left: 20rpx;
	
						.name {
							// width:84rpx;
							height: 40rpx;
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: rgba(0, 0, 0, 0.85);
							line-height: 40rpx;
						}
	
						.age {
							margin-top: 6rpx;
							// width:160rpx;
							height: 34rpx;
							font-size: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: rgba(0, 0, 0, 0.25);
							line-height: 34rpx;
						}
					}
				}
			}
		}
	}
	.bot-fixed-wrap {
		position: fixed;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
		bottom: 0;
		left: 0;
		background:rgba(255,255,255,1);
		box-shadow:0rpx -2rpx 18rpx 0rpx rgba(0,0,0,0.14);
		width: 100%;
		height: 100rpx;
		z-index: 99;
		.back{
			line-height: 100rpx;
			text-align: center;
			height: 100rpx;
			width: 50%;
			font-size: 32rpx;
			box-shadow:0rpx 2rpx 18rpx 0rpx rgba(0,0,0,0.14);
		}
		.no-back{
			line-height: 100rpx;
			text-align: center;
			height: 100rpx;
			width: 50%;
			font-size: 32rpx;
			box-shadow:0rpx 2rpx 18rpx 0rpx rgba(0,0,0,0.14);
			color: #666666;
		}
		.but {
			line-height: 100rpx;
			text-align: center;
			height: 100rpx;
			width: 50%;
			font-size: 32rpx;
			.un {
				color: #999999;
			}
			.danger {
				color: red;
			}
		}
	}
}
</style>
