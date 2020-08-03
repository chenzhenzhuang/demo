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
							<view class="tag" v-for="tag in details.institution.profile.courseCategory.courseCategorys" :key='tag.id'>{{tag.title}}</view>
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
			<view class="btns-box">
				<view class="reject-btn" @click="handleRejectOpen">拒绝邀请</view>
				<view class="agree-btn" @click="handleAgree">同意邀请</view>
			</view>
		</view>
		<uni-popup ref="reject" type="center">
			<view class="update-introduction">
				<view class="introduction-title">
					<view class="title">拒绝理由</view>
				</view>
				<view class="update-area">
					<textarea v-model="rejectReason" placeholder-class="place-style" placeholder="请输入拒绝原因" maxlength="30"/>
					<view class="max-count">{{rejectReason.length}}/30</view>
				</view>
				<view class="submit">
					<view class="submit-btn" @click="handleRejectClose">
						确定
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components:{
			uniPopup
		},
		data() {
			return {
				id:'',																				//id
				details:'',																		//详情
				rejectReason:'',															//拒绝理由
				isActive:0,																		//选中
				nodes:''
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
			// 同意
			handleAgree(){
				this.$request.post('reservation/index/review',{
					status:'1',
					reason:'通过',
					id:this.id
				}).then(res=>{
					this.$queue.showToast(res.msg)
					setTimeout(()=>{
						uni.navigateBack()
					},500)
				})
			},
			// 打开拒绝详情
			handleRejectOpen(){
				this.$refs.reject.open()
			},
			// 关闭简介
			handleRejectClose(){
				if(this.rejectReason!=''){
					this.$request.post('reservation/index/review',{
						status:'3',
						reason:this.rejectReason,
						id:this.id
					}).then(res=>{
						console.log(res)
						this.$queue.showToast(res.msg)
						this.$refs.reject.close()
						setTimeout(()=>{
							uni.navigateBack()
						},500)
					})
				}else{
					this.$queue.showToast('请输入拒绝理由')
				}
			}
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
			.btns-box{
				margin: 60rpx 0;
				// height: 192rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 690rpx;
				.reject-btn{
					width:316rpx;
					height:80rpx;
					background:rgba(0,183,244,0.3);
					border-radius:44rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size:28rpx;
					font-family:PingFangSC-Medium,PingFang SC;
					font-weight:600;
					color:rgba(255,255,255,1);
				}
				.agree-btn{
					display: flex;
					align-items: center;
					justify-content: center;
					width:316rpx;
					height:80rpx;
					background:rgba(0,183,244,1);
					border-radius:44rpx;
					border:2rpx solid rgba(0,183,244,1);
					font-size:28rpx;
					font-family:PingFangSC-Medium,PingFang SC;
					font-weight:600;
					color:rgba(255,255,255,1);
				}
			}
		}
		
		.update-introduction{
			width:690rpx;
			height:610rpx;
			background:rgba(255,255,255,1);
			border-radius:20rpx;
			padding: 0 30rpx;
			box-sizing: border-box;
			.introduction-title{
				display: flex;
				align-items: center;
				justify-content: center;
				height: 82rpx;
				.title{
					font-size:28rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(255,0,0,1);
				}
			}
			.update-area{
				width:628rpx;
				height:380rpx;
				border-radius:8rpx;
				border:2rpx solid rgba(238,238,238,1);
				font-size:24rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(152,152,152,1);
				line-height:34rpx;
				position: relative;
				textarea{
					padding: 24rpx 28rpx;
					box-sizing: border-box;
					width: 100%;
					height: 100%;
					font-weight:600;
					color:rgba(49,49,49,1);
					border: none;
					outline: none;
					font-size:32rpx;
				}
				.place-style{
					font-size:24rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(152,152,152,1);
					line-height:34rpx;
				}
				.max-count{
					position: absolute;
					right: 16rpx;
					bottom: 22rpx;
					font-size:24rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(153,153,153,1);
				}
			}
			.submit{
				display: flex;
				align-items: center;
				justify-content: flex-end;
				
				.submit-btn{
					text-align: right;
					margin-top: 36rpx;
					width:200rpx;
					height:76rpx;
					background:rgba(0,183,244,1);
					border-radius:8rpx;
					font-size:28rpx;
					font-family:PingFangSC-Medium,PingFang SC;
					font-weight:600;
					color:rgba(255,255,255,1);
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}
</style>
