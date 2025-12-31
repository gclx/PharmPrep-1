// app.js
App({
  onLaunch() {
    // 初始化云开发环境 - 暂时注释，避免调用getwxaasyncsecinfoAPI
    // if (wx.cloud) {
    //   wx.cloud.init({
    //     env: 'your-cloud-env-id',
    //     traceUser: true
    //   })
    // }
    
    // 获取系统信息
    wx.getSystemInfo({
      success: res => {
        this.globalData.systemInfo = res
      }
    })
  },
  
  globalData: {
    userInfo: null,
    systemInfo: null,
    examDate: '2026-12-31' // 考研日期，可根据实际情况修改
  }
})