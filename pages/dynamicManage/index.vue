<template>
	<view class="content">
		<view class="control">
			<view :class="active==0?'actives':''" @click="slider(0)">已发布</view>
			<view :class="active==1?'actives':''" @click="slider(1)">审核中</view>
			<view :class="active==2?'actives':''" @click="slider(2)">已拒绝</view>
		</view>
		<view class="work-box">
				<view v-if="active === 0">
					<send-dynamic ref='send'></send-dynamic>
				</view>
				<view v-if="active === 1">
						<audit-dynamic ref='audit'></audit-dynamic>
				</view>
				<view v-if="active === 2">
						<reject-dynamic ref='reject'></reject-dynamic>
				</view>
		</view>
	</view>
</template>

<script>
	import sendDynamic from './sendDynamic/index.vue'
	import auditDynamic from './auditIng/index.vue'
	import rejectDynamic from './rejectDynamic/index.vue'
	export default {
		components:{
			sendDynamic,
			auditDynamic,
			rejectDynamic
		},
		data() {
			return {
				active: 0					//选中的item
			}
		},
		onReachBottom(){
			if(this.active==0){
				this.$refs.send.scrollBottom()
			}else if(this.active == 1){
				this.$refs.audit.scrollBottom()
			}else if(this.active ==2){
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
		padding: 26rpx 26rpx;
		.control{
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
