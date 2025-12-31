// pages/essay/essay.js
Page({
  data: {
    subjectList: [
      { id: 1, name: '药理学' },
      { id: 2, name: '药剂学' },
      { id: 3, name: '药物化学' },
      { id: 4, name: '药物分析' }
    ],
    activeTab: 1,
    essayList: [
      {
        id: 1,
        number: 1,
        question: '试述青霉素类药物的抗菌机制及耐药机制',
        answer: '青霉素类药物的抗菌机制是抑制细菌细胞壁粘肽合成酶（青霉素结合蛋白，PBPs），阻碍细胞壁粘肽的合成，导致细胞壁缺损，使细菌细胞破裂死亡。耐药机制主要包括：1. 产生β-内酰胺酶，水解青霉素的β-内酰胺环；2. PBPs结构改变，与青霉素亲和力降低；3. 细菌细胞壁通透性改变，使青霉素难以进入菌体内；4. 细菌主动外排机制增强，将青霉素排出菌体外。',
        tags: ['青霉素', '抗菌机制', '耐药机制'],
        subjectId: 1
      },
      {
        id: 2,
        number: 2,
        question: '简述阿司匹林的药理作用、临床应用及不良反应',
        answer: '阿司匹林的药理作用包括：1. 解热镇痛；2. 抗炎抗风湿；3. 抗血小板聚集。临床应用：1. 用于感冒发热、头痛、牙痛等慢性钝痛；2. 用于风湿热和类风湿关节炎；3. 用于预防血栓栓塞性疾病。不良反应：1. 胃肠道反应；2. 凝血障碍；3. 水杨酸反应；4. 过敏反应；5. 瑞夷综合征。',
        tags: ['阿司匹林', '药理作用', '临床应用'],
        subjectId: 1
      },
      {
        id: 3,
        number: 3,
        question: '简述片剂的质量要求',
        answer: '片剂的质量要求包括：1. 含量准确，重量差异小；2. 硬度适宜，崩解时限符合规定；3. 溶出度或释放度符合要求；4. 外观完整光洁，色泽均匀；5. 稳定性良好，无变质现象；6. 微生物限度符合规定。',
        tags: ['片剂', '质量要求'],
        subjectId: 2
      }
    ],
    filteredEssayList: [],
    filterOptions: ['全部', '高频考点', '历年真题', '易错题'],
    pickerIndex: 0
  },

  onLoad() {
    this.filterEssayList()
  },

  // 切换科目标签
  switchTab(e) {
    const tabId = e.currentTarget.dataset.tabId
    this.setData({
      activeTab: tabId
    })
    this.filterEssayList()
  },

  // 筛选大题列表
  filterEssayList() {
    const { activeTab, essayList } = this.data
    const filtered = essayList.filter(item => item.subjectId === activeTab)
    this.setData({
      filteredEssayList: filtered
    })
  },

  // 筛选器选择
  bindPickerChange(e) {
    const index = e.detail.value
    this.setData({
      pickerIndex: index
    })
    // 根据选择的筛选条件过滤列表
    // 这里可以根据实际需求实现更复杂的筛选逻辑
  },

  // 显示大题详情
  showEssayDetail(e) {
    const essayId = e.currentTarget.dataset.essayId
    const essay = this.data.essayList.find(item => item.id === essayId)
    
    wx.navigateTo({
      url: `/pages/essay/essayDetail?essayId=${essayId}`
    })
  }
})