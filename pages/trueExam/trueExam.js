// pages/trueExam/trueExam.js
Page({
  data: {
    yearOptions: ['全部', '2024', '2023', '2022', '2021', '2020'],
    yearIndex: 0,
    subjectOptions: ['全部', '药理学', '药剂学', '药物化学', '药物分析', '天然药物化学', '药事管理'],
    subjectIndex: 0,
    examList: [
      {
        id: 1,
        name: '北京大学药学院考研真题',
        year: 2024,
        subject: '药理学',
        downloadCount: 1256,
        isNew: true,
        url: ''
      },
      {
        id: 2,
        name: '浙江大学药学院考研真题',
        year: 2024,
        subject: '药剂学',
        downloadCount: 987,
        isNew: true,
        url: ''
      },
      {
        id: 3,
        name: '复旦大学药学院考研真题',
        year: 2023,
        subject: '药物化学',
        downloadCount: 1567,
        isNew: false,
        url: ''
      },
      {
        id: 4,
        name: '上海交通大学药学院考研真题',
        year: 2023,
        subject: '药物分析',
        downloadCount: 1123,
        isNew: false,
        url: ''
      },
      {
        id: 5,
        name: '中山大学药学院考研真题',
        year: 2022,
        subject: '天然药物化学',
        downloadCount: 892,
        isNew: false,
        url: ''
      }
    ],
    filteredExamList: []
  },

  onLoad() {
    // 页面加载时可以从云数据库获取真题列表
    this.filterExamList()
  },

  // 年份选择
  bindYearChange(e) {
    const index = e.detail.value
    this.setData({
      yearIndex: index
    })
    // 根据选择的年份过滤真题列表
    this.filterExamList()
  },

  // 学科选择
  bindSubjectChange(e) {
    const index = e.detail.value
    this.setData({
      subjectIndex: index
    })
    // 根据选择的学科过滤真题列表
    this.filterExamList()
  },

  // 过滤真题列表
  filterExamList() {
    const { yearIndex, subjectIndex, yearOptions, subjectOptions, examList } = this.data
    
    const selectedYear = yearOptions[yearIndex]
    const selectedSubject = subjectOptions[subjectIndex]
    
    let filtered = [...examList]
    
    // 按年份过滤
    if (selectedYear !== '全部') {
      filtered = filtered.filter(item => item.year === parseInt(selectedYear))
    }
    
    // 按学科过滤
    if (selectedSubject !== '全部') {
      filtered = filtered.filter(item => item.subject === selectedSubject)
    }
    
    this.setData({
      filteredExamList: filtered
    })
  },

  // 显示真题详情
  showExamDetail(e) {
    const examId = e.currentTarget.dataset.examId
    const exam = this.data.examList.find(item => item.id === examId)
    
    wx.navigateTo({
      url: `/pages/trueExam/examDetail?examId=${examId}`
    })
  }
})