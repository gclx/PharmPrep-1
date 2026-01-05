// pages/exercise/exerciseDetail.js
const pharmacologyData = require('../../data/questions/pharmacology.js')

Page({
  data: {
    currentIndex: 0,
    totalCount: 0,
    questionList: [],
    currentQuestion: {},
    showAnswer: false,
    userAnswer: '', // String for single/TF, Array for multiple
    isCorrect: false,
    isFavorite: false,
    questionTypeMap: {
      1: '单选题',
      2: '多选题',
      3: '判断题'
    }
  },

  onLoad(options) {
    const { subjectId, subjectName } = options
    if (subjectName) {
      wx.setNavigationBarTitle({
        title: subjectName + '练习'
      })
    }
    
    this.loadQuestions(subjectId)
  },

  loadQuestions(subjectId) {
    // 根据 subjectId 加载对应题库（假设药理学 ID 为 1）
    if (subjectId == '1') {
      const rawQuestions = (pharmacologyData && pharmacologyData.prompt1_result) ? pharmacologyData.prompt1_result : []
      // 转换数据格式
      const questionList = rawQuestions.map((item, index) => {
        let type = 1
        if (item.type === 'multiple_choice') type = 2
        if (item.type === 'true_false') type = 3
  
        // 处理选项
        const options = []
        // 按照 A, B, C, D, E ... 排序
        const keys = Object.keys(item.choice).sort()
        keys.forEach(key => {
          options.push({
            id: key,
            label: key, // 对于判断题，这里可能是 "True"/"False"
            content: item.choice[key],
            selected: false
          })
        })
  
        // 处理判断题的 label 显示
      if (type === 3) {
        options.forEach(opt => {
          if (opt.id === 'True') {
            opt.label = '正确'
            opt.content = ''
          }
          if (opt.id === 'False') {
            opt.label = '错误'
            opt.content = ''
          }
        })
      }
  
        return {
          id: item.No || index,
          type: type,
          title: item.question,
          options: options,
          correctAnswer: item.answer, // 可能是字符串或数组
          analysis: item.explanation
        }
      })
  
      if (questionList.length > 0) {
        this.setData({
          questionList,
          totalCount: questionList.length,
          currentQuestion: questionList[0]
        })
      }
    } else {
      wx.showToast({
        title: '该科目题库暂未上线',
        icon: 'none'
      })
    }
  },

  // 选择选项
  selectOption(e) {
    if (this.data.showAnswer) return

    const id = e.currentTarget.dataset.id
    const type = this.data.currentQuestion.type
    let options = this.data.currentQuestion.options
    let userAnswer = this.data.userAnswer

    if (type === 2) { // 多选题
      // 初始化 userAnswer 为数组
      if (!Array.isArray(userAnswer)) userAnswer = []
      
      const index = userAnswer.indexOf(id)
      if (index > -1) {
        userAnswer.splice(index, 1) // 取消选中
      } else {
        userAnswer.push(id) // 选中
      }
      userAnswer.sort() // 排序以便比较

      // 更新 options 选中状态
      options = options.map(opt => ({
        ...opt,
        selected: userAnswer.includes(opt.id)
      }))
    } else { // 单选或判断
      userAnswer = id
      options = options.map(opt => ({
        ...opt,
        selected: opt.id === id
      }))
    }

    this.setData({
      'currentQuestion.options': options,
      userAnswer
    })
  },

  // 查看/提交答案
  toggleAnswer() {
    const { userAnswer, currentQuestion } = this.data
    
    if (!userAnswer || (Array.isArray(userAnswer) && userAnswer.length === 0)) {
      wx.showToast({
        title: '请先选择答案',
        icon: 'none'
      })
      return
    }

    let isCorrect = false
    if (Array.isArray(currentQuestion.correctAnswer)) {
      // 多选题比较数组
      if (Array.isArray(userAnswer) && 
          userAnswer.length === currentQuestion.correctAnswer.length &&
          userAnswer.every((val, index) => val === currentQuestion.correctAnswer[index])) { // 假设都已排序
        isCorrect = true
      }
    } else {
      // 单选比较字符串
      isCorrect = userAnswer === currentQuestion.correctAnswer
    }

    // 标记正确答案选项
    const options = currentQuestion.options.map(opt => {
      let isOptCorrect = false
      if (Array.isArray(currentQuestion.correctAnswer)) {
        isOptCorrect = currentQuestion.correctAnswer.includes(opt.id)
      } else {
        isOptCorrect = currentQuestion.correctAnswer === opt.id
      }
      return {
        ...opt,
        isCorrect: isOptCorrect
      }
    })

    this.setData({
      showAnswer: true,
      isCorrect,
      'currentQuestion.options': options
    })
  },

  // 切换到下一题
  nextQuestion() {
    if (this.data.currentIndex < this.data.totalCount - 1) {
      const nextIndex = this.data.currentIndex + 1
      this.setData({
        currentIndex: nextIndex,
        currentQuestion: this.data.questionList[nextIndex],
        showAnswer: false,
        userAnswer: this.data.questionList[nextIndex].type === 2 ? [] : '',
        isCorrect: false
      })
    } else {
      wx.navigateBack()
    }
  },

  // 上一题
  prevQuestion() {
    if (this.data.currentIndex > 0) {
      const prevIndex = this.data.currentIndex - 1
      // 恢复上一题状态（这里简化为重置，若需保留状态需存储在 questionList 中）
      this.setData({
        currentIndex: prevIndex,
        currentQuestion: this.data.questionList[prevIndex],
        showAnswer: false,
        userAnswer: this.data.questionList[prevIndex].type === 2 ? [] : '',
        isCorrect: false
      })
    }
  },

  // 收藏
  toggleFavorite() {
    this.setData({
      isFavorite: !this.data.isFavorite
    })
    wx.showToast({
      title: this.data.isFavorite ? '收藏成功' : '取消收藏',
      icon: 'none'
    })
  },

  // 显示答题卡
  showCard() {
    wx.showToast({
      title: '答题卡功能开发中',
      icon: 'none'
    })
  }
})
