<template>
	<view class="content">
		<view class="control">
			<view :class="active==0?'actives':''" @click="slider(0)">已上线下课</view>
			<view :class="active==1?'actives':''" @click="slider(1)">已上线上课</view>
			<view :class="active==2?'actives':''" @click="slider(2)">已上直播课</view>
		</view>
		<view class="work-box">
				<view v-if="active === 0">
						<class-is-over ref="over"></class-is-over>
				</view>
				<view v-if="active === 1">
						<online-course ref='course'></online-course>
				</view>
				<view v-if="active === 2">
						<already-live ref="live"></already-live>
				</view>
		</view>
	</view>
</template>

<script>
	import classIsOver from './classIsOver/index'
	import onlineCourse from './onlineClass/index.vue'
	import alreadyLive from './alreadyLive/index.vue'
	export default {
		components:{
			classIsOver,
			onlineCourse,
			alreadyLive
		},
		data() {
			return {
				active: 0					//选中的item
			}
		},
		onLoad() {

		},
		onReachBottom(){
			if(this.active==0){
				this.$refs.over.scrollBottom()
			}else if(this.active == 1){
				this.$refs.course.scrollBottom()
			}else if(this.active ==2){
				this.$refs.live.scrollBottom()
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
