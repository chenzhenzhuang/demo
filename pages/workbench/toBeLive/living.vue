<template>
	<view class="live-box">
		<view class="online-people">
			<view class="live-head">
				<view class="head-left">
					<view class="title">在线学生</view>
					<view class="count">({{onlinePeopleList.length}}人)</view>
				</view>
				<!-- 展开 -->
				<view class="head-right" v-if="isShowStudentList==false" @click="isShowStudentList=true">
					展开
					<view class="img">
						<image src="/static/turpLower.png" mode="aspectFill"></image>
					</view>
				</view>
				<!-- 收起 -->
				<view class="head-right" v-if="isShowStudentList==true" @click="isShowStudentList=false">
					收起
					<view class="img">
						<image src="/static/turnUp.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<view class="people-list" v-if="isShowStudentList">
				<block v-for="(item,index) in onlinePeopleList" :key="index">
					<view class="item-list">
						<view class="left">
							<view class="img">
								<image :src="item.avatar"></image>
								<!-- <image src="/static/gril.png" mode="" class="sex" v-if="item.profile.sex==0"></image>
								<image src="/static/boy.png" mode="" class="sex" v-if="item.profile.sex==1"></image> -->
							</view>
							<view class="name">{{item.nickname}}</view>
						</view>
						<view class="right">
							<text>禁言</text>
							<text>踢出</text>
						</view>
					</view>
				</block>
			</view>
		</view>
		<view class="video">
			<view class="play-time">已播时间：15:15</view>
			<video id="previewVideo" autoplay muted object-fit="cover"></video>
		</view>
		<view class="chat-box">
			<scroll-view scroll-y="true" class="chart" ref="msgBox">
				<view class="common-item" >
					<block v-for="(item,index) in sendMsgInfo" :key="index">
						<view class="common-item-box" v-show="item.roomId==roomId">
							<view class="left">
								<view class="head-img">
									<image :src="item.avatar" mode="aspectFill"></image>
									<image src="/static/gril.png" mode="" class="sex" v-if="item.sex==0"></image>
									<image src="/static/boy.png" mode="" class="sex" v-if="item.sex==1"></image>
								</view>
								
							</view>
							<view class="right">
								<view class="name">
									{{item.nickname}}
								</view>
							<view class="contetn-box">
								<view class="icon"></view>
								<view class="content">
									<text>{{item.msg}}</text>
								</view>
							</view>
							</view>
						</view>
					</block>
				</view>
			</scroll-view>
			<view class="send-box">
				<view class="stop" @click="loginOutRoom">结束直播</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		ZegoExpressEngine
	} from 'zego-express-engine-webrtc'
	export default {
		data() {
			return {
				question: '',																			 //回答问题
				accesToken: '',																			 //token
				onlinePeopleList:[],															//在线人数
				roomId: '', 																			//房间id
				uId: '', 																					//用户id
				uName: '', 																			//用户名
				userCount: 0, 																		//在线人数
				previewStream: '', 																//流信息
				zg: '',
				streamId: '', 																		//流id
				isShowStudentList: false, 												//是否展开在线学生列表
				sendMsgInfo: [], 																	//学生的消息
				lockReconnect: false,														 //避免重复连接的开关
				timeoutObj: '',																		//心跳心跳倒计时
				serverTimeoutObj: '',															//心跳倒计时
				ws: '', 																					//websocket对象
				timeoutnum: null, 																//断开 重连倒计时
				timeout: 30 * 1000, 															//30秒一次心跳
			};
		},
		onLoad(option) {
			this.$request.post('broadcast/sdk/access_token').then(res => {
				console.log(res)
				this.accesToken = res.result.data.access_token
				this.getOnlinePeople()
			})
			
			
			this.roomId = option.roomId
			this.startLive()
			this.createWebSocket()
			
		},
		onShow() {
			// this.getOnlineCount()
			if(this.accesToken!=''){
				this.getOnlinePeople()
			}
		},
		methods: {
			// 获取在线人数名
			getOnlinePeople(){
				this.$request.post('broadcast/sdk/user_list',{
						broadcast_id:this.roomId,
						access_token:this.accesToken
					}).then(res=>{
						this.onlinePeopleList = res.result
						 setTimeout(() => {
						   this.getOnlinePeople()
						}, 5000);
					})
			},
			// 触底更新
			scrollBottm() {
				let el = this.$refs.msgBox;
				
			},
			// 创建websocket
			createWebSocket() {
				this.ws = new WebSocket('wss://im.xyyun.co/wss');
				this.ws.onopen = () => {
					this.start();
				}
				this.ws.onmessage = (e) => {
					let type = JSON.parse(e.data)
					if (type.msg == '连接成功') {

					} else {
						let resData = JSON.parse(e.data);
						this.sendMsgInfo = [...this.sendMsgInfo, resData]
						this.scrollBottm()
					}
					this.reset();
				};
				this.ws.onclose = () => {
					console.log("连接关闭");
					this.sendMsg()
					this.reconnect()
				};
				this.ws.onerror = (e) => {
					this.reconnect()
				};
			},
			// websock连接不上处理
			reconnect() {
				if (this.lockReconnect) return;
				this.lockReconnect = true;
				//没连接上会一直重连，设置延迟避免请求过多
				this.timeoutnum && clearTimeout(this.timeoutnum)
				this.timeoutnum = setTimeout(() => {
					this.createWebSocket();
					this.lockReconnect = false;
				}, 5000)
			},
			// 心跳包开始
			start() {
				this.timeoutObj && clearTimeout(this.timeoutObj)
				this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
				this.timeoutObj = setTimeout(() => {
					//这里发送一个心跳，后端收到后，返回一个心跳消息，
					console.log(this.ws)
					if (this.ws.readyState == 1) {
						const obj = {
							broadcast_id: 1,
							uid: "",
							nickname: '',
							avatar: '',
							msg: '',
							time: '',
							type: "heartbeat",
							is_teacher: ''
						}
						this.ws.send(JSON.stringify(obj))
					} else {
						this.reconnect()
					}
					this.serverTimeoutObj = setTimeout(() => {
						//超时关闭
						this.ws.close();
					}, this.timeout);

				}, this.timeout)
			},
			// 重置websocket
			reset() {
				//清除时间
				clearTimeout(this.timeoutObj);
				clearTimeout(this.serverTimeoutObj);
				//重启心跳
				this.start();
			},
			// 发短信
			sendMsg() {
				var date = new Date();
				var year = date.getFullYear(); //获取系统的年；
				var month = date.getMonth() + 1; //获取系统月份，由于月份是从0开始计算，所以要加1
				var day = date.getDate(); //获取系统日
				var hour = date.getHours(); //获取系统时间
				var minute = date.getMinutes(); //分
				var second = date.getSeconds(); //秒

				const obj = {
					broadcast_id: 1,
					uid: "4961255935824252",
					nickname: '2222',
					avatar: '',
					msg: '内容内容内容',
					time: year + '-' + month + '-' + day + ' ' + hour + ":" + minute + ":" + second,
					type: "message",
					is_teacher: 0
				};
				this.ws.send(JSON.stringify(obj));

			},
			// 获取在线人数
			// getOnlineCount() {
				
			// 		// 获取access_token
			// 		this.$request.post('broadcast/sdk/access_token').then(res => {
			// 			this.$request.post('broadcast/sdk/usercount', {
			// 				access_token: res.result.data.access_token,
			// 				room_ids: [`${this.roomId}`],
			// 			}).then(res => {
			// 				console.log(111)
			// 				this.userCount = res.result.data.count_array[0].user_count
			// 			})
			// 		})


			// },
			// 退出房间
			loginOutRoom() {
				
				this.$request.post('/broadcast/index/ended_at',{
					id:this.roomId
				}).then(res=>{
					// console.log(res)
					if(res.code==200){
						uni.showToast({
							title:'下播成功'
						})
						this.zg.stopPublishingStream(`${this.streamId}`)
						this.zg.destroyStream(this.previewStream)
						let videoPlay = document.querySelector('video');
						videoPlay.srcObject = null;
						this.zg.logoutRoom(this.roomId)
						setTimeout(()=>{
							uni.navigateBack()
						},500)
					}else{
						uni.showToast({
							title:'下播失败',
							icon:'none'
						})
					}
				})
			},
			// 推流
			startLive() {
				this.zg = new ZegoExpressEngine(4269792966, 'wss://webliveroom-test.zego.im/ws')
				this.$request.post('broadcast/sdk/token', {
					uid: this.$queue.getData('uid')
				}).then(res => {
					let loginToken = res.result
					
					this.$request.post('teacher/index/profile').then(res => {
						this.zg.loginRoom(this.roomId, loginToken, {
							userID: res.result.uid,
							userName: res.result.name,
						}).then(res => {
							if (res) {
								this.zg.createStream().then(res => {
									let previewStream = res
									this.previewStream = previewStream
									console.log(previewStream)
									this.streamId = res.id
									if (this.zg.startPublishingStream(this.streamId, previewStream)) {
										let videoPlay = document.querySelector('video');
										videoPlay.srcObject = previewStream;
										videoPlay.muted = false
									}
								}).catch(err => {
									console.log(err)
								})
							}
						})
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.live-box {
		.live-head {
			height: 60rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 46rpx 0 30rpx;
			box-sizing: border-box;

			.head-left {
				display: flex;
				align-items: center;

				.title {
					width: 120rpx;
					height: 42rpx;
					font-size: 30rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 600;
					color: rgba(51, 51, 51, 1);
				}

				.count {
					margin-left: 14rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 600;
					color: rgba(0, 0, 0, 0.25);
				}
			}

			.head-right {
				font-size: 28rpx;
				color: #00B7F4;
				display: flex;
				align-items: center;

				.img {
					width: 28rpx;
					height: 24rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-left: 4rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		.people-list{
			padding: 0 46rpx 0 30rpx;
			box-sizing: border-box;
			.item-list{
				width: 100%;
				height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.left{
					display: flex;
					align-items: center;
					.img{
						position: relative;
						width: 60rpx;
						height: 60rpx;
						image{
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
						.sex{
							position: absolute;
							bottom: 0;
							right: 0rpx;
							width:22rpx;
							height:22rpx;
						}
					}
					.name{
						margin: 15rpx;
						font-size:28rpx;
						font-family:PingFangSC-Regular,PingFang SC;
						font-weight:400;
						color:rgba(51,51,51,1);
					}
				}
				.right{
					width: 126rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size:24rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
				}
			}
		}
		.video {
			width: 750rpx;
			height: 504rpx;
			box-shadow: 0rpx 4rpx 14rpx 0rpx rgba(0, 0, 0, 0.25);
			position: relative;

			.play-time {
				width: 262rpx;
				height: 80rpx;
				background: rgba(0, 0, 0, 0.3);
				border-radius: 16rpx;
				position: absolute;
				top: 0rpx;
				left: 0rpx;
				font-size: 28rpx;
				z-index: 100;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			video {
				height: 100%;
				width: 100%;
				border-radius: 8rpx;
			}

		}

		.chat-box {
			.chart {
				height: calc(100vh - 688rpx);
				background: rgba(245, 245, 245, 1);

				.common-item {
					height: 100%;
					padding: 24rpx;
					box-sizing: border-box;
				}

				.common-item-box {
					display: flex;
					align-items: flex-start;
					margin-bottom: 28rpx;
				}

				.left {
					width: 88rpx;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					justify-content: center;

					.head-img {
						position: relative;
						width: 88rpx;
						height: 88rpx;

						image {
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}

						.sex {
							position: absolute;
							bottom: 0;
							right: 12rpx;
							width: 28rpx;
							height: 28rpx;
						}
					}

					
				}

				.right {
					margin-left: 20rpx;
					
					.name {
						margin: 0 auto;
						// margin-top: 10rpx;
						margin-bottom: 10rpx;
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						color: rgba(0, 0, 0, 0.85);
						line-height: 34rpx;
					}
					.contetn-box{
						position: relative;
						.content {
							position: relative;
							margin-left: 13rpx;
							background: rgba(203, 242, 255, 1);
							font-size: 28rpx;
							width: 100%;
							font-family: PingFangSC-Regular, PingFang SC;
							color: rgba(0, 0, 0, 0.85);
							padding: 12rpx 24rpx;
							box-sizing: border-box;
							z-index: 11;
						}
						
						.icon {
							width: 40rpx;
							height: 40rpx;
							transform: rotate(45deg);
							background-color: rgba(203, 242, 255, 1);
							position: absolute;
							top: 10rpx;
							left: 0rpx;
							z-index: 1;
						}
					}
				}

			}

			.send-box {
				width: 750rpx;
				position: fixed;
				bottom: 0;
				left: 0;
				height: 124rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				.stop {
					width: 350rpx;
					height: 90rpx;
					background: rgba(255, 37, 37, 0.91);
					box-shadow: 0rpx 4rpx 15rpx 0rpx rgba(245, 36, 36, 0.5);
					font-size: 34rpx;
					border-radius: 40rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 600;
					color: rgba(255, 255, 255, 0.85);
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}

		}
	}
</style>
