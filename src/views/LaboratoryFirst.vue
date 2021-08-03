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
        <button class="createButton" @click="sameItemArray">Згенерувати статистичний розподіл</button>
        <div v-show="arraySame.length !== 0" class="tableStatic">
          <div class="blocktitleCell">
            <span class="titleCell">Елемент</span>
            <span class="titleCell">Частота</span>
          </div>
          <div class="blockColumn">
            <div class="column">
              <span class="cell" v-for="(value, i) of arraySame" :key="i">{{value.uniqueValue}}</span>
            </div>
            <div class="column">
              <span class="cell" v-for="(value, i) of arraySame" :key="i">{{value.duplicate}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="blockNumber">
        <button class="createButton" @click="frequencyItemArray">Згенерувати частість</button>
        <table v-show="arrayFrequency.length !== 0" class="tableResult">
          <tr class="row">
              <td class="cell cellTitle">Елемент</td><td class="cell" v-for="(value, i) of arrayFrequency" :key="i">{{value.uniqueValue}}</td>
          </tr>
          <tr class="row">
            <td class="cell cellTitle">Частота</td><td class="cell" v-for="(value, i) of arrayFrequency" :key="i">{{value.duplicate}}</td>
          </tr>
          <tr class="row">
            <td class="cell cellTitle">Частість</td><td class="cell" v-for="(value, i) of arrayFrequency" :key="i">{{value.frequency}}</td>
          </tr>
        </table>
      </div>
      <div class="blockNumber">
        <button class="createButton" @click="IntegralItemArray">Згенерувати інтегральну частоту </button>
        <div v-show="arrayIntegral.length !== 0" class="tableIntegralResult">
          <div class="blocktitleCell">
            <span class="titleCell">Індекс</span>
            <span class="titleCell">Елемент</span>
            <span class="titleCell">Унікальний елемент</span>
            <span class="titleCell">Інтегральна частота</span>
          </div>
          <div class="blockColumn">
            <div class="column">
              <span class="cell" v-for="(value, i) of arrayNumberIntegral" :key="i">{{i + 1}}</span>
            </div>
            <div class="column">
              <span class="cell" v-for="(value, i) of arrayNumberIntegral" :key="i">{{value.value}}</span>
            </div>
            <div class="column">
              <span :style="{height: 23 * value.duplicate + (value.duplicate - 1) + 1 + 'px'}" class="cell" v-for="(value, i) of arrayIntegral" :key="i">{{value.uniqueValue}}</span>
            </div>
            <div class="column">
              <span :style="{height: 23 * value.duplicate + (value.duplicate - 1) + 1 + 'px'}" class="cell" v-for="(value, i) of arrayIntegral" :key="i">{{value.integralFrequency}}</span>
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
    arrayNumbers: [],
    arraySort: [],
    arraySame: [],
    arrayFrequency: [],
    arrayIntegral: [],
    arrayNumberIntegral: []
  }),
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
          this.arrayNumbers.push({ value: Math.floor(Math.random() * 5) + 1 })
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
    sameItemArray () {
      if (this.n === 0) {
        alert('Введіть номер студента та збережіть його')
      } else if (this.arrayNumbers.length === 0) {
        alert('Створіть вибірку')
      } else if (this.arraySort.length === 0) {
        alert('Створіть варіаційний ряд')
      } else {
        this.arraySame.length = 0
        const array = this.arraySame.concat(this.arraySort)
        array.filter((item) => {
          const i = this.arraySame.findIndex(element => (element.uniqueValue === item.value))
          if (i <= -1) {
            this.arraySame.push({ uniqueValue: item.value })
          }
        })
        let repetition = 0
        this.arraySame.forEach(element => {
          for (const item of this.arrayNumbers) {
            if (element.uniqueValue === item.value) {
              repetition++
            }
          }
          element.duplicate = repetition
          repetition = 0
        })
      }
    },
    frequencyItemArray () {
      if (this.n === 0) {
        alert('Введіть номер студента та збережіть його')
      } else if (this.arrayNumbers.length === 0) {
        alert('Створіть вибірку')
      } else if (this.arraySame.length === 0) {
        alert('Створіть статистичний розподіл')
      } else {
        this.arrayFrequency.length = 0
        this.arrayFrequency = this.arrayFrequency.concat(this.arraySame)
        this.arrayFrequency.forEach(element => {
          element.frequency = element.duplicate / 10
        })
      }
    },
    IntegralItemArray () {
      if (this.n === 0) {
        alert('Введіть номер студента та збережіть його')
      } else if (this.arrayNumbers.length === 0) {
        alert('Створіть вибірку')
      } else if (this.arraySort.length === 0) {
        alert('Створіть варіаційний ряд')
      } else if (this.arraySame.length === 0) {
        alert('Створіть статистичний розподіл')
      } else {
        this.arrayIntegral.length = 0
        this.arrayNumberIntegral.length = 0
        this.arrayNumberIntegral = this.arrayNumberIntegral.concat(this.arraySort)
        this.arrayIntegral = this.arrayIntegral.concat(this.arraySame)
        const arrayValue = []
        this.arraySort.forEach(element => {
          arrayValue.push(element.value)
        })
        this.arrayIntegral.forEach(element => {
          const lastIndexItem = arrayValue.lastIndexOf(element.uniqueValue)
          element.integralFrequency = lastIndexItem + 1
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
      grid-template-columns: repeat(5, max-content);
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
            width: 30px;
            height: 24px;
            background: white;
            border: 1px solid rgb(77, 77, 77);
            border-collapse: collapse;
            font-size: 17px;
            margin-left: -1px;
            margin-top: -1px
          }
        }
        .tableStatic {
          .blocktitleCell {
            display: grid;
            grid-template-columns: repeat(2, 70px);
            .titleCell {
              margin-left: -1px;
              margin-top: -1px;
              border: 1px solid rgb(77, 77, 77);
              text-align: center;
              background: rgb(231, 231, 231);
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
        .tableResult {
          display: grid;
          grid-template-columns: repeat(3, max-content);
          border-collapse: collapse;
          .row {
            display: grid;
            grid-template-columns: 70px;
            .cell {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 24px;
              flex-direction: row;
              border: 1px solid rgb(77, 77, 77);
              margin-left: -1px;
              margin-top: -1px;
            }
            .cellTitle {
              text-align: justify;
              background: rgb(231, 231, 231);
            }
          }
        }
        .tableIntegralResult {
          .blocktitleCell {
            display: grid;
            grid-template-columns: repeat(4, max-content);
            .titleCell {
              border: 1px solid rgb(77, 77, 77);
              text-align: center;
              display: flex;
              align-items: center;
              justify-content: center;
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
                height: 24px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-bottom: 1px solid rgb(77, 77, 77);
                margin-left: -1px;
                margin-top: -1px;
                margin-bottom: -1px;
              }
            }
          }
          .titleCell:first-child, .column:first-child {
            width: 55px;
          }
          .titleCell:nth-child(2), .column:nth-child(2) {
            width: 70px;
          }
          .titleCell:nth-child(3), .column:nth-child(3) {
            width: 90px;
          }
          .titleCell:nth-child(4), .column:nth-child(4) {
            width: 100px;
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
  @media (min-width: 1125px) and (max-width: 1825px) {
    .containerPage {
      .containerTask {
        grid-template-columns: repeat(4, max-content);
      }
    }
  }
  @media (min-width: 1125px) and (max-width: 1440px) {
    .containerPage {
      .containerTask {
        grid-template-columns: repeat(3, max-content);
        grid-column-gap: 20px;
      }
    }
  }
  @media (min-width: 769px) and (max-width: 1124px) {
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
  @media (min-width: 0px) and (max-width: 400px) {
    .containerPage {
      .info {
        .title {
          font-size: 23px;
        }
      }
      .containerTask {
        .tableIntegralResult {
          .titleCell:first-child, .column:first-child {
            width: 50px !important;
          }
          .titleCell:nth-child(2), .column:nth-child(2) {
            width: 63px !important;
          }
          .titleCell:nth-child(3), .column:nth-child(3) {
            width: 90px !important;
          }
          .titleCell:nth-child(4), .column:nth-child(4) {
            width: 90px !important;
          }
        }
      }
    }
  }
</style>
