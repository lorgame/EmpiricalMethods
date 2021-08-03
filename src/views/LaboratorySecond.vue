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
        <button class="createButton" @click="createArrayNumbers">Згенерувати вибірку</button>
        <div v-show="arrayNumbers.length !== 0" class="table">
          <div class="cell" v-for="(value, i) of arrayNumbers" :key="i">{{value.value}}</div>
        </div>
      </div>
      <div class="blockNumber">
        <button class="createButton" @click="sortArrayNumbers">Згенерувати варіаційний ряд</button>
        <div v-show="arraySort.length !== 0" class="table">
          <div class="cell" v-for="(value, i) of arraySort" :key="i">{{value.value}}</div>
        </div>
      </div>
      <div class="blockNumber">
        <button class="createButton" @click="statisticsResult">Згенерувати розрахунки по вибірці</button>
        <div v-show="moda.length !== 0 && median !== 0 && middleArithmetic !== 0" class="tableStatistics">
          <div class="blocktitleCell">
            <span class="titleCell">Мода</span>
            <span class="titleCell">Медіана</span>
            <span class="titleCell">Середнє арифметичне сукупності</span>
          </div>
          <div class="blockColumn">
            <div class="column">
              <span class="cell" v-for="(value, i) of moda" :key="i">{{value.uniqueValue}}</span>
            </div>
            <div class="column">
              <span :style="{height: 23 * moda.length + (moda.length - 1) + 1 + 'px'}" class="cell">{{median}}</span>
            </div>
            <div class="column">
              <span :style="{height: 23 * moda.length + (moda.length - 1) + 1 + 'px'}" class="cell">{{middleArithmetic}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="blockNumber">
        <button class="createButton" @click="modaTestVariable">Провести тест пошуку моди</button>
        <div v-show="modaTestFirst.length !== 0 && modaTestSecond.length !== 0" class="tableTestModa">
          <div class="row">
            <div ref='titleCell' class="titleCell">Пошук моди за допомогою знаходження унікальних чисел та їх дублікатів у варіаційному ряді з визначенням найбільшого числа, або ж чисел що зустрінуться</div>
            <div>
              <div class="cell" :style="{height: 180 / modaTestFirst.length + 'px'}" v-for="(value, i) of modaTestFirst" :key="i">{{value.uniqueValue}}</div>
            </div>
          </div>
          <div class="row">
            <div ref='titleCell' class="titleCell">Перевірка відповідності знайденої раніше моди та нової, що було обчислена шляхом знаходження найбільшої дублікації та вибору числа, що відповідають їй</div>
            <div>
              <div class="cell" :style="{height: 180 / modaTestFirst.length + 'px'}" v-for="(value, i) of modaTestSecond" :key="i">{{value.value}}</div>
            </div>
          </div>
          <div class="row">
            <div class="titleCell">Результат перевірки</div>
            <div class="cell">{{modaTestIdentical}}</div>
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
    arrayNumbers: [],
    arraySort: [],
    arrayStatistics: [],
    moda: [],
    modaTestFirst: [],
    modaTestSecond: [],
    median: 0,
    middleArithmetic: 0
  }),
  computed: {
    modaTestIdentical () {
      let info = ''
      this.modaTestFirst.filter(item => {
        const i = this.modaTestSecond.findIndex(element => element.value === item.uniqueValue)
        if (i !== -1) {
          info = 'Мода правдива.'
        } else {
          info = 'Мода не правдива.'
        }
      })
      return info
    }
  },
  methods: {
    emitNumberStudent () {
      this.$emit('numberStudent', this.numberStudent)
    },
    createArrayNumbers () {
      if (this.n === 0) {
        alert('Введіть номер студента та збережіть його')
      } else {
        const arrayLeng = parseInt(this.n) + 10
        this.arrayNumbers.length = 0
        for (let i = 0; i < arrayLeng; i++) {
          this.arrayNumbers.push({ value: Math.floor(Math.random() * (parseInt(this.n) + 1)) + 1 })
        }
      }
    },
    sortArrayNumbers () {
      if (this.n === 0) {
        alert('Введіть номер студента та збережіть його')
      } else if (this.arrayNumbers.length === 0) {
        alert('Створіть вибірку')
      } else {
        this.arraySort.length = 0
        this.arraySort = this.arraySort.concat(this.arrayNumbers)
        this.arraySort.sort((a, b) => {
          return a.value - b.value
        })
      }
    },
    statisticsResult () {
      if (this.n === 0) {
        alert('Введіть номер студента та збережіть його')
      } else if (this.arrayNumbers.length === 0) {
        alert('Створіть вибірку')
      } else if (this.arraySort.length === 0) {
        alert('Створіть варіаційний ряд')
      } else {
        // null
        this.arrayStatistics.length = 0
        let array = []
        this.moda.length = 0
        // unique element
        array = array.concat(this.arraySort)
        array.filter((item) => {
          const i = this.arrayStatistics.findIndex(element => (element.uniqueValue === item.value))
          if (i <= -1) {
            this.arrayStatistics.push({ uniqueValue: item.value })
          }
        })
        // duplicate element
        let repetition = 0
        this.arrayStatistics.forEach(element => {
          for (const item of this.arrayNumbers) {
            if (element.uniqueValue === item.value) {
              repetition++
            }
          }
          element.duplicate = repetition
          repetition = 0
        })
        // moda
        this.moda = this.modaFunction()
        // median
        this.median = this.medianFunction()
        // middleArithmetic
        this.middleArithmetic = this.middleArithmeticFunction()
      }
    },
    modaFunction () {
      const duplicateArray = []
      this.arrayStatistics.forEach(element => {
        duplicateArray.push(element.duplicate)
      })
      const maxDuplicate = Math.max.apply(null, duplicateArray)
      const modalArray = []
      this.arrayStatistics.forEach(element => {
        if (element.duplicate === maxDuplicate) {
          modalArray.push(element)
        }
      })
      return modalArray
    },
    medianFunction () {
      const arrayLenght = this.arraySort.length
      if (arrayLenght % 2) {
        const indexMedian = (arrayLenght - 1) / 2
        return this.arraySort[indexMedian].value
      } else {
        const indexMedian = (arrayLenght / 2) - 1
        const itemMedian = []
        for (let i = indexMedian; i <= indexMedian + 1; i++) {
          itemMedian.push(this.arraySort[i].value)
        }
        return (itemMedian[0] + itemMedian[1]) / 2
      }
    },
    middleArithmeticFunction () {
      let middleArithmeticNumber = 0
      for (let i = 0; i < this.arraySort.length; i++) {
        middleArithmeticNumber += this.arraySort[i].value
      }
      if (((middleArithmeticNumber / this.arraySort.length) ^ 0) === (middleArithmeticNumber / this.arraySort.length)) {
        return (middleArithmeticNumber / this.arraySort.length)
      } else {
        return (middleArithmeticNumber / this.arraySort.length).toFixed(9)
      }
    },
    modaTestVariable () {
      if (this.n === 0) {
        alert('Введіть номер студента та збережіть його')
      } else if (this.arrayNumbers.length === 0) {
        alert('Створіть вибірку')
      } else if (this.arraySort.length === 0) {
        alert('Створіть варіаційний ряд')
      } else if (this.arrayStatistics.length === 0) {
        alert('Створіть розрахунки по вибірці')
      } else {
        this.modaTestFirst.length = 0
        this.modaTestSecond.length = 0
        this.modaTestFirst = this.modaTestFirst.concat(this.moda)
        let maxDuplicate = 0
        this.arrayStatistics.forEach(element => {
          if (maxDuplicate < element.duplicate) {
            maxDuplicate = element.duplicate
          }
        })
        this.arrayStatistics.forEach(element => {
          if (element.duplicate === maxDuplicate) {
            this.modaTestSecond.push({ value: element.uniqueValue })
          }
        })
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
          grid-template-columns: repeat(6, max-content);
          .cell {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 24px;
            width: 30px;
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
            grid-template-columns: repeat(3, max-content);
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
            grid-template-columns: repeat(3, max-content);
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
            width: 45px;
          }
          .blocktitleCell .titleCell:nth-child(2), .blockColumn .column:nth-child(2) {
            width: 65px;
          }
          .blocktitleCell .titleCell:last-child, .blockColumn .column:last-child {
            width: 110px;
          }
        }
        .tableTestModa {
          display: grid;
          grid-template-columns: repeat(1, max-content);
          .row {
            display: grid;
            grid-template-columns: repeat(2, max-content);
            .titleCell {
              display: flex;
              justify-content: center;
              align-items: center;
              text-align: center;
              border: 1px solid rgb(77, 77, 77);
              width: 210px;
              background: rgb(231, 231, 231);
              margin-top: -1px;
            }
            .cell {
              display: flex;
              justify-content: center;
              align-items: center;
              text-align: center;
              border: 1px solid rgb(77, 77, 77);
              width: 80px;
              margin-left: -1px;
              margin-top: -1px;
            }
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
      .containerTask {
        .tableIntegralResult {
          margin-left: -10px;
          .titleCell:first-child, .column:first-child {
            width: 55px;
          }
          .titleCell:nth-child(2), .column:nth-child(2) {
            width: 66px !important;
          }
          .titleCell:nth-child(3), .column:nth-child(3) {
            width: 88px !important;
          }
          .titleCell:nth-child(4), .column:nth-child(4) {
            width: 95px !important;
          }
        }
      }
    }
  }
</style>
