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
        <button class="createButton" @click="createArrayNormalDistribution">Згенерувати вибірку нормального розподілу</button>
        <div v-show="arrayNormalDistribution.length !== 0" class="table">
          <div class="cell" v-for="(value, i) of arrayNormalDistribution" :key="i">{{value.value}}</div>
        </div>
      </div>
      <div class="blockNumber">
        <button class="createButton" @click="statisticsResult">Згенерувати розрахунки по вибірці</button>
        <div v-show="variance !== 0" class="tableStatistics">
          <div class="blocktitleCell">
            <span class="titleCell">Дисперсія</span>
            <span class="titleCell">Середнє квадратичне відхилення</span>
            <span class="titleCell">Коефіцієнт асиметрії</span>
            <span class="titleCell">Коефіцієнт ексцесу</span>
          </div>
          <div class="blockColumn">
            <div class="column">
              <span class="cell">{{variance}}</span>
            </div>
            <div class="column">
              <span class="cell">{{middleDeviation}}</span>
            </div>
            <div class="column">
              <span class="cell">{{asymemetryCoefficients}}</span>
            </div>
            <div class="column">
              <span class="cell">{{excessCoefficents}}</span>
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
    arrayNormalDistribution: [],

    middleArithmeticNumber: 0,
    variance: 0,
    middleDeviation: 0,
    asymemetryCoefficients: 0,
    excessCoefficents: 0,

    z: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    numberStudent: 0
  }),
  computed: {},
  methods: {
    emitNumberStudent () {
      this.$emit('numberStudent', this.numberStudent)
    },
    createArrayNormalDistribution () {
      if (this.n === 0) {
        alert('Введіть номер студента та збережіть його')
      } else {
        const arrayLeng = parseInt(this.n) * 5
        this.arrayNormalDistribution.length = 0
        for (let i = 0; i < arrayLeng; i++) {
          this.arrayNormalDistribution.push({ value: Math.floor(Math.random() * (parseInt(this.n) + 1)) })
        }
      }
    },
    statisticsResult () {
      if (this.n === 0) {
        alert('Введіть номер студента та збережіть його')
      } else if (this.arrayNormalDistribution.length === 0) {
        alert('Сгенеруйте вибірку нормального розподілу')
      } else {
        this.variance = 0
        this.middleDeviation = 0
        this.asymemetryCoefficients = 0
        this.excessCoefficents = 0
        this.middleArithmeticNumber = 0

        for (let i = 0; i < this.arrayNormalDistribution.length; i++) {
          this.middleArithmeticNumber += this.arrayNormalDistribution[i].value
        }
        this.middleArithmeticNumber = this.middleArithmeticNumber / this.arrayNormalDistribution.length
        // variance
        this.variance = this.varianceFunction()
        // middleDeviation
        this.middleDeviation = this.middleDeviationFunction()
        // asymemetryCoefficients
        this.asymemetryCoefficients = this.asymemetryCoefficientsFunction()
        // excessCoefficents
        this.excessCoefficents = this.excessCoefficentsFunction()
      }
    },
    varianceFunction () {
      let sum = 0
      for (let i = 0; i < this.arrayNormalDistribution.length - 1; i++) {
        const number = Math.pow(this.arrayNormalDistribution[i].value - this.middleArithmeticNumber, 2)
        sum += number
      }
      const number = sum / (this.arrayNormalDistribution.length - 1)
      return number.toFixed(2)
    },
    middleDeviationFunction () {
      let sum = 0
      for (let i = 0; i < this.arrayNormalDistribution.length - 1; i++) {
        const number = Math.pow((this.arrayNormalDistribution[i].value - this.middleArithmeticNumber), 2)
        sum += number
      }
      const number = Math.sqrt(sum / this.arrayNormalDistribution.length)
      return parseFloat(number.toFixed(2))
    },
    asymemetryCoefficientsFunction () {
      let sum = 0
      for (let i = 0; i < this.arrayNormalDistribution.length - 1; i++) {
        const number = Math.pow((this.arrayNormalDistribution[i].value - this.middleArithmeticNumber), 3)
        sum += number
      }
      const number = sum / ((this.arrayNormalDistribution.length - 1) * Math.pow(this.middleDeviation, 3))
      return number.toFixed(2)
    },
    excessCoefficentsFunction () {
      let sum = 0
      for (let i = 0; i < this.arrayNormalDistribution.length - 1; i++) {
        const number = Math.pow((this.arrayNormalDistribution[i].value - this.middleArithmeticNumber), 4)
        sum += number
      }
      const number = sum / ((this.arrayNormalDistribution.length - 1) * Math.pow(this.middleDeviation, 4))
      return number.toFixed(2)
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
      grid-template-columns: repeat(3, max-content);
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
            width: 90px;
          }
          .blocktitleCell .titleCell:nth-child(2), .blockColumn .column:nth-child(2) {
            width: 265px;
          }
          .blocktitleCell .titleCell:nth-child(3), .blockColumn .column:nth-child(3) {
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
  @media (min-width: 769px) and (max-width: 1330px) {
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
  @media (min-width: 769px) and (max-width: 1000px) {
    .containerPage {
      .containerTask {
        .blockNumber {
          .tableStatistics {
            .blocktitleCell .titleCell:first-child, .blockColumn .column:first-child {
              width: 90px;
            }
            .blocktitleCell .titleCell:nth-child(2), .blockColumn .column:nth-child(2) {
              width: 100px;
            }
            .blocktitleCell .titleCell:nth-child(3), .blockColumn .column:nth-child(3) {
              width: 90px;
            }
            .blocktitleCell .titleCell:last-child, .blockColumn .column:last-child {
              width: 90px;
            }
          }
        }
      }
    }
  }
  @media (min-width: 401px) and (max-width: 768px) {
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
          .tableStatistics {
            .blocktitleCell .titleCell:first-child, .blockColumn .column:first-child {
              width: 90px;
            }
            .blocktitleCell .titleCell:nth-child(2), .blockColumn .column:nth-child(2) {
              width: 105px;
            }
            .blocktitleCell .titleCell:nth-child(3), .blockColumn .column:nth-child(3) {
              width: 95px;
            }
            .blocktitleCell .titleCell:last-child, .blockColumn .column:last-child {
              width: 95px;
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
      .info {
        .title {
          font-size: 23px;
        }
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
