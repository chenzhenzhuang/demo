<template>
	<view class="course-box">
		<block v-for="(item,index) in willCourseList" :key="index">
			<view class="will-course" @click="goWillDetails(item.id)">
				<view class="course-cover">
					<image :src="item.institution.avatar" mode="aspectFill"></image>
				</view>
				<view class="course-info">
					<view class="course-title">
						{{item.name}}
					</view>
					<view class="course-time">
						上课时间：{{item.class_time|times}}
					</view>
					<view class="course-student">
						上课学生：{{item.student_num}}人
					</view>
					<view class="course-instatution">
						所属机构：{{item.institution.edu_name}}
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
				willCourseList:[],														//待上课列表
				pages:0,																			//页码
				pageSize:'',																	//页数
				count:'',																			//总量
				date:'',																			//时间
			};
		},
		mounted() {
			this.handleWillList()
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
			scrollBottom(){
				if(this.pages*this.pageSize<this.count){
					this.handleWillList()
				}else{
					this.$queue.showToast('没有更多了')
				}
			},
			//待上课列表
			handleWillList(){
				this.$queue.showLoading('加载中...')
				this.$request.post('schedule/index/wait_list',{
					class_time:this.date?this.date:this.dateS,
					pages:this.pages
				}).then(res=>{
					console.log(res)
					uni.hideLoading();
					this.count = res.result.count
					this.pageSize=res.result.PageSize
					this.willCourseList = this.willCourseList.concat(res.result.list) 
					this.pages++
				})
			},
			
			// 跳转详情页
			goWillDetails(id){
				uni.navigateTo({
					url:'/pages/workbench/willCourse/willCourseDetails?id='+id
				})
			}
		}
	}
</script>

<style lang="scss">
	.course-box{
		.will-course{
			display: flex;
			align-items: center;
			margin-bottom: 50rpx;
			.course-cover{
				width:244rpx;
				height:244rpx;
				margin-right: 18rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.course-info{
				view ~ view {
					margin-top: 14rpx;
				}
				.course-title{
					width: 420rpx;
					font-size:32rpx;
					font-family:PingFangSC-Medium,PingFang SC;
					font-weight:600;
					color:rgba(51,51,51,1);
					line-height:44rpx;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
				.course-time,
				.course-student,
				.course-instatution{
					font-size:28rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					color:rgba(0,0,0,0.5);
					// line-height:40rpx;
				}
			}
		}
	}
</style>
