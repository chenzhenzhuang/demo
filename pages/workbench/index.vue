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
			<view :class="active==2?'actives':''" @click="slider(2)">直播课</view>
			<view :class="active==3?'actives':''" @click="slider(3)">批改作业</view>
		</view>
		<view class="work-box">
				<view v-if="active === 0">
						<block v-for="(item,index) in list" :key="index">
							<view class="will-course" @click="goWillDetails(item.id)">
								<view class="course-cover">
									<image :src="item.institution.avatar" mode="aspectFill"></image>
								</view>
								<view class="course-info">
									<view class="course-title">
										{{item.name}}
									</view>
									<view class="course-time">
										上课时间：{{item.start.slice(0,5)}} 至 {{item.end.slice(0,5)}}
									</view>
									<view class="course-student">
										上课学生：{{item.student_num}}人
									</view>
									<view class="course-instatution">
										所属机构：{{item.institution.edu_name}}
									</view>
								</view>
							</view>
						</block>
				</view>
				<view v-if="active === 1">
						<block v-for="(item,index) in list" :key="index">
							<view class="to-be-record" @click="goRecordDetails(item.id)">
								<view class="recorded-cover">
									<image :src="item.cover?item.cover:item.onlineCourse.cover" mode="aspectFill"></image>
									<view class="tag">
										{{item.onlineCourse.ifopen?'公开课':'私有课'}}
									</view>
								</view>
								<view class="recorded-info">
									<view class="recorded-title">
										{{item.onlineCourse.name}}
									</view>
									<view class="recorded-time">
										录制章节：{{item.title}}
									</view>
									<view class="recorded-student">
										交稿时间：{{item.record_at.slice(-8,-3)}}前
									</view>
									<view class="recorded-instatution">
										所属机构：{{item.onlineCourse.institution.edu_name}}
									</view>
								</view>
							</view>
						</block>
				</view>
				<view v-if="active === 2">
						<block v-for="(item,index) in list" :key="index">
							<view class="to-be-live" @click="goLiveDetails(item.id)">
								<view class="live-cover">
									<image :src="item.cover" mode="aspectFill"></image>
									<view class="tags" v-if="item.ifopen=='0'">
										私有课
									</view>
									<view class="tag" v-if="item.ifopen=='1'">
										公开课
									</view>
									
								</view>
								<view class="live-info">
									<view class="live-title">
										{{item.name}}
									</view>
									<view class="live-time">
										直播时间：{{item.started_at.slice(-8,-3)}}
									</view>
									<view class="live-instatution">
										所属机构：{{item.institution.edu_name}}
									</view>
									<view class="to-be-living" v-if="item.status==1">
										待直播
									</view>
									<view class="living" v-if="item.status==2">
										直播中
									</view>
								</view>
							</view>
						</block>
				</view>
				<view v-if="active === 3">
						<block v-for="(item,index) in list" :key="index">
							<view class="to-be-marked" @click="goWorkDetails(item.id)">
								<view class="marked-left">
									<image :src="item.teacherOperation.offlineCourse.cover" mode="aspectFill"></image>
								</view>
								<view class="marked-middle">
									<view>学生姓名：{{item.student.name}}</view>
									<view>完成时限：{{item.teacherOperation.expired_at.slice(0,-3)|times}}前</view>
									<view>作业名称：{{item.teacherOperation.offlineCourseSchedule.name}}</view>
									<view>所属机构：{{item.teacherOperation.offlineCourse.institution.edu_name}}</view>
								</view>
								<view class="marked-right">
									<view class="img-status">
										<image src="/static/complated.png" mode="aspectFill" v-if="item.status==2"></image>
										<image src="/static/noComplated.png" mode="aspectFill" v-if="item.status==1"></image>
									</view>
									<view class="correct">
										{{item.if_batch==1?'已批改':'未批改'}}
									</view>
								</view>
							</view>
						</block>
				</view>
		</view>
	</view>
</template>

