// pages/anki/anki.js
Page({
  data: {
    ankiTabs: [
      { id: 1, name: '药理学' },
      { id: 2, name: '药剂学' },
      { id: 3, name: '药物化学' }
    ],
    activeTab: 1,
    isFlipped: false,
    currentIndex: 0,
    cardList: [
      {
        id: 1,
        question: '什么是首关消除？',
        answer: '首关消除是指某些药物在通过肠黏膜及肝脏时，经过灭活代谢而进入体循环的药量减少的现象。',
        subjectId: 1
      },
      {
        id: 2,
        question: '什么是药物半衰期？',
        answer: '药物半衰期是指血浆药物浓度下降一半所需要的时间，反映药物在体内消除的速度。',
        subjectId: 1
      },
      {
        id: 3,
        question: '片剂的定义是什么？',
        answer: '片剂是指药物与适宜的辅料混匀压制而成的圆片状或异形片状的固体制剂。',
        subjectId: 2
      },
      {
        id: 4,
        question: '什么是生物利用度？',
        answer: '生物利用度是指药物制剂被机体吸收进入体循环的相对量和速率。',
        subjectId: 1
      }
    ],
    filteredCardList: [],
    currentCard: {},
    deckList: [
      {
        id: 1,
        name: '药理学基础',
        count: 120
      },
      {
        id: 2,
        name: '药剂学基础',
        count: 80
      },
      {
        id: 3,
        name: '药物化学基础',
        count: 100
      }
    ]
  },

  onLoad() {
    this.setData({
      currentCard: this.data.cardList[0]
    })
  },

  // 切换标签页
  switchTab(e) {
    const tabId = e.currentTarget.dataset.tabId
    this.setData({
      activeTab: tabId,
      currentIndex: 0,
      isFlipped: false
    })
    // 根据选择的标签过滤卡片列表
    this.filterCardList()
  },

  // 过滤卡片列表
  filterCardList() {
    const { activeTab, cardList } = this.data
    const filtered = cardList.filter(item => item.subjectId === activeTab)
    this.setData({
      filteredCardList: filtered,
      currentCard: filtered[0] || {}
    })
  },

  // 翻转卡片
  flipCard() {
    this.setData({
      isFlipped: !this.data.isFlipped
    })
  },

  // 标记卡片难度
  markCard(e) {
    const status = e.currentTarget.dataset.status
    const { currentIndex, cardList } = this.data
    
    // 记录卡片学习状态
    console.log(`卡片 ${cardList[currentIndex].id} 标记为 ${status}`)
    
    // 切换到下一张卡片
    this.nextCard()
  },

  // 下一张卡片
  nextCard() {
    const { currentIndex, cardList } = this.data
    let nextIndex = currentIndex + 1
    
    if (nextIndex >= cardList.length) {
      // 所有卡片学习完毕
      wx.showToast({
        title: '已完成所有卡片学习',
        icon: 'success'
      })
      nextIndex = 0
    }
    
    this.setData({
      currentIndex: nextIndex,
      currentCard: cardList[nextIndex],
      isFlipped: false
    })
  },

  // 选择卡片组
  selectDeck(e) {
    const deckId = e.currentTarget.dataset.deckId
    // 这里可以根据选择的卡片组加载对应的卡片
    wx.showToast({
      title: `选择了卡片组 ${deckId}`,
      icon: 'none'
    })
  }
})