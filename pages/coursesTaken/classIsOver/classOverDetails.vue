<template>
	<view class="details-box" v-if="courseDetails!==''">
		<view class="head">
			<view class="head-info">
				<view class="img">
					<image :src="courseDetails.offlineCourse.cover" mode="aspectFill"></image>
				</view>
				<view class="info">
					<view class="title">
						{{courseDetails.name}}
					</view>
					<view class="times">
						上课时间：{{courseDetails.signin_at?courseDetails.signin_at.slice(-8,-3):''}} -
						{{courseDetails.signout_at?courseDetails.signout_at.slice(-8,-3):''}}
					</view>
					<view class="student-count">
						上课学生：{{courseDetails.student_num}}人
					</view>
					<view class="intatution">
						所属机构：{{courseDetails.institution.edu_name}}
					</view>
					<view class="address">
						机构地址：{{address}}
					</view>
				</view>
			</view>
			<view class="head-time">
				<view>
					上课时间: {{courseDetails.signin_at.slice(0,-3)|times}}~下课时间: {{courseDetails.signout_at.slice(0,-3)|times}}
				</view>
			</view>
		</view>
		<!-- 选择学生 -->
		<scroll-view scroll-y="true" class="select-student">
			<!-- 学生信息 -->

			<view v-for="item in courseDetails.offlineCourseScheduleStudents" :key="item.id" class="student-info" @click="selectStudent(item.id)">
				<radio color="#00B7F4" :checked="item.isActive"></radio>
				<view class="right">
					<view class="right-box">
						<view class="head-img">
							<image :src="item.member.avatar" mode="aspectFill"></image>
							<image src="/static/boy.png" mode="aspectFill" class="sex" v-if="item.student.sex=='1'"></image>
							<image src="/static/gril.png" mode="aspectFill" class="sex" v-if="item.student.sex=='0'" ></image>
						</view>
						<view class="infos">
							<view class="name">{{item.student.name}}</view>
							<view class="age">学生年龄: {{item.student.age}}岁</view>
						</view>
					</view>
					<view class="arrange-work" v-if="item.if_operation==0" @click.stop="handleArrange(item.id)">
						布置作业
					</view>
					<view class="arranged-work" v-if="item.if_operation==1">
						已布置作业
					</view>
				</view>

			</view>
</scroll-view>
		<view class="bottom-btn">
				<view class="all-btn" @click="selectAll">
					<radio :checked="allChecked" color="#00B7F4"></radio>
					<view class="title">全选</view>
				</view>
			<view class="btn" @click="goAssignWork">布置作业</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cid: '', 																							//课程id
				courseDetails: '', 																		//上课详情
				selectStudentList: [], 																//复选框选中的值
				allChecked: false 																		//是否全选
			};
		},
		onLoad(option) {
			this.cid = option.cid
		},
		onShow() {
			this.handleDetails()
			console.log(getApp().globalData.text)
		},
		computed: {
			address() {
				return this.courseDetails.institution.profile_simple.province + this.courseDetails.institution.profile_simple.city +
					this.courseDetails.institution.profile_simple.region + this.courseDetails.institution.profile_simple.address
			}
		},
		methods: {
			// 布置作业
			handleArrange(id){
				console.log(id)
			},
			// 详情
			handleDetails() {
				this.$request.post('schedule/index/already_details', {
					id: this.cid
				}).then(res => {
					console.log(res)
					res.result.offlineCourseScheduleStudents.forEach(item=>{
						 item.isActive = false
					})
					this.courseDetails = res.result
				})
			},
			// 全选
			selectAll(){
				if(this.allChecked){
						//取消全选
						this.courseDetails.offlineCourseScheduleStudents.forEach(item =>{
							if(item.if_operation!=1){
								item.isActive = false
							}
						})
						this.allChecked=false
						this.selectStudentList=[]
					}else{
						//全选
						this.courseDetails.offlineCourseScheduleStudents.forEach(item =>{
							if(item.if_operation!=1){
								item.isActive = true
								this.selectStudentList.push(item)
							}
						})
						this.allChecked=true
						
				}
			},
			// 选择学生
			selectStudent(sid){
				this.courseDetails.offlineCourseScheduleStudents.forEach(item=>{
					if(item.id==sid){
						// 选中时
						if(item.isActive==true&&item.if_operation!=1){
							item.isActive = false
							this.allChecked = false										//全选取消
							this.selectStudentList.forEach((it,index)=>{
								console.log(it.id==sid)
								if(it.id==sid){
									this.selectStudentList.splice(index,1)
								}
							})
						}else if(item.isActive==false&&item.if_operation!=1){			//未选中
							item.isActive = true
							this.selectStudentList.push(item)
							if (this.selectStudentList.length > 0 && this.selectStudentList.length == this.courseDetails.offlineCourseScheduleStudents.length) {
									this.allChecked = true;
								}
						}
					}
				})
			},
			//布置作业
			goAssignWork() {
				if(this.selectStudentList.length==0){
					this.$queue.showToast('请选择学生')
					return
				}
				this.$queue.setData('studentList',this.selectStudentList)
				
				uni.navigateTo({
					url: '/pages/coursesTaken/classIsOver/assignWork?id='+this.cid+'&instaId='+this.courseDetails.institution_id+'&cid='+this.courseDetails.offlineCourse.course_category_id+'&courseId='+this.courseDetails.offlineCourse.id
				})
			},
		}
	}
