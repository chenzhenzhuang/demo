<template>
	<view class="work-details-box" v-if="workDetails!==''">
		<view class="work-head">
			<view class="work-img">
				<image :src="workDetails.cover" mode="aspectFill"></image>
			</view>
			<view class="work-info">
				<view>学生姓名：{{workDetails.student.name}}</view>
				<view>完成时限：{{workDetails.teacherOperation.expired_at.slice(0,-3)|times}}前</view>
				<view>上交时间：{{workDetails.created_at|times}}</view>
				<view>作业名称：{{workDetails.teacherOperation.offlineCourseSchedule.name}}</view>
				<view>所属机构：{{workDetails.teacherOperation.offlineCourse.institution.edu_name}}</view>
				<view>所属课程：钢琴基础</view>
			</view>
			<view class="work-status">
				<image src="/static/complated.png" mode="aspectFill" v-if="workDetails.status==2"></image>
				<image src="/static/noComplated.png" mode="aspectFill" v-if="workDetails.status==1"></image>
			</view>
		</view>
		<view class="work-claim">
			<view class="work-title">
				作业要求
			</view>
			<view class="work-content">
				{{workDetails.teacherOperation.content}}
			</view>
		</view>
		<view class="complate-type">
			<view class="complate-title">完成情况</view>
			<view class="course" v-if="methods.includes('4')">
				<view class="title">学习课程</view>
				<block v-for="item in workDetails.teacherOperation.teacherOperationCourse" :key="item.id">
					<view class="contents">
						<view class="content-left">
							<image :src="item.onlineCourseCatalog.cover" mode="aspectFill"></image>
						</view>
						<view class="content-right">
							<view class="content-right-head">
								<view class="course-title">{{item.onlineCourseCatalog.title}}</view>
								<view class="watch">已观看:{{item.onlineCourseCatalogLearn.studytime/60}}分钟</view>
							</view>
							<view class="content-right-bottom">
								<view class="img">
									<image :src="item.onlineCourseCatalog.teacher.avatar" mode="aspectFill"></image>
								</view>
								<view class="job">
									讲师:
								</view>
								<view class="name">
									{{item.onlineCourseCatalog.teacher.name}}
								</view>
							</view>
						</view>
						<!-- <view class="status-btn">
							已学习
						</view> -->
					</view>
				</block>
			</view>
			<!-- 视频作业 -->
			<view class="video-work" v-if="methods.includes('1')">
				<view class="title">视频作业</view>
				<view class="video-box">
					<video :src="workDetails.video_url" :poster="workDetails.cover" controls></video>
				</view>
			</view>
			<!-- 图片作业 -->
			<view class="img-work" v-if="methods.includes('2')">
				<view class="title">图片作业</view>
				<view class="img-box">
					<block v-for="(item,index) in workDetails.images" :key="item">
						<view class="img">
							<image :src="item" mode="aspectFill"></image>
						</view>
					</block>
				</view>
			</view>
			<!-- //文字作业 -->
			<view class="word-work" v-if="methods.includes('3')">
				<view class="work-title">
					文字作业
				</view>
				<view class="work-content">
					{{workDetails.reply}}
				</view>
			</view>
			<!-- 老师批语 -->
			<view class="teacher-scolded">
				<view class="title">
					老师批语
				</view>
				<view class="scolded">
					<textarea placeholder-class="place-style" placeholder="请输入对学生作业完成情况的批语…" maxlength="100" v-model="scoldeds"/>
				</view>
				<view class="solded-bottom">
					<view class="give-flower">
						 <radio-group @change="isGive">
							 <radio value="1" class="radio">给红花</radio>
							</radio-group>
					</view>
					<view class="right" @click="handleCorrect">
						确认批改
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wid:'',															//作业id
				isFlower:'',												//是否给hua
				scoldeds:'',													//评语
				workDetails:'',											//作业详情
			};
		},
		onLoad(option) {
			this.wid = option.wid
			this.getDetails()
			
		},
		computed:{
			methods(){
				return this.workDetails.teacherOperation.method
			}
		},
		methods:{
			// 是否给红花
			isGive(e){
				// console.log(e)
				this.isFlower = e.detail.value
			},
			// 批改作业
			handleCorrect(){
				if(this.scoldeds!=''){
					this.$request.post('operation/index/batch',{
						id:this.wid,
						content:this.scoldeds,
						flower:this.isFlower? '1':'0'
					}).then(res=>{
						console.log(res)
						this.$queue.showToast(res.msg)
						setTimeout(()=>{
							uni.navigateBack()
						},1000)
					})
				}else{
					this.$queue.showToast('请对学生做出评价')
					return
				}
				
			},
			// 详情
			getDetails(){
				this.$request.post('operation/index/details',{
					id:this.wid
				}).then(res=>{
					console.log(res)
					this.workDetails = res.result
				})
			}
		}
	}
