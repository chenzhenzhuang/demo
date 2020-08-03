let baseUrl = 'https://yeteacher.xyyun.co/'


module.exports = {
	post: (url, data)=> {
		url = baseUrl + url;
		let token = uni.getStorageSync("token");
		if (token) {
			return new Promise((succ, error) => {
				uni.request({
					url: url,
					data: data,
					method: "POST",
					header: {
						"token": token
					},
					success: (result)=> {
						if (result.data.code == '10001' || result.data.code == '10002') {
							succ.call(self, result.data)
						uni.reLaunch({
							url: '/pages/login/login'
						})
						} else {
							succ.call(self, result.data)
						}
	
					},
					fail: function(e) {
						uni.showToast({
							title:'请检查网络是否链接',
							icon:'none'
						})
						error.call(self, e)
					}
				})
			})
		} else {
			uni.reLaunch({
				url: '/pages/login/login'
			})
		}
	},
	
	// post: (url, data)=> {
	// 	url = baseUrl + url;
	// 	let token = uni.getStorageSync("token");
	// 	if (token!='') {
	// 	uni.showLoading({
	// 	    title: '加载中...'
	// 	});	
	// 		return new Promise((succ, error) => {
	// 			uni.request({
	// 				url: url,
	// 				data: data,
	// 				method: "POST",
	// 				header: {
	// 					"token": token
	// 				},
	// 				success: (res)=> {
						
	// 					if (res.data.code == '10001' || res.data.code == '10002') {
	// 						uni.reLaunch({
	// 							url: '/pages/login/login'
	// 						})
	// 					} else {
	// 						succ.call(self, res.data)
	// 					}
	
	// 				},
	// 				fail: (e)=> {
	// 					uni.showToast({
	// 						title:'请检查网络是否链接',
	// 						icon:'none'
	// 					})
	// 					error.call(self, e)
	// 				},
	// 				complete:()=> {
	// 					uni.hideLoading()
	// 				}
	// 			})
	// 		})
	// 	} else {
	// 		uni.reLaunch({
	// 			url: '/pages/login/login'
	// 		})
	// 	}
	// },
	
	// 登录
	login: (url, data)=> {
			url = baseUrl + url;
			return new Promise((succ, error) => {
				uni.request({
					url: url,
					data: data,
					method: "POST",
					success: res=> {
						succ.call(self, res)
					},
					fail: err=> {
						uni.showToast({
							title:'登录失败',
							icon:'none'
						})
						error.call(self, err)
					}
				})
			})
		},
		
		// 上传视频
		 videoUpload: vd=> {
			let token = uni.getStorageSync("token");
			return new Promise((resolve,reject) => {
				uni.showLoading({
					title: '视频上传中...'
					})
				uni.uploadFile({
					url: 'https://yeapp.xyyun.co/upload/upload/file',
					method:'Post',
					filePath: vd,
					
					name: 'video',
					header: {
						token
					},
					success: res => {
						uni.hideLoading()
						var videoUp = JSON.parse(res.data)
						resolve(videoUp)
					},
					fail: res => {
						uni.hideLoading()
						uni.showToast({
							title: '服务器错误，请重试！',
							icon: 'none'
						})
					}
				})
			})
		}
}

