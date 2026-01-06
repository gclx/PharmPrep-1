// pages/user/user.js
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    totalQuestions: 0,
    correctQuestions: 0,
    accuracy: 0,
    studyDays: 0
  },

  onLoad() {
    // 检查是否支持 getUserProfile
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    
    // 页面加载时获取用户信息和学习统计数据
    this.loadUserInfo()
    this.loadStudyStats()
  },

  onShow() {
    // 页面显示时刷新数据
    this.loadUserInfo()
    this.loadStudyStats()
  },

  // 加载用户信息
  loadUserInfo() {
    // 从本地缓存获取用户信息
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        userInfo,
        hasUserInfo: true
      })
    }
  },

  // 获取用户信息（登录）
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.setStorageSync('userInfo', res.userInfo)
      },
      fail: (err) => {
        console.error('获取用户信息失败', err)
      }
    })
  },

  // 点击用户信息区域
  onTapUserInfo() {
    if (!this.data.hasUserInfo) {
      this.getUserProfile()
    }
  },

  // 编辑用户资料
  editUserInfo() {
    if (!this.data.hasUserInfo) {
      this.getUserProfile()
      return
    }
    
    wx.showToast({
      title: '编辑资料功能开发中',
      icon: 'none'
    })
  },
  loadStudyStats() {
    // 这里可以从本地缓存或云数据库获取学习统计数据
    // 暂时使用模拟数据
    const totalQuestions = wx.getStorageSync('totalQuestions') || 0
    const correctQuestions = wx.getStorageSync('correctQuestions') || 0
    const studyDays = wx.getStorageSync('studyDays') || 0
    const accuracy = totalQuestions > 0 ? Math.round((correctQuestions / totalQuestions) * 100) : 0

    this.setData({
      totalQuestions,
      correctQuestions,
      accuracy,
      studyDays
    })
  },

  // 导航到我的收藏
  navigateToCollection() {
    wx.showToast({
      title: '我的收藏功能开发中',
      icon: 'none'
    })
  },

  // 导航到我的错题
  navigateToWrong() {
    wx.showToast({
      title: '我的错题功能开发中',
      icon: 'none'
    })
  },

  // 导航到学习计划
  navigateToStudyPlan() {
    wx.showToast({
      title: '学习计划功能开发中',
      icon: 'none'
    })
  },

  // 导航到设置
  navigateToSettings() {
    wx.showToast({
      title: '设置功能开发中',
      icon: 'none'
    })
  },

  // 导航到关于我们
  navigateToAbout() {
    wx.showToast({
      title: '关于我们功能开发中',
      icon: 'none'
    })
  }
})
