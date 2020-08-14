<template>
	<view class="data-manage">
		<view class="data-item" @click="upDateImg">
			<view class="title">头像</view>
			<view class="right">
				<image :src="info.avatar" mode="aspectFill" class="img"></image>
				<image src="/static/turnRight.png" mode="aspectFill" class="icon"></image>
			</view>
		</view>
		<view class="data-item">
			<view class="title">姓名</view>
			<view class="right">
				<view class="content">{{info.name}}</view>
			</view>
		</view>
		<picker mode="selector" :range="ageList" range-key="title"  @change="changeAge">
		<view class="data-item">
				<view class="title">年龄</view>
				<view class="right">
					<view class="content">{{info.profile.age}}岁</view>
					<image src="/static/turnRight.png" mode="aspectFill" class="icon"></image>
				</view>
		</view>
		</picker>
		<picker mode="selector" :range="sexList" range-key="title"  @change="changeSex">
		<view class="data-item">
			<view class="title">性别</view>
			<view class="right">
				<view class="content">{{info.profile.sex==1?'男':'女'}}</view>
				<image src="/static/turnRight.png" mode="aspectFill" class="icon"></image>
			</view>
		</view>
		</picker>
		<view class="data-item" @click="changeArea">
			<view class="title">所在地区</view>
			<view class="right">
				<view class="content">{{info.profile.province}}-{{info.profile.city}}-{{info.profile.region}}</view>
				<image src="/static/turnRight.png" mode="aspectFill" class="icon"></image>
			</view>
		</view>
		<view class="data-item" @click="changAddress">
			<view class="title">详细地址</view>
			<view class="right">
				<view class="content">{{info.profile.address}}</view>
				<image src="/static/turnRight.png" mode="aspectFill" class="icon"></image>
			</view>
		</view>
		<view class="data-item">
			<view class="title">所授课程</view>
			<view class="right">
				<view class="content">
					<view v-for="item in info.profile.teacherCourseCategory" :key="item.id">{{item.courseCategory.courseCategory.title}}-{{item.courseCategory.title}}/</view>
				</view>
		
			</view>
		</view>
		<view class="data-item" @click="changPhone">
			<view class="title">绑定手机号</view>
			<view class="right">
				<view class="content">{{info.mobile}}</view>
				<image src="/static/turnRight.png" mode="aspectFill" class="icon"></image>
			</view>
		</view>
		<view class="data-item" @click="changPwd">
			<view class="title">登录密码</view>
			<view class="right">
				<view class="content">******</view>
				<image src="/static/turnRight.png" mode="aspectFill" class="icon"></image>
			</view>
		</view>
		<view class="data-item" @click="changeIntro">
			<view class="title">个人简介</view>
			<view class="right">
			<view class="content">{{info.profile.content}}</view>
				<image src="/static/turnRight.png" mode="aspectFill" class="icon"></image>
			</view>
		</view>
		<!-- 修改地址 -->
		<uni-popup ref="address" type="bottom">
			<view class="update-address">
				<view class="address-title">
					<view class="left"></view>
					<view class="title">详细地址</view>
					<view class="right"></view>
				</view>
				<view class="update-area">
					<input type="text" v-model="address" placeholder-class="place-style" placeholder="请输入要修改的详细地址" class="change-address"/>
				</view>
				<view class="submit" @click="submitAddress">
					确定保存
				</view>
			</view>
		</uni-popup>
		<!-- 绑定手机 -->
		<uni-popup ref="phone" type="bottom">
			<view class="update-phone">
				<view class="phone-title">
					<view class="left"></view>
					<view class="title">绑定手机</view>
					<view class="right"></view>
				</view>
				<view class="update-area">
					<view class="phone">
						<view class="title">手机号:</view>
						<input type="text" v-model="phone" placeholder-class="place-style" placeholder="请输入要修改的手机号码" />
						<view class="send" @click="handleCode">{{codeText}}</view>
					</view>
					<view class="code">
						<view class="title">验证码:</view>
						<input type="text" v-model="code" placeholder-class="place-style" placeholder="请输入验证码" />
					</view>
				</view>
				<view class="submit" @click="submitPhone">
					确定保存
				</view>
			</view>
		</uni-popup>
		<!-- //修改密码 -->
		<uni-popup ref="pwd" type="bottom">
			<view class="update-pwd">
				<view class="pwd-title">
					<view class="left"></view>
					<view class="title">修改密码</view>
					<view class="right"></view>
				</view>
				<view class="update-area">
					<view class="phone">
						<view class="title">手机号:</view>
						<input type="text" v-model="pwdPhone" placeholder-class="place-style" placeholder="请输入要修改的手机号码" />
						<view class="send" @click="handlePwdCode">{{pwdText}}</view>
					</view>
					<view class="change-item">
						<view class="title">验证码:</view>
						<input type="text" v-model="pwdCode" placeholder-class="place-style" placeholder="请输入验证码" />
					</view>
					<view class="change-item">
						<view class="title">新密码:</view>
						<input type="text" v-model="newPwd" placeholder-class="place-style" placeholder="请输入验证码" />
					</view>
					<view class="change-item">
						<view class="title">确认密码:</view>
						<input type="text" v-model="confrimPwd" placeholder-class="place-style" placeholder="请输入验证码" />
					</view>
				</view>
				<view class="submit" @click="submitPwd">
					确定保存
				</view>
			</view>
		</uni-popup>
		<!-- 个人简介 -->
		<uni-popup ref="introduction" type="center">
			<view class="update-introduction">
				<view class="introduction-title">
					<view class="left"></view>
					<view class="title">个人简介</view>
					<view class="right"></view>
				</view>
				<view class="update-area">
					<textarea v-model="introation" placeholder-class="place-style" placeholder="填写个人简介容易让学生了解你，点击此处添加" maxlength="50"/>
					<view class="max-count">{{introation.length}}/50</view>
				</view>
				<view class="submit">
					<view class="submit-btn" @click="submitIntro">
						确定
					</view>
				</view>
			</view>
		</uni-popup>
		<city-pick ref="selectCity" @onConfirm="selectArea"></city-pick>
	</view>
