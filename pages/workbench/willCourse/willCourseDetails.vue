<template>
	<view class="will-details" v-if="courseDetails!=''">
		<!-- 头部课程信息 -->
		<view class="will-details-head" >
			<view class="will-details-info">
				<view class="img">
					<image :src="courseDetails.institution.avatar" mode="aspectFill"></image>
				</view>
				<view class="right">
					<view class="will-details-title">
						{{courseDetails.name}}
					</view>
					<view class="will-details-time">
						<!-- -->
						<view class="title">上课时间：</view>
						<view class="content">{{courseDetails.class_time}} </view>
					</view>
					<view class="will-details-student">
						<view class="title">上课学生：</view>
						<view class="content">{{courseDetails.student_num}}人</view>
					</view>
					<view class="will-details-instatution">
						<view class="title">所属机构：</view>
						<view class="content">{{courseDetails.institution.edu_name}}</view>
					</view>
					<view class="will-details-instatution-address">
						<view class="title">机构地址：</view>
						<view class="content">{{address}}</view>
					</view>
				</view>
			</view>
			<view class="course-assign" v-if="courseDetails.status==0" @click="signIn">
				上课签到
			</view>
			<view class="course-assign" v-if="courseDetails.status==1" @click="signOut">
				下课签退
			</view>
			<view class="course-assign" v-if="courseDetails.status==2">
				已签退
			</view>
		</view>
		<!-- 点名区域 -->
		<view class="will-details-name" v-if="courseDetails.status==1">
			<view class="control">
				<view :class="active==0?'actives':''" @click="slider(0)">未点名学生</view>
				<view :class="active==1?'actives':''" @click="slider(1)">已点名学生</view>
			</view>
			<view class="name-details">
				<view v-if="active==0">
					<not-name :id="cid"></not-name>
				</view>
				<view v-if="active==1">
					<has-named :id="cid"></has-named>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import notName from './notNamed.vue'
	import hasNamed from './hasNamed.vue'
	export default {
		components:{
			notName,
			hasNamed
		},
		data() {
			return {
				 cid:'',						//课程id
				 active: 0,					//选中的item
				 courseDetails:'',	//课程详情
			};
		},
		onLoad(option) {
			this.cid = option.id
			this.getDetails()
		},
		computed:{
			// 地区
			address(){
				return this.courseDetails.institution.profile_simple.province+this.courseDetails.institution.profile_simple.city+this.courseDetails.institution.profile_simple.region+this.courseDetails.institution.profile_simple.address
			}
		},
		methods:{
			// 签退
			signOut(){
				this.$request.post('schedule/index/signout',{
					id:this.cid
				}).then(res=>{
					console.log(res)
					this.$queue.showToast(res.msg)
					this.getDetails()
				})
			},
			// 签到
			signIn(){
				this.$request.post('schedule/index/signin',{
					id:this.cid
				}).then(res=>{
					this.$queue.showToast(res.msg)
					this.getDetails()
				})
			},
			
			// 详情
			getDetails(){
				this.$request.post('schedule/index/details',{
					id:this.cid
				}).then(res=>{
					console.log(res)
					this.courseDetails = res.result
				})
			},
			// 切换
			slider(index){
				this.active = index
			}
		}
	}
</script>

<style lang="scss">
	.will-details{
		width: 750rpx;
		min-height: 100vh;
		background:rgba(245,245,245,1);
		.will-details-head{
			width: 750rpx;
			padding: 30rpx;
			box-sizing: border-box;
			background-color: #FFFFFF;
			.will-details-info{
				width: 100%;
				display: flex;
				justify-content: space-between;
				.img{
					width:244rpx;
					height:242rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.right{
					.will-details-title{
						font-size:28rpx;
						font-family:PingFangSC-Medium,PingFang SC;
						font-weight:600;
						color:rgba(51,51,51,1);
						margin-bottom: 10rpx;
					}
					.will-details-time,
					.will-details-student,
					.will-details-instatution,
					.will-details-instatution-address{
						display: flex;
						justify-content: space-between;
						margin-bottom: 10rpx;
						width: 432rpx;
						font-size:24rpx;
						color:rgba(0,0,0,0.5);
						
						.title{
							width: 130rpx;
						}
						.content{
							width: 330rpx;
						}
					}
					.will-details-instatution-address{
						margin: 0;
					}
				}
			}
			.course-assign{
				margin: 0 auto;
				margin-top: 40rpx;
				width:400rpx;
				line-height: 60rpx;
				text-align: center;
				background:rgba(0,183,244,1);
				border-radius:30rpx;
				font-size:32rpx;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:600;
				color:rgba(255,255,255,1);
			}
		}
		.will-details-name{
			margin-top: 20rpx;
			width: 750rpx;
			min-height: calc(100vh - 432rpx);
			background-color: #FFFFFF;
			.control{
						padding: 24rpx 0;
						box-sizing: border-box;
						width: 412rpx;
						margin: 0 auto;
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
		.name-details{
			
		}
	}
</style>
