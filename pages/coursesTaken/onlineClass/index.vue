<template>
	<view class="online-course">
		<view class="course-btn">
			<view class="online" :class="isActive==2?'active':''" @click="changeItem(2)">已上线</view>
			<view class="audit" :class="isActive==1?'active':''" @click="changeItem(1)">审核中</view>
			<view class="reject" :class="isActive==3?'active':''" @click="changeItem(3)">已拒绝</view>
		</view>
		<view class="course-content">
			<view v-if="isActive==2">
				<block v-for="(item,index) in onlineList" :key="index">
					<view class="to-be-online" @click="goDetails(item.id)">
						<view class="onlineed-cover">
							<image :src="item.cover" mode="aspectFill"></image>
							<view class="tag-prive" v-if="item.onlineCourse.ifopen==0">
								私有课
							</view>
							<view class="tag-common" v-if="item.onlineCourse.ifopen==1">
								公共课
							</view>
						</view>
						<view class="onlineed-info">
							<view class="onlineed-title">
								{{item.onlineCourse.name}}
							</view>
							<view class="onlineed-time">
								录制章节：{{item.title}}
							</view>
							<view class="onlineed-student">
								上线时间：{{item.delivery_at}}
							</view>
							<view class="onlineed-instatution">
								所属机构：{{item.onlineCourse.institution.edu_name}}
							</view>
						</view>
					</view>
				</block>
			</view>
			<view v-if="isActive==1">
				<block v-for="(item,index) in onlineList" :key="index">
					<view class="to-be-auditing" @click="goDetails(item.id)">
						<view class="auditinged-cover">
							<image :src="item.cover" mode="aspectFill"></image>
							<view class="tag-prive" v-if="item.onlineCourse.ifopen==0">
								私有课
							</view>
							<view class="tag-common" v-if="item.onlineCourse.ifopen==1">
								公共课
							</view>
						</view>
						<view class="auditinged-info">
							<view class="auditinged-title">
								{{item.onlineCourse.name}}
							</view>
							<view class="auditinged-time">
								录制章节：{{item.title}}
							</view>
							<view class="auditinged-student">
								上线时间：{{item.delivery_at}}
							</view>
							<view class="auditinged-instatution">
								所属机构：{{item.onlineCourse.institution.edu_name}}
							</view>
						</view>
					</view>
				</block>
			</view>
			<view v-if="isActive==3">
				<block v-for="(item,index) in onlineList" :key="index">
					<view class="to-be-reject" @click="goDetails(item.id)">
						<view class="rejected-cover">
							<image :src="item.cover" mode="aspectFill"></image>
							<view class="tag-prive" v-if="item.onlineCourse.ifopen==0">
								私有课
							</view>
							<view class="tag-common" v-if="item.onlineCourse.ifopen==1">
								公共课
							</view>
						</view>
						<view class="rejected-info">
							<view class="rejected-title">
								{{item.onlineCourse.name}}
							</view>
							<view class="rejected-time">
								录制章节：{{item.title}}
							</view>
							<view class="rejected-student">
								上线时间：{{item.delivery_at}}
							</view>
							<view class="rejected-instatution">
								所属机构：{{item.onlineCourse.institution.edu_name}}
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isActive:2,																		//选中
				status:'',																		//状态
				onlineList:[],																//已上线列表
				pages:0,																			//页码
				pageSize:'',																	//页数
				count:'',																			//总量
				timer:null
			};
		},
		mounted() {
			this.handleoffline()
		},
		methods:{
			// 滚动加载
			scrollBottom(){
				if(this.pages*this.pageSize<this.count){
					this.handleoffline()
				}else{
					this.$queue.showToast('没有更多了')
				}
			},
			// 已上线上课列表
			handleoffline(){
				this.$queue.showLoading('加载中...')
				this.$request.post('catalog/index/completed_list',{
					status:this.isActive,
					pages:this.pages,
				}).then(res=>{
					console.log(res)
					uni.hideLoading();
					this.count = res.result.count
					this.pageSize=res.result.PageSize
					this.onlineList = this.onlineList.concat(res.result.list) 
					this.pages++
				})
			},
			// 详情
			goDetails(id){
				uni.navigateTo({
					url:'/pages/coursesTaken/onlineClass/details?id='+id
				})
			},
			// 选项卡
			changeItem(index){
				this.isActive = index
				this.status = index
				this.onlineList =[]
				this.pages = 0
				// 节流
				if (this.timer) {
					clearTimeout(this.timer)
				}
				this.timer = setTimeout(() => {
					this.handleoffline()
				}, 500)

			}
		}
	}
</script>

