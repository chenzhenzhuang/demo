<template>
	<view class="time-set">
		<!-- 日历 -->
		<view class="calendar">
			<lxCalendar @change="selectTime"></lxCalendar>
		</view>
		<!-- 添加时间段 -->
		<view class="add-times" @click="addOrderTime">
			<image src="/static/add.png"></image>
			<view class="content">添加可约时间段</view>
		</view>
		<view class="time-quantum">
			<view class="time-item" v-for="(item,index) in timesList" :key="index">
				<view class="left">{{item.started_at}}-{{item.end_at}}</view>
				<view class="right" @click="del(index)">删除</view>
			</view>
		</view>
		<uni-popup ref="times" type="center">
			<view class="time-box">
				<view class="title">选择可预约时间</view>
				<view class="middle">
					<view class="start-time">
						<picker mode="time" :value="startTime"  @change="startTimeChange">
							<view class="uni-input">{{startTime}}</view>
						</picker>
					</view>
					
					<view class="middle-width"></view>
					<view class="end-times">
					<picker mode="time" :value="endTime"  @change="endTimeChange">
						<view class="uni-input">{{endTime}}</view>
					</picker>
					</view>
				</view>
				<view class="bottom">
					<view class="left" @click="handleCancle">取消</view>
					<view class="right" @click="submitTime">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import lxCalendar from '../../../components/lx-calendar/lx-calendar.vue'
	export default {
		components:{
			lxCalendar
		},
		data() {
			return {
				date:this.getDay(),
				timesList:[],
				startTime: '请选择开始时间',
				endTime: '请选择结束时间'
			};
		},
		mounted() {
			this.bookList()
		 },
		methods:{
			// 添加预约时间
			submitTime(){
				
				let start = this.date+' '+this.startTime;
				let end = this.date+' '+this.endTime
				if(new Date(start).getTime()>new Date(end).getTime()){
					this.$queue.showToast('开始时间不能大于结束时间')
					return
				}else{
					this.$request.post('reservation/period/increase',{
						date:this.date,
						started_at:this.startTime,
						end_at:this.endTime
					}).then((res=>{
						this.$queue.showToast(res.msg)
						if(res.code=='400'){
							return
						}else{
							this.$refs.times.close()
							this.bookList()
							console.log(111)
						}
						
					}))
				}
			},
			// 开始时间
			startTimeChange(e) {
				console.log(e.detail.value)
				this.startTime = e.detail.value
			},
			// 结束时间
			endTimeChange(e) {
				console.log(e.detail.value)
				this.endTime = e.detail.value
			},
			// 关闭时间
			handleCancle(){
				this.$refs.times.close()
			},
			// 添加预约时间
			addOrderTime(){
				// let today = ,
				// let selectDate = 
				// console.log(today,selectDate)
				if(new Date().getDate() > new Date(this.date).getDate() ){
					this.$queue.showToast('不可选择过去的日期')
					return
				}else{
					this.$refs.times.open()
				}
			},
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
					// console.log(1111)
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
	.time-box{
		width:690rpx;
		height:372rpx;
		background:rgba(255,255,255,1);
		border-radius:20rpx;
		.title{
			height: 92rpx;
			width: 100%;
			border-bottom: 2rpx solid #EEEEEE;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size:28rpx;
			font-family:PingFangSC-Regular,PingFang SC;
			color:rgba(51,51,51,1);
		}
		.middle{
			height: 178rpx;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			border-bottom: 2rpx solid #EEEEEE;
			.middle-width{
				width:82rpx;
				height:2rpx;
				background-color: #979797;
				margin: 0 24rpx;
			}
			.start-time,.end-times{
				width:248rpx;
				height:64rpx;
				border-radius:8rpx;
				border:2rpx solid rgba(151,151,151,1);
				font-size: 28rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #999999;
			}
		}
		.bottom{
			height: 98rpx;
			width: 100%;
			display: flex;
			align-items: center;
		
			.left,.right{
				width: 50%;
				
				line-height: 98rpx;
				text-align: center;
				font-size:32rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				color:rgba(51,51,51,1);
			}
			.left{
				border-right: 2rpx solid  #EEEEEE;
			}
		}
	}
}
</style>
