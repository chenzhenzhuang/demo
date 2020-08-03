<template>
	<view class="has-named">
		<block v-for="(item,index) in named" :key="index">
			<view class="has-named-item">
				<view class="has-item-left">
					<view class="img">
						<image :src="item.member.avatar" mode="aspectFill" class="head-img"></image>
						<image src="/static/boy.png" mode="aspectFill" class="sex-img" v-if="item.memberOfflineCourse.sex==1"></image>
						<image src="/static/boy.png" mode="aspectFill" class="sex-img" v-if="item.memberOfflineCourse.sex==0"></image>
					</view>
					<view class="has-item-info">
						<view class="title">{{item.memberOfflineCourse.name}}</view>
						<view class="age">学生年龄：{{item.memberOfflineCourse.age}}岁</view>
					</view>
				</view>
				<view class="has-item-right" @click="handleAfter(item.id)">
					下课
				</view>
			</view>
		</block>
		<view class="after-class-btn" v-if="named.length!=0" @click="allAfterClasee">
			全部下课
		</view>
	</view>
</template>

<script>
	export default {
		props:["id"],
		data() {
			return {
				named:[],																//已点名学生
			};
		},
		mounted() {
			this.handleUnName()
		},
		methods:{
			// 全部下课
			allAfterClasee(){
				this.$request.post('schedule/student/all_aftered',{
					id:this.id
				}).then(res=>{
					this.$queue.showToast(res.msg)
					this.handleUnName()
				})
			},
			// 下课
			handleAfter(id){
				this.$request.post('schedule/student/named_list',{
					id:id
				}).then(res=>{
					this.$queue.showToast(res.msg)
					this.handleUnName()
				})
			},
			// 已点名
			handleUnName(){
				this.$request.post('schedule/student/named_list',{
					id:this.id
				}).then(res=>{
					console.log(res)
					this.named = res.result.list
				})
			}
		}
	}
</script>

<style lang="less">
	.has-named{
		position: relative;
		.has-named-item{
			height: 136rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 28rpx 0 30rpx;
			box-sizing: border-box;
			border-bottom: 2rpx solid #EEEEEE;
			.has-item-left{
				display: flex;
				align-items: center;
				.img{
					width:94rpx;
					height:94rpx;
					position: relative;
					.head-img{
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
					.sex-img{
						position: absolute;
						right: 0;
						bottom: 0;
						width:22px;
						height:22px;
					}
				}
				.has-item-info{
					margin-left: 18rpx;
					.title{
						height:44rpx;
						font-size:32rpx;
						font-family:PingFangSC-Regular,PingFang SC;
						color:rgba(51,51,51,1);
						line-height:44rpx;
					}
					.age{
						font-size:24rpx;
						font-family:PingFangSC-Regular,PingFang SC;
						color:rgba(0,0,0,0.25);
						line-height:34rpx;
					}
				}
			}
			.has-item-right{
				width:120rpx;
				height:56rpx;
				border-radius:8rpx;
				border:2rpx solid rgba(0,183,244,1);
				font-size:28rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				color:rgba(0,183,244,1);
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		.after-class-btn{
			position: fixed;
			bottom: 54rpx;
			left: 50%;
			transform: translateX(-50%);
			width:540rpx;
			height:76rpx;
			background:rgba(0,183,244,1);
			border-radius:40rpx;
			font-size:32rpx;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:600;
			color:rgba(255,255,255,1);
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
