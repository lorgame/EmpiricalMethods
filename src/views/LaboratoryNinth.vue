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
    <div class="blockTypeNumber">
      <span class="title">Оберіть граничне значення:</span>
      <div>
        <select name="typeNumber" class="dropList" v-model="sortMode">
          <option>Тип значення</option>
          <option>Найбільше</option>
          <option>Найменше</option>
        </select>
        <button :disabled="sortMode === 'Тип значення'" class="button" @click="editTypeNumber">Зберегти</button>
        </div>
    </div>
    <div class="blockTypeOperation">
      <span class="title">Оберіть операцію зміни значення:</span>
      <div>
        <select :disabled="typeNumber === ''" name="typeOperation" class="dropList" v-model="operationMode">
          <option>Тип операції</option>
          <option v-show="typeNumber === 'Найбільше'">*</option>
          <option v-show="typeNumber === 'Найбільше'">+</option>
          <option v-show="typeNumber === 'Найменше'">*</option>
          <option v-show="typeNumber === 'Найменше'">-</option>
        </select>
        <button :disabled="operationMode === 'Тип операції'" class="button" @click="editTypeOperation">Зберегти</button>
        </div>
    </div>
    <div class="blockNumberChange">
      <span class="title">Введіть значення змінної:</span>
      <div>
        <input min="0" class="input" type="number" v-model="change">
        <button :disabled="change <= 0" class="button" @click="emitNumberChange">Зберегти</button>
      </div>
    </div>
    <div class="blockSaveInfo">
      <span class="title">Натисніть кнопку для збереження результату:</span>
      <a ref="download" class="downloadButton">
        <button :disabled="arrayNormalNumbers.length === 0 || arrayChangeNumber.length === 0 || arrayResultChange.length === 0" @click="downloadInfo" class="button">Завантажити</button>
      </a>
    </div>
    <div class="blockSaveError">
      <span class="title">Натисніть кнопку для огляду помилок файлу:</span>
      <a ref="errorDownload" class="downloadButton">
        <button :disabled="error === false" @click="downloadErrorInfo" class="button">Завантажити</button>
      </a>
    </div>
    <div class="containerTask">
      <div class="blockNumber">
        <div class="blockButton">
          <button class="createButton" @click="normalDistribution">Згенерувати нормальний розподіл</button>
          <input type="file" accept="text/plain" class="inputFileLoad" ref="fileLoad" @change="upload">
          <button class="createButton" @click="castomClick">Завантажити нормальний розподіл</button>
        </div>
        <div v-show="arrayNormalNumbers.length !== 0" class="table">
          <div class="cell" v-for="(value, i) of arrayNormalNumbers" :key="i">{{value}}</div>
        </div>
      </div>
      <div class="blockNumber">
        <button class="createButton" @click="changeNumber">Згенерувати зміну значення</button>
        <div v-show="arrayResultChange !== 0" class="tableChangeNumber">
          <div class="tableTitleGorizontal">
            <span class="cellTitle">Умова</span>
            <span class="cellTitle">Відібране значення</span>
            <span class="cellTitle">Результат</span>
            <span class="cellTitle">Генерація</span>
          </div>
          <div class="blockVertical">
            <div class="tableTitleVertical">
              <span class="cellTitle">{{arrayTask}}</span>
            </div>
            <div class="tableValue">
              <div class="cell">{{numberForChange}}</div>
            </div>
            <div class="tableValue">
              <div class="cell">{{arrayResultChange}}</div>
            </div>
            <div class="tableValue">
              <div class="cell"><button @click="viewChange()" class="createButton">Згенерувати</button></div>
            </div>
          </div>
        </div>
        <div class="blockNumber">
          <div v-show="arrayChangeNumber.length !== 0" class="table">
            <div :class='{ cellIndex: i === indexItemArray }' class="cell" v-for="(value, i) of arrayChangeNumber" :key="i">{{value}}</div>
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
    arrayNormalNumbers: [],
    sortMode: 'Тип значення',
    typeNumber: '',
    operationMode: 'Тип операції',
    typeOperation: '',
    change: 0,
    numberChange: 0,
    numberForChange: 0,
    indexItemArray: 0,
    arrayResultChange: 0,
    arrayChangeNumber: [],
    arrayTask: 'Не входить у заданий діапазон',
    error: false,
    arrayError: []
  }),
  methods: {
    emitNumberStudent () {
      this.$emit('numberStudent', this.numberStudent)
    },
    editTypeNumber () {
      this.typeNumber = this.sortMode
      this.typeOperation = ''
      this.operationMode = 'Тип операції'
    },
    editTypeOperation () {
      this.typeOperation = this.operationMode
    },
    emitNumberChange () {
      this.numberChange = this.change
    },
    normalDistribution () {
      if (this.n === 0) {
        alert('Введіть номер студента та збережіть його')
      } else {
        this.error = false
        const arrayLeng = parseInt(this.n) + 30
        this.arrayNormalNumbers.length = 0
        const m = 5
        const t = 5
        if (Number.isInteger(parseInt(this.n) / 2)) {
          for (let i = 0; i < (arrayLeng / 2); i++) {
            const number = (1 / (Math.sqrt(t) * Math.sqrt(2 * Math.PI))) * Math.exp(-((Math.pow(i - m, 2)) / (2 * t)))
            this.arrayNormalNumbers.push(number)
          }
          const arrayNegative = []
          for (let i = 0; i < (arrayLeng / 2); i++) {
            const normalNumber = this.arrayNormalNumbers[i]
            arrayNegative.push(-normalNumber)
          }
          this.arrayNormalNumbers = this.arrayNormalNumbers.concat(arrayNegative)
          this.arrayNormalNumbers.sort((a, b) => {
            return a - b
          })
        } else {
          for (let i = 0; i < (arrayLeng / 2) + 0.5; i++) {
            const number = (1 / (Math.sqrt(t) * Math.sqrt(2 * Math.PI))) * Math.exp(-((Math.pow(i - m, 2)) / (2 * t)))
            this.arrayNormalNumbers.push(number)
          }
          this.arrayNormalNumbers.sort((a, b) => {
            return a - b
          })
          const arrayNegative = []
          for (let i = 1; i < (arrayLeng / 2) + 0.5; i++) {
            const normalNumber = this.arrayNormalNumbers[i]
            arrayNegative.push(-normalNumber)
          }
          this.arrayNormalNumbers = this.arrayNormalNumbers.concat(arrayNegative)
          this.arrayNormalNumbers.sort((a, b) => {
            return a - b
          })
        }
      }
    },
    changeNumber () {
      if (parseInt(this.n) !== 0 && this.arrayNormalNumbers.length !== 0 && this.typeNumber !== '' && this.numberChange !== 0 && this.typeOperation !== '') {
        let array = []
        array = array.concat(this.arrayNormalNumbers)
        this.numberForChange = 0
        if (this.typeNumber === 'Найбільше') {
          array.sort((a, b) => {
            return Number(b) - Number(a)
          })
          if (this.operationMode === '*') {
            this.arrayResultChange = Number(array[0]) * this.numberChange
          } else if (this.operationMode === '+') {
            this.arrayResultChange = Number(array[0]) + this.numberChange
          }
        } else if (this.typeNumber === 'Найменше') {
          array.sort((a, b) => {
            return Number(a) - Number(b)
          })
          if (this.operationMode === '*') {
            this.arrayResultChange = Number(array[0]) * this.numberChange
          } else if (this.operationMode === '-') {
            this.arrayResultChange = Number(array[0]) - this.numberChange
          }
        }
        this.numberForChange = Number(array[0])
      } else if (parseInt(this.n) === 0) {
        alert('Введіть номер студента та збережіть його')
      } else if (this.arrayNormalNumbers.length === 0) {
        alert('Згенеруйте нормальний розподіл')
      } else if (this.typeNumber === '') {
        alert('Оберіть граничне значення та збережіть його')
      } else if (this.typeOperation === '') {
        alert('Оберіть операцію зміни значення та збережіть її')
      } else if (this.numberChange === 0) {
        alert('Введіть значення змінної та збережіть його')
      }
    },
    viewChange () {
      if (this.typeNumber !== '') {
        this.arrayChangeNumber.length = 0
        this.arrayChangeNumber = this.arrayChangeNumber.concat(this.arrayNormalNumbers)
        const arrayChangeNumberLength = this.arrayChangeNumber.length
        if (this.typeNumber === 'Найбільше') {
          this.indexItemArray = this.arrayChangeNumber.length - 1
          this.arrayChangeNumber[arrayChangeNumberLength - 1] = this.arrayResultChange
        } else if (this.typeNumber === 'Найменше') {
          this.indexItemArray = 0
          this.arrayChangeNumber[0] = this.arrayResultChange
        }
      } else {
        alert('Оберіть граничне значення та збережіть його')
      }
    },
    downloadInfo () {
      let numberOfArrayChange = ''
      let numberOfArrayNormal = ''
      for (let i = 0; i < this.arrayChangeNumber.length; i++) {
        const number = this.arrayChangeNumber[i]
        const firstSymbol = String(number).charAt(0)
        if (i === this.indexItemArray) {
          if (firstSymbol === '-') {
            numberOfArrayChange += ('\u00A0\u00A0' + this.arrayChangeNumber[i] + ' <- змінене число\n')
          } else {
            numberOfArrayChange += ('\u00A0\u00A0\u00A0' + this.arrayChangeNumber[i] + ' <- змінене число\n')
          }
        } else {
          if (firstSymbol === '-') {
            numberOfArrayChange += ('\u00A0\u00A0' + this.arrayChangeNumber[i] + '\n')
          } else {
            numberOfArrayChange += ('\u00A0\u00A0\u00A0' + this.arrayChangeNumber[i] + '\n')
          }
        }
      }
      for (let i = 0; i < this.arrayNormalNumbers.length; i++) {
        const number = this.arrayNormalNumbers[i]
        const firstSymbol = String(number).charAt(0)
        if (firstSymbol === '-') {
          numberOfArrayNormal += ('\u00A0\u00A0' + this.arrayNormalNumbers[i] + '\n')
        } else {
          numberOfArrayNormal += ('\u00A0\u00A0\u00A0' + this.arrayNormalNumbers[i] + '\n')
        }
      }
      const text = 'Вибірка з (N + 30) елементів з нормальним розподілом, де m = 5, σ² = 5' + '\n' + numberOfArrayNormal + '\n' + this.arrayTask + '\nВідібране значення: "' + this.numberForChange + '"\nРезультат: "' + this.arrayResultChange + '"\nГенерація: \n' + numberOfArrayChange
      const myData = 'data:application/txt;charset=utf-8,' + encodeURIComponent(text)
      this.$refs.download.onclick = function () {
        this.href = myData
        this.download = 'data.txt'
      }
    },
    castomClick () {
      if (parseInt(this.n) !== 0) {
        this.$refs.fileLoad.value = ''
        this.$refs.fileLoad.click()
      } else {
        alert('Введіть номер студента та збережіть його')
      }
    },
    upload () {
      this.arrayError.length = 0
      this.arrayNormalNumbers.length = 0
      this.error = false
      const file = this.$refs.fileLoad.files[0]
      if (file.type === 'text/plain') {
        const fileReader = new FileReader()
        fileReader.readAsText(file)
        fileReader.onload = () => {
          let infoFile = ''
          infoFile = fileReader.result
          const infoArray = infoFile.split('\n').join().split('\r,')
          if (infoArray.length < parseInt(this.n) + 30) {
            alert('Завантажений файл містить "' + infoArray.length + '" елементів, а довжина масива повинна становити "' + (parseInt(this.n) + 30) + '". Збільшість кількість значень у даному файлі на "' + ((parseInt(this.n) + 30) - infoArray.length) + '"')
          } else if (infoArray.length > parseInt(this.n) + 30) {
            alert('Завантажений файл містить "' + infoArray.length + '" елементів, а довжина масива повинна становити "' + (parseInt(this.n) + 30) + '". Зменшіть кількість значень у даному файлі на "' + (-((parseInt(this.n) + 30) - infoArray.length)) + '"')
          } else {
            const patternTest = /^-?[1-9]+$/
            infoArray.forEach(element => {
              if (element === '') {
                this.error = true
                this.arrayError.push(element + '\u00A0 <- Порожнє значення є недопустимим, заповність його цілим числом.')
              } else if (patternTest.test(element) === false) {
                this.error = true
                this.arrayError.push(element + '\u00A0 <- Значення, що не є числом недопустиме, залиште лише ціле число.')
              } else {
                this.arrayError.push(element)
              }
            })
            if (this.error === false) {
              this.error = false
              infoArray.forEach(element => {
                this.arrayNormalNumbers.push(element)
              })
              this.arrayNormalNumbers.sort((a, b) => {
                return a - b
              })
            } else {
              this.arrayResultChange = 0
              this.arrayChangeNumber.length = 0
              alert('Завантажений файл містить некоректно введені дані, ви можете ознайомитись із описом допущених помилок натиснувши кнопку "Завантажити"')
            }
          }
        }
        fileReader.onerror = () => {
          this.arrayResultChange = 0
          this.arrayChangeNumber.length = 0
          alert('Сталась помилка, впевністься, що ви використовуєть текстовий файл із розширенням "txt"')
        }
      } else {
        this.arrayResultChange = 0
        this.arrayChangeNumber.length = 0
        alert('Розширення завантаженого файлу не підтримується, впевніться, що у вашого файлу розширення ".txt"')
      }
    },
    downloadErrorInfo () {
      let numberOfArrayError = ''
      for (let i = 0; i < this.arrayError.length; i++) {
        const number = this.arrayError[i]
        const firstSymbol = String(number).charAt(0)
        if (firstSymbol === '-') {
          numberOfArrayError += (this.arrayError[i] + '\n')
        } else {
          numberOfArrayError += (this.arrayError[i] + '\n')
        }
      }
      const myData = 'data:application/txt;charset=utf-8,' + encodeURIComponent(numberOfArrayError)
      this.$refs.errorDownload.onclick = function () {
        this.href = myData
        this.download = 'Error element of distribution.txt'
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
    .button, .createButton {
      background: linear-gradient(90deg, rgb(97, 97, 97)20%, rgb(129, 129, 129));
      color: white;
      text-shadow: 1px 1px 2px black;
      cursor: pointer;
      &:disabled {
        background: rgb(173, 173, 173) !important;
        cursor: default;
      }
    }
    .createButton {
      margin-bottom: 10px;
    }
    .blockNumberStudent, .blockTypeNumber, .blockSaveInfo, .blockSaveError, .blockTypeOperation, .blockNumberChange {
      display: flex;
      margin: 5px 0 15px 0;
    }
    .blockNumberStudent {
      .input {
        margin: 0 12px 0 11px;
      }
    }
    .blockTypeNumber {
      .dropList {
        width: 167px;
        margin: 0 5px 0 3px;
      }
    }
    .blockNumberChange {
      .input {
        margin: 0 7px 0 8px;
      }
    }
    .blockTypeOperation {
      .dropList {
        width: 116px;
        margin: 0 5px 0 3px;
      }
    }
    .blockSaveInfo {
      .title {
        margin-right: 11px
      }
    }
    .blockSaveError {
      .title {
        margin-right: 3px
      }
    }
    .containerTask {
      display: grid;
      grid-template-columns: repeat(2, max-content);
      grid-column-gap: 30px;
      .blockNumber {
        display: grid;
        justify-items: center;
        align-items: flex-start;
        align-self: flex-start;
        width: max-content;
        .blockButton {
          display: flex;
          .createButton {
            margin: 0 5px 10px 5px;
          }
          .inputFileLoad {
            display: none;
          }
        }
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
            margin-top: -1px;
          }
          .cellIndex {
            box-shadow: 0 0 7px rgba($color: green, $alpha: .7) inset;
          }
        }
        .tableChangeNumber {
          margin-bottom: 15px;
          .tableTitleGorizontal, .blockVertical {
          display: grid;
          grid-template-columns: 180px 190px 215px 120px;
          }
          .blockVertical {
            .tableTitleVertical, .tableValue {
              .cellTitle, .cell {
                height: 100px;
              }
            }
          }
          .cell, .cellTitle {
            display: flex;
            border: 1px solid rgb(77, 77, 77);
            justify-content: center;
            align-items: center;
            text-align: center;
            height: 24px;
            margin-left: -1px;
            margin-top: -1px;
            font-size: 17px;
            border-collapse: collapse;
          }
          .cell {
            background: white;
            .createButton {
              margin-bottom: 0;
            }
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
  @media (min-width: 0px) and (max-width: 1050px) {
    .containerPage {
      .blockNumberStudent, .blockTypeNumber, .blockSaveInfo, .blockSaveError, .containerTask, .blockTypeOperation, .blockNumberChange {
        justify-content: center;
      }
    }
  }
  @media (min-width: 0px) and (max-width: 768px) {
    .containerPage {
      .info {
        padding: 0 5px 0 5px;
      }
      .blockNumberStudent, .blockSaveInfo, .blockSaveError, .blockTypeNumber, .blockTypeOperation, .blockNumberChange {
        flex-direction: column;
        align-items: center;
        .title {
          font-size: 14px;
        }
        .dropList {
          width: 210px;
          margin: 0 10px;
        }
        .button, .downloadButton {
          margin-top: 7px;
        }
      }
      .blockNumberStudent {
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
  @media (min-width: 1051px) and (max-width: 1780px) {
    .containerPage {
      .containerTask {
        grid-template-columns: max-content;
        justify-content: center;
        grid-column-gap: 20px;
      }
    }
  }
  @media (min-width: 931px) and (max-width: 1050px) {
    .containerPage {
      .containerTask {
        grid-template-columns: max-content;
        .blockNumber {
          .table {
            .cell {
              width: 200px;
              font-size: 14px;
            }
          }
          .tableChangeNumber {
            .tableTitleGorizontal, .blockVertical {
            grid-template-columns: 170px 155px 175px 105px;
            }
            .blockVertical {
              .tableTitleVertical, .tableValue {
                .cellTitle, .cell {
                  height: 60px;
                  font-size: 14px;
                }
              }
            }
            .cell, .cellTitle {
              font-size: 14px;
            }
          }
        }
      }
    }
  }
  @media (min-width: 769px) and (max-width: 930px) {
    .containerPage {
      .containerTask {
        grid-template-columns: max-content;
        .blockButton {
          flex-direction: column;
        }
        .blockNumber {
          .table {
            grid-template-columns: repeat(2, 1fr);
            .cell {
              font-size: 12px;
              width: 175px;
            }
          }
          .tableChangeNumber {
            .tableTitleGorizontal, .blockVertical {
            grid-template-columns: 90px 130px 140px 90px;
            }
            .blockVertical {
              .tableTitleVertical, .tableValue {
                .cellTitle, .cell {
                  height: 100px;
                  font-size: 12px;
                  .createButton {
                    font-size: 12px;
                  }
                }
              }
            }
            .cell, .cellTitle {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
  @media (min-width: 501px) and (max-width: 768px) {
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
          .tableChangeNumber {
            .tableTitleGorizontal, .blockVertical {
            grid-template-columns: 90px 130px 140px 90px;
            }
            .blockVertical {
              .tableTitleVertical, .tableValue {
                .cellTitle, .cell {
                  height: 100px;
                  font-size: 12px;
                  .createButton {
                    font-size: 12px;
                  }
                }
              }
            }
            .cell, .cellTitle {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
  @media (min-width: 0px) and (max-width: 500px) {
    .containerPage {
      .blockNumberStudent, .blockTypeNumber {
        .input, .dropList {
          margin: 0 7px 0 0;
        }
      }
      .blockSaveInfo, .blockSaveError {
        .title {
          margin-right: 0;
        }
        .downloadButton {
          margin-top: 0px;
        }
      }
      .info {
        .title {
          font-size: 23px;
        }
      }
      .containerTask {
        .blockNumber {
          .blockButton {
            flex-direction: column;
          }
          .table {
            grid-template-columns: repeat(2, 1fr);
            .cell {
              font-size: 9px;
              width: 145px;
            }
          }
          .tableChangeNumber {
            .tableTitleGorizontal, .blockVertical {
              grid-template-columns: 57px 96px 101px 65px;
            }
            .blockVertical {
              .tableTitleVertical, .tableValue {
                .cellTitle, .cell {
                  height: 80px;
                  font-size: 9px;
                  .createButton {
                    font-size: 9px;
                    padding: 1px 3px;
                  }
                }
              }
            }
            .cell, .cellTitle {
              font-size: 10px;
            }
          }
        }
      }
    }
  }
</style>
