<template>
	<view class="class-details">
		<view class="class-cover">
			<image src="/static/logo.png" mode="aspectFill"></image>
		</view>
		<view class="class-projram">
			<scroll-view scroll-y="true" class="select-projram">
				<view class="block">
					<view v-for="item in classItemList" :key="item.id" class="student-info" @click="selectStudent(item.id)">
							<view class="right">
								<view class="right-box">
									<view class="infos">
										<view class="title">{{item.title}}</view>
									</view>
									<view class="head-img">
										<view class="img"><image :src="item.teacher.avatar" mode="aspectFill"></image></view>
										<view class="name">{{item.teacher.name}}</view>
										<view class="date">{{item.release_at}}</view>
									</view>
								</view>
							</view>
							<radio :checked="item.isActive" color="#00B7F4"></radio>
					</view>
				</view>
			</scroll-view>
			<view class="btn">
				<view class="btn-content" @click="submit">
					确认选择
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',																				//课程id
				classItemList:[],															//课程列表
				checkedArr:[], 																//复选框选中的值
			};
		},
		onLoad(option) {
			this.id = option.id
			this.instaId = option.instaId
			this.cid = option.cid
			this.getDetails()
		},
		methods:{
			submit(){
				// console.log(this.checkedArr)
				this.$queue.setData('workList',this.checkedArr)
				uni.navigateBack({
					delta:2
				})
			},
			// 选择学生
			selectStudent(sid){
				this.classItemList.forEach(item=>{
					if(item.id==sid){
						// 选中时
						if(item.isActive){
							item.isActive = false
							this.checkedArr.forEach((it,index)=>{
								console.log(it.id==sid)
								if(it.id==sid){
									this.checkedArr.splice(index,1)
								}
							})
						}else{			//未选中
							item.isActive = true
							this.checkedArr.push(item)
						}
					}
				})
			},
			getDetails(){
				this.$request.post('catalog/index/select',{
					online_course_id:this.id
				}).then(res=>{
					console.log(res)
					res.result.list.forEach(item=>{
					item.isActive = false
					})
					this.classItemList = res.result.list
				})
			},
			changeCheckbox(e){
				this.checkedArr = e.detail.value;
			},
		}
	}
</script>

<style lang="scss">
.class-details{
	position: relative;
	.class-cover{
		width: 750rpx;
		height: 362rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.class-projram{
		position: absolute;
		top: 340rpx;
		width:750rpx;
		height:742rpx;
		background:rgba(255,255,255,1);
		box-shadow:0rpx 8rpx 24rpx 0rpx rgba(49,49,49,0.09);
		border-radius:16rpx;
		.select-projram{
			margin-top: 24rpx;
			height:742rpx;
			width:702rpx;
			background:rgba(255,255,255,1);
			box-shadow:0rpx 8rpx 24rpx 0rpx rgba(49,49,49,0.09);
			border-radius:16rpx;
			margin: 0 auto;
			padding: 0 24rpx;
			box-sizing: border-box;
			.block{
				.student-info ~ .student-info {
					border-top: 2rpx solid #EEEEEE;
				}
				.student-info{
					height: 138rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.right{
						margin-left: 12rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						width: 632rpx;
						.right-box{
							
							.head-img{
								display: flex;
								align-items: center;
								margin-top: 16rpx;
								.img{
									width:40rpx;
									height:40rpx;
									image{
										width: 100%;
										height: 100%;
										border-radius: 50%;
									}
								}
								.name{
									font-size:24rpx;
									font-family:PingFangSC-Regular,PingFang SC;
									color:rgba(49,49,49,1);
									line-height:34rpx;
									margin: 0 24rpx;
								}
								.date{
									font-size:24rpx;
									font-family:PingFangSC-Regular,PingFang SC;
									color:rgba(152,152,152,1);
									line-height:34rpx;
								}
							}
							.infos{
								.title{
									font-size:24rpx;
									font-family:PingFangSC-Medium,PingFang SC;
									font-weight:600;
									color:rgba(49,49,49,1);
									line-height:34rpx;
								}
							}
						}
						.arrange-work{
							height:34rpx;
							font-size:24rpx;
							font-family:PingFangSC-Regular,PingFang SC;
							color:rgba(0,0,0,0.5);
							line-height:34rpx;
						}
					}
					radio{
						transform: scale(.7);
					}
				}
			}
		}
		.btn{
			width:750rpx;
			height:118rpx;
			background:rgba(255,255,255,1);
			box-shadow:0rpx -2rpx 18rpx 0rpx rgba(0,0,0,0.1);
			display: flex;
			align-items: center;
			justify-content: center;
			position: fixed;
			bottom: 0;
			.btn-content{
				display: flex;
				align-items: center;
				justify-content: center;
				width:200rpx;
				height:76rpx;
				background:rgba(0,183,244,1);
				border-radius:8px;
				border:2px solid rgba(0,183,244,1);
				font-size:28rpx;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:600;
				color:rgba(255,255,255,1);
				line-height:40rpx;
			}
		}
	}
}
</style>