<script>
	import lxCalendar from '../../components/lx-calendar/lx-calendar.vue'
	export default {
		components: {
			lxCalendar
		},
		data() {
			return {
			 active: 0,																		//选中的item
			 pages:1,																			//页码
			 pageSize:'',																	//页数
			 count:'',																		//总数
			 date:this.dateS(),														//时间
			 list:[]																			//数据源
			}
		},
		onReachBottom() {
			if(this.active==0){
				if(this.pages*this.pageSize<this.count){
					this.handleWillList()
				}else{
					this.$queue.showToast('没有更多了')
				}
			}else if(this.active==1){
				if(this.pages*this.pageSize<this.count){
					this.handleToBeRecord()
				}else{
					this.$queue.showToast('没有更多了')
				}
			}else if(this.active==2){
				if(this.pages*this.pageSize<this.count){
					this.handleToBeLive()
				}else{
					this.$queue.showToast('没有更多了')
				}
			}else if(this.active==3){
				if(this.pages*this.pageSize<this.count){
					this.handleToBeMarked()
				}else{
					this.$queue.showToast('没有更多了')
				}
			}
		},
		onShow() {
			this.handleWillList()
		},
		methods: {
			//待批改列表
			handleToBeMarked(){
				this.$queue.showLoading('加载中...')
				this.$request.post('operation/index/list',{
					created_at:this.date?this.date:this.dateS,
					pages:this.pages
				}).then(res=>{
					console.log(res)
					uni.hideLoading();
					this.count = res.result.count
					this.pageSize=res.result.PageSize
					this.list = this.list.concat(res.result.list) 
					this.pages++
				})
			},
			// 去详情
			goWorkDetails(id){
				uni.navigateTo({
					url:'/pages/workbench/toBeMarked/workDetails?wid='+id
				})
			},
			//待直播列表
			handleToBeLive(){
				this.$request.post('broadcast/index/wait_list',{
					started_at:this.date,
					pages:this.pages
				}).then(res=>{
					console.log(res)
					this.count = res.result.count
					this.pageSize=res.result.PageSize
					this.list = this.list.concat(res.result.list) 
					this.pages++
				})
			},
			// 跳转详情页
			goLiveDetails(id){
				uni.navigateTo({
					url:'/pages/workbench/toBeLive/liveDetails?lid='+id
				})
			},
			//待录制列表
			handleToBeRecord(){
				this.$queue.showLoading('加载中...')
				this.$request.post('catalog/index/list',{
					record_at:this.date,
					pages:this.pages
				}).then(res=>{
					console.log(res)
					uni.hideLoading();
					this.count = res.result.count
					this.pageSize=res.result.PageSize
					this.list = this.list.concat(res.result.list) 
					this.pages++
				})
			},
			// 跳转详情页
			goRecordDetails(id){
				uni.navigateTo({
					url:'/pages/workbench/toBeRecorded/recordDetails?lid='+id
				})
			},
			// 跳转详情页
			goWillDetails(id){
				uni.navigateTo({
					url:'/pages/workbench/willCourse/willCourseDetails?id='+id
				})
			},
			//待上课列表
			handleWillList(){
				this.$queue.showLoading('加载中...')
				this.$request.post('schedule/index/wait_list',{
					class_time:this.date,
					pages:this.pages
				}).then(res=>{
					console.log(res)
					uni.hideLoading();
					this.count = res.result.count
					this.pageSize=res.result.PageSize
					this.list = this.list.concat(res.result.list) 
					this.pages++
				})
			},
			// 获取当日日期
			dateS(){
			let year = new Date().getFullYear();
			let month = new Date().getMonth() + 1;
			let m =	month>10 ? month:'0'+month
				let date = new Date().getDate()
			let d=date>=9? date:'0'+date
				return year+ '-' + m +'-'+ d;
			},
			// 时间
			 change(e){
				 this.date = e.fulldate
				 if(this.active==0){
					this.pages=1
					this.list = []
				 	this.handleWillList()
				 }else if(this.active==1){
					this.pages=1
					this.list = []
				 	this.handleToBeRecord()
				 }else if(this.active==2){
					 this.pages=1
					 this.list = []
				 	this.handleToBeLive()
				 }else if(this.active==3){
					 this.pages=1
					 this.list = []
				 	this.handleToBeMarked()
				 }
			 },
			//切换
			slider(index){
				this.active = index
				if(index==0){
					this.pages=1
					this.list = []
					this.handleWillList()
				}else if(index==1){
					this.pages=1
					this.list = []
					this.handleToBeRecord()
				}else if(index==2){
					this.pages=1
					this.list = []
					this.handleToBeLive()
				}else if(index==3){
					this.pages=1
					this.list = []
					this.handleToBeMarked()
				}
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
		.work-box{
			//待上课
			.will-course{
				display: flex;
				align-items: center;
				margin-bottom: 50rpx;
				.course-cover{
					width:244rpx;
					height:244rpx;
					margin-right: 18rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.course-info{
					view ~ view {
						margin-top: 14rpx;
					}
					.course-title{
						width: 420rpx;
						font-size:32rpx;
						font-family:PingFangSC-Medium,PingFang SC;
						font-weight:600;
						color:rgba(51,51,51,1);
						line-height:44rpx;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}
					.course-time,
					.course-student,
					.course-instatution{
						font-size:28rpx;
						font-family:PingFangSC-Regular,PingFang SC;
						color:rgba(0,0,0,0.5);
						// line-height:40rpx;
					}
				}
			}
			//待录制
			.to-be-record{
				display: flex;
				align-items: center;
				margin-bottom: 50rpx;
				.recorded-cover{
					position: relative;
					width:244rpx;
					height:244rpx;
					margin-right: 18rpx;
					image{
						width: 100%;
						height: 100%;
					}
					.tag{
						position: absolute;
						top: 0;
						left: 0;
						width:97rpx;
						height:50rpx;
						background:rgba(219,0,0,1);
						border-radius:8rpx;
						opacity:0.56;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size:24rpx;
						font-family:PingFangSC-Regular,PingFang SC;
						color:rgba(255,255,255,1);
					}
					.tags{
						position: absolute;
						top: 0;
						left: 0;
						width:97rpx;
						height:50rpx;
						background:#00B7F4;
						border-radius:8rpx;
						opacity:0.8;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size:24rpx;
						font-family:PingFangSC-Regular,PingFang SC;
						color:rgba(255,255,255,1);
					}
				}
				.recorded-info{
					view ~ view {
						margin-top: 14rpx;
					}
					.recorded-title{
						font-size:32rpx;
						font-family:PingFangSC-Medium,PingFang SC;
						font-weight:600;
						color:rgba(51,51,51,1);
						line-height:44rpx;
					}
					.recorded-time,
					.recorded-student,
					.recorded-instatution{
						font-size:28rpx;
						font-family:PingFangSC-Regular,PingFang SC;
						color:rgba(0,0,0,0.5);
						width: 420rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
			//带直播
			.to-be-live{
				
				display: flex;
				align-items: center;
				margin-bottom: 50rpx;
				.live-cover{
					position: relative;
					width:244rpx;
					height:244rpx;
					margin-right: 18rpx;
					image{
						width: 100%;
						height: 100%;
					}
					.tag{
						position: absolute;
						top: 0;
						left: 0;
						width:97rpx;
						height:50rpx;
						background:rgba(219,0,0,1);
						border-radius:8rpx;
						opacity:0.8;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size:24rpx;
						font-family:PingFangSC-Regular,PingFang SC;
						color:rgba(255,255,255,1);
					}
					.tags{
						position: absolute;
						top: 0;
						left: 0;
						width:97rpx;
						height:50rpx;
						background:#00B7F4;
						border-radius:8rpx;
						opacity:0.8;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size:24rpx;
						font-family:PingFangSC-Regular,PingFang SC;
						color:rgba(255,255,255,1);
					}
				}
				.live-info{
					
					view ~ view {
						margin-top: 14rpx;
					}
					.live-title{
						font-size:32rpx;
						font-family:PingFangSC-Medium,PingFang SC;
						font-weight:600;
						color:rgba(51,51,51,1);
						line-height:44rpx;
						width: 420rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.live-time,
					.live-instatution{
						font-size:28rpx;
						font-family:PingFangSC-Regular,PingFang SC;
						color:rgba(0,0,0,0.5);
						width: 420rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.to-be-living{
						width:97rpx;
						height:50rpx;
						border-radius:8rpx;
						background:#00B7F4;
						opacity:0.8;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size:24rpx;
						font-family:PingFangSC-Regular,PingFang SC;
						color:rgba(255,255,255,1);
					}
					.living{
						background:rgba(219,0,0,1);
						
						width:97rpx;
						height:50rpx;
						border-radius:8rpx;
						opacity:0.8;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size:24rpx;
						font-family:PingFangSC-Regular,PingFang SC;
						color:rgba(255,255,255,1);
						
					}
				}
			}
			//待批改
		.to-be-marked{
			margin-bottom: 48rpx;
			padding: 12rpx;
			box-sizing: border-box;
			width:690rpx;
			height:200rpx;
			background:rgba(255,255,255,1);
			box-shadow:0rpx 8rpx 24rpx 0rpx rgba(49,49,49,0.2);
			border-radius:4rpx;
			display: flex;
			align-items: flex-start;
			// justify-content: space-between;
			.marked-left{
				width:176rpx;
				height:176rpx;
				image{
					width: 176rpx;
					height: 100%;
				}
			}
			.marked-middle{
				margin-left: 18rpx;
				width:332rpx;
				font-size:24rpx;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:600;
				color:rgba(51,51,51,1);
				view ~ view{
					white-space: nowrap;
					margin-top: 8rpx;
				}
			}
			.marked-right{
				margin-left: 34rpx;
				height: 100%;
				width: 106rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: flex-end;
				.img-status{
					width: 106rpx;
					height: 92rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.correct{
					height:28rpx;
					font-size:20rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(244,0,0,1);
					line-height:28rpx;
				}
			}
		}
		}
	}

	
</style>
