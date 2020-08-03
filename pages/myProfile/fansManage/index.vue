<template>
	<view class="content">
		<!-- 分段器使用 -->
		<view class="control">
			<view :class="active==0?'actives':''" @click="slider(0)">新粉丝</view>
			<view :class="active==1?'actives':''" @click="slider(1)">全部粉丝</view>
		</view>
		<view class="work-box">
				<view v-if="active === 0">
					<new-fans ref='new'></new-fans>
				</view>
				<view v-if="active === 1">
						<all-fans ref='all'></all-fans>
				</view>
		</view>
	</view>
</template>

<script>
	import newFans from './newFans.vue'
	import allFans from './allFans.vue'
	export default {
		components: {
			newFans,
			allFans
		},
		data() {
			return {
			 active: 0					//选中的item
			}
		},
		onReachBottom() {
			if(this.active==0){
				this.$refs.new.scrollBottom()
			}else if(this.active==1){
				this.$refs.all.scrollBottom()
			}
		},
		methods: {
			//切换
			slider(index){
				this.active = index
			}
		}
	}
</script>

<style lang="scss">
	.content {
		
		box-sizing: border-box;
		background: #FFFFFF;
		.control{
			padding: 58rpx 30rpx;
			box-sizing: border-box;
			height: 116rpx;
			width: 100%;
			display: flex;
			align-items: center;
			font-size:32rpx;
			color:rgba(0,0,0,0.5);
			view ~ view{
				margin-left: 40rpx;
			}
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

	
</style>
