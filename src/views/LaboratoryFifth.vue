<template>
  <div class="containerPage">
    <div class="info">
      <h1 class="title">{{title}}</h1>
      <h3>{{theme}}</h3>
      <pre class="content">{{content}}</pre>
    </div>
    <div class="blockNumberStudent">
      <span class="title">Введіть номер студента:</span>
      <div>
        <input min="0" class="input" type="number" v-model="numberStudent">
        <button :disabled="numberStudent <= 0" class="button" @click="emitNumberStudent">Зберегти</button>
      </div>
    </div>
    <div class="containerTask">
      <div class="blockNumber">
        <button class="createButton" @click="createArrayIndicatorDistribution">Згенерувати вибірку показникового розподілу</button>
        <div v-show="arrayIndicatorDistribution.length !== 0" class="table">
          <div class="cell" v-for="(value, i) of arrayIndicatorDistribution" :key="i">{{value.value}}</div>
        </div>
      </div>
      <div class="blockNumber">
        <button class="createButton" @click="sameIndicatorDistribution">Згенерувати частоту розподілу</button>
        <div v-show="uniqueElementIndicatorDistribution.length !== 0" class="tableStatic">
          <div class="blocktitleCell">
            <span class="titleCell">Елемент</span>
            <span class="titleCell">Частота</span>
          </div>
          <div class="blockColumn">
            <div class="column">
              <span class="cell" v-for="(value, i) of uniqueElementIndicatorDistribution" :key="i">{{value.uniqueValue}}</span>
            </div>
            <div class="column">
              <span class="cell" v-for="(value, i) of uniqueElementIndicatorDistribution" :key="i">{{value.duplicate}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="blockNumber">
        <button class="createButton" @click="createIndicatorDistributionGistogram">Згенерувати гістограму показникового <br v-show="showTriger"> розподілу</button>
        <div v-show="dublicateDiagramElementIndicatorDistribution.length !== 0" class="diagram">
          <div class="duplicateColum">
            <div class="duplicate" v-for="(value, i) of dublicateDiagramElementIndicatorDistribution" :key="i">
              {{ value.duplicate }}&nbsp;<span class="line">&emsp;</span>
            </div>
          </div>
          <div class="elementRow">
            <div class="elementColumn">
              <div class="column" v-for="(value, i) of uniqueElementDiagramElementIndicatorDistribution" :key="i" :style="{height: value.duplicate * 23 + 'px'}" ></div>
            </div>
            <div class="elementNumbers">
              <div class="number" v-for="(value, i) of uniqueElementDiagramElementIndicatorDistribution" :key="i">{{value.uniqueValue}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="blockNumber">
        <button class="createButton" @click="statisticsResultIndicator">Згенерувати розрахунки по вибірці</button>
        <div v-show="varianceIndicator !== 0" class="tableStatistics">
          <div class="blocktitleCell">
            <span class="titleCell">Коефіцієнт асиметрії</span>
            <span class="titleCell">Коефіцієнт ексцесу</span>
          </div>
          <div class="blockColumn">
            <div class="column">
              <span class="cell">{{asymemetryCoefficientsIndicator}}</span>
            </div>
            <div class="column">
              <span class="cell">{{excessCoefficentsIndicator}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="blockNumber">
        <button class="createButton" @click="createArrayNormalDistribution">Згенерувати вибірку нормального розподілу</button>
        <div v-show="arrayNormalDistribution.length !== 0" class="table">
          <div class="cell" v-for="(value, i) of arrayNormalDistribution" :key="i">{{value.value}}</div>
        </div>
      </div>
      <div class="blockNumber">
        <button class="createButton" @click="sameNormalDistribution">Згенерувати частоту розподілу</button>
        <div v-show="uniqueElementNormalDistribution.length !== 0" class="tableStatic">
          <div class="blocktitleCell">
            <span class="titleCell">Елемент</span>
            <span class="titleCell">Частота</span>
          </div>
          <div class="blockColumn">
            <div class="column">
              <span class="cell" v-for="(value, i) of uniqueElementNormalDistribution" :key="i">{{value.uniqueValue}}</span>
            </div>
            <div class="column">
              <span class="cell" v-for="(value, i) of uniqueElementNormalDistribution" :key="i">{{value.duplicate}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="blockNumber">
        <button class="createButton" @click="createNormalDistributionGistogram">Згенерувати гістограму нормального <br v-show="showTriger"> розподілу</button>
        <div v-show="dublicateDiagramElementNormalDistribution.length !== 0" class="diagram">
          <div class="duplicateColum">
            <div class="duplicate" v-for="(value, i) of dublicateDiagramElementNormalDistribution" :key="i">
              {{ value.duplicate }}&nbsp;<span class="line">&emsp;</span>
            </div>
          </div>
          <div class="elementRow">
            <div class="elementColumn">
              <div class="column" v-for="(value, i) of uniqueElementDiagramElementNormalDistribution" :key="i" :style="{height: value.duplicate * 23 + 'px'}" ></div>
            </div>
            <div class="elementNumbers">
              <div class="number" v-for="(value, i) of uniqueElementDiagramElementNormalDistribution" :key="i">{{value.uniqueValue}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="blockNumber">
        <button class="createButton" @click="statisticsResultNormal">Згенерувати розрахунки по вибірці</button>
        <div v-show="varianceNormal !== 0" class="tableStatistics">
          <div class="blocktitleCell">
            <span class="titleCell">Коефіцієнт асиметрії</span>
            <span class="titleCell">Коефіцієнт ексцесу</span>
          </div>
          <div class="blockColumn">
            <div class="column">
              <span class="cell">{{asymemetryCoefficientsNormal}}</span>
            </div>
            <div class="column">
              <span class="cell">{{excessCoefficentsNormal}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['title', 'theme', 'content', 'n'],
  data: () => ({
    arrayIndicatorDistribution: [],
    uniqueElementIndicatorDistribution: [],
    dublicateDiagramElementIndicatorDistribution: [],
    uniqueElementDiagramElementIndicatorDistribution: [],
    middleArithmeticNumberIndicator: 0,
    varianceIndicator: 0,
    middleDeviationIndicator: 0,
    asymemetryCoefficientsIndicator: 0,
    excessCoefficentsIndicator: 0,

    arrayNormalDistribution: [],
    uniqueElementNormalDistribution: [],
    dublicateDiagramElementNormalDistribution: [],
    uniqueElementDiagramElementNormalDistribution: [],
    middleArithmeticNumberNormal: 0,
    varianceNormal: 0,
    middleDeviationNormal: 0,
    asymemetryCoefficientsNormal: 0,
    excessCoefficentsNormal: 0,

    z: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    liambda: 0,
    numberStudent: 0,
    windowWidth: 0,
    showTriger: false
  }),
  computed: {},
  methods: {
    emitNumberStudent () {
      this.$emit('numberStudent', this.numberStudent)
    },
    createArrayIndicatorDistribution () {
      if (this.n === 0) {
        alert('Введіть номер студента та збережіть його')
      } else {
        this.arrayIndicatorDistribution.length = 0
        const arrayLeng = this.n * 5
        this.liambda = this.z.find(element => {
          if (element > 0) {
            return element
          }
        })
        do {
          const randomNumberZ = this.z[Math.floor(Math.random() * this.z.length)]
          const x = (-(1 / this.liambda)) * Math.log(randomNumberZ)
          if (x <= this.n) {
            if (x === Infinity) {
              this.arrayIndicatorDistribution.push({ value: '\u221E' })
            } else if (x % 2) {
              this.arrayIndicatorDistribution.push({ value: parseFloat(x.toFixed(1)) })
            } else {
              this.arrayIndicatorDistribution.push({ value: x })
            }
          }
        } while (this.arrayIndicatorDistribution.length < arrayLeng)
      }
    },
    sameIndicatorDistribution () {
      if (this.n === 0) {
        alert('Введіть номер студента та збережіть його')
      } else if (this.arrayIndicatorDistribution.length === 0) {
        alert('Сгенеруйте вибірку показникового розподілу')
      } else {
        this.uniqueElementIndicatorDistribution.length = 0
        let array = []
        array = array.concat(this.arrayIndicatorDistribution)
        array.filter((item) => {
          if (item.value === '\u221E') {
            item.value = Infinity
          }
          const i = this.uniqueElementIndicatorDistribution.findIndex(element => (element.uniqueValue === item.value))
          if (i <= -1) {
            this.uniqueElementIndicatorDistribution.push({ uniqueValue: item.value })
          }
          if (item.value === Infinity) {
            item.value = '\u221E'
          }
        })
        this.uniqueElementIndicatorDistribution.sort((a, b) => {
          return a.uniqueValue - b.uniqueValue
        })
        this.uniqueElementIndicatorDistribution.find(element => {
          if (element.uniqueValue === Infinity) {
            element.uniqueValue = '\u221E'
          }
        })
        let repetition = 0
        this.uniqueElementIndicatorDistribution.forEach(element => {
          for (const item of this.arrayIndicatorDistribution) {
            if (element.uniqueValue === item.value) {
              repetition++
            }
          }
          element.duplicate = repetition
          repetition = 0
        })
      }
    },
    createIndicatorDistributionGistogram () {
      if (this.n === 0) {
        alert('Введіть номер студента та збережіть його')
      } else if (this.arrayIndicatorDistribution.length === 0) {
        alert('Сгенеруйте вибірку показникового розподілу')
      } else if (this.uniqueElementIndicatorDistribution.length === 0) {
        alert('Сгенеруйте частоти розподілу')
      } else {
        const maxDuplicate = Math.max.apply(Math, this.uniqueElementIndicatorDistribution.map(element => element.duplicate))
        this.dublicateDiagramElementIndicatorDistribution.length = 0
        this.uniqueElementDiagramElementIndicatorDistribution.length = 0
        for (let i = maxDuplicate; i > 0; i--) {
          this.dublicateDiagramElementIndicatorDistribution.push({ duplicate: i })
        }
        this.dublicateDiagramElementIndicatorDistribution.sort((a, b) => {
          return b.duplicate - a.duplicate
        })
        this.uniqueElementDiagramElementIndicatorDistribution = this.uniqueElementDiagramElementIndicatorDistribution.concat(this.uniqueElementIndicatorDistribution)
      }
    },
    statisticsResultIndicator () {
      if (this.n === 0) {
        alert('Введіть номер студента та збережіть його')
      } else if (this.arrayIndicatorDistribution.length === 0) {
        alert('Сгенеруйте вибірку показникового розподілу')
      } else {
        this.varianceIndicator = 0
        this.middleDeviationIndicator = 0
        this.asymemetryCoefficientsIndicator = 0
        this.excessCoefficentsIndicator = 0
        this.middleArithmeticNumberIndicator = 0

        for (let i = 0; i < this.arrayIndicatorDistribution.length; i++) {
          this.middleArithmeticNumberIndicator += this.arrayIndicatorDistribution[i].value
        }
        this.middleArithmeticNumberIndicator = this.middleArithmeticNumberIndicator / this.arrayIndicatorDistribution.length
        // variance
        this.varianceIndicator = this.varianceIndicatorFunction()
        // middleDeviation
        this.middleDeviationIndicator = this.middleDeviationIndicatorFunction()
        // asymemetryCoefficients
        this.asymemetryCoefficientsIndicator = this.asymemetryCoefficientsIndicatorFunction()
        // excessCoefficents
        this.excessCoefficentsIndicator = this.excessCoefficentsIndicatorFunction()
      }
    },
    varianceIndicatorFunction () {
      let sum = 0
      for (let i = 0; i < this.arrayIndicatorDistribution.length - 1; i++) {
        const number = Math.pow(this.arrayIndicatorDistribution[i].value - this.middleArithmeticNumberIndicator, 2)
        sum += number
      }
      const number = sum / (this.arrayIndicatorDistribution.length - 1)
      return number.toFixed(2)
    },
    middleDeviationIndicatorFunction () {
      let sum = 0
      for (let i = 0; i < this.arrayIndicatorDistribution.length - 1; i++) {
        const number = Math.pow((this.arrayIndicatorDistribution[i].value - this.middleArithmeticNumberIndicator), 2)
        sum += number
      }
      const number = Math.sqrt(sum / this.arrayIndicatorDistribution.length)
      return parseFloat(number.toFixed(2))
    },
    asymemetryCoefficientsIndicatorFunction () {
      let sum = 0
      for (let i = 0; i < this.arrayIndicatorDistribution.length - 1; i++) {
        const number = Math.pow((this.arrayIndicatorDistribution[i].value - this.middleArithmeticNumberIndicator), 3)
        sum += number
      }
      const number = sum / ((this.arrayIndicatorDistribution.length - 1) * Math.pow(this.middleDeviationIndicator, 3))
      return number.toFixed(2)
    },
    excessCoefficentsIndicatorFunction () {
      let sum = 0
      for (let i = 0; i < this.arrayIndicatorDistribution.length - 1; i++) {
        const number = Math.pow((this.arrayIndicatorDistribution[i].value - this.middleArithmeticNumberIndicator), 4)
        sum += number
      }
      const number = sum / ((this.arrayIndicatorDistribution.length - 1) * Math.pow(this.middleDeviationIndicator, 4))
      return number.toFixed(2)
    },
    createArrayNormalDistribution () {
      if (this.n === 0) {
        alert('Введіть номер студента та збережіть його')
      } else {
        const arrayLeng = 100 * (parseInt(this.n) * 5)
        this.arrayNormalDistribution.length = 0
        for (let i = 0; i < arrayLeng; i++) {
          this.arrayNormalDistribution.push({ value: Math.floor(Math.random() * (parseInt(this.n) + 1)) })
        }
      }
    },
    sameNormalDistribution () {
      if (this.n === 0) {
        alert('Введіть номер студента та збережіть його')
      } else if (this.arrayNormalDistribution.length === 0) {
        alert('Сгенеруйте вибірку нормального розподілу')
      } else {
        this.uniqueElementNormalDistribution.length = 0
        let array = []
        array = array.concat(this.arrayNormalDistribution)
        array.filter((item) => {
          if (item.value === '\u221E') {
            item.value = Infinity
          }
          const i = this.uniqueElementNormalDistribution.findIndex(element => (element.uniqueValue === item.value))
          if (i <= -1) {
            this.uniqueElementNormalDistribution.push({ uniqueValue: item.value })
          }
          if (item.value === Infinity) {
            item.value = '\u221E'
          }
        })
        this.uniqueElementNormalDistribution.sort((a, b) => {
          return a.uniqueValue - b.uniqueValue
        })
        this.uniqueElementNormalDistribution.find(element => {
          if (element.uniqueValue === Infinity) {
            element.uniqueValue = '\u221E'
          }
        })
        let repetition = 0
        this.uniqueElementNormalDistribution.forEach(element => {
          for (const item of this.arrayNormalDistribution) {
            if (element.uniqueValue === item.value) {
              repetition++
            }
          }
          element.duplicate = repetition
          repetition = 0
        })
      }
    },
    createNormalDistributionGistogram () {
      if (this.n === 0) {
        alert('Введіть номер студента та збережіть його')
      } else if (this.arrayNormalDistribution.length === 0) {
        alert('Сгенеруйте вибірку нормального розподілу')
      } else if (this.uniqueElementNormalDistribution.length === 0) {
        alert('Сгенеруйте частоти розподілу')
      } else {
        const maxDuplicate = Math.max.apply(Math, this.uniqueElementNormalDistribution.map(element => element.duplicate))
        this.dublicateDiagramElementNormalDistribution.length = 0
        this.uniqueElementDiagramElementNormalDistribution.length = 0
        for (let i = maxDuplicate; i > 0; i--) {
          this.dublicateDiagramElementNormalDistribution.push({ duplicate: i })
        }
        this.dublicateDiagramElementNormalDistribution.sort((a, b) => {
          return b.duplicate - a.duplicate
        })
        this.uniqueElementDiagramElementNormalDistribution = this.uniqueElementDiagramElementNormalDistribution.concat(this.uniqueElementNormalDistribution)
      }
    },
    statisticsResultNormal () {
      if (this.n === 0) {
        alert('Введіть номер студента та збережіть його')
      } else if (this.arrayNormalDistribution.length === 0) {
        alert('Сгенеруйте вибірку нормального розподілу')
      } else {
        this.varianceNormal = 0
        this.middleDeviationNormal = 0
        this.asymemetryCoefficientsNormal = 0
        this.excessCoefficentsNormal = 0
        this.middleArithmeticNumberNormal = 0

        for (let i = 0; i < this.arrayNormalDistribution.length; i++) {
          this.middleArithmeticNumberNormal += this.arrayNormalDistribution[i].value
        }
        this.middleArithmeticNumberNormal = this.middleArithmeticNumberNormal / this.arrayNormalDistribution.length
        // variance
        this.varianceNormal = this.varianceNormalFunction()
        // middleDeviation
        this.middleDeviationNormal = this.middleDeviationNormalFunction()
        // asymemetryCoefficients
        this.asymemetryCoefficientsNormal = this.asymemetryCoefficientsNormalFunction()
        // excessCoefficents
        this.excessCoefficentsNormal = this.excessCoefficentsNormalFunction()
      }
    },
    varianceNormalFunction () {
      let sum = 0
      for (let i = 0; i < this.arrayNormalDistribution.length - 1; i++) {
        const number = Math.pow(this.arrayNormalDistribution[i].value - this.middleArithmeticNumberNormal, 2)
        sum += number
      }
      const number = sum / (this.arrayNormalDistribution.length - 1)
      return number.toFixed(2)
    },
    middleDeviationNormalFunction () {
      let sum = 0
      for (let i = 0; i < this.arrayNormalDistribution.length - 1; i++) {
        const number = Math.pow((this.arrayNormalDistribution[i].value - this.middleArithmeticNumberNormal), 2)
        sum += number
      }
      const number = Math.sqrt(sum / this.arrayNormalDistribution.length)
      return parseFloat(number.toFixed(2))
    },
    asymemetryCoefficientsNormalFunction () {
      let sum = 0
      for (let i = 0; i < this.arrayNormalDistribution.length - 1; i++) {
        const number = Math.pow((this.arrayNormalDistribution[i].value - this.middleArithmeticNumberNormal), 3)
        sum += number
      }
      const number = sum / ((this.arrayNormalDistribution.length - 1) * Math.pow(this.middleDeviationNormal, 3))
      return number.toFixed(2)
    },
    excessCoefficentsNormalFunction () {
      let sum = 0
      for (let i = 0; i < this.arrayNormalDistribution.length - 1; i++) {
        const number = Math.pow((this.arrayNormalDistribution[i].value - this.middleArithmeticNumberNormal), 4)
        sum += number
      }
      const number = sum / ((this.arrayNormalDistribution.length - 1) * Math.pow(this.middleDeviationNormal, 4))
      return number.toFixed(2)
    },
    updateWindowWidth () {
      this.windowWidth = window.innerWidth
      if (this.windowWidth <= 400) {
        this.showTriger = true
      } else {
        this.showTriger = false
      }
    }
  },
  created () {
    window.addEventListener('resize', this.updateWindowWidth)
    this.windowWidth = window.innerWidth
    if (this.windowWidth <= 400) {
      this.showTriger = true
    } else {
      this.showTriger = false
    }
  }
}
</script>
<style scoped lang="scss">
  .containerPage {
    .content {
      font-size: 20px;
      white-space: pre-wrap;
    }
    .blockNumberStudent {
      display: flex;
      margin: 5px 0 20px 0;
      .title {
        font-size: 16px;
      }
      .input {
        margin: 0 5px;
      }
      .button {
        background: linear-gradient(90deg, rgb(97, 97, 97)20%, rgb(129, 129, 129));
        color: white;
        text-shadow: 1px 1px 2px black;
        cursor: pointer;
        &:disabled {
          background: rgb(173, 173, 173) !important;
          cursor: default;
        }
      }
    }
    .containerTask {
      display: grid;
      grid-template-columns: repeat(4, max-content);
      grid-column-gap: 30px;
      grid-row-gap: 20px;
      .blockNumber {
        display: grid;
        justify-items: center;
        align-items: flex-start;
        align-self: flex-start;
        width: max-content;
        .createButton {
          background: linear-gradient(90deg, rgb(97, 97, 97)20%, rgb(129, 129, 129));
          color: white;
          text-shadow: 1px 1px 2px black;
          margin-bottom: 10px;
          max-width: max-content;
          cursor: pointer;
        }
        .table {
          display: grid;
          background: rgb(77, 77, 77);
          width: max-content;
          grid-template-columns: repeat(7, max-content);
          .cell {
            width: 40px;
            text-align: center;
            background: white;
            border: 1px solid rgb(77, 77, 77);
            border-collapse: collapse;
            font-size: 17px;
            margin-left: -1px;
            margin-top: -1px;
          }
        }
        .tableStatic {
          .blocktitleCell {
            display: grid;
            grid-template-columns: repeat(2, 70px);
            .titleCell {
              border: 1px solid rgb(77, 77, 77);
              text-align: center;
              background: rgb(231, 231, 231);
              margin-left: -1px;
            }
          }
          .blockColumn {
            display: grid;
            grid-template-columns: repeat(2, 70px);
            .column {
              border: 1px solid rgb(77, 77, 77);
              margin-left: -1px;
              margin-top: -1px;
              .cell {
                height: 24px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-bottom: 1px solid rgb(77, 77, 77);
                margin-bottom: -1px;
              }
            }
          }
        }
        .diagram {
          display: flex;
          margin-bottom: 15px;
          .duplicateColum {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .duplicate {
              margin-right: -10px;
              height: 23px;
              &:last-child {
                margin-bottom: 14px;
              }
              .line {
                text-decoration: line-through;
              }
            }
          }
          .elementRow {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            border-left: 1px solid rgb(77, 77, 77);
            border-bottom: 1px solid rgb(77, 77, 77);
            .elementColumn {
              display: flex;
              justify-content: center;
              align-items: flex-end;
              .column {
                border: 1px solid rgb(77, 77, 77);
                width: 41px;
                margin-left: -1px;
                background: rgb(231, 231, 231);
              }
            }
            .elementNumbers {
              display: flex;
              justify-content: center;
              align-items: flex-end;
              margin-bottom: -25px;
              .number {
                text-align: center;
                border: 1px solid white;
                width: 40px;
              }
            }
          }
        }
        .tableStatistics {
          .blocktitleCell {
            display: grid;
            grid-template-columns: repeat(4, max-content);
            .titleCell {
              display: flex;
              justify-content: center;
              align-items: center;
              text-align: center;
              border: 1px solid rgb(77, 77, 77);
              background: rgb(231, 231, 231);
              margin-left: -1px;
              margin-top: -1px;
            }
          }
          .blockColumn {
            display: grid;
            grid-template-columns: repeat(4, max-content);
            .column {
              border: 1px solid rgb(77, 77, 77);
              margin-left: -1px;
              margin-top: -1px;
              .cell {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 24px;
                border-bottom: 1px solid rgb(77, 77, 77);
                margin-bottom: -1px;
              }
            }
          }
          .blocktitleCell .titleCell:first-child, .blockColumn .column:first-child {
            width: 170px;
          }
          .blocktitleCell .titleCell:last-child, .blockColumn .column:last-child {
            width: 160px;
          }
        }
      }
    }
  }
  //Style for adaptive page - global
  @media (min-width: 0px) and (max-width: 1825px) {
    .containerPage {
      .containerTask {
        justify-items: center;
      }
    }
  }
  @media (min-width: 0px) and (max-width: 1244px) {
    .containerPage {
      .blockNumberStudent {
        justify-content: center;
      }
      .containerTask {
        justify-content: center;
      }
    }
  }
  @media (min-width: 0px) and (max-width: 768px) {
    .containerPage {
      .info {
        padding: 0 5px 0 5px;
      }
      .containerTask {
        grid-template-columns: repeat(1, max-content);
      }
    }
  }
  //Adaptive
  @media (min-width: 1245px) and (max-width: 1700px) {
    .containerPage {
      .blockNumberStudent {
        justify-content: center;
      }
      .containerTask {
        grid-template-columns: repeat(2, max-content);
        justify-content: center;
      }
    }
  }
  @media (min-width: 769px) and (max-width: 1244px) {
    .containerPage {
      .blockNumberStudent {
        justify-content: center;
      }
      .containerTask {
        grid-template-columns: repeat(1, max-content);
        justify-content: center;
      }
    }
  }
  @media (min-width: 0) and (max-width: 768px) {
    .containerPage {
      .blockNumberStudent {
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 0 5px 0 5px;
        .title {
          padding: 0 0 5px 5px ;
        }
        .input {
          width: 200px;
        }
        .button {
          width: max-content;
        }
      }
      .containerTask {
        grid-template-columns: repeat(1, max-content);
        .blockNumber {
          .diagram {
            .duplicateColum {
              .duplicate {
                width: 31px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                font-size: 12px;
                height: 23px;
                margin-right: -8px;
                &:last-child {
                  margin-bottom: 13px;
                }
                .line {
                  font-size: 14px;
                }
              }
            }
            .elementRow {
              .elementColumn {
                .column {
                  width: 26px;
                }
              }
              .elementNumbers {
                margin-bottom: -19px;
                .number {
                  width: 25px;
                  height: 16px;
                  font-size: 12px;
                }
              }
            }
          }
        }
      }
    }
  }
  @media (min-width: 0px) and (max-width: 400px) {
    .containerPage {
      .blockNumberStudent {
        display: flex;
        margin: 5px 0 20px 0;
        .title {
          font-size: 16px;
        }
        .input {
          margin: 0 5px;
        }
        .button {
          background: linear-gradient(90deg, rgb(97, 97, 97)20%, rgb(129, 129, 129));
          color: white;
          text-shadow: 1px 1px 2px black;
        }
      }
      .info {
        .title {
          font-size: 23px;
        }
      }
      .containerTask {
        grid-template-columns: repeat(1, max-content);
        .blockNumber {
          .tableStatistics {
            .blocktitleCell .titleCell:first-child, .blockColumn .column:first-child {
              width: 70px;
            }
            .blocktitleCell .titleCell:nth-child(2), .blockColumn .column:nth-child(2) {
              width: 85px;
            }
            .blocktitleCell .titleCell:nth-child(3), .blockColumn .column:nth-child(3) {
              width: 75px;
            }
            .blocktitleCell .titleCell:last-child, .blockColumn .column:last-child {
              width: 75px;
            }
          }
        }
      }
    }
  }
</style>
