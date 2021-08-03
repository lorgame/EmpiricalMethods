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
        <button class="createButton" @click="creaderDispersionAnalysis">Згенерувати кореляційний аналіз</button>
        <div v-show="arrayDispersion.length !== 0" class="tableChangeNumber">
          <div class="tableTitleGorizontal">
            <span class="cellTitle">Джерело дисперсії</span>
            <span class="cellTitle">Число ступенів вільності</span>
            <span class="cellTitle">Сума квадратів</span>
            <span class="cellTitle">Середній квадрат</span>
            <span class="cellTitle">Математичне сподівання середнього квадрату</span>
          </div>
          <div class="blockVertical">
            <div class="tableTitleVertical">
              <span class="cellTitle" v-for="(value, i) of arraySourceVariance" :key="i">{{value}}</span>
            </div>
            <div class="tableValue">
              <div class="cell" v-for="(value, i) of arrayRemainder" :key="i">{{value}}</div>
            </div>
            <div class="tableValue">
              <div class="cell" v-for="(value, i) of arraySumSquares" :key="i">{{value}}</div>
            </div>
            <div class="tableValue">
              <div class="cell" v-for="(value, i) of arrayMiddleSquares" :key="i">{{value}}</div>
            </div>
            <div class="tableValue">
              <div class="cell" v-for="(value, i) of arrayDispersion" :key="i">{{value}}</div>
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
    arrayData: [
      { id: 1, low: [4, 7, 6, 5, 6, 4], medium: [5, 6, 5, 4, 5, 4], high: [4, 4, 5, 6, 4, 3] },
      { id: 2, low: [4, 7, 6, 5, 6, 7], medium: [5, 6, 5, 5, 5, 4], high: [4, 4, 5, 3, 4, 3] },
      { id: 3, low: [4, 6, 6, 5, 6, 4], medium: [5, 6, 5, 4, 5, 4], high: [4, 4, 2, 6, 4, 3] },
      { id: 4, low: [4, 7, 6, 6, 6, 4], medium: [5, 6, 5, 5, 5, 4], high: [4, 2, 5, 6, 4, 3] },
      { id: 5, low: [4, 7, 6, 5, 6, 4], medium: [5, 6, 2, 4, 5, 4], high: [4, 1, 5, 6, 4, 3] },
      { id: 6, low: [4, 7, 6, 3, 6, 7], medium: [5, 6, 5, 4, 5, 4], high: [4, 4, 2, 6, 2, 2] },
      { id: 7, low: [4, 8, 6, 5, 6, 5], medium: [4, 6, 5, 4, 5, 4], high: [3, 3, 5, 6, 4, 3] },
      { id: 8, low: [4, 6, 6, 6, 6, 6], medium: [5, 6, 5, 4, 5, 4], high: [2, 4, 3, 6, 4, 3] },
      { id: 9, low: [4, 1, 6, 5, 6, 4], medium: [5, 6, 2, 4, 2, 4], high: [4, 4, 5, 6, 4, 3] },
      { id: 0, low: [4, 2, 6, 5, 6, 4], medium: [5, 2, 5, 4, 2, 4], high: [4, 1, 5, 5, 4, 3] }
    ],
    arraySourceVariance: [],
    arraySumSquares: [],
    arrayMiddleSquares: [],
    arrayDispersion: [],
    arrayRemainder: [],
    arraySumColumns: [],
    arraySumColumnsElementSquares: [],
    arraySumColumnsSquares: [],
    sumColumns: 0,
    sumColumnsElementSquares: 0,
    sumColumnsSquares: 0,
    sumTotal: 0,
    sumActual: 0,
    sumResidual: 0,
    actualDispersion: 0,
    residualDispersion: 0,
    totalDispersion: 0,
    criterionFischerSnedecor: 0,
    dispersionTotal: 0,
    dispersionActual: 0
  }),
  methods: {
    emitNumberStudent () {
      this.$emit('numberStudent', this.numberStudent)
    },
    creaderDispersionAnalysis () {
      const idItem = Number(this.n.slice(-1))
      this.arraySumColumns.length = 0
      this.arraySumColumnsElementSquares.length = 0
      this.arraySumColumnsSquares.length = 0
      this.arraySourceVariance.length = 0
      this.arrayRemainder.length = 0
      this.arraySumSquares.length = 0
      this.arrayMiddleSquares.length = 0
      this.arrayDispersion.length = 0
      this.sumColumns = 0
      this.sumColumnsElementSquares = 0
      this.sumColumnsSquares = 0
      this.sumTotal = 0
      this.sumActual = 0
      this.sumResidual = 0
      this.actualDispersion = 0
      this.residualDispersion = 0
      this.totalDispersion = 0
      this.criterionFischerSnedecor = 0
      this.dispersionTotal = 0
      this.dispersionActual = 0
      this.arrayData.forEach(element => {
        if (element.id === idItem) {
          this.arraySourceVariance.push(element.id, 'Залишок', 'Загальна сума')
          for (let i = 0; i < element.low.length; i++) {
            this.arraySumColumns.push(element.low[i] + element.medium[i] + element.high[i])
            this.arraySumColumnsElementSquares.push(Math.pow(element.low[i], 2) + Math.pow(element.medium[i], 2) + Math.pow(element.high[i], 2))
            this.arraySumColumnsSquares.push(Math.pow(element.low[i] + element.medium[i] + element.high[i], 2))
          }
          for (let i = 0; i < this.arraySumColumns.length; i++) {
            this.sumColumns += this.arraySumColumns[i]
            this.sumColumnsElementSquares += this.arraySumColumnsElementSquares[i]
            this.sumColumnsSquares += this.arraySumColumnsSquares[i]
          }
          this.sumTotal = this.sumColumnsElementSquares - (1 / (element.low.length * this.arraySumColumns.length)) * Math.pow(this.sumColumns, 2)
          this.sumActual = (1 / 5) * this.sumColumnsSquares - (1 / (element.low.length * this.arraySumColumns.length)) * Math.pow(this.sumColumns, 2)
          this.sumResidual = this.sumTotal - this.sumActual
          this.actualDispersion = this.sumActual / (element.low.length - 1)
          this.residualDispersion = this.sumResidual / (element.low.length * (this.arraySumColumns.length - 1))
          this.dispersionTotal = Math.pow(this.actualDispersion + this.residualDispersion, 2)
          this.dispersionActual = Math.pow(this.residualDispersion, 2)
          this.totalDispersion = this.sumResidual / (element.low.length * this.arraySumColumns.length - 1)
          if (!Number.isInteger(this.sumTotal)) {
            this.sumTotal = +(this.sumTotal.toFixed(2))
          }
          if (!Number.isInteger(this.sumActual)) {
            this.sumActual = +(this.sumActual.toFixed(2))
          }
          if (!Number.isInteger(this.sumResidual)) {
            this.sumResidual = +(this.sumResidual.toFixed(2))
          }
          if (!Number.isInteger(this.actualDispersion)) {
            this.actualDispersion = +(this.actualDispersion.toFixed(2))
          }
          if (!Number.isInteger(this.residualDispersion)) {
            this.residualDispersion = +(this.residualDispersion.toFixed(2))
          }
          if (!Number.isInteger(this.dispersionTotal)) {
            this.dispersionTotal = +(this.dispersionTotal.toFixed(2))
          }
          if (!Number.isInteger(this.dispersionActual)) {
            this.dispersionActual = +(this.dispersionActual.toFixed(2))
          }
          if (!Number.isInteger(this.totalDispersion)) {
            this.totalDispersion = +(this.totalDispersion.toFixed(2))
          }
          this.arrayRemainder.push(element.low.length - 1, element.low.length * (this.arraySumColumns.length - 1), element.low.length * this.arraySumColumns.length - 1)
          this.arraySumSquares.push(this.sumTotal, this.sumActual, this.sumResidual)
          this.arrayMiddleSquares.push(this.actualDispersion, this.residualDispersion, this.totalDispersion)
          this.arrayDispersion.push(this.dispersionTotal, this.dispersionActual)
        }
      })
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
      grid-template-columns: 1fr;
      grid-column-gap: 30px;
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
          cursor: pointer;
        }
        .tableChangeNumber {
          margin-bottom: 15px;
          .tableTitleGorizontal, .blockVertical {
          display: grid;
          grid-template-columns: 85px 80px 80px 80px 115px;
          }
          .blockVertical {
            .tableTitleVertical, .tableValue {
              .cellTitle, .cell {
                height: 50px;
              }
            }
          }
          .cell, .cellTitle {
            display: flex;
            border: 1px solid rgb(77, 77, 77);
            justify-content: center;
            align-items: center;
            text-align: center;
            height: 100px;
            margin-left: -1px;
            margin-top: -1px;
            font-size: 17px;
            border-collapse: collapse;
          }
          .cell {
            background: white;
          }
          .cellTitle {
            background: rgb(231, 231, 231);
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
        .content {
          font-size: 18px !important;
        }
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
        .blockNumber {
          .tableChangeNumber {
            .tableTitleGorizontal, .blockVertical {
              display: grid;
              grid-template-columns: 55px 55px 55px 55px 80px;
              font-size: 12px;
            }
            .blockVertical {
              .tableTitleVertical, .tableValue {
                .cellTitle, .cell {
                  font-size: inherit;
                }
              }
            }
            .cell, .cellTitle {
              font-size: 17px;
              font-size: inherit;
            }
          }
        }
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
  @media (min-width: 900px) and (max-width: 1124px) {
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
  @media (min-width: 768px) and (max-width: 899px) {
    .containerPage {
      .containerTask {
        grid-template-columns: repeat(1, max-content);
      }
    }
  }
  @media (min-width: 0px) and (max-width: 400px) {
    .containerPage {
      .info {
        .title {
          font-size: 23px;
        }
      }
    }
  }
</style>