</script>

<style lang="scss">
	.work-details-box {
		background: rgba(245, 245, 245, 1);
		min-height: 100vh;
		width: 750rpx;

		.work-head {
			height: 402rpx;
			width: 750rpx;
			padding: 0 30rpx;
			background-color: #FFFFFF;
			box-sizing: border-box;
			position: relative;
			display: flex;
			align-items: center;

			.work-img {
				margin-right: 20rpx;
				width: 244rpx;
				height: 354rpx;
				border-radius: 8rpx;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.work-info {
				// width: 390rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
				line-height: 40rpx;

				view~view {
					margin-top: 10rpx;
					// text-overflow: ellipsis;
					// overflow: hidden;
					// white-space: nowrap;
				}
			}

			.work-status {
				position: absolute;
				top: 0;
				right: 30rpx;
				width: 92rpx;
				height: 92rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.work-claim {
			margin-top: 20rpx;
			width: 100%;
			padding: 36rpx 30rpx;
			box-sizing: border-box;
			background-color: #FFFFFF;

			.work-title {
				margin-top: 28rpx;
				width: 128rpx;
				height: 44rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 600;
				color: rgba(0, 0, 0, 0.85);
				line-height: 44rpx;
			}

			.work-content {
				margin-top: 20rpx;
				width: 692rpx;
				height: 120rpx;
				background: rgba(245, 245, 245, 1);
				border-radius: 12rpx;
				padding: 18rpx 42rpx 34rpx 26rpx;
				box-sizing: border-box;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(0, 0, 0, 0.25);
				line-height: 34rpx;
			}
		}

		.complate-type {
			overflow: hidden;
			width: 100%;
			padding: 0 30rpx;
			box-sizing: border-box;
			background-color: #FFFFFF;

			.complate-title {
				margin-top: 22rpx;
				width: 128rpx;
				height: 44rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 600;
				color: rgba(51, 51, 51, 1);
				line-height: 44rpx;
				margin-bottom: 38rpx;
			}

			.course {
				position: relative;
				margin-top: 38rpx;
				width: 690rpx;
				min-height: 252rpx;
				background: rgba(255, 255, 255, 1);
				box-shadow: 0rpx 8rpx 24rpx 0rpx rgba(0, 0, 0, 0.1);
				border-radius: 12rpx;
				padding: 16rpx 22rpx 42rpx 40rpx;
				box-sizing: border-box;

				.title {
					width: 112rpx;
					height: 40rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					line-height: 40rpx;
				}

				.contents {
					margin-top: 14rpx;
					display: flex;
					align-items: center;
					position: relative;
					.content-left {
						width: 190rpx;
						height: 140rpx;
						margin-right: 14rpx;

						image {
							border-radius: 8rpx;
							width: 100%;
							height: 100%;
						}
					}

					.content-right {
						width: 424rpx;

						.content-right-head {
							margin-bottom: 28rpx;
							display: flex;
							align-items: center;
							justify-content: space-between;

							.course-title {
								// width: 112rpx;
								height: 40rpx;
								font-size: 28rpx;
								font-family: PingFangSC-Medium, PingFang SC;
								font-weight: 600;
								color: rgba(51, 51, 51, 1);
								line-height: 40rpx;
							}

							.watch {
								width: 156rpx;
								height: 34rpx;
								font-size: 24rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: rgba(51, 51, 51, 1);
								line-height: 34rpx;
							}
						}

						.content-right-bottom {
							display: flex;
							align-items: center;

							.img {
								width: 40rpx;
								height: 40rpx;

								image {
									width: 100%;
									height: 100%;
									border-radius: 50%;
								}
							}

							.job {
								margin-left: 6rpx;
								font-size: 20rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: rgba(0, 0, 0, 0.5);
								line-height: 28rpx;
							}

							.name {
								margin-left: 20rpx;
								font-size: 20rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: rgba(0, 0, 0, 1);
								line-height: 28rpx;
							}
						}
					}

					.status-btn {
						width: 108rpx;
						height: 52rpx;
						background: rgba(0, 183, 244, 0.71);
						border-radius: 0rpx 12rpx 0rpx 12rpx;
						position: absolute;
						top: 0;
						right: 0;
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						color: rgba(255, 255, 255, 1);
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
			}
			.video-work{
				margin-top: 20rpx;
				padding: 16rpx 38rpx 26rpx 38rpx;
				width:690rpx;
				height:386rpx;
				background:rgba(255,255,255,1);
				box-shadow:0rpx 8rpx 24rpx 0rpx rgba(0,0,0,0.1);
				border-radius:12rpx;
				box-sizing: border-box;
				.title{
					width:112rpx;
					height:40rpx;
					font-size:28rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
					line-height:40rpx;
					margin-bottom: 18rpx;
				}
				.video-box{
					width:614rpx;
					height:286rpx;
					border-radius:14rpx;
					overflow: hidden;
					video{
						width: 100%;
						height: 100%;
						
					}
				}
			}
			.img-work{
				margin-top: 20rpx;
				width:690rpx;
				// height:504rpx;
				background:rgba(255,255,255,1);
				box-shadow:0rpx 8rpx 24rpx 0rpx rgba(0,0,0,0.1);
				border-radius:12rpx;
				padding: 16rpx 34rpx 0;
				box-sizing: border-box;
				.title{
					width:112rpx;
					height:40rpx;
					font-size:28rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
					line-height:40rpx;
					
					margin-bottom: 18rpx;
				}
				.img-box{
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					.img{
						width:190rpx;
						height:190rpx;
						margin: 0 24rpx 22rpx 0;
						image{
							width: 100%;
							height: 100%;
							border-radius:8rpx;
						}
					}
					.img:nth-child(3n){
						margin-right: 0;
					}
				}
			}
			.word-work{
				overflow: hidden;
				margin-top: 20rpx;
				width:690rpx;
				background:rgba(255,255,255,1);
				box-shadow:0rpx 8rpx 24rpx 0rpx rgba(0,0,0,0.1);
				border-radius:12rpx;
				padding: 16rpx 36rpx 40rpx 34rpx;
				box-sizing: border-box;
				.work-title{
					width:112rpx;
					height:40rpx;
					font-size:28rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
					line-height:40rpx;
					margin-bottom: 18rpx;
				}
				.work-content{
					width:620rpx;
					// height:128rpx;
					padding: 16rpx 22rpx;
					box-sizing: border-box;
					background:rgba(245,245,245,1);
					border-radius:12rpx;
					font-size:24rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					color:rgba(0,0,0,0.2);
					line-height:34rpx;
				}
			}
			.teacher-scolded{
				overflow: hidden;
				margin-top: 20rpx;
				width:690rpx;
				background:rgba(255,255,255,1);
				box-shadow:0rpx 8rpx 24rpx 0rpx rgba(0,0,0,0.1);
				border-radius:12rpx;
				padding: 18rpx 34rpx 34rpx 38rpx;
				box-sizing: border-box;
				margin-bottom: 48rpx;
				.title{
					width:112rpx;
					height:40rpx;
					font-size:28rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
					line-height:40rpx;
					margin-bottom: 18rpx;
				}
				.scolded{
					width:618rpx;
					height:258rpx;
					border-radius:8rpx;
					border:2rpx solid rgba(238,238,238,1);
					padding: 18rpx 12rpx 12rpx 22rpx;
					box-sizing: border-box;
					font-size: 100rpx;
					.place-style{
						font-size:26rpx;
						font-family:PingFangSC-Regular,PingFang SC;
						color:rgba(0,0,0,0.2);
						line-height:36rpx;
					}
				}
				.solded-bottom{
					margin-top: 16rpx;
					display: flex;
					align-items: flex-start;
					justify-content: space-between;
					.give-flower{
						display: flex;
						align-items: center;
						.radio{
							transform: scale(0.7);
						}
						view{
							width:72rpx;
							height:34rpx;
							font-size:24rpx;
							font-family:PingFangSC-Regular,PingFang SC;
							font-weight:400;
							color:rgba(51,51,51,1);
							line-height:34rpx;
						}
					}
					.right{
						width:200rpx;
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
			}
		}
	}
</style>
