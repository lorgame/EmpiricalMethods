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
    <div class="blockSaveInfo">
      <span class="title">Натисніть кнопку для збереження результату:</span>
      <a ref="download" class="downloadButton">
        <button :disabled="criticalValue.length === 0" @click="downloadInfo" class="createButton">Завантажити</button>
      </a>
    </div>
    <div class="containerTask">
      <div class="blockNumber">
        <button @click="createNormalArrays" class="createButton">Згенерувати нормальний розподіл</button>
        <div v-show="arrayNormalNumbersFirst.length !== 0" class="table">
          <div class="cell" v-for="(value, i) of arrayNormalNumbersFirst" :key="i">{{value.value}}</div>
        </div>
        <div v-show="arrayNormalNumbersSecond.length !== 0" class="table">
          <div class="cell" v-for="(value, i) of arrayNormalNumbersSecond" :key="i">{{value.value}}</div>
        </div>
        <div v-show="arrayNormalNumbersThird.length !== 0" class="table">
          <div class="cell" v-for="(value, i) of arrayNormalNumbersThird" :key="i">{{value.value}}</div>
        </div>
      </div>
      <div class="blockNumber">
        <button @click="checkUniformity" class="createButton">Згенерувати перевірку однорідності</button>
        <div class="tableUniformity" v-show="criticalValue.length !== 0">
          <div class="tableTitleGorizontal">
            <span class="cellTitle">Розподіл</span>
            <span class="cellTitle">Критерій Стьюдента</span>
            <span class="cellTitle">Критичне значення критерію</span>
            <span class="cellTitle">Однорідність</span>
          </div>
          <div class="blockVertical">
            <div class="tableTitleVertical">
              <span class="cellTitle" v-for="(value, i) of distribution" :key="i">{{value}}</span>
            </div>
            <div class="tableValue">
              <div class="cell" v-for="(value, i) of uniformity" :key="i">{{value}}</div>
            </div>
            <div class="tableValue">
              <div class="cell" v-for="(value, i) of criticalValue" :key="i">{{value.value}}</div>
            </div>
            <div class="tableValue">
              <div class="cell" v-for="(value, i) of arrayCheckUniformity" :key="i">{{value.value}}</div>
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
    numberStudent: 0,
    arrayNormalNumbersFirst: [],
    arrayNormalNumbersSecond: [],
    arrayNormalNumbersThird: [],
    criticalValue: [],
    uniformity: [],
    distribution: [
      'Розподіл №І та ІІ',
      'Розподіл №І та ІІI',
      'Розподіл №ІI та ІIІ'
    ],
    alfa: 0.05,
    arrayСriterionStyudent: [
      { number: 1, value: 12.7060 },
      { number: 2, value: 4.3020 },
      { number: 3, value: 3.182 },
      { number: 4, value: 2.776 },
      { number: 5, value: 2.570 },
      { number: 6, value: 2.4460 },
      { number: 7, value: 2.3646 },
      { number: 8, value: 2.3060 },
      { number: 9, value: 2.2622 },
      { number: 10, value: 2.2281 },
      { number: 11, value: 2.201 },
      { number: 12, value: 2.1788 },
      { number: 13, value: 2.1604 },
      { number: 14, value: 2.1448 },
      { number: 15, value: 2.1314 },
      { number: 16, value: 2.1190 },
      { number: 17, value: 2.1098 },
      { number: 18, value: 2.1009 },
      { number: 19, value: 2.0930 },
      { number: 20, value: 2.08600 },
      { number: 21, value: 2.0790 },
      { number: 22, value: 2.0739 },
      { number: 23, value: 2.0687 },
      { number: 24, value: 2.0639 },
      { number: 25, value: 2.0595 },
      { number: 26, value: 2.059 },
      { number: 27, value: 2.0518 },
      { number: 28, value: 2.0484 },
      { number: 29, value: 2.0452 },
      { number: 30, value: 2.0423 },
      { number: 31, value: 2.040 },
      { number: 32, value: 2.0360 },
      { number: 33, value: 2.035 },
      { number: 34, value: 2.0322 },
      { number: 35, value: 2.030 },
      { number: 36, value: 2.0281 },
      { number: 37, value: 2.026 },
      { number: 38, value: 2.0244 },
      { number: 39, value: 2.023 },
      { number: 40, value: 2.0211 },
      { number: 41, value: 2.020 },
      { number: 42, value: 2.018 },
      { number: 43, value: 2.017 },
      { number: 44, value: 2.0154 },
      { number: 45, value: 2.014 },
      { number: 46, value: 2.0129 },
      { number: 47, value: 2.012 },
      { number: 48, value: 2.0106 },
      { number: 49, value: 2.010 },
      { number: 50, value: 2.009 },
      { number: 51, value: 2.008 },
      { number: 52, value: 2.007 },
      { number: 53, value: 2.006 },
      { number: 54, value: 2.005 },
      { number: 55, value: 2.004 },
      { number: 56, value: 2.003 },
      { number: 57, value: 2.002 },
      { number: 58, value: 2.002 },
      { number: 59, value: 2.001 },
      { number: 60, value: 2.0003 },
      { number: 61, value: 2.000 },
      { number: 62, value: 1.999 },
      { number: 63, value: 1.998 },
      { number: 64, value: 1.998 },
      { number: 65, value: 1.997 },
      { number: 66, value: 1.997 },
      { number: 67, value: 1.996 },
      { number: 68, value: 1.995 },
      { number: 69, value: 1.995 },
      { number: 70, value: 1.994 },
      { number: 71, value: 1.994 },
      { number: 72, value: 1.993 },
      { number: 73, value: 1.993 },
      { number: 74, value: 1.993 },
      { number: 75, value: 1.992 },
      { number: 76, value: 1.992 },
      { number: 77, value: 1.991 },
      { number: 78, value: 1.991 },
      { number: 79, value: 1.990 },
      { number: 80, value: 1.9900 },
      { number: 90, value: 1.9867 },
      { number: 100, value: 1.9840 },
      { number: 120, value: 1.9719 },
      { number: 150, value: 1.9759 },
      { number: 200, value: 1.9719 },
      { number: 250, value: 1.9695 },
      { number: 300, value: 1.9679 }
    ],
    arrayCheckUniformity: []
  }),
  methods: {
    emitNumberStudent () {
      if (this.numberStudent !== 0 && this.numberStudent <= 121) {
        this.$emit('numberStudent', this.numberStudent)
      } else if (this.numberStudent > 121) {
        alert('Число більше ніж допустимий діапазон. Введіть номер студента, що не перевищує значення "97" та збережіть його')
      }
    },
    normalDistribution (x, m, t) {
      const number = (1 / (Math.sqrt(t) * Math.sqrt(2 * Math.PI))) * Math.exp(-((Math.pow(x - m, 2)) / (2 * t)))
      return number
    },
    createNormalArrays () {
      if (this.n === 0) {
        alert('Введіть номер студента та збережіть його')
      } else {
        const arrayLeng = parseInt(this.n) + 30
        this.arrayNormalNumbersFirst.length = 0
        const m1 = 10
        const t1 = 10
        this.arrayNormalNumbersSecond.length = 0
        const m2 = 15
        const t2 = 10
        this.arrayNormalNumbersThird.length = 0
        const m3 = 10
        const t3 = 4
        if (Number.isInteger(parseInt(this.n) / 2)) {
          for (let i = 0; i < (arrayLeng / 2); i++) {
            const normalNumberFirst = this.normalDistribution(i, m1, t1)
            const normalNumberSecond = this.normalDistribution(i, m2, t2)
            const normalNumberThird = this.normalDistribution(i, m3, t3)
            this.arrayNormalNumbersFirst.push({ value: normalNumberFirst })
            this.arrayNormalNumbersSecond.push({ value: normalNumberSecond })
            this.arrayNormalNumbersThird.push({ value: normalNumberThird })
          }
          const arrayFirstNegative = []
          const arraySecondNegative = []
          const arrayThirdNegative = []
          for (let i = 0; i < (arrayLeng / 2); i++) {
            const normalNumberFirst = this.arrayNormalNumbersFirst[i].value
            const normalNumberSecond = this.arrayNormalNumbersSecond[i].value
            const normalNumberThird = this.arrayNormalNumbersThird[i].value
            arrayFirstNegative.push({ value: -normalNumberFirst })
            arraySecondNegative.push({ value: -normalNumberSecond })
            arrayThirdNegative.push({ value: -normalNumberThird })
          }
          this.arrayNormalNumbersFirst = this.arrayNormalNumbersFirst.concat(arrayFirstNegative)
          this.arrayNormalNumbersSecond = this.arrayNormalNumbersSecond.concat(arraySecondNegative)
          this.arrayNormalNumbersThird = this.arrayNormalNumbersThird.concat(arrayThirdNegative)
          this.arrayNormalNumbersFirst.sort((a, b) => {
            return a.value - b.value
          })
          this.arrayNormalNumbersSecond.sort((a, b) => {
            return a.value - b.value
          })
          this.arrayNormalNumbersThird.sort((a, b) => {
            return a.value - b.value
          })
        } else {
          for (let i = 0; i < (arrayLeng / 2) + 0.5; i++) {
            const normalNumberFirst = this.normalDistribution(i, m1, t1)
            const normalNumberSecond = this.normalDistribution(i, m2, t2)
            const normalNumberThird = this.normalDistribution(i, m3, t3)
            this.arrayNormalNumbersFirst.push({ value: normalNumberFirst })
            this.arrayNormalNumbersSecond.push({ value: normalNumberSecond })
            this.arrayNormalNumbersThird.push({ value: normalNumberThird })
          }
          this.arrayNormalNumbersFirst.sort((a, b) => {
            return a.value - b.value
          })
          this.arrayNormalNumbersSecond.sort((a, b) => {
            return a.value - b.value
          })
          this.arrayNormalNumbersThird.sort((a, b) => {
            return a.value - b.value
          })
          const arrayFirstNegative = []
          const arraySecondNegative = []
          const arrayThirdNegative = []
          for (let i = 1; i < (arrayLeng / 2) + 0.5; i++) {
            const normalNumberFirst = this.arrayNormalNumbersFirst[i].value
            const normalNumberSecond = this.arrayNormalNumbersSecond[i].value
            const normalNumberThird = this.arrayNormalNumbersThird[i].value
            arrayFirstNegative.push({ value: -normalNumberFirst })
            arraySecondNegative.push({ value: -normalNumberSecond })
            arrayThirdNegative.push({ value: -normalNumberThird })
          }
          this.arrayNormalNumbersFirst = this.arrayNormalNumbersFirst.concat(arrayFirstNegative)
          this.arrayNormalNumbersSecond = this.arrayNormalNumbersSecond.concat(arraySecondNegative)
          this.arrayNormalNumbersThird = this.arrayNormalNumbersThird.concat(arrayThirdNegative)
          this.arrayNormalNumbersFirst.sort((a, b) => {
            return a.value - b.value
          })
          this.arrayNormalNumbersSecond.sort((a, b) => {
            return a.value - b.value
          })
          this.arrayNormalNumbersThird.sort((a, b) => {
            return a.value - b.value
          })
        }
      }
    },
    checkUniformity () {
      if (this.arrayNormalNumbersFirst.length === 0 && this.arrayNormalNumbersSecond.length === 0 && this.arrayNormalNumbersThird.length === 0) {
        alert('Згенеруйте нормальний розподіл')
      } else {
        this.uniformity.length = 0
        this.arrayCheckUniformity.length = 0
        this.criticalValue.length = 0
        let sumNormalNumberFirst = 0
        let sumNormalNumberSecond = 0
        let sumNormalNumberThird = 0
        for (let i = 0; i < this.arrayNormalNumbersFirst.length || i < this.arrayNormalNumbersSecond.length || i < this.arrayNormalNumbersThird.length; i++) {
          if (i < this.arrayNormalNumbersFirst.length) {
            sumNormalNumberFirst += Number(this.arrayNormalNumbersFirst[i].value)
          }
          if (i < this.arrayNormalNumbersSecond.length) {
            sumNormalNumberSecond += Number(this.arrayNormalNumbersSecond[i].value)
          }
          if (i < this.arrayNormalNumbersThird.length) {
            sumNormalNumberThird += Number(this.arrayNormalNumbersThird[i].value)
          }
        }
        const middleValueFirst = sumNormalNumberFirst / this.arrayNormalNumbersFirst.length
        const middleValueSecond = sumNormalNumberSecond / this.arrayNormalNumbersSecond.length
        const middleValueThird = sumNormalNumberThird / this.arrayNormalNumbersThird.length
        const t1 = 10
        const t2 = 10
        const t3 = 4
        const uniformityFirst = (middleValueFirst - middleValueSecond) / (Math.sqrt((((this.arrayNormalNumbersFirst.length - 1) * t1 + (this.arrayNormalNumbersSecond.length - 1) * t2) / (this.arrayNormalNumbersFirst.length + this.arrayNormalNumbersSecond.length - 2)) * (1 / this.arrayNormalNumbersFirst.length + 1 / this.arrayNormalNumbersSecond.length)))
        const uniformitySecond = (middleValueFirst - middleValueThird) / (Math.sqrt((((this.arrayNormalNumbersFirst.length - 1) * t1 + (this.arrayNormalNumbersThird.length - 1) * t3) / (this.arrayNormalNumbersFirst.length + this.arrayNormalNumbersThird.length - 2)) * (1 / this.arrayNormalNumbersFirst.length + 1 / this.arrayNormalNumbersThird.length)))
        const uniformityThird = (middleValueSecond - middleValueThird) / (Math.sqrt((((this.arrayNormalNumbersSecond.length - 1) * t2 + (this.arrayNormalNumbersThird.length - 1) * t3) / (this.arrayNormalNumbersSecond.length + this.arrayNormalNumbersThird.length - 2)) * (1 / this.arrayNormalNumbersSecond.length + 1 / this.arrayNormalNumbersThird.length)))
        this.uniformity.push(uniformityFirst, uniformitySecond, uniformityThird)
        const elementCriticalValueFirst = this.arrayNormalNumbersFirst.length + this.arrayNormalNumbersSecond.length - 2
        const elementCriticalValueSecond = this.arrayNormalNumbersFirst.length + this.arrayNormalNumbersThird.length - 2
        const elementCriticalValueThird = this.arrayNormalNumbersSecond.length + this.arrayNormalNumbersThird.length - 2
        this.arrayСriterionStyudent.find(element => {
          if (elementCriticalValueFirst === element.number && elementCriticalValueSecond === element.number && elementCriticalValueThird === element.number) {
            this.criticalValue.push({ element: 'first', value: element.value })
            this.criticalValue.push({ element: 'second', value: element.value })
            this.criticalValue.push({ element: 'second', value: element.value })
          }
        })
        if (this.criticalValue.length === 0) {
          alert('Критичне значення критерію не знайдено, введіть номер студента, аби значення дорівнювало числу: 1-80, 90, 100, 120, 150, 200, 250. Наразі значення дорівнює: "' + (((parseInt(this.n) + 30) * 2) - 2) + '". Формула вирахування значення: "n₁ + n₂ - 2", де n - довжина нормального розподілу.')
        }
        for (let i = 0; i < this.uniformity.length; i++) {
          if (this.uniformity[i] < this.criticalValue[i].value && this.alfa <= 0.05) {
            this.arrayCheckUniformity.push({ value: 'Підтверджена' })
          } else {
            this.arrayCheckUniformity.push({ value: 'Спростована' })
          }
        }
      }
    },
    downloadInfo () {
      const arrayText = []
      for (let i = 0; i < this.uniformity.length; i++) {
        arrayText.push(this.distribution[i] + '\n\u00A0Критерій Стьюдента: "' + this.uniformity[i] + '"\n\u00A0Критичне значення критерію: "' + this.criticalValue[i].value + '"\n\u00A0Однорідність: "' + this.arrayCheckUniformity[i].value + '"')
      }
      const text = 'Розподіл № І з (L+30) елементів з m = 10, σ² = 10' + '\n\u00A0\u00A0' + this.arrayNormalNumbersFirst.map(element => element.value).join('\n\u00A0\u00A0') + '\n\n' + 'Розподіл № ІІ з (L+30) елементів з m = 15, σ² = 10' + '\n\u00A0\u00A0' + this.arrayNormalNumbersSecond.map(element => element.value).join('\n\u00A0\u00A0') + '\n\n' + 'Розподіл № ІІІ з (L+30) елементів з m = 10, σ² = 4' + '\n\u00A0\u00A0' + this.arrayNormalNumbersThird.map(element => element.value).join('\n\u00A0\u00A0') + '\n\n' + arrayText.join('\n\n')
      const myData = 'data:application/txt;charset=utf-8,' + encodeURIComponent(text)
      this.$refs.download.onclick = function () {
        this.href = myData
        this.download = 'data.txt'
      }
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
      margin: 5px 0 15px 0;
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
    .blockSaveInfo {
      display: flex;
      margin-bottom: 20px;
      .title {
        margin-right: 5px
      }
    }
    .createButton {
      background: linear-gradient(90deg, rgb(97, 97, 97)20%, rgb(129, 129, 129));
      color: white;
      text-shadow: 1px 1px 2px black;
      margin-bottom: 10px;
      cursor: pointer;
      &:disabled {
        background: rgb(173, 173, 173) !important;
        cursor: default;
      }
    }
    .containerTask {
      display: grid;
      grid-template-columns: repeat(1, max-content);
      grid-column-gap: 30px;
      justify-content: center;
      justify-items: center;
      .downloadButton {
        margin-top: 10px;
      }
      .blockNumber {
        display: grid;
        justify-items: center;
        align-items: flex-start;
        align-self: flex-start;
        width: max-content;
        .table {
          display: grid;
          background: rgb(77, 77, 77);
          width: max-content;
          grid-template-columns: repeat(3, max-content);
          margin-bottom: 15px;
          .cell {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 240px;
            height: 24px;
            background: white;
            border: 1px solid rgb(77, 77, 77);
            border-collapse: collapse;
            font-size: 17px;
            margin-left: -1px;
            margin-top: -1px
          }
        }
        .tableUniformity {
          .tableTitleGorizontal {
            display: grid;
            grid-template-columns: 180px 240px 240px 130px;
          }
          .blockVertical {
            display: grid;
            grid-template-columns: 180px 240px 240px 130px;
          }
          .cell {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 24px;
            background: white;
            border: 1px solid rgb(77, 77, 77);
            border-collapse: collapse;
            font-size: 17px;
            margin-left: -1px;
            margin-top: -1px
          }
          .cellTitle {
            background: rgb(231, 231, 231);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 24px;
            border: 1px solid rgb(77, 77, 77);
            border-collapse: collapse;
            font-size: 17px;
            margin-left: -1px;
            margin-top: -1px
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
        grid-row-gap: 20px;
      }
    }
  }
  @media (min-width: 0px) and (max-width: 1023px) {
    .containerPage {
      .blockNumberStudent, .blockSaveInfo {
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
      }
    }
  }
  //Adaptive
  @media (min-width: 1125px) and (max-width: 1440px) {
    .containerPage {
      .containerTask {
        grid-column-gap: 20px;
      }
    }
  }
  @media (min-width: 931px) and (max-width: 1124px) {
    .containerPage {
      .blockNumberStudent, .blockSaveInfo {
        justify-content: center;
      }
      .containerTask {
        justify-content: center;
        .blockNumber {
          .table {
            .cell {
              width: 200px;
              font-size: 14px;
            }
          }
          .tableUniformity {
            .tableTitleGorizontal {
              grid-template-columns: 145px 200px 135px 100px;
              .cellTitle {
                font-size: 14px;
                height: 44px;
                text-align: center;
              }
            }
            .blockVertical {
              grid-template-columns: 145px 200px 135px 100px;
              .tableTitleVertical {
                .cellTitle {
                  font-size: 14px;
                }
              }
              .tableValue {
                .cell {
                  font-size: 14px;
                }
              }
            }
          }
        }
      }
    }
  }
  @media (min-width: 769px) and (max-width: 930px) {
    .containerPage {
      .containerTask {
        .blockNumber {
          .table {
            grid-template-columns: repeat(2, 1fr);
            .cell {
              font-size: 12px;
              width: 175px;
            }
          }
          .tableUniformity {
            .tableTitleGorizontal {
              grid-template-columns: 125px 175px 60px 90px;
              .cellTitle {
                font-size: 12px;
                height: 60px;
                text-align: center;
              }
            }
            .blockVertical {
              grid-template-columns: 125px 175px 60px 90px;
              .tableTitleVertical {
                .cellTitle {
                  font-size: 12px;
                }
              }
              .tableValue {
                .cell {
                  font-size: 12px;
                }
              }
            }
          }
        }
      }
    }
  }
  @media (min-width: 401px) and (max-width: 768px) {
    .containerPage {
      .blockNumberStudent {
        .title {
          font-size: 15px;
        }
      }
      .blockSaveInfo {
        display: flex;
        flex-direction: column;
        align-items: center;
        .title {
          font-size: 15px;
        }
        .downloadButton {
          margin-top: 7px;
        }
      }
      .containerTask {
        .blockNumber {
          .table {
            grid-template-columns: repeat(2, 1fr);
            .cell {
              font-size: 12px;
              width: 175px;
            }
          }
          .tableUniformity {
            .tableTitleGorizontal {
              grid-template-columns: 103px 160px 57px 80px;
              .cellTitle {
                font-size: 12px;
                height: 60px;
                text-align: center;
              }
            }
            .blockVertical {
              grid-template-columns: 103px 160px 57px 80px;
              .tableTitleVertical {
                .cellTitle {
                  font-size: 12px;
                }
              }
              .tableValue {
                .cell {
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
        .title {
          font-size: 14px;
        }
      }
      .blockSaveInfo {
        display: flex;
        flex-direction: column;
        align-items: center;
        .title {
          font-size: 14px;
        }
        .downloadButton {
          margin-top: 7px;
        }
      }
      .info {
        .title {
          font-size: 23px;
        }
      }
      .containerTask {
        .blockNumber {
          .table {
            grid-template-columns: repeat(2, 1fr);
            .cell {
              font-size: 9px;
              width: 135px;
            }
          }
          .tableUniformity {
            .tableTitleGorizontal {
              grid-template-columns: 80px 120px 45px 65px;
              .cellTitle {
                font-size: 9px;
                height: 60px;
                text-align: center;
              }
            }
            .blockVertical {
              grid-template-columns: 80px 120px 45px 65px;
              .tableTitleVertical {
                .cellTitle {
                  font-size: 9px;
                }
              }
              .tableValue {
                .cell {
                  font-size: 9px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