</template>

<script>
	import cityPick from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components:{
			 uniPopup,
			 cityPick
		},
		data() {
			return {
				info:'',																							//资料信息
				name:'',																							//修改的名字
				address:'',																						//详细地址
				phone:'',																							//手机号
				code:'',																							//验证码
				ageList:[],																						//年龄
				pwdPhone:'',																					//修改密码手机号
				pwdCode:'',																						//修改密码验证码
				newPwd:'',																						//修改密码新密码
				confrimPwd:'',																				//修改密码确认密码
				introation:'',																				//个人简介
				codeSwitch:true,																			//手机
				codeText:'获取验证码',
				pwdSwitch:true,
				pwdText:'获取验证码',
				sexList:[{'value':'0','title':'我是女生'},{'value':'1','title':'我是男生'}],
				timer:null,																					//节流
			};
		},
		onLoad() {
			// this.getAgeList()
			this.getInfo()
		},
		
		methods:{
			// 修改头像
			upDateImg(){
				uni.chooseImage({
				    count: 1, 														//默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album','camera'], 			//从相册选择
				    success: (res)=> {
							let headImg = res.tempFilePaths[0]
							let token = uni.getStorageSync('token')
							this.$queue.showLoading()
							uni.uploadFile({
									url: 'https://yeapp.xyyun.co/upload/upload/images',
									filePath: headImg,
									name: 'images',
									header: {
										token
									},
									success: (res) => {
										uni.hideLoading()
										let avatar = JSON.parse(res.data)
										this.$request.post('teacher/index/avatar',{
											avatar:avatar.result
										}).then(res=>{
											this.$queue.showToast(res.msg)
											this.getInfo()
										})
									}
							});	
				    }
				});
			},
			// 个人信息
			getInfo(){
				this.$request.post('teacher/index/profile').then(res=>{
					console.log(res)
					this.info = res.result
				})
			},
			// 选择地区
			changeArea(){
				this.$refs.selectCity.show()
			},
			// 选择地区的值
			selectArea(e){
				let [province,city,region] = e.label.split('-')
				console.log(province,city,region)
				this.$request.post('/teacher/index/area',{
					province,
					city,
					region,
				}).then(res=>{
					this.$queue.showToast(res.msg)
					this.getInfo()
				})
			},
			// 选择性别
			changeSex(e){
				this.$request.post('teacher/index/sex',{
					sex:e.detail.value
				}).then(res=>{
					this.$queue.showToast(res.msg)
					this.getInfo()
				})
			},
			// 选择年龄
			changeAge(e){
				this.$request.post('teacher/index/age',{
					age:e.detail.value
				}).then(res=>{
					this.$queue.showToast(res.msg)
					this.getInfo()
				})
			},
			// 年龄
			// getAgeList(){
			// 	let age = []
			// 	for(let i = 0; i<=100; i++){
			// 		age.push({value:i,title:i+'岁'})
			// 	}
			// 	this.ageList = age
			// },
			
			// 打开修改详细地址,
			changAddress(){
				this.$refs.address.open()
			},
			//关闭修改详细地址
			submitAddress(){
				this.$refs.address.close()
				this.$request.post('teacher/index/address',{
					address:this.address
				}).then(res=>{
					this.$queue.showToast(res.msg)
					this.getInfo()
					this.address=''
				})
			},
			// 发送验证码
			handleCode(){
				if (this.timer) {
					clearTimeout(this.timer)
				}
				this.timer = setTimeout(() => {
					if(this.codeSwitch){
						if(/^1[3,9]\d{9}$/.test(this.phone)){
							this.$request.post('/teacher/phone/send_messages',{
								mobile:this.phone
							})
							.then(res =>{
								if(res.code=='200'){
									this.$queue.showToast(res.msg)
									this.codeSwitch=false
									let num=60
									let timers=setInterval(()=>{
										if(num==0){
											clearInterval(timers)
											this.codeText='重新获取'
											this.codeSwitch=true
										}else{
											this.codeText='重新获取'+num
											num--
										}
									},1000)
								}else{
									this.$queue.showToast(res.msg)
								}
							})
						}else{
							// uni.showToast({
							// 	title:'您的手机号格式不正确',
							// 	icon:'none'
							// })
							this.$queue.showToast('您的手机号格式不正确')
						}
					}
				}, 500)
			},
			// 打开修改手机号码,
			changPhone(){
				this.$refs.phone.open()
			},
			//关闭修改手机号码
			submitPhone(){
				this.$refs.phone.close()
				this.$request.post('teacher/phone/modify_phone',{
					mobile:this.phone,
					code:this.phoneCode
				}).then(res=>{
					console.log(res)
				})
			},
			// 获取修改密码验证码
			handlePwdCode(){
				if (this.timer) {
					clearTimeout(this.timer)
				}
				this.timer = setTimeout(() => {
					if(this.pwdSwitch){
						if(/^1[3,9]\d{9}$/.test(this.pwdPhone)){
							this.$request.post('teacher/password/send_messages',{
								mobile:this.pwdPhone
							})
							.then(res =>{
								if(res.code=='200'){
									this.$queue.showToast(res.msg)
									this.pwdSwitch=false
									let num=60
									let timers=setInterval(()=>{
										if(num==0){
											clearInterval(timers)
											this.pwdText='重新获取'
											this.pwdSwitch=true
										}else{
											this.pwdText='重新获取'+num
											num--
										}
									},1000)
								}else{
									this.$queue.showToast(res.msg)
								}
							})
						}else{
							// uni.showToast({
							// 	title:'您的手机号格式不正确',
							// 	icon:'none'
							// })
							this.$queue.showToast('您的手机号格式不正确')
						}
					}
				}, 500)
			},
			// 打开修改密码,
			changPwd(){
				this.$refs.pwd.open()
			},
			//关闭修改密码
			submitPwd(){
				this.$refs.pwd.close()
				this.$request.post('teacher/password/modify_password',{
					mobile:this.pwdPhone,
					code:this.pwdCode,
					password:this.newPwd,
					confirm_password:this.confrimPwd
				}).then(res=>{
					console.log(res)
				})
			},
			//打开简介
			changeIntro(){
				this.$refs.introduction.open()
			},
			// 关闭简介
			submitIntro(){
				this.$refs.introduction.close()
				this.$request.post('teacher/index/content',{
					content:this.introation
				}).then(res=>{
					console.log(res)
					this.$queue.showToast(res.msg)
					this.getInfo()
				})
			}
		}
	}
