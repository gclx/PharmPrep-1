// pages/term/term.js
Page({
  data: {
    termTabs: [
      { id: 1, name: '药理学' },
      { id: 2, name: '药剂学' },
      { id: 3, name: '药物化学' },
      { id: 4, name: '药物分析' }
    ],
    activeTab: 1,
    currentIndex: 0,
    isCollected: false,
    learnedCount: 0,
    collectedCount: 0,
    progress: 0,
    termList: [
      {
        id: 1,
        word: '首关消除',
        explanation: '首关消除是指某些药物在通过肠黏膜及肝脏时，经过灭活代谢而进入体循环的药量减少的现象。',
        subjectId: 1,
        audioUrl: ''
      },
      {
        id: 2,
        word: '药物半衰期',
        explanation: '药物半衰期是指血浆药物浓度下降一半所需要的时间，反映药物在体内消除的速度。',
        subjectId: 1,
        audioUrl: ''
      },
      {
        id: 3,
        word: '生物利用度',
        explanation: '生物利用度是指药物制剂被机体吸收进入体循环的相对量和速率。',
        subjectId: 1,
        audioUrl: ''
      },
      {
        id: 4,
        word: '片剂',
        explanation: '片剂是指药物与适宜的辅料混匀压制而成的圆片状或异形片状的固体制剂。',
        subjectId: 2,
        audioUrl: ''
      },
      {
        id: 5,
        word: '溶出度',
        explanation: '溶出度是指药物从片剂等固体制剂在规定溶剂中溶出的速度和程度。',
        subjectId: 2,
        audioUrl: ''
      }
    ],
    filteredTermList: [],
    currentTerm: {}
  },

  onLoad() {
    this.setData({
      currentTerm: this.data.termList[0]
    })
    this.calculateStats()
  },

  // 切换标签页
  switchTab(e) {
    const tabId = e.currentTarget.dataset.tabId
    this.setData({
      activeTab: tabId,
      currentIndex: 0,
      isCollected: false
    })
    // 根据选择的标签过滤名词解释列表
    this.filterTermList()
    this.calculateStats()
  },

  // 过滤名词解释列表
  filterTermList() {
    const { activeTab, termList } = this.data
    const filtered = termList.filter(item => item.subjectId === activeTab)
    this.setData({
      filteredTermList: filtered,
      currentTerm: filtered[0] || {}
    })
  },

  // 播放音频
  playAudio() {
    // 这里可以实现音频播放功能
    wx.showToast({
      title: '音频播放功能开发中',
      icon: 'none'
    })
  },

  // 收藏/取消收藏
  collectTerm(e) {
    const isCollected = e.currentTarget.dataset.isCollected
    this.setData({
      isCollected: !isCollected
    })
    
    // 这里可以保存收藏状态到本地缓存或云数据库
    const message = isCollected ? '已取消收藏' : '已收藏'
    wx.showToast({
      title: message,
      icon: 'success'
    })
    
    this.calculateStats()
  },

  // 上一个名词
  prevTerm() {
    const { currentIndex } = this.data
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1
      this.setData({
        currentIndex: prevIndex,
        currentTerm: this.data.termList[prevIndex],
        isCollected: false // 重置收藏状态
      })
      this.calculateStats()
    }
  },

  // 下一个名词
  nextTerm() {
    const { currentIndex, termList } = this.data
    if (currentIndex < termList.length - 1) {
      const nextIndex = currentIndex + 1
      this.setData({
        currentIndex: nextIndex,
        currentTerm: this.data.termList[nextIndex],
        isCollected: false // 重置收藏状态
      })
      this.calculateStats()
    }
  },

  // 计算学习统计
  calculateStats() {
    const { currentIndex, termList } = this.data
    const learnedCount = currentIndex + 1
    const collectedCount = 0 // 这里可以从本地缓存或云数据库获取实际收藏数量
    const progress = Math.round((learnedCount / termList.length) * 100)
    
    this.setData({
      learnedCount,
      collectedCount,
      progress
    })
  }
})