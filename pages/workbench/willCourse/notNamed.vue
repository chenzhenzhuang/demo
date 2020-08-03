<template>
	<view class="not-named">
		<block v-for="(item,index) in notNamed" :key="index">
			<view class="not-named-item">
				<view class="not-item-left">
					<view class="img">
						<image :src="item.member.avatar" mode="aspectFill" class="head-img"></image>
						<image src="/static/boy.png" mode="aspectFill" class="sex-img" v-if="item.student.sex==1"></image>
						<image src="/static/boy.png" mode="aspectFill" class="sex-img" v-if="item.student.sex==0"></image>
					</view>
					<view class="not-item-info">
						<view class="title">{{item.student.name}}</view>
						<view class="age">学生年龄：{{item.student.age}}岁</view>
					</view>
				</view>
				<view class="not-item-right" @click="handleNamed(item.id)">
					点名
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		props:["id"],
		data() {
			return {
				notNamed:[],																//未点名学生
			};
		},
		mounted() {
			this.handleUnName()
		},
		methods:{
			// 点名
			handleNamed(id){
				this.$request.post('schedule/student/named',{
					id:id
				}).then(res=>{
					this.$queue.showToast(res.msg)
					this.handleUnName()
				})
			},
			// 未点名列表
			handleUnName(){
				this.$request.post('schedule/student/unnamed_list',{
					id:this.id
				}).then(res=>{
					console.log(res)
					this.notNamed = res.result.list
				})
			}
		}
	}
</script>

<style lang="less">
	.not-named{
		.not-named-item{
			height: 136rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 28rpx 0 30rpx;
			box-sizing: border-box;
			border-bottom: 2rpx solid #EEEEEE;
			.not-item-left{
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
				.not-item-info{
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
			.not-item-right{
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
	}
</style>
