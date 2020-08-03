<template>
	<view class="forget">
		<view class="login-content">
			<view class="phone">
				<input type="text" v-model="phone" placeholder="请输入绑定的手机号" placeholder-class="place-style" />
			</view>
			<view class="code">
				<input type="text" v-model="code" placeholder="请输入验证码" placeholder-class="place-style"/>
				<view class="get-code" @click="getCode" v-if="codeSwitch">
					{{codeText}}
				</view>
				<view class="geted-code" v-if="!codeSwitch">
					{{codeText}}
				</view>
			</view>
			<view class="phone">
				<input type="text" v-model="newPwd" :password="true" placeholder="请输入新密码" placeholder-class="place-style" />
			</view>
			<view class="phone">
				<input type="text" v-model="confrimPwd" :password="true" placeholder="请再次确认密码" placeholder-class="place-style" />
			</view>
			<view class="submit-box">
				<view class="btn" @click="handleUpdatePwd">
					确定
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:'',															//手机号
				code:'',															//验证码
				newPwd:'',														//新密码
				confrimPwd:'',												//确认密码
				codeSwitch:true,											//手机
				codeText:'获取验证码',
			};
		},
		methods:{
			// 修改密码
			handleUpdatePwd(){
				this.$request.login('auth/password/modify_password',{
					mobile:this.phone,
					code:this.code,
					password:this.newPwd,
					confirm_password:this.confrimPwd
				}).then(res=>{
					this.$queue.showToast(res.data.msg)
					setTimeout(()=>{
						uni.redirectTo({
							url:'/pages/login/login'
						})
					},500)
				})
			},
			// 获取验证码
			getCode(){
				if(this.codeSwitch){
					if(/^1[3,9]\d{9}$/.test(this.phone)){
						this.$request.login('auth/password/send_messages',{
							mobile:this.phone
						}).then(res =>{
							console.log(res)
							if(res.data.code=='200'){
								this.$queue.showToast(res.data.msg)
								this.codeSwitch=false
								let num=60
								let timers=setInterval(()=>{
									if(num==0){
										clearInterval(timers)
										this.codeText='重新获取'
										this.codeSwitch=true
									}else{
										this.codeText='重新获取'+num+'s'
										num--
									}
								},1000)
							}else{
								this.$queue.showToast(res.data.msg)
							}
						})
					}else{
						uni.showToast({
							title:'您的手机号格式不正确',
							icon:'none'
						})
					}
				}
			}
		}
	}
</script>

<style lang="scss">
.forget{
	// padding: 0 62rpx 0 66rpx;
	// box-sizing: border-box;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	.login-content{
		// margin-top: 96rpx;
		width:622rpx;
		.phone{
			width: 622rpx;
			height: 96rpx;
			border-bottom: 2rpx solid #EEEEEE;
			input{
				width: 100%;
				height: 96rpx;
				font-size: 28rpx;
			}
		}
		.code{
			width: 622rpx;
			height: 96rpx;
			border-bottom: 2rpx solid #EEEEEE;
			display: flex;
			align-items: center;
			justify-content: space-between;
			input{
				width: 480rpx;
				height: 96rpx;
				font-size: 28rpx;
			}
			.get-code{
				font-size:24rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(0,183,244,1);
			}
			.geted-code{
				font-size:24rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(153,153,153,1);
			}
		}
		.place-style{
			font-size:28rpx;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(153,153,153,1);
		}
		.submit-box{
			width:660rpx;
			margin-top: 78rpx;
			.btn{
				width: 100%;
				height:80rpx;
				background:rgba(0,183,244,0.3);
				border-radius:40px;
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
