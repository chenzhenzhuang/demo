<template>
	<view class="time-set">
		<!-- 日历 -->
		<view class="calendar">
			<lxCalendar @change="selectTime"></lxCalendar>
		</view>
		<!-- 添加时间段 -->
		<view class="add-times">
			<image src="/static/add.png"></image>
			<view class="content">添加可约时间段</view>
		</view>
		<view class="time-quantum">
			<view class="time-item" v-for="(item,index) in timesList" :key="index">
				<view class="left">{{item.started_at}}-{{item.end_at}}</view>
				<view class="right" @click="del(index)">删除</view>
			</view>
		</view>
	</view>
</template>

<script>
	import lxCalendar from '../../../components/lx-calendar/lx-calendar.vue'
	export default {
		components:{
			lxCalendar
		},
		data() {
			return {
				date:this.getDay(),
				timesList:[]
			};
		},
		mounted() {
			this.bookList()
		},
		methods:{
			getDay(){
				let date = {
						year: new Date().getFullYear(),
						month: new Date().getMonth() + 1,
						date:new Date().getDate(),
					}
					return date.year + '-' + 0 + date.month + '-' + 0 + date.date;
			},
			selectTime(e){
				// console.log(e)
				this.date = e.fulldate
				this.bookList()
			},
			// 预约时间列表
			bookList(){
				this.$request.post('reservation/period/list',{
					date:this.date
				}).then(res=>{
					// console.log(res)
					this.timesList = res.result
				})
			},
			// 删除时间段
			del(index){
				uni.showModal({
				    content: '确定要删除此时间段吗',
				    success: res=>{
				        if (res.confirm) {
				            this.timesList.splice(index,1)
				        }
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
.time-set{
	.calendar{
		width:690rpx;
		height: 276rpx;
		background:rgba(255,255,255,1);
		box-shadow:0rpx 8rpx 24rpx 0rpx rgba(49,49,49,0.2);
		border-radius:20rpx;
		margin-bottom: 36rpx;
	}
	.add-times{
		margin: 0 auto;
		width:620rpx;
		height:76rpx;
		background:rgba(0,183,244,1);
		border-radius:8rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		image{
			width: 32rpx;
			height: 32rpx;
			margin: 8rpx;
		}
		.content{
			font-size:32rpx;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:600;
			color:rgba(255,255,255,1);
		}
	}
	.time-quantum{
		margin-top: 40rpx;
		.time-item{
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-top: 2rpx solid #EEEEEE;
			height: 96rpx;
			.left{
				font-size:32rpx;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:600;
				color:rgba(51,51,51,1);
			}
			.right{
				width:56rpx;
				font-size:28rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:600;
				color:rgba(226,67,75,1);
			}
		}
	}
}
</style>
