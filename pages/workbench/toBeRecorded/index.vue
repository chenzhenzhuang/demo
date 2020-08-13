<template>
	<view class="record-box">
		<block v-for="(item,index) in toBeRecord" :key="index">
			<view class="to-be-record" @click="goRecordDetails(item.id)">
				<view class="recorded-cover">
					<image :src="item.cover?item.cover:item.onlineCourse.cover" mode="aspectFill"></image>
					<view class="tag">
						{{item.onlineCourse.ifopen?'公开课':'私有课'}}
					</view>
				</view>
				<view class="recorded-info">
					<view class="recorded-title">
						{{item.onlineCourse.name}}
					</view>
					<view class="recorded-time">
						录制章节：{{item.title}}
					</view>
					<view class="recorded-student">
						交稿时间：{{item.record_at.slice(-8,-3)}}前
					</view>
					<view class="recorded-instatution">
						所属机构：{{item.onlineCourse.institution.edu_name}}
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
				toBeRecord:[],														//待录制列表
				pages:0,																			//页码
				pageSize:'',																	//页数
				count:'',																			//总量
				date:this.dateS()
			};
		},
		mounted() {
			this.handleToBeRecord()
		},
		computed:{
			
		},
		methods:{
			dateS(){
				let year = new Date().getFullYear();
				let month = new Date().getMonth() + 1;
			let m =	month>10 ? month:'0'+month
				let date = new Date().getDate()
			let d=date>=9? date:'0'+date
				return year+ '-' + m +'-'+ d;
			},
			// 滚动加载
			scrollBottom(){
				if(this.pages*this.pageSize<this.count){
					this.handleToBeRecord()
				}else{
					this.$queue.showToast('没有更多了')
				}
			},
			//待录制列表
			handleToBeRecord(){
				this.$queue.showLoading('加载中...')
				this.$request.post('catalog/index/list',{
					record_at:this.date,
					pages:this.pages
				}).then(res=>{
					console.log(res)
					uni.hideLoading();
					this.count = res.result.count
					this.pageSize=res.result.PageSize
					this.toBeRecord = this.toBeRecord.concat(res.result.list) 
					this.pages++
				})
			},
			// 跳转详情页
			goRecordDetails(id){
				uni.navigateTo({
					url:'/pages/workbench/toBeRecorded/recordDetails?lid='+id
				})
			}
		}
	}
</script>

<style lang="scss">
	.record-box{
		.to-be-record{
			display: flex;
			align-items: center;
			margin-bottom: 50rpx;
			.recorded-cover{
				position: relative;
				width:244rpx;
				height:244rpx;
				margin-right: 18rpx;
				image{
					width: 100%;
					height: 100%;
				}
				.tag{
					position: absolute;
					top: 0;
					left: 0;
					width:97rpx;
					height:50rpx;
					background:rgba(219,0,0,1);
					border-radius:8rpx;
					opacity:0.56;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size:24rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					color:rgba(255,255,255,1);
				}
			}
			.recorded-info{
				view ~ view {
					margin-top: 14rpx;
				}
				.recorded-title{
					font-size:32rpx;
					font-family:PingFangSC-Medium,PingFang SC;
					font-weight:600;
					color:rgba(51,51,51,1);
					line-height:44rpx;
				}
				.recorded-time,
				.recorded-student,
				.recorded-instatution{
					font-size:28rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					color:rgba(0,0,0,0.5);
					width: 420rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
	}
</style>
