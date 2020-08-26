<template>
	<view class="class-is-over">
		<view class="search-class">
			<view class="search-box">
				<input type="text" v-model="searchclass" placeholder="请输入课程名称" placeholder-class="place-style" />
				<image src="/static/search.png" mode="aspectFill"></image>
			</view>
			<view class="search-btn" @click="handleSearch">
				搜索
			</view>
		</view>
		<!-- //课程列表 -->
		<view class="class-is-over">
			<block v-for="item in classIsOver" :key="item.id">
				<view class="class-over" @click="goDetails(item.id)">
					<view class="class-cover">
						<image :src="item.offlineCourse.cover" mode="aspectFill"></image>
					</view>
					<view class="class-info">
						<view class="class-title">
							{{item.name}}
						</view>
						<view class="class-time">
							上课时间：{{item.start}}-{{item.end}}
						</view>
						<view class="class-student">
							上课学生：{{item.student_num}}人
						</view>
						<view class="class-instatution">
						所属机构：{{item.institution.edu_name}}
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
				searchclass:'',																//搜索的课程名字
				classIsOver:[],																//已上线下课列表
				pages:1,																			//页码
				pageSize:'',																	//页数
				count:'',																			//总量
				timer:'',																			//计时器节流
			};
		},
		mounted() {
			this.handlealreadyList()
		},
		methods:{
			// 搜索
			handleSearch(){
				
				if(this.timer){
					clearTimeout(this.timer)
				}
				this.timer = setTimeout(()=>{
					this.pages=1
					this.classIsOver = []
					this.handlealreadyList()
				},500)
			},
			// 滚动加载
			scrollBottom(){
				if(this.pages*this.pageSize<this.count){
					this.handlealreadyList()
				}else{
					this.$queue.showToast('没有更多了')
				}
			},
			// 已上线下课列表
			handlealreadyList(){
				this.$queue.showLoading('加载中...')
				this.$request.post('schedule/index/already_list',{
					keyword:this.searchclass,
					pages:this.pages,
				}).then(res=>{
					console.log(res)
					uni.hideLoading();
					this.count = res.result.count
					this.pageSize=res.result.PageSize
					this.classIsOver = this.classIsOver.concat(res.result.list) 
					this.pages++
				})
			},
			goDetails(id){
				uni.navigateTo({
					url:'/pages/coursesTaken/classIsOver/classOverDetails?cid='+id
				})
			}
		}
	}
</script>

<style lang="scss">
	.class-is-over{
		margin-top: 36rpx;
		.search-class{
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
					font-size: 28rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
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
			.class-over{
				display: flex;
				align-items: center;
				margin-bottom: 50rpx;
				.class-cover{
					width:244rpx;
					height:244rpx;
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
					.class-time,
					.class-student,
					.class-instatution{
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
