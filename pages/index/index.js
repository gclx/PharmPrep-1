// pages/index/index.js
Page({
  data: {
    countdown: {
      days: 0
    },
    bannerList: [
      {
        id: 1,
        imageUrl: '/images/banners/banner1.png',
        link: ''
      },
      {
        id: 2,
        imageUrl: '/images/banners/banner2.png',
        link: ''
      },
      {
        id: 3,
        imageUrl: '/images/banners/banner3.png',
        link: ''
      }
    ],
    recommendList: [
      {
        id: 1,
        title: '药理学高频考点速记',
        desc: '涵盖考研药理学核心考点，助你快速记忆',
        tag: '知识点速记',
        imageUrl: '/images/recomands/recomand1.png'
      },
      {
        id: 2,
        title: '药剂学大题必背50题',
        desc: '精选药剂学常考大题，附带详细解析',
        tag: '大题带背',
        imageUrl: '/images/recomands/recomand2.png'
      }
    ],
    timer: null
  },

  onLoad() {
    // 初始化倒计时
    this.initCountdown()
  },

  onShow() {
    // 页面显示时启动倒计时
    this.startCountdown()
  },

  onHide() {
    // 页面隐藏时清除倒计时
    this.clearCountdown()
  },

  onUnload() {
    // 页面卸载时清除倒计时
    this.clearCountdown()
  },

  // 初始化倒计时
  initCountdown() {
    const app = getApp()
    const examDate = app.globalData.examDate
    this.calculateCountdown(examDate)
  },

  // 计算倒计时 - 只精确到天
  calculateCountdown(examDate) {
    // 重置时间到当天零点，避免时间差影响天数计算
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    
    const exam = new Date(examDate)
    exam.setHours(0, 0, 0, 0)
    
    const diff = exam - now
    let days = 0

    if (diff > 0) {
      days = Math.floor(diff / (1000 * 60 * 60 * 24))
    }

    this.setData({
      countdown: {
        days
      }
    })
  },

  // 启动倒计时 - 每天更新一次
  startCountdown() {
    if (this.data.timer) {
      clearInterval(this.data.timer)
    }

    // 立即计算一次
    const app = getApp()
    this.calculateCountdown(app.globalData.examDate)
    
    // 每天更新一次（86400000毫秒 = 24小时）
    const timer = setInterval(() => {
      this.calculateCountdown(app.globalData.examDate)
    }, 86400000)

    this.setData({
      timer
    })
  },

  // 清除倒计时
  clearCountdown() {
    if (this.data.timer) {
      clearInterval(this.data.timer)
      this.setData({
        timer: null
      })
    }
  },

  // 轮播图点击事件
  onBannerTap(e) {
    const bannerId = e.currentTarget.dataset.bannerId
    console.log('点击了轮播图：', bannerId)
    // 可以根据bannerId跳转到对应的广告页面
  },

  // 导航到习题选择速刷
  navigateToExercise() {
    wx.navigateTo({
      url: '/pages/exercise/exercise'
    })
  },

  // 导航到习题大题带背
  navigateToEssay() {
    wx.navigateTo({
      url: '/pages/essay/essay'
    })
  },

  // 导航到高校真题合集
  navigateToTrueExam() {
    wx.navigateTo({
      url: '/pages/trueExam/trueExam'
    })
  },

  // 导航到知识点速记
  navigateToKnowledge() {
    wx.navigateTo({
      url: '/pages/knowledge/knowledge'
    })
  },

  // 导航到Anki卡片
  navigateToAnki() {
    wx.navigateTo({
      url: '/pages/anki/anki'
    })
  },

  // 导航到名词解释带背
  navigateToTerm() {
    wx.navigateTo({
      url: '/pages/term/term'
    })
  }
})