<template>
	<view class="assign-work">
		<view class="select-student">
			<view class="title">已选学生</view>
			<view class="select-item" v-for="(item,index) in selectStudentList" :key="index">
				<view class="left">
					<view class="head-img">
						<image :src="item.member.avatar" mode="aspectFill"></image>
						<image src="/static/boy.png" mode="aspectFill" class="sex" v-if="item.student.sex=='1'"></image>
						<image src="/static/gril.png" mode="aspectFill" class="sex" v-if="item.student.sex=='0'"></image>
					</view>
					<view class="info">
						<view class="name">{{item.student.name}}</view>
						<view class="age">学生年龄: {{item.student.age}}岁</view>
					</view>
				</view>
				<view class="right" @click="deleteStudent(index)">移除</view>
			</view>
			<view class="select-more" @click="selectMore">
				选择更多学生
			</view>
		</view>
		<!-- //完成期限 -->
		<view class="time-of-completion">
			<view class="title">完成期限</view>
			<view class="select-time">
				<view class="time">
					<hTimePicker sTime="0" cTime="23" interval="1" timeNum="0" @changeTime="changeTime">
						<view slot="pCon" class="place">{{selectTime?selectTime:'请选择完成时间'}}</view>
					</hTimePicker>
					<image src="/static/turnBottom.png" mode="aspectFill"></image>
				</view>
				<view class="at">
					前
				</view>
			</view>
		</view>
		<!-- 作业要求 -->
		<view class="work-calim">
			<view class="title">作业要求</view>
			<view class="text-claim">
				<textarea v-model="workClaim" placeholder="请输入作业要求..." maxlength="50" />
				<view class="max-length">
					{{workClaim.length}}/50
				</view>
			</view>
		</view>
		<!-- 作业类型 -->
		<view class="work-type">
			<view class="title">作业类型</view>
			<view class="content">
				<checkbox-group class="block" @change="selectType">
						<view v-for="item in workType" :key="item.id">
							<checkbox :value="String(item.type)" ></checkbox>
							<text>{{item.value}}</text>
						</view>
				</checkbox-group>
				<view class="select-course" v-if="isSelectCourse">
					<view class="select-item" v-for="(item,index) in workList" :key="item.id">
						<view class="left">
							<view class="img">
								<image :src="item.cover" mode="aspectFill"></image>
							</view>
							<view class="info">
								<view class="name">课程名称：{{item.title}}</view>
								<view class="times">课程时长：{{parseInt(item.duration/60)}}分钟</view>
							</view>
						</view>
						<view class="delete" @click="deleteCourse(index)">
							移除
						</view>
					</view>
					<view class="btn" @click="selectCourse" >
						选择课程
					</view>
				</view>
			</view>
		</view>
		<view class="btn-box">
			<view class="submit" @click="submitWork">
				提交作业
			</view>
		</view>
		<uni-popup ref='select'  type="bottom">
			<view class="select-box">
				<scroll-view scroll-y="true" class="select-students">
							<!-- 学生信息 -->
							<view v-for="item in moreStudentList" :key="item.id" class="student-info" @click="selectStudent(item)">
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
								</view>
								<radio color="#00B7F4" :checked="item.isActive" :disabled="item.isActive" ></radio>
								
							</view>
				</scroll-view>
				<view class="submit">
					<view class="submit-work" @click="saveStudent">确定选择</view>
					<view class="all-btn" @click="selectAll">
						<view class="title">全选</view>
						<radio :checked="allChecked" color="#00B7F4"></radio>
						
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import hTimePicker from "@/components/h-timePicker/h-timePicker.vue";
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: { 
			hTimePicker,
			 uniPopup
			},
		data() {
			return {
				workId:[],																							//作业课节id
				courseId:'',																						//课程id
				instaId:'',																							//机构id
				id:'',																									//线下课id
				selectId:[],																						//选中
				selectIdTem:[],																					//选中时临时数据
				allChecked:false,																				//是否全选
				cid:'',																									//课程分类id
				claimlist:[],																						//课程
				selectStudentList:[],																		//选中学生列表
				selectStudentListTem:[],																//选中学生列表临时数据
				selectTime:'',																					//选中的时间
				workClaim:'',																						//作业要求
				isSelectCourse:false,																		//是否选中看视频
				selectTypes:[],																					//选中的作业
				moreStudentList:[],																			//更多学生
				// moreSelect:[],																					//更多选择学生
				workList:[],																						//作业列表
				workType:[{
					type:0,
					value:'看视频'
				},{
					type:1,
					value:'文字回答'
				},{
					type:2,
					value:'上传视频'
				},{
					type:3,
					value:'上传图片'
				}
				]
			};
		},
		onLoad(option) {
			this.cid = option.id
			this.instaId = option.instaId
			this.id = option.cid
			this.courseId = option.courseId
		},
		onShow() {
			
			this.selectStudentList = JSON.parse(JSON.stringify(this.$queue.getData('studentList')))
			// console.log(this.selectStudentList)
				this.selectStudentList.forEach(item=>{
					this.selectId.push(item.id)
			})
			
			// console.log(this.selectId)
			// this.selectId = sid
			// this.workList = JSON.parse(JSON.stringify(this.$queue.getData('workList')))
			// console.log(work)
			//  this.workList.forEach(item=>{
			// 	this.workId.push(item.id)
			// })
			// console.log(this.workList)
		},
		methods:{
			// 提交作业
			submitWork(){
				
				this.$request.post('operation/index/increase',{
					offline_course_id:this.courseId,
					offline_course_schedule_id:this.cid,
					content:this.workClaim,
					expired_at:this.selectTime,
					method:this.selectTypes,
					students:this.selectId,
					online_course_catalogs:this.workId
				}).then(res=>{
					console.log(res)
					this.$queue.showToast(res.msg)
					this.$queue.remove('workList'),
					this.$queue.remove('studentList')
					setTimeout(()=>{
						uni.switchTab({
							url:'/pages/coursesTaken/index'
						})
					},500)
				})
			},
			// 删除课程
			deleteCourse(index){
				this.workList.splice(index,1)
			},
			// 确定选择
			saveStudent(){
				this.$refs.select.close()
				this.selectId=this.selectIdTem
				this.selectStudentList=this.selectStudentListTem
			},
			deleteStudent(index){
				// 删除学生
				this.selectStudentList.splice(index,1)
				this.selectId.splice(index,1)
			},
			// 选择学生
			selectStudent(item){
				if(item.isActive){
					//取消当前选中的
					let index=this.selectIdTem.indexOf(item.id)
					this.selectIdTem.splice(index,1)
					this.selectStudentListTem.splice(index,1)
					this.allChecked=false
					item.isActive=false
				}else{
					//选中当前的
					this.selectIdTem.push(item.id)
					this.selectStudentListTem.push(item)
					item.isActive=true
					if(this.moreStudentList.length==this.selectIdTem.length){
						this.allChecked=true
					}else{
						this.allChecked=false
					}
				}
			},
			// 全选学生
			selectAll(){
				if(this.allChecked){
						//取消全选
						this.moreStudentList.forEach(item =>{
							item.isActive = false
						})
						this.allChecked=false
						this.selectStudentListTem=[]
						this.selectIdTem=[]
						this
					}else{
						//全选
						this.moreStudentList.forEach(item =>{
							item.isActive = true
							this.selectStudentListTem.push(item)
							this.selectIdTem.push(item.id)
						})
						this.allChecked=true
						
				}
			},
			// 更多学生列表
			selectMore(){
				this.$refs.select.open()
				this.$request.post('/schedule/student/select_more',{
					offline_course_sechedule_id:this.cid
				}).then(res=>{
					this.selectIdTem=JSON.parse(JSON.stringify(this.selectId))
					this.selectStudentListTem=JSON.parse(JSON.stringify(this.selectStudentList))
					if(res.result.list.length==this.selectIdTem.length){
						this.allChecked=true
					}else{
						this.allChecked=false
					}
					res.result.list.forEach(item=>{
						if(this.selectIdTem.includes(item.id)){
							item.isActive = true
						}else{
							item.isActive = false
						}
						
					})
					this.moreStudentList = res.result.list
				})
			},
			//去选择课程
			selectCourse(){
				uni.navigateTo({
					url:'/pages/coursesTaken/classIsOver/selectCourse?instaId='+this.instaId+'&cid='+this.id
				})
			},
			//选择时间
			changeTime(e){
				console.log(e)
				this.selectTime = e
			},
			// 选择作业类型
			selectType(e){
				this.selectTypes = e.detail.value;
				this.selectTypes.includes('0')? this.isSelectCourse = true : this.isSelectCourse = false 
			}
		}
	}
