// pages/user/user.js
Page({
  data: {
    totalQuestions: 0,
    correctQuestions: 0,
    accuracy: 0,
    studyDays: 0
  },

  onLoad() {
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
    // 这里可以从本地缓存或云数据库获取用户信息
    // 暂时使用默认数据
  },

  // 加载学习统计数据
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

  // 编辑用户资料
  editUserInfo() {
    wx.showToast({
      title: '编辑资料功能开发中',
      icon: 'none'
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
