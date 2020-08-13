<template>
	<view class="marked-box">
		<block v-for="(item,index) in workList" :key="index">
			<view class="to-be-marked" @click="goWorkDetails(item.id)">
				<view class="marked-left">
					<image :src="item.teacherOperation.offlineCourse.cover" mode="aspectFill"></image>
				</view>
				<view class="marked-middle">
					<view>学生姓名：{{item.student.name}}</view>
					<view>完成时限：{{item.teacherOperation.expired_at.slice(0,-3)|times}}前</view>
					<view>作业名称：{{item.teacherOperation.offlineCourseSchedule.name}}</view>
					<view>所属机构：{{item.teacherOperation.offlineCourse.institution.edu_name}}</view>
				</view>
				<view class="marked-right">
					<view class="img-status">
						<image src="/static/complated.png" mode="aspectFill" v-if="item.status==2"></image>
						<image src="/static/noComplated.png" mode="aspectFill" v-if="item.status==1"></image>
					</view>
					<view class="correct">
						{{item.if_batch?'已批改':'未批改'}}
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				workList:[],																	//作业列表
				pages:0,																			//页码
				pageSize:'',																	//页数
				count:'',																			//总量
				date:''
			};
		},
		mounted() {
			this.handleToBeMarked()
		},
		computed:{
			dateS(){
				let year = new Date().getFullYear();
				let month = new Date().getMonth() + 1;
			let m =	month>10 ? month:'0'+month
				let date = new Date().getDate()
			let d=date>=9? date:'0'+date
				return year+ '-' + m +'-'+ d;
			}
		},
		methods:{
			// 滚动加载
			scrollBottom(){
				if(this.pages*this.pageSize<this.count){
					this.handleToBeMarked()
				}else{
					this.$queue.showToast('没有更多了')
				}
			},
			//待批改列表
			handleToBeMarked(){
				this.$queue.showLoading('加载中...')
				this.$request.post('operation/index/list',{
					created_at:this.date?this.date:this.dateS,
					pages:this.pages
				}).then(res=>{
					console.log(res)
					uni.hideLoading();
					this.count = res.result.count
					this.pageSize=res.result.PageSize
					this.workList = this.workList.concat(res.result.list) 
					this.pages++
				})
			},
			// 去详情
			goWorkDetails(id){
				uni.navigateTo({
					url:'/pages/workbench/toBeMarked/workDetails?wid='+id
				})
			}
			
		}
	}
</script>

<style lang="scss">
.marked-box{
	.to-be-marked{
		margin-bottom: 48rpx;
		padding: 12rpx;
		box-sizing: border-box;
		width:690rpx;
		height:200rpx;
		background:rgba(255,255,255,1);
		box-shadow:0rpx 8rpx 24rpx 0rpx rgba(49,49,49,0.2);
		border-radius:4rpx;
		display: flex;
		align-items: flex-start;
		// justify-content: space-between;
		.marked-left{
			width:176rpx;
			height:176rpx;
			image{
				width: 176rpx;
				height: 100%;
			}
		}
		.marked-middle{
			margin-left: 18rpx;
			width:332rpx;
			font-size:24rpx;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:600;
			color:rgba(51,51,51,1);
			view ~ view{
				white-space: nowrap;
				margin-top: 8rpx;
			}
		}
		.marked-right{
			margin-left: 34rpx;
			height: 100%;
			width: 106rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-end;
			.img-status{
				width: 106rpx;
				height: 92rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.correct{
				height:28rpx;
				font-size:20rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(244,0,0,1);
				line-height:28rpx;
			}
		}
	}
}
</style>
