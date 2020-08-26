<template>
	<view class="comments" v-if="userComment!=''">
		<view class="comment-item">
			<view class="item-left">
				<image :src="userComment.result.memberDynamicComment.member.avatar" mode="aspectFill"></image>
			</view>
			<view class="item-right">
				<view class="info">
					<view class="name">
					{{userComment.result.memberDynamicComment.member.nickname}}
					<view class="author" v-show="userComment.result.memberDynamicComment.is_autho==1">作者</view>
					</view>
					<view class="content">{{userComment.result.memberDynamicComment.content}}</view>
					<view class="date">
						<view class="time">{{userComment.result.memberDynamicComment.created_at|times}}</view>
					</view>
				</view>
				<view class="loves">
					<view class="imgs">
						<image src="/static/love.png" mode=""></image>
						<!-- <image src="/static/active-love.png" mode="aspectFill"></image> -->
					</view>
					<view class="counts">{{userComment.result.memberDynamicComment.like}}</view>
				</view>
			</view>
		</view>
		<view class="all-reply">
			<view class="title">
				全部评论
			</view>
			<view class="comment-item" v-for="item in userComment.result.memberDynamicCommentReply" :key="item.id">
				<view class="item-left">
					<!-- <image :src="item.member.avatar" mode="aspectFill"></image> -->
				</view>
				<view class="item-right">
					<view class="info">
						<view class="name">
							<view class="reply-before">{{item.member.nickname}}</view>
							<view class="reply">回复</view>
							<view class="replyed-back">{{item.replayToMember.nickname}}</view>
						</view>
						<view class="content">{{item.content}}</view>
						<view class="date">
							<view class="time">{{item.created_at|times}}</view>
						</view>
					</view>
					<view class="loves">
						<view class="imgs">
							<image src="/static/love.png" mode=""></image>
							<!-- <image src="/static/active-love.png" mode="aspectFill"></image> -->
						</view>
						<view class="counts">{{item.like}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="reply-btn">
			<input type="text" v-model="reply"  :placeholder="placeName" v-if="replyName!=''">
			<input type="text" v-model="reply"  placeholder="请输入回复的内容"v-if="replyName ==''">
			<view class="btn" :class="reply?'select-btn':''" @click="send">发送</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dynamicId:'',																	//动态id
				replyName:'',																	//回复的名字
				reply:'',																			//回复内容
				userComment: '', 															//本条评论
				commentId:''																	//评论id
			}
		},
		onLoad(option) {
			this.replyName = option.name?option.name:''
			this.commentId = 	option.id												
			this.dynamicId = option.dynamicId		
			
		},
		onShow(){
			this.getComment()
		},
		computed:{
			placeName(){
				return '回复给：'+this.replyName
			}
		},
		methods:{
			// 发表评论
			send(){
				this.$request.post('dynamic/reply/increase',{
					comment_id:this.commentId,											//评论id
					dynamic_id:this.dynamicId,											//动态id
					content:this.reply,
					to_uid:this.userComment.result.memberDynamicComment.uid
					
				}).then(res=>{
					this.$queue.showToast(res.msg)
					setTimeout(()=>{
						this.getComment()
					},500)
					this.reply = ''
				})
			},
			// 获取评论列表
			getComment(){
				this.$request.post('dynamic/comment/details',{
					id:this.commentId,
					pages:0,
					limit:10,
				}).then(res=>{
					console.log(res)
					this.userComment = res.result
				})
			}
		}
	}
</script>

