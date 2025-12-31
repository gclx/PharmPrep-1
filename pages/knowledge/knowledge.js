// pages/knowledge/knowledge.js
Page({
  data: {
    knowledgeTabs: [
      { id: 1, name: '药理学' },
      { id: 2, name: '药剂学' },
      { id: 3, name: '药物化学' },
      { id: 4, name: '药物分析' },
      { id: 5, name: '天然药物化学' }
    ],
    activeTab: 1,
    knowledgeList: [
      {
        id: 1,
        number: 1,
        title: '药物的基本作用',
        desc: '药物作用是指药物与机体细胞间的初始作用，是动因，是分子反应机制。药理效应是药物作用的结果，是机体反应的表现。',
        tags: ['药理学', '基础概念'],
        subjectId: 1,
        content: '药物作用是指药物与机体细胞间的初始作用，是动因，是分子反应机制。药理效应是药物作用的结果，是机体反应的表现。'
      },
      {
        id: 2,
        number: 2,
        title: '药物的不良反应',
        desc: '凡与用药目的无关，并为患者带来不适或痛苦的反应统称为药物不良反应。',
        tags: ['药理学', '基础概念'],
        subjectId: 1,
        content: '凡与用药目的无关，并为患者带来不适或痛苦的反应统称为药物不良反应。包括副反应、毒性反应、后遗效应、停药反应、变态反应、特异质反应等。'
      },
      {
        id: 3,
        number: 3,
        title: '片剂的崩解机制',
        desc: '片剂的崩解机制包括毛细管作用、膨胀作用、产气作用、酶解作用等。',
        tags: ['药剂学', '片剂'],
        subjectId: 2,
        content: '片剂的崩解机制包括：1. 毛细管作用：崩解剂在片剂中形成许多毛细管通道，水通过这些通道进入片剂内部，使片剂崩解；2. 膨胀作用：崩解剂吸水后体积膨胀，使片剂的结合力被破坏而崩解；3. 产气作用：有些崩解剂遇水产生气体，使片剂内部压力增加而崩解；4. 酶解作用：有些崩解剂在水中被酶分解，产生可溶性物质，使片剂崩解。'
      }
    ],
    filteredKnowledgeList: [],
    progressList: [
      { id: 1, subject: '药理学', progress: 65 },
      { id: 2, subject: '药剂学', progress: 42 },
      { id: 3, subject: '药物化学', progress: 78 },
      { id: 4, subject: '药物分析', progress: 35 }
    ]
  },

  onLoad() {
    // 页面加载时可以从云数据库获取知识点列表
    this.filterKnowledgeList()
  },

  // 切换标签页
  switchTab(e) {
    const tabId = e.currentTarget.dataset.tabId
    this.setData({
      activeTab: tabId
    })
    // 根据选择的标签过滤知识点列表
    this.filterKnowledgeList()
  },

  // 过滤知识点列表
  filterKnowledgeList() {
    const { activeTab, knowledgeList } = this.data
    const filtered = knowledgeList.filter(item => item.subjectId === activeTab)
    this.setData({
      filteredKnowledgeList: filtered
    })
  },

  // 显示知识点详情
  showKnowledgeDetail(e) {
    const knowledgeId = e.currentTarget.dataset.knowledgeId
    const knowledge = this.data.knowledgeList.find(item => item.id === knowledgeId)
    
    wx.navigateTo({
      url: `/pages/knowledge/knowledgeDetail?knowledgeId=${knowledgeId}`
    })
  }
})