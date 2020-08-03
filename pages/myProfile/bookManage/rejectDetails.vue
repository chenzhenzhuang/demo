<template>
	<view class="agree-box" v-if="details!=''">
		<view class="agree-head">
			<view class="to-be-Agreed">
					<view class="agree-cover">
						<image :src="details.institution.avatar" mode="aspectFill"></image>
					</view>
					<view class="agree-info">
						<view class="agree-instuaion">
							{{details.institution.edu_name}}
						</view>
						<view class="agree-time">
							时间：{{details.teacherReservationPeriod.date.slice(0,10)|times}} {{details.teacherReservationPeriod.started_at}}-{{details.teacherReservationPeriod.end_at}}
						</view>
						<view class="address">
							<view class="left">地址:</view>
							<view class="right">
								{{details.institution.profile.province}}{{details.institution.profile.city}}{{details.institution.profile.region}}{{details.institution.profile.address}}
							</view>
						</view>
						<view class="agree-tag">
							<view class="tag"  v-for="tag in details.institution.profile.courseCategory.courseCategorys" :key='tag.id'>{{tag.title}}</view>
						</view>
					</view>
				</view>
		</view>
		<view class="instatution-content">
			<view class="btn-box">
				<view class="left-btn"  :class="isActive==0?'avtive':''" @click="selectItem(0)">邀约说明</view>
				<view class="right-btn" :class="isActive==1?'avtive':''" @click="selectItem(1)">关于机构</view>
			</view>
			<view class="work">
				<view v-if="isActive==0">
					<view class="descript">
						{{details.content}}
					</view>
					<view class="reject-content">
						<view class="titles">拒绝原因</view>
						<view class="content">
							{{details.reason}}
						</view>
					</view>
				</view>
				<view v-if="isActive==1">
					<view class="title">
						环境展示
					</view>
					<view class="img-list">
						<view class="img-box">
							<view class="img" v-for="(item,index) in details.institution.profile.images" :key="index">
								<image :src="item" mode="aspectFill"></image>
							</view>
						</view>
						<view class="call" @click="handlePhone(details.institution.mobile)">
							<image src="/static/active-love.png" mode="aspectFill"></image>
							<view class="phone" >
								联系电话：{{details.institution.mobile}}
							</view>
						</view>
					</view>
					<!-- 机构介绍 -->
					<view class="instro">
						<view class="title">机构介绍</view>
						<view class="content">
							 <rich-text :nodes="nodes"></rich-text>
						</view>
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
				details:'',																		//详情
				isActive:0,																		//选中
				nodes:'<div style="text-align:center;"><img src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png"/></div>'
			};
		},
		onLoad(option) {
			this.id = option.id
			this.getDetails()
		},
		methods:{
			// 详情
			getDetails(){
				this.$request.post('reservation/index/details',{
					id:this.id
				}).then(res=>{
					console.log(res)
					this.details = res.result
					this.nodes = res.result.institution.profile.content
				})
			},
			// 拨打电话
			handlePhone(phone){
				window.location.href = `tel:${phone}`
			},
			// 选中项
			selectItem(index){
				this.isActive = index
			},
		}
	}
</script>

<style lang="scss">
	.agree-box{
		min-height: 100vh;
		background: #F5F5F5;
		.agree-head{
			width: 750rpx;
			height: 290rpx;
			padding: 20rpx 30rpx;
			box-sizing: border-box;
			background-color: #FFFFFF;
			.to-be-Agreed{
				display: flex;
				margin-bottom: 40rpx;
				.agree-cover{
					width:244rpx;
					height:242rpx;
					margin-right: 20rpx;
					image{
						width: 100%;
						height: 100%;
						border-radius: 14rpx;
					}
				}
				.agree-info{
					.agree-instuaion{
						font-size:28rpx;
						font-family:PingFangSC-Medium,PingFang SC;
						font-weight:600;
						color:rgba(51,51,51,1);
						line-height:40rpx;
						margin-bottom: 22rpx;
					}
					.agree-time{
						font-size:24rpx;
						font-family:PingFangSC-Regular,PingFang SC;
						color:rgba(102,102,102,1);
						margin-bottom: 20rpx;
					}
					.address{
						display: flex;
						font-size:24rpx;
						font-family:PingFangSC-Regular,PingFang SC;
						font-weight:400;
						color:rgba(102,102,102,1);
						margin-bottom: 26rpx;
						.left{
							width: 60rpx;
						}
						.right{
							margin-left: 12rpx;
							width:360rpx;
							font-size:24rpx;
							font-family:PingFangSC-Regular,PingFang SC;
							font-weight:400;
							color:rgba(102,102,102,1);
							line-height:34rpx;
						}
					}
					.agree-tag{
						display: flex;
						align-items: center;
						view{
							line-height: 32rpx;
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
		}
		.instatution-content{
			min-height: calc(100vh - 310rpx);
			margin-top: 20rpx;
			background-color: #FFFFFF;
			padding: 0 30rpx;
			box-sizing: border-box;
			.btn-box{
				height: 128rpx;
				width: 408rpx;
				margin: 0 auto;
				display: flex;
				align-items: center;
				justify-content: center;
				.left-btn,.right-btn{
					height: 60rpx;
					width: 204rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size:28rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					color:rgba(49,49,49,1);
					font-weight:400;
					border: 1rpx solid rgba(214,214,214,1);
				}
				.left-btn{
					border-radius:40rpx 0rpx 0rpx 40rpx;
					border-right: none;
				}
				.right-btn{
					border-radius:0rpx 40rpx 40rpx 0rpx;
				}
				.avtive{
					background:rgba(0,183,244,1);
					color: #FFFFFF;
					border: 1rpx solid rgba(0,183,244,1);
				}
			}
			.work{
				.descript{
					width:692rpx;
					height:300rpx;
					background:rgba(245,245,245,1);
					border-radius:12rpx;
					padding: 22rpx;
					box-sizing: border-box;
					font-size:24rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(0,0,0,0.25);
					line-height:34rpx;
				}
				.reject-content{
					margin-top: 32rpx;
					.titles{
						font-size:32rpx;
						font-family:PingFangSC-Medium,PingFang SC;
						font-weight:600;
						color:rgba(226,67,75,1);
					}
					.content{
						margin-top: 10rpx;
						width:692rpx;
						height:242rpx;
						padding: 18rpx;
						box-sizing: border-box;
						border-radius:8rpx;
						border:2rpx solid rgba(238,238,238,1);
						font-size:28rpx;
						font-family:PingFangSC-Regular,PingFang SC;
						font-weight:400;
						color:rgba(153,153,153,1);
					}
				}
				.title{
					width:112rpx;
					font-size:28rpx;
					font-family:PingFangSC-Medium,PingFang SC;
					font-weight:600;
					color:rgba(51,51,51,1);
					line-height:72rpx;
				}
				.img-list{
					display: flex;
					align-items: center;
					flex-direction: column;
					.img-box{
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;
						.img{
							width: 214rpx;
							height: 210rpx;
							image{
								width: 100%;
								height: 100%;
								border-radius: 8rpx;
							}
					}
					
					}
					.call{
						display: flex;
						align-items: center;
						justify-content: center;
						height: 80rpx;
						image{
						width:24rpx;
						height:24rpx;
						}
						.phone{
							margin-left: 8rpx;
							font-size:24rpx;
							font-family:PingFangSC-Regular,PingFang SC;
							font-weight:400;
							color:rgba(51,51,51,1);
							line-height:34rpx;
						}
					}
				}
				.instro{
					margin-top: 24rpx;
					.title{
						width:112rpx;
						font-size:28rpx;
						font-family:PingFangSC-Medium,PingFang SC;
						font-weight:600;
						color:rgba(51,51,51,1);
						line-height:72rpx;
					}
					.content{
						width:690rpx;
						// height:222rpx;
						padding: 22rpx;
						box-sizing: border-box;
						border-radius:8rpx;
						border:2rpx solid rgba(238,238,238,1);
					}
				}
				
			}
		}
	}
</style>
