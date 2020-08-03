<template>
	<view class="process-box">
		<block v-for="item in toBeProcessList" :key="item.id">
			<view class="to-be-process">
				<view class="process-cover">
					<image :src="item.institution.avatar" mode="aspectFill"></image>
				</view>
				<view class="process-info">
					<view class="process-instuaion">
						{{item.institution.edu_name}}
					</view>
					<view class="process-time">
						时间：{{item.teacherReservationPeriod.date.slice(0,10)|times}} {{item.teacherReservationPeriod.started_at}}-{{item.teacherReservationPeriod.end_at}}
					</view>
					<view class="process-tag">
						<view class="tag" v-for="tag in item.institution.profile.courseCategory.courseCategorys" :key='tag.id'>{{tag.title}}</view>
					</view>
				</view>
			</view>
		</block>
		<view class="no-item" v-if="isMore==true">
			<view class="left"></view>
			<view class="middle">暂无更多</view>
			<view class="right"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				toBeProcessList:[],														//待同意列表
				pages:0,																						//页码
				pageSize:'',																				//页数
				count:'',																						//总量
				isMore:false,
				
			};
		},
		mounted() {
			this.getBookList()
		},
		methods:{
			// 滚动加载
			scrollBottom(){
				if(this.pages*this.pageSize<this.count){
					this.getBookList()
				}else{
					this.isMore = true
				}
			},
			// 预约列表
			getBookList(){
				this.$request.post('reservation/index/list',{
					status:1,
					pages:this.pages
				}).then(res=>{
					console.log(res)
					this.count = res.result.count
					this.count<=10?this.isMore=true:this.isMore=false
					this.pageSize=res.result.PageSize
					this.toBeProcessList = this.toBeProcessList.concat(res.result.list) 
					this.pages++
				})
			}
			// 跳转详情页
			// goDetails(){
			// 	uni.navigateTo({
			// 		url:'/pages/myProfile/bookManage/toprocessetails'
			// 	})
			// }
		}
	}
</script>

<style lang="scss">
	.process-box{
		.to-be-process{
			display: flex;
			margin-bottom: 40rpx;
			.process-cover{
				width:174rpx;
				height:174rpx;
				margin-right: 20rpx;
				image{
					width: 100%;
					height: 100%;
					border-radius: 14rpx;
				}
			}
			.process-info{
				.process-instuaion{
					font-size:32rpx;
					font-family:PingFangSC-Medium,PingFang SC;
					font-weight:600;
					color:rgba(51,51,51,1);
					line-height:44rpx;
					margin-bottom: 20rpx;
				}
				.process-time{
					font-size:28rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					color:rgba(0,0,0,0.5);
					margin-bottom: 38rpx;
				}
				.process-tag{
					display: flex;
					align-items: center;
					view{
						line-height: 28rpx;
						padding: 0 12rpx;
						box-sizing: border-box;
						border-radius:4rpx;
						border:2rpx solid rgba(210,210,210,1);
						font-size:20rpx;
						font-family:PingFangSC-Regular,PingFang SC;
						font-weight:400;
						color:rgba(194,194,194,1);
					}
					view ~ view {
						margin-left: 20rpx;
					}
				}
			}
		}
		.no-item{
			width: 220rpx;
			margin: 0 auto;
			margin-top: 46rpx;
			display: flex;
			align-items: center;
			.left,.right{
				width:46rpx;
				height:2rpx;
				background-color: #c2c2c2;
			}
			.middle{
				width:96rpx;
				height:34rpx;
				font-size:24rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(51,51,51,1);
				line-height:34rpx;
				margin: 0 16rpx;
			}
		}
	}
</style>