<style lang="scss">
	.comments{
		background:rgba(238,238,238,1);
		min-height: 100vh;
		width: 750rpx;
		position: relative;
		.comment-item{
			display: flex;
			justify-content: flex-start;
			padding: 28rpx;
			box-sizing: border-box;
			background-color: #FFFFFF;
			.item-left{
				width:80rpx;
				height:80rpx;
				image{
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			.item-right{
				margin-left: 18rpx;
				width: 592rpx;
				display: flex;
				justify-content: space-between;
				.info{
					.name{
						font-size:24rpx;
						font-family:PingFangSC-Medium,PingFang SC;
						font-weight:600;
						color:rgba(51,51,51,1);
						line-height:34rpx;
					}
					.content{
						font-size:24rpx;
						font-family:PingFangSC-Medium,PingFang SC;
						font-weight:600;
						color:rgba(51,51,51,1);
						line-height:34rpx;
						width: 546rpx;
					}
					.date{
						margin: 12rpx 0;
						.time{
							margin-right: 16rpx;
							height:34rpx;
							font-size:24rpx;
							font-family:PingFangSC-Regular,PingFang SC;
							font-weight:400;
							color:rgba(153,153,153,1);
							line-height:34rpx;
						}
					}
				}
				.loves{
					display: flex;
					align-items: center;
					justify-content: center;
					height: 30rpx;
					image{
						width: 28rpx;
						height: 28rpx;
					}
				.counts{
					font-size: 24rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(153,153,153,1);
					}
				}
			}
		}
		.all-reply{
			background-color: #FFFFFF;
			min-height: calc(100vh - 300rpx) ;
			margin-top: 20rpx;
			.title{
				line-height: 110rpx;
				font-size:32rpx;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:600;
				color:rgba(153,153,153,1);
				margin-left: 30rpx;
			}
			.comment-item{
				display: flex;
				justify-content: flex-start;
			
				
				.item-left{
					width:80rpx;
					height:80rpx;
					image{
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
				.item-right{
					margin-left: 18rpx;
					display: flex;
					justify-content: space-between;
					border-bottom: 2rpx solid #EEEEEE;
					.info{
						.name{
							font-size:24rpx;
							font-family:PingFangSC-Medium,PingFang SC;
							font-weight:600;
							display: flex;
							align-items: center;
							.reply-before{
								color: #333333;
							}
							.reply{
								width:48rpx;
								height:34rpx;
								font-size:24rpx;
								font-family:PingFangSC-Regular,PingFang SC;
								font-weight:400;
								color:rgba(153,153,153,1);
								line-height:34rpx;
								margin: 0 6rpx;
							}
							.replyed-back{
								font-size:24rpx;
								font-family:PingFangSC-Regular,PingFang SC;
								color:rgba(0,183,244,1);
								line-height:34rpx;
								color: #00B7F4;
							}
						}
						.content{
							font-size:24rpx;
							font-family:PingFangSC-Medium,PingFang SC;
							font-weight:600;
							color:rgba(51,51,51,1);
							line-height:34rpx;
							width: 546rpx;
						}
						.date{
							margin: 12rpx 0;
							display: flex;
							align-items: center;
							.time{
								margin-right: 16rpx;
								height:34rpx;
								font-size:24rpx;
								font-family:PingFangSC-Regular,PingFang SC;
								font-weight:400;
								color:rgba(153,153,153,1);
								line-height:34rpx;
							}
						}
					}
					.loves{
						display: flex;
						align-items: center;
						justify-content: center;
						height: 30rpx;
						image{
							width: 28rpx;
							height: 28rpx;
						}
					.counts{
						font-size: 24rpx;
						font-family:PingFangSC-Regular,PingFang SC;
						font-weight:400;
						color:rgba(153,153,153,1);
						}
					}
				}
			}
		}
		.reply-btn{
			position: absolute;
			bottom: 0;
			left: 0;
			width:750rpx;
			height:122rpx;
			background:rgba(255,255,255,1);
			
			box-shadow:0rpx -4rpx 8rpx 0rpx rgba(49,49,49,0.1);
			padding: 20rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			input{
				width:562rpx;
				height:76rpx;
				background:rgba(240,240,240,1);
				border-radius:38rpx;
				padding-left: 28rpx;
				font-size: 28rpx;
				box-sizing: border-box;
			}
			.btn{
				width:124rpx;
				height:66rpx;
				background:rgba(240,240,240,1);
				border-radius:38rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size:24rpx;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:600;
				color:rgba(0,0,0,0.5);
			}
			.select-btn{
				width:124rpx;
				height:66rpx;
				background:rgba(0,183,244,1);
				border-radius:38rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size:24rpx;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:600;
				color:rgba(255,255,255,1);
			}
		}
	}
</style>