</script>

<style lang="scss">
	.assign-work{
		padding: 0 30rpx;
		box-sizing: border-box;
		.select-student{
			width:690rpx;
			background:rgba(255,255,255,1);
			box-shadow:0rpx 8rpx 24rpx 0rpx rgba(0,0,19,0.2);
			border-radius:12rpx;
			padding: 18rpx 20rpx 38rpx 20rpx;
			box-sizing: border-box;
			.title{
				width:128rpx;
				height:44rpx;
				font-size:32rpx;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:600;
				color:rgba(51,51,51,1);
				line-height:44rpx;
			}
			.select-item ~ .select-item {
				border-top: 2rpx solid #EEEEEE;
			}
			.select-item{
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 646rpx;
				height: 144rpx;
				.left{
					display: flex;
					align-items: center;
					.head-img{
						width:94rpx;
						height:94rpx;
						position: relative;
						margin-right: 18rpx;
						image{
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
						.sex{
							width:22rpx;
							height:22rpx;
							position: absolute;
							right: 10rpx;
							bottom: 2rpx;
						}
					}
					.info{
						.name{
							font-size:32rpx;
							font-family:PingFangSC-Regular,PingFang SC;
							color:rgba(51,51,51,1);
							line-height:44rpx;
						}
						.age{
							margin-top: 6rpx;
							font-size:24rpx;
							font-family:PingFangSC-Regular,PingFang SC;
							color:rgba(0,0,0,0.5);
							line-height:34rpx;
						}
					}
				}
				.right{
					width:120rpx;
					height:56rpx;
					border-radius:8rpx;
					border:2rpx solid rgba(226,67,75,1);
					font-size:28rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					color:rgba(226,67,75,1);
					line-height:40rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
			.select-more{
				margin: 0 auto;
				width:240rpx;
				height:76rpx;
				background:rgba(0,183,244,1);
				border-radius:8rpx;
				border:2rpx solid rgba(0,183,244,1);
				display: flex;
				align-items: center;
				justify-content: center;
				font-size:28rpx;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:600;
				color:rgba(255,255,255,1);
			}
		}
		.time-of-completion{
			margin-top: 68rpx;
			.title{
				width:128rpx;
				height:44rpx;
				font-size:32rpx;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:600;
				color:rgba(51,51,51,1);
				line-height:44rpx;
			}
			.select-time{
				margin-top: 14rpx;
				width:690rpx;
				height:76rpx;
				display: flex;
				align-items: center;
				.time{
					margin-left: 44rpx;
					width:564rpx;
					height:76rpx;
					border-radius:8rpx;
					border:2rpx solid rgba(0,0,0,0.25);
					position: relative;
					line-height: 76rpx;
					padding-left: 24rpx;
					box-sizing: border-box;
					.place{
						font-size:28rpx;
						font-family:PingFangSC-Regular,PingFang SC;
						color:rgba(0,0,0,0.25);
					}
					image{
						width:34rpx;
						height:17rpx;
						position: absolute;
						right: 10rpx;
						top: 50%;
						transform: translateY(-50%);
					}
				}
				.at{
					margin-left: 10rpx;
					width:28rpx;
					height:40rpx;
					font-size:28rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					color:rgba(0,0,0,1);
					line-height:40rpx;
				}
			}
		}
		.work-calim{
			margin-top: 60rpx;
			.title{
				width:128rpx;
				height:44rpx;
				font-size:32rpx;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:600;
				color:rgba(51,51,51,1);
				line-height:44rpx;
			}
			.text-claim{
				width:690rpx;
				height:270rpx;
				background:rgba(245,245,245,1);
				border-radius:12rpx;
				overflow: hidden;
				margin-top: 28rpx;
				position: relative;
				padding: 18rpx 22rpx 12rpx 22rpx;
				box-sizing: border-box;
				textarea{
					width: 100%;
					height: 100%;
					font-size: 24rpx;
					font-family:PingFangSC-Regular,PingFang SC;
				}
				.max-length{
					position: absolute;
					right: 24rpx;
					bottom: 12rpx;
					height:28rpx;
					font-size:20rpx;
					font-family:PingFangSC-Medium,PingFang SC;
					font-weight:600;
					color:rgba(153,153,153,1);
					line-height:28rpx;
				}
			}
		}
		.work-type{
			margin-top: 60rpx;
			.title{
				width:128rpx;
				height:44rpx;
				font-size:32rpx;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:600;
				color:rgba(51,51,51,1);
				line-height:44rpx;
			}
			.content{
				margin-top: 26rpx;
				.block{
					width: 690rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					view{
						display: flex;
						align-items: center;
						font-size:24rpx;
						font-family:PingFangSC-Medium,PingFang SC;
						font-weight:600;
						color:rgba(51,51,51,1);
						checkbox{
							transform: scale(.7);
						}
					}
					
				}
				.select-course{
					margin: 22rpx 0;
					padding: 30rpx 22rpx;
					box-sizing: border-box;
					width:690rpx;
					background:rgba(255,255,255,1);
					box-shadow:0rpx 8rpx 24rpx 0rpx rgba(0,0,19,0.2);
					border-radius:12rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					.select-item{
						margin-bottom: 36rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						.left{
							display: flex;
							align-items: center;
							.img{
								width:156rpx;
								height:144rpx;
								image{
									width: 100%;
									height: 100%;
								}
							}
							.info{
								margin-left: 18rpx;
								.name{
									width: 354rpx;
									font-size:28rpx;
									text-overflow: ellipsis;
									overflow: hidden;
									white-space: nowrap;
									font-family:PingFangSC-Medium,PingFang SC;
									font-weight:600;
									color:rgba(51,51,51,1);
									line-height:40rpx;
								}
								.times{
									width: 354rpx;
									text-overflow: ellipsis;
									overflow: hidden;
									white-space: nowrap;
									font-size:28rpx;
									font-family:PingFangSC-Medium,PingFang SC;
									font-weight:600;
									color:rgba(51,51,51,1);
									line-height:40rpx;
								}
							}
						}
						.delete{
							display: flex;
							align-items: center;
							justify-content: center;
							width:120rpx;
							height:56rpx;
							border-radius:8rpx;
							border:2rpx solid rgba(226,67,75,1);
							font-size:28rpx;
							font-family:PingFangSC-Regular,PingFang SC;
							color:rgba(226,67,75,1);
							line-height:40rpx;
						}
					}
					.btn{
						display: flex;
						align-items: center;
						justify-content: center;
						width:200rpx;
						height:76rpx;
						background:rgba(0,183,244,1);
						border-radius:8rpx;
						border:2rpx solid rgba(0,183,244,1);
						font-size:28rpx;
						font-family:PingFangSC-Medium,PingFang SC;
						font-weight:600;
						color:rgba(255,255,255,1);
						line-height:40rpx;
					}
				}
			}
		}
		.btn-box{
			margin: 72rpx auto;
			
			width:540rpx;
			height:76rpx;
			
			.submit{
				display: flex;
				align-items: center;
				justify-content: center;
				width:540rpx;
				height:76rpx;
				background:rgba(0,183,244,1);
				border-radius:40rpx;
				font-size: 32rpx;
				color: #FFFFFF;
			}
		}
		.select-box{
			height: 956rpx;
			background-color: #FFFFFF;
			box-shadow:0rpx 8rpx 24rpx 0rpx rgba(0,0,19,0.2);
			border-radius:16rpx;
			.select-students {
				height: 838rpx;
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
					}
				}
				}
			.submit{
				position: fixed;
				bottom: 0;
				left: 0;
				width:750rpx;
				height:118rpx;
				background:rgba(255,255,255,1);
				box-shadow:0rpx -2rpx 18rpx 0rpx rgba(0,0,0,0.1);
				display: flex;
				align-items: center;
				justify-content: space-around;
				.submit-work{
					width:200rpx;
					height:76rpx;
					background:rgba(0,183,244,1);
					border-radius:8rpx;
					border:2rpx solid rgba(0,183,244,1);
					font-size:28rpx;
					font-family:PingFangSC-Medium,PingFang SC;
					font-weight:600;
					color:rgba(255,255,255,1);
					display: flex;
					align-items: center;
					justify-content: center;
				}
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
			}
		}
	}
</style>
