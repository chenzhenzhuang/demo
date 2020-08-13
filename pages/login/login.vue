<template>
	<view class="login">
		<view class="logo">
			<image src="/static/login.png" mode="aspectFill"></image>
		</view>
		<view class="login-content">
			<view class="phone">
				<input type="text" v-model="phone" placeholder="请输入手机号" placeholder-class="place-style" />
			</view>
			<view class="code">
				<input type="text" v-model="pwd" :password="true" placeholder="请输入密码" placeholder-class="place-style"/>
			</view>
		</view>
		<view class="submit-box">
			<view class="btn" @click="startLogin">
				登录
			</view>
			<view class="no-remember" @click="goForget">
				忘记密码？
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:'',													//手机号
				pwd:'',														//密码
				reg:'/^1[3456789]\d{9}$/',				//手机号正则
			};
		},
		methods:{
			goForget(){
				uni.navigateTo({
					url:'/pages/login/forget'
				})
			},
			// 登录验证
			startLogin() {
				if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
					this.$queue.showToast('请输入手机号');
					return;
				}
				if (this.pwd.length < 1) {
					this.$queue.showToast('请输入密码');
					return;
				}
				this.toLogin();
			},
			// 登录
			toLogin(){
				this.$queue.showLoading('登录中...')
				this.$request.login('auth/login/login',{
					mobile: this.phone,
					password: this.pwd
				})
				.then(res=>{
					console.log(res)
					uni.hideLoading()
					if(res.data.code=='200'){
						this.$queue.showToast(res.data.msg)
						uni.reLaunch({
							url: '/pages/workbench/index'
						})
						this.$queue.setData('token', res.data.result.token)
						this.$queue.setData('uid', res.data.result.uid)
					}else{
						this.$queue.showToast(res.data.msg)
					}
				})
				.catch(res => {
					console.log(res)
					uni.hideLoading();
				});
				
			}
		}
	}
</script>

<style lang="scss">
.login{
	padding: 0 62rpx 0 66rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	flex-direction: column;
	.logo{
		margin-top: 64rpx;
		width: 168rpx;
		height: 104rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.login-content{
		margin-top: 96rpx;
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
				width: 502rpx;
				height: 96rpx;
				font-size: 28rpx;
			}
		}
		.place-style{
			font-size:28rpx;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(153,153,153,1);
		}
	}
	.submit-box{
		width:660rpx;
		margin-top: 64rpx;
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
		.no-remember{
			width: 100%;
			height:80rpx;
			color:#333333;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			font-size:24rpx;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(153,153,153,1);
		}
	}
}
</style>