</script>

<style lang="scss">
.data-manage{
	padding: 0 28rpx 0 30rpx;
	box-sizing: border-box;
	.data-item{
		height: 98rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 2rpx solid #D6D6D6;
		.title{
			font-size:28rpx;
			font-family:PingFangSC-Regular,PingFang SC;
			color:rgba(152,152,152,1);
		}
		.right{
			display: flex;
			align-items: center;
			.content{
				display: flex;
				font-size:28rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(49,49,49,1);
			}
	
			.img{
					width: 60rpx;
					height: 60rpx;
				}
			.icon{
					margin-left: 14rpx;
					width: 20rpx;
					height: 20rpx;
			}
		}
	}
	.update-name{
		width:750rpx;
		height:372rpx;
		background:rgba(255,255,255,1);
		border-radius:20rpx 20rpx 0rpx 0rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		.name-title{
			display: flex;
			align-items: center;
			justify-content: center;
			height: 82rpx;
			.left,.right{
				width:40rpx;
				height:2rpx;
				background: #d6d6d6;
			}
			.title{
				font-size:28rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(152,152,152,1);
				margin: 0 16rpx;
			}
		}
		.update-area{
			.change-name{
				height: 76rpx;
				border: none;
				outline: none;
				border-bottom:2rpx solid #D6D6D6;
				font-size:32rpx;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:600;
				color:rgba(49,49,49,1);
			}
			.place-style{
				font-size:24rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(152,152,152,1);
				line-height:34rpx;
			}
			.descri{
				margin-top: 22rpx;
				width:168rpx;
				height:34rpx;
				font-size:24rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(152,152,152,1);
				line-height:34rpx;
			}
		}
		.submit{
			margin: 0 auto;
			margin-top: 36rpx;
			width:540rpx;
			height:76rpx;
			background:rgba(0,183,244,1);
			border-radius:40rpx;
			font-size:32rpx;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:600;
			color:rgba(255,255,255,1);
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	//修改地址
	.update-address{
		width:750rpx;
		height:372rpx;
		background:rgba(255,255,255,1);
		border-radius:20rpx 20rpx 0rpx 0rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		.address-title{
			display: flex;
			align-items: center;
			justify-content: center;
			height: 82rpx;
			.left,.right{
				width:40rpx;
				height:2rpx;
				background: #d6d6d6;
			}
			.title{
				font-size:28rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(152,152,152,1);
				margin: 0 16rpx;
			}
		}
		.update-area{
			.change-address{
				height: 76rpx;
				border: none;
				outline: none;
				border-bottom:2rpx solid #D6D6D6;
				font-size:32rpx;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:600;
				color:rgba(49,49,49,1);
			}
			.place-style{
				font-size:24rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(152,152,152,1);
				line-height:34rpx;
			}
		}
		.submit{
			margin: 0 auto;
			margin-top: 36rpx;
			width:540rpx;
			height:76rpx;
			background:rgba(0,183,244,1);
			border-radius:40rpx;
			font-size:32rpx;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:600;
			color:rgba(255,255,255,1);
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	//绑定手机
	.update-phone{
		width:750rpx;
		height:426rpx;
		background:rgba(255,255,255,1);
		border-radius:20rpx 20rpx 0rpx 0rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		.phone-title{
			display: flex;
			align-items: center;
			justify-content: center;
			height: 82rpx;
			.left,.right{
				width:40rpx;
				height:2rpx;
				background: #d6d6d6;
			}
			.title{
				font-size:28rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(152,152,152,1);
				margin: 0 16rpx;
			}
		}
		.update-area{
			.phone{
				height: 82rpx;
				display: flex;
				align-items: center;
				border-bottom:2rpx solid #D6D6D6;
				.title{
					font-size:28rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(152,152,152,1);
					margin-right:16rpx;
				}
				input{
					height: 76rpx;
					border: none;
					outline: none;
					font-size:32rpx;
					font-family:PingFangSC-Medium,PingFang SC;
					font-weight:600;
					color:rgba(49,49,49,1);
				}
				.place-style{
					font-size:24rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(152,152,152,1);
					line-height:34rpx;
				}
				.send{
					width:188rpx;
					height:52rpx;
					background:rgba(0,183,244,0.41);
					border-radius:26rpx;
					font-size:28rpx;
					font-family:PingFangSC-Medium,PingFang SC;
					font-weight:600;
					color:rgba(255,255,255,1);
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
			.code{
				height: 82rpx;
				display: flex;
				align-items: center;
				border-bottom:2rpx solid #D6D6D6;
				.title{
					font-size:28rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(152,152,152,1);
					margin-right:16rpx;
				}
				input{
					height: 76rpx;
					border: none;
					outline: none;
					font-size:32rpx;
					font-family:PingFangSC-Medium,PingFang SC;
					font-weight:600;
					color:rgba(49,49,49,1);
				}
				.place-style{
					font-size:24rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(152,152,152,1);
					line-height:34rpx;
				}
			}
		}
		.submit{
			margin: 0 auto;
			margin-top: 36rpx;
			width:540rpx;
			height:76rpx;
			background:rgba(0,183,244,1);
			border-radius:40rpx;
			font-size:32rpx;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:600;
			color:rgba(255,255,255,1);
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	//修改密码
	.update-pwd{
		width:750rpx;
		height:586rpx;
		background:rgba(255,255,255,1);
		border-radius:20rpx 20rpx 0rpx 0rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		.pwd-title{
			display: flex;
			align-items: center;
			justify-content: center;
			height: 82rpx;
			.left,.right{
				width:40rpx;
				height:2rpx;
				background: #d6d6d6;
			}
			.title{
				font-size:28rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(152,152,152,1);
				margin: 0 16rpx;
			}
		}
		.update-area{
			.phone{
				height: 82rpx;
				display: flex;
				align-items: center;
				border-bottom:2rpx solid #D6D6D6;
				.title{
					font-size:28rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(152,152,152,1);
					margin-right:16rpx;
				}
				input{
					height: 76rpx;
					border: none;
					outline: none;
					font-size:32rpx;
					font-family:PingFangSC-Medium,PingFang SC;
					font-weight:600;
					color:rgba(49,49,49,1);
				}
				.place-style{
					font-size:24rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(152,152,152,1);
					line-height:34rpx;
				}
				.send{
					width:188rpx;
					height:52rpx;
					background:rgba(0,183,244,0.41);
					border-radius:26rpx;
					font-size:28rpx;
					font-family:PingFangSC-Medium,PingFang SC;
					font-weight:600;
					color:rgba(255,255,255,1);
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
			.change-item{
				height: 82rpx;
				display: flex;
				align-items: center;
				border-bottom:2rpx solid #D6D6D6;
				.title{
					font-size:28rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(152,152,152,1);
					margin-right:16rpx;
				}
				input{
					height: 76rpx;
					border: none;
					outline: none;
					font-size:32rpx;
					font-family:PingFangSC-Medium,PingFang SC;
					font-weight:600;
					color:rgba(49,49,49,1);
				}
				.place-style{
					font-size:24rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(152,152,152,1);
					line-height:34rpx;
				}
			}
		}
		.submit{
			margin: 0 auto;
			margin-top: 36rpx;
			width:540rpx;
			height:76rpx;
			background:rgba(0,183,244,1);
			border-radius:40rpx;
			font-size:32rpx;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:600;
			color:rgba(255,255,255,1);
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	//简介
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
			.left,.right{
				width:40rpx;
				height:2rpx;
				background: #d6d6d6;
			}
			.title{
				font-size:28rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(152,152,152,1);
				margin: 0 16rpx;
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
