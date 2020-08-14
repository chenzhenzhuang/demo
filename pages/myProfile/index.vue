<template>
	<view class="data-info" >
		<view class="data-bg">
			<image src="/static/bg.png" mode="aspectFill"></image>
		</view>
		<view class="data-info-head">
			<view class="left">
				<view class="img">
					<image :src="info.avatar" mode="aspectFill"></image>
					<image src="/static/boy.png" mode="aspectFill" class="sex" v-if="info.profile.sex==1"></image>
					<image src="/static/gril.png" mode="aspectFill" class="sex" v-if="info.profile.sex==0"></image>
				</view>
				<view class="left-info">
					<view class="name">{{info.name}}</view>
					<view class="age">年龄：{{info.profile.age}}岁</view>
					<view class="job-address" v-if="info.profile.type==2">任职机构：{{info.profile.institution.edu_name}}</view>
				</view>
			</view>
			<view class="full-teacher" v-if="info.profile.type==2">
				全职老师
			</view>
			<view class="part-teacher" v-if="info.profile.type==1">
				兼职老师
			</view>
		</view>
		<view class="manage-area">
			<view class="data-manage" @click="goDataManage">
				<view class="title">资料管理</view>
				<view class="img"><image src="/static/turnRight.png" mode="aspectFill"></image></view>
			</view>
			<view class="order-area">
				<template v-if="info.profile.type==1">
					<view class="order-manage" @click="goBookManage">
						<view class="title">预约管理</view>
						<view class="img"><image src="/static/turnRight.png" mode="aspectFill"></image></view>
					</view>
				</template>
				<view class="fans-manage" @click="goFanManage">
					<view class="title">粉丝管理</view>
					<view class="img"><image src="/static/turnRight.png" mode="aspectFill"></image></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:'',																//用户信息
			}
		},
		onLoad() {

		},
		onShow() {
			this.getInfo()
		},
		methods: {
			// 个人信息
			getInfo(){
				this.$request.post('teacher/index/profile').then(res=>{
					console.log(res)
					this.info = res.result
				})
			},
			// 资料管理
			goDataManage(){
				uni.navigateTo({
					url:'/pages/myProfile/dataManage'
				})
			},
			//预约管理
			goBookManage(){
				uni.navigateTo({
					url:'/pages/myProfile/bookManage/index'
				})
			},
			// 粉丝管理
			goFanManage(){
				uni.navigateTo({
					url:'/pages/myProfile/fansManage/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.data-info {
		width: 750rpx;
		position: relative;

		.data-bg {
			width: 750rpx;
			height: 108rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.data-info-head {
			position: absolute;
			left: 50%;
			top: 0;
			transform: translateX(-50%);
			width: 690rpx;
			height: 216rpx;
			background-color: #FFFFFF;
			box-shadow: 0rpx 8rpx 24rpx 0rpx rgba(0, 0, 0, 0.08);
			border-radius: 16rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 34rpx 0 16rpx;
			box-sizing: border-box;

			.left {
				display: flex;

				.img {
					position: relative;
					width: 116rpx;
					height: 116rpx;

					image {
						width: 116rpx;
						height: 116rpx;
						border-radius: 50%;
					}
					.sex{
						width:24rpx;
						height:24rpx;
						position: absolute;
						right: 20rpx;
						bottom: 4rpx;
					}
				}

				.left-info {
					margin-left: 24rpx;
					.name{
						height:52rpx;
						font-size:32rpx;
						font-family:PingFangSC-Medium,PingFang SC;
						font-weight:600;
						color:rgba(51,51,51,1);
						line-height:44rpx;
					}
					.age{
						height:40rpx;
						font-size:24rpx;
						font-family:PingFangSC-Regular,PingFang SC;
						font-weight:400;
						color:rgba(0,0,0,0.5);
						line-height:34rpx;
					}
					.job-address{
						height:34rpx;
						font-size:24rpx;
						font-family:PingFangSC-Regular,PingFang SC;
						font-weight:400;
						color:rgba(0,0,0,0.5);
						line-height:34rpx;
					}
				}
			}
			.full-teacher{
				position: absolute;
				right: 0;
				top: 0;
				width: 158rpx;
				height: 56rpx;
				background:rgba(0,183,244,0.1);
				border-radius:0 16rpx 0 16rpx;
				font-size:24rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(0,183,244,1);
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.part-teacher{
				position: absolute;
				right: 0;
				top: 0;
				width: 158rpx;
				height: 56rpx;
				background:rgba(219,0,0,0.1);
				border-radius:0 16rpx 0 16rpx;
				font-size:24rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(219,0,0,1);
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		.manage-area{
			position: absolute;
			top: 240rpx;
			left: 0;
			padding: 0 30rpx;
			box-sizing: border-box;
		}
		.data-manage{
			width:690rpx;
			height:88rpx;
			background:rgba(255,255,255,1);
			box-shadow:0px 8px 24px 0px rgba(0,0,0,0.08);
			border-radius:16rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 18rpx 0 42rpx;
			box-sizing: border-box;
			margin-bottom: 18rpx;
			.title{
				font-size:28rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(0,0,0,0.5);
				line-height:40rpx;
			}
			image{
					width: 14rpx;
					height: 28rpx;
				}
		}
		.order-area{
			padding: 0 18rpx 0 18rpx;
			box-sizing: border-box;
			width:690rpx;
			// height:168rpx;
			background:rgba(255,255,255,1);
			box-shadow:0rpx 8rpx 24rpx 0rpx rgba(0,0,0,0.08);
			border-radius:16rpx;
			.order-manage{
				
				height:82rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 0rpx 0 24rpx;
				box-sizing: border-box;
				border-bottom: 4rpx solid #EEEEEE;
				.title{
					font-size:28rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(0,0,0,0.5);
					line-height:40rpx;
				}
				image{
						width: 14rpx;
						height: 28rpx;
					}
			}
			.fans-manage{
				
				height:82rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 0rpx 0 24rpx;
				box-sizing: border-box;
				
				.title{
					font-size:28rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(0,0,0,0.5);
					line-height:40rpx;
				}
				image{
					width: 14rpx;
					height: 28rpx;
				}
			}
		}
	}
</style>
