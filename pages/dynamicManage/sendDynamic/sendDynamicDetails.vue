<template>
	<view class="send-dynamic-details" v-if="dynamicContent!=''">
		<view class="send-dynamic-item">
			<view class="img">
				<video :src="dynamicContent.video_url" :poster="dynamicContent.cover" :show-center-play-btn="false" controls></video>
			</view>
			<view class="describe">
				{{dynamicContent.content}}
			</view>
			<view class="dynamic-info">
				<view class="send-times">
					发布时间：{{dynamicContent.created_at|times}}
				</view>
				<view class="count">
					<view>点赞：{{dynamicContent.like}}</view>
					<view>转发：{{dynamicContent.share}}</view>
				</view>
			</view>
		</view>
		<!-- 评论 -->
		<view class="comment">
			<view class="title">
				全部评论({{dynamicContent.comment}})
			</view>
			<scroll-view scroll-y="true" class="scroll-comment">
				<block v-for="item in commentList" :key="item.id">
					<view class="comment-item">
						<view class="item-left">
							<image :src="item.member.avatar" mode="aspectFill"></image>
						</view>
						<view class="item-right">
							<view class="info">
								<view class="name">{{item.member.nickname}}</view>
								<view class="content">{{item.content}}</view>
								<view class="date">
									<view class="time">{{item.created_at}}</view>
									<view class="reply" @click="handleReply(item.id,item.member.nickname)">回复</view>
								</view>
								<view class="check-btn" @click="goReply(item.id)" v-if="item.memberDynamicCommentReply.length>0">
									<view>查看全部{{item.memberDynamicCommentReply.length}}条评论 > </view>
									
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
				</block>
			</scroll-view>
		</view>
		<view class="reply-btn">
			<input type="text" v-model="replyContent" placeholder="请输入回复的内容">
			<view class="btn" :class="replyContent?'select-btn':''" @tap="send">发送</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				commentList:[],															//评论列表
				dynamicContent:'',													//动态详情
				replyContent:'',														//回复内容
				id:'',																			//动态id
			};
		},
		onLoad(option) {
			this.id = option.id
			this.getDetails()
			this.getCommentList()
		},
		methods:{
			// 发表评论
			send(){
				this.$request.post('dynamic/comment/increase',{
					dynamic_id:this.id,
					content:this.replyContent
				}).then(res=>{
					this.$queue.showToast(res.msg)
					setTimeout(()=>{
						this.getCommentList()
					},500)
					this.replyContent = ''
				})
			},
			// 动态评论列表
			getCommentList(){
				this.$request.post('dynamic/dynamic/comments',{
					id:this.id
				}).then(res=>{
					console.log(res)
					this.commentList = res.result.list
				})
			},
			// 获取详情
			getDetails(){
				this.$request.post('dynamic/dynamic/details',{
					id:this.id
				}).then(res=>{
					console.log(res,111)
					this.dynamicContent = res.result
				})
			},
			// 回复
			handleReply(id,nick){
				uni.navigateTo({
					url:'/pages/dynamicManage/sendDynamic/commentDetails?id='+id+'&name='+nick+'&dynamicId='+this.dynamicContent.id
				})
			},
			// 回复
			goReply(id){
				uni.navigateTo({
					url:'/pages/dynamicManage/sendDynamic/commentDetails?id='+id+'&dynamicId='+this.dynamicContent.id
				})
			}
		}
	}
</script>

<style lang="scss">
	.send-dynamic-details{
		min-height: 100vh;
		position: relative;
		.send-dynamic-item{
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			border-bottom: 2rpx solid #EEEEEE;
			.img{
				width:750rpx;
				height:400rpx;
				video{
					width: 100%;
					height: 100%;
				}
			}
			.describe{
				padding: 0 38rpx;
				box-sizing: border-box;
				margin: 20rpx 0 12rpx 0;
				height: 88rpx;
				overflow: hidden;
				font-size:28rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(153,153,153,1);
				line-height:40rpx;
			}
			.dynamic-info{
				display: flex;
				align-items: center;
				justify-content: space-between;
				// width: 672rpx;
				padding: 0 38rpx;
				box-sizing: border-box;
				margin-bottom: 34rpx;
				.send-times{
					font-size:24rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(153,153,153,1);
					line-height:34rpx;
				}
				.count{
					display: flex;
					align-items: center;
					font-size:24rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(153,153,153,1);
					line-height:34rpx;
					view ~ view {
						margin-left: 40rpx;
					}
				}
			}
		}
		.comment{
			padding: 0 30rpx;
			box-sizing: border-box;
			.title{
				line-height: 100rpx;
				font-size:28rpx;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:600;
				color:rgba(51,51,51,1);
			}
			.scroll-comment{
				height: calc(100vh - 812rpx);
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
					width: 592rpx;
					display: flex;
					justify-content: space-between;
					border-bottom: 2rpx solid #EEEEEE;
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
							.reply{
								width:48rpx;
								height:34rpx;
								font-size:24rpx;
								font-family:PingFangSC-Regular,PingFang SC;
								font-weight:400;
								color:rgba(0,183,244,1);
								line-height:34rpx;
							}
						}
						.check-btn{
							display: flex;
							align-items: center;
							justify-content: center;
							width:266rpx;
							height:52rpx;
							background:rgba(222,222,222,1);
							border-radius:26rpx;
							font-size:24rpx;
							font-family:PingFangSC-Regular,PingFang SC;
							font-weight:400;
							color:rgba(255,255,255,1);
							line-height:34rpx;
							margin-bottom: 12rpx;
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
			position: fixed;
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
