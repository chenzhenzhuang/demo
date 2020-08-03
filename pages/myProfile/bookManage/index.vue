<template>
	<view class="content">
		<!-- 分段器使用 -->
		<view class="control">
			<view :class="active==0?'actives':''" @click="slider(0)">待同意</view>
			<view :class="active==1?'actives':''" @click="slider(1)">待排课</view>
			<view :class="active==2?'actives':''" @click="slider(2)">已拒绝</view>
			<view :class="active==3?'actives':''" @click="slider(3)">时间设置</view>
		</view>
		<view class="work-box">
				<view v-if="active === 0">
						<to-agreed ref='agreed'></to-agreed>
				</view>
				<view v-if="active === 1">
						<to-process ref='process'></to-process>
				</view>
				<view v-if="active === 2">
					<rejected ref="reject"></rejected>
				</view>
				<view v-if="active === 3">
						<time-set></time-set>
				</view>
		</view>
	</view>
</template>

<script>
	import toAgreed from './toAgreed.vue'
	import toProcess from './toBeProcess.vue'
	import rejected from './rejected.vue'
	import timeSet from './timeSet.vue'
	export default {
		components: {
			toAgreed,
			toProcess,
			rejected,
			timeSet
		},
		data() {
			return {
			 active: 0					//选中的item
			}
		},
		onReachBottom() {
			console.log(111)
			if(this.active == 0){
				this.$refs.agreed.scrollBottom()
			}else if(this.active == 1){
				this.$refs.process.scrollBottom()
			}else if(this.active == 2){
				this.$refs.reject.scrollBottom()
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
		padding: 0rpx 30rpx;
		box-sizing: border-box;
		background: #FFFFFF;
		.control{
			padding: 58rpx 0;
			box-sizing: border-box;
			height: 116rpx;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size:32rpx;
			color:rgba(0,0,0,0.5);
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
