<template>
	<view class="content">
		<!-- 日历 -->
		<view class="calendar">
			 <lxCalendar @change="change"></lxCalendar>
		</view>
		<!-- 分段器使用 -->
		<view class="control">
			<view :class="active==0?'actives':''" @click="slider(0)">待上课</view>
			<view :class="active==1?'actives':''" @click="slider(1)">待录制</view>
			<view :class="active==2?'actives':''" @click="slider(2)">待直播</view>
			<view :class="active==3?'actives':''" @click="slider(3)">批改作业</view>
		</view>
		<view class="work-box">
				<view v-if="active === 0">
						<will-course ref="wCorse" ></will-course>
				</view>
				<view v-if="active === 1">
						<to-be-record ref='record'></to-be-record>
				</view>
				<view v-if="active === 2">
						<to-be-live ref="live" ></to-be-live>
				</view>
				<view v-if="active === 3">
						<to-be-marked ref='marked' ></to-be-marked>
				</view>
		</view>
	</view>
</template>

<script>
	import lxCalendar from '../../components/lx-calendar/lx-calendar.vue'
	import willCourse from './willCourse/index.vue'
	import toBeRecord from './toBeRecorded/index.vue'
	import toBeLive from './toBeLive/index.vue'
	import toBeMarked from './toBeMarked/index.vue'
	export default {
		components: {
			lxCalendar,
			willCourse,
			toBeRecord,
			toBeLive,
			toBeMarked
		},
		data() {
			return {
			 active: 0,					//选中的item
			}
		},
		onReachBottom() {
			if(this.active==0){
				this.$refs.wCorse.scrollBottom()
			}else if(this.active==1){
				this.$refs.record.scrollBottom()
			}else if(this.active==2){
				this.$refs.live.scrollBottom()
			}else if(this.active==3){
				this.$refs.marked.scrollBottom()
			}
		},
		onShow() {
			getApp().globalData.dateTime = this.dateS()
		},
		methods: {
			dateS(){
				let year = new Date().getFullYear();
				let month = new Date().getMonth() + 1;
			let m =	month>10 ? month:'0'+month
				let date = new Date().getDate()
			let d=date>=9? date:'0'+date
				return year+ '-' + m +'-'+ d;
			},
			 change(e){
				 getApp().globalData.dateTime=e.fulldate
				 if(this.active==0){
					this.$refs.wCorse.pages=0
					this.$refs.wCorse.reset()
				 	this.$refs.wCorse.handleWillList()
				 }else if(this.active==1){
					  this.$refs.record.pages=0
				 	this.$refs.record.handleToBeRecord()
				 }else if(this.active==2){
					 this.$refs.live.pages=0
					 this.$refs.live.reset()
				 	this.$refs.live.handleToBeLive()
				 }else if(this.active==3){
					 this.$refs.marked.pages=0
					 this.$refs.marked.reset()
				 	this.$refs.marked.handleToBeMarked()
				 }
			 },
			//切换
			slider(index){
				this.active = index
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		background: #FFFFFF;
		.calendar{
			width:690rpx;
			height:276rpx;
			background:rgba(255,255,255,1);
			box-shadow:0rpx 8rpx 24rpx 0rpx rgba(49,49,49,0.2);
			border-radius:20rpx;
		}
		.control{
			padding: 58rpx 0;
			box-sizing: border-box;
			height: 148rpx;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size:32rpx;
			color:rgba(0,0,0,0.5);
			.actives{
				height: 44rpx;
				font-size:32rpx;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:600;
				color:rgba(51,51,51,1);
				position: relative;
			}
			.actives::after{
				content: ' ';
				width: 100%;
				height:8rpx;
				background:rgba(0,183,244,.6);
				border-radius:5px;
				position: absolute;
				bottom: 4rpx;
				left: 0rpx;
			}
		}
	}

	
</style>