<style lang="scss">
.online-course{
	.course-btn{
		margin: 0 auto;
		width: 618rpx;
		height: 172rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		.online,.audit,.reject{
			flex: 1;
			width:192rpx;
			height:76rpx;
			font-size:28rpx;
			font-family:PingFangSC-Regular,PingFang SC;
			color:rgba(0,0,0,0.5);
			line-height:40rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.online{
			border:2rpx solid rgba(0,0,0,0.1);
			border-right: none;
			border-radius:4rpx 0rpx 0rpx 4rpx;
		}
		.audit{
			border:2rpx solid rgba(0,0,0,0.1);
			border-right: none;
		}
		.reject{
			border:2rpx solid rgba(0,0,0,0.1);
			border-radius:0rpx 4rpx 4rpx 0rpx;
		}
		.active{
			background-color: #00B7F4;
			color: #FFFFFF;
		}
	}
	.course-content{
		.to-be-online{
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 50rpx;
					.onlineed-cover{
						position: relative;
						width:244rpx;
						height:244rpx;
						margin-right: 18rpx;
						image{
							width: 100%;
							height: 100%;
						}
						.tag-prive{
							position: absolute;
							top: 0;
							left: 0;
							width:97rpx;
							height:50rpx;
							background:rgba(219,0,0,1);
							border-radius:8rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							font-size:24rpx;
							font-family:PingFangSC-Regular,PingFang SC;
							color:rgba(255,255,255,1);
						}
						.tag-common{
							position: absolute;
							top: 0;
							left: 0;
							width:97rpx;
							height:50rpx;
							background:rgba(0,183,244,1);
							border-radius:8rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							font-size:24rpx;
							font-family:PingFangSC-Regular,PingFang SC;
							color:rgba(255,255,255,1);
						}
					}
					.onlineed-info{
						view ~ view {
							margin-top: 14rpx;
						}
						.onlineed-title{
							width: 442rpx;
							font-size:32rpx;
							font-family:PingFangSC-Medium,PingFang SC;
							font-weight:600;
							color:rgba(51,51,51,1);
							line-height:44rpx;
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
						}
						.onlineed-time,
						.onlineed-student,
						.onlineed-instatution{
							width: 442rpx;
							
							font-size:28rpx;
							font-family:PingFangSC-Regular,PingFang SC;
							color:rgba(0,0,0,0.5);
						}
					}
				}
	}
	
	// 待审核
	.to-be-auditing{
		display: flex;
		align-items: center;
		margin-bottom: 50rpx;
		.auditinged-cover{
			position: relative;
			width:244rpx;
			height:244rpx;
			margin-right: 18rpx;
			image{
				width: 100%;
				height: 100%;
			}
			.tag-prive{
				position: absolute;
				top: 0;
				left: 0;
				width:97rpx;
				height:50rpx;
				background:rgba(219,0,0,1);
				border-radius:8rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size:24rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				color:rgba(255,255,255,1);
			}
			.tag-common{
				position: absolute;
				top: 0;
				left: 0;
				width:97rpx;
				height:50rpx;
				background:rgba(0,183,244,1);
				border-radius:8rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size:24rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				color:rgba(255,255,255,1);
			}
		}
		.auditinged-info{
			view ~ view {
				margin-top: 14rpx;
			}
			.auditinged-title{
				font-size:32rpx;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:600;
				color:rgba(51,51,51,1);
				line-height:44rpx;
			}
			.auditinged-time,
			.auditinged-student,
			.auditinged-instatution{
				width: 442rpx;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				font-size:28rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				color:rgba(0,0,0,0.5);
			}
		}
	}
	// 已拒绝
	.to-be-reject{
		display: flex;
		align-items: center;
		margin-bottom: 50rpx;
		.rejected-cover{
			position: relative;
			width:244rpx;
			height:244rpx;
			margin-right: 18rpx;
			image{
				width: 100%;
				height: 100%;
			}
			.tag-prive{
				position: absolute;
				top: 0;
				left: 0;
				width:97rpx;
				height:50rpx;
				background:rgba(219,0,0,1);
				border-radius:8rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size:24rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				color:rgba(255,255,255,1);
			}
			.tag-common{
				position: absolute;
				top: 0;
				left: 0;
				width:97rpx;
				height:50rpx;
				background:rgba(0,183,244,1);
				border-radius:8rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size:24rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				color:rgba(255,255,255,1);
			}
		}
		.rejected-info{
			view ~ view {
				margin-top: 14rpx;
			}
			.rejected-title{
				font-size:32rpx;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:600;
				color:rgba(51,51,51,1);
				line-height:44rpx;
			}
			.rejected-time,
			.rejected-student,
			.rejected-instatution{
				width: 442rpx;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				font-size:28rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				color:rgba(0,0,0,0.5);
			}
		}
	}
}
</style>
