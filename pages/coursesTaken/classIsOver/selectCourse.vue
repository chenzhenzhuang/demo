<template>
	<view class="select-course">
		<view class="search-course">
			<view class="search-box">
				<input type="text" v-model="searchCourse" placeholder="请输入课程名称" placeholder-class="place-style" />
				<image src="/static/search.png" mode="aspectFill"></image>
			</view>
			<view class="search-btn" @click="goSearch">
				搜索
			</view>
		</view>
		<!-- 课程 -->
		<view class="class-is-over">
			<block v-for="(item,index) in courseList" :key="index">
				<view class="class-over" @click="goCatalogue(item.id)">
					<view class="class-cover">
						<image :src="item.cover" mode="aspectFill"></image>
					</view>
					<view class="class-info">
						<view class="class-title">
							{{item.name}}
						</view>
						<view class="course-catalogue">
							<!-- 课程分类：{{item.courseCategory.courseCategory.title}} - {{item.courseCategory.title}} -->
						</view>
						<view class="class-count">
						课节数量：{{item.course}}节
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',																									//id
				instaId:'',																							//机构id
				searchCourse:'',																				//搜索课程名称
				courseList:[],																	//搜索课程列表
				pages:1,																								//页码
				pageSize:'',																						//页数
				count:''																								//总量
			};
		},
		onLoad(option) {
			this.instaId = option.instaId,
			this.id = option.cid
		},
		onReachBottom() {
			if(this.pages*this.pageSize<=this.count){
				this.getDetails()
			}else{
				this.$queue.showToast('没有更多了')
			}
		},
		mounted() {
			this.getDetails()
		},
		methods:{
			goSearch(){
				
				this.pages= 1
				this.courseList = []
				this.getDetails()
			},
			
			// 详情
			getDetails(){
				this.$request.post('/schedule/onlinecourse/list',{
					keyword:this.searchCourse,
					pages:this.pages,
					institution_id:this.instaId,
					course_category_id:this.id
				}).then(res=>{
					console.log(res)
					this.count = res.result.count
					this.pageSize=res.result.PageSize
					this.courseList = this.courseList.concat(res.result.list) 
					this.pages++
					this.searchCourse = ''
				})
			},
			// 去课程目录
			goCatalogue(id){
				uni.navigateTo({
					url:'/pages/coursesTaken/classIsOver/classDetails?id='+id
				})
			}
		},
	}
</script>

<style lang="scss">
.select-course{
	padding: 0 30rpx;
	box-sizing: border-box;
	.search-course{
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		.search-box{
			position: relative;
			width:578rpx;
			height:66rpx;
			
			border-radius:40rpx;
			border:2px solid rgba(238,238,238,1);
			input{
				width:100%;
				height: 100%;
				padding-left: 70rpx;
				box-sizing: border-box;
			}
			.place-style{
				font-size:28rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(153,153,153,1);
				line-height:40rpx;
				text-align: center;
				
			}
			image{
				width:28rpx;
				height:28rpx;
				position: absolute;
				left: 28rpx;
				top: 50%;
				transform: translateY(-50%);
			}
		}
		.search-btn{
			margin-left: 18rpx;
			font-size:28rpx;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:600;
			color:rgba(0,183,244,1);
		}
	}
	
	.class-is-over{
		margin-top: 40rpx;
		.class-over ~ .class-over {
			border-top: 2rpx solid #EEEEEE;
		}
		.class-over{
			display: flex;
			align-items: center;
			height: 214rpx;
			.class-cover{
				width:174rpx;
				height:174rpx;
				margin-right: 18rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.class-info{
				view ~ view {
					margin-top: 14rpx;
				}
				.class-title{
					font-size:32rpx;
					font-family:PingFangSC-Medium,PingFang SC;
					font-weight:600;
					color:rgba(51,51,51,1);
					line-height:44rpx;
				}
				.course-catalogue,
				.class-count{
					font-size:28rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					color:rgba(0,0,0,0.5);
					// line-height:40rpx;
				}
			}
		}
	}
}
</style>