</script>

<style lang="scss">
	.details-box {
		position: relative;

		.head {
			width: 690rpx;
			height: 364rpx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0rpx 8rpx 24rpx 0rpx rgba(0, 0, 19, 0.2);
			border-radius: 12rpx;
			margin: 0 auto;
			padding: 20rpx 22rpx 32rpx 22rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			flex-direction: column;
			margin-bottom: 40rpx;

			.head-info {
				display: flex;
				align-items: flex-start;

				.img {
					width: 244rpx;
					height: 242rpx;

					image {
						height: 100%;
						width: 100%;
					}
				}

				.info {
					margin-left: 18rpx;

					.title {
						height: 44rpx;
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 600;
						color: rgba(0, 0, 0, 0.85);
						line-height: 44rpx;
						margin-bottom: 10rpx;
					}

					.times,
					.student-count,
					.intatution,
					.address {
						width: 384rpx;
						height: 40rpx;
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: rgba(0, 0, 0, 0.5);
						line-height: 40rpx;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						margin-bottom: 8rpx;
					}
				}
			}

			.head-time {
				width: 650rpx;
				margin-top: 32rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				color: rgba(0, 0, 0, 0.85);
			}
		}

		.select-student {
			height: calc(100vh - 522rpx);
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

					.arrange-work {
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						color: rgba(0, 0, 0, 0.5);
						line-height: 34rpx;
					}
					.arranged-work{
						font-size:24rpx;
						font-family:PingFangSC-Regular,PingFang SC;
						color:rgba(0,183,244,1);
						line-height:34rpx;
					}
				}
			}
		}

		.bottom-btn {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 750rpx;
			height: 118rpx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0rpx -2rpx 18rpx 0rpx rgba(0, 0, 0, 0.1);
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx;
			box-sizing: border-box;

				.all-btn {
					display: flex;
					align-items: center;
					radio{
						transform: scale(.7);
					}
					.title{
						font-size:28rpx;
						font-family:PingFangSC-Regular,PingFang SC;
						font-weight:400;
						color:rgba(0,0,0,0.85);
						line-height:40rpx;
					}
				}

			.btn {
				width: 200rpx;
				height: 76rpx;
				background: rgba(0, 183, 244, 1);
				border-radius: 8rpx;
				border: 2rpx solid rgba(0, 183, 244, 1);
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 600;
				color: rgba(255, 255, 255, 1);
				line-height: 40rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>
