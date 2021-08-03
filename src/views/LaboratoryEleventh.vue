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
    <div class="blockNumberAmplitude">
      <span class="title">Введіть амплітуду:</span>
      <div>
        <input min="1" class="input" type="number" v-model="inputAmplitude">
        <button :disabled="inputAmplitude <= 0" class="button" @click="emitNumberAmplitude">Зберегти</button>
      </div>
    </div>
    <div class="blockNumberAngularFrequency">
      <span class="title">Введіть кутову частоту:</span>
      <div>
        <input min="1" class="input" type="number" v-model="inputAngularFrequency">
        <button :disabled="inputAngularFrequency <= 0" class="button" @click="emitNumberAngularFrequency">Зберегти</button>
      </div>
    </div>
    <div class="blockNumberPhase">
      <span class="title">Введіть фазу:</span>
      <div>
        <input min="1" class="input" type="number" v-model="inputPhase">
        <button :disabled="inputPhase <= 0" class="button" @click="emitNumberPhase">Зберегти</button>
      </div>
    </div>
    <div class="containerTask">
      <div class="blockNumber">
        <button class="createButton" @click="createArraySinusoidFirstPeriod">Згенерувати вибірку першого періоду</button>
        <div v-show="arraySinusoidFirstPeriod.length !== 0" class="coordinates">
          <div class="cordinatesLine">
            <div class="cordinateElement cordinateElementTitle">X</div><div class="cordinateElement" v-for="(value, i) of arraySinusoidFirstPeriod" :key="i">{{value.x}}</div>
          </div>
          <div class="cordinatesLine">
            <div class="cordinateElement cordinateElementTitle">Y</div><div class="cordinateElement" v-for="(value, i) of arraySinusoidFirstPeriod" :key="i">{{value.y}}</div>
          </div>
        </div>
      </div>
      <div class="blockNumber">
        <button class="createButton" @click="createArraySinusoidAntiphase">Згенерувати вибірку у протифазі</button>
        <div v-show="arraySinusoidAntiphase.length !== 0" class="coordinates">
          <div class="cordinatesLine">
            <div class="cordinateElement cordinateElementTitle">X</div><div class="cordinateElement" v-for="(value, i) of arraySinusoidAntiphase" :key="i">{{value.x}}</div>
          </div>
          <div class="cordinatesLine">
            <div class="cordinateElement cordinateElementTitle">Y</div><div class="cordinateElement" v-for="(value, i) of arraySinusoidAntiphase" :key="i">{{value.y}}</div>
          </div>
        </div>
      </div>
      <div class="blockNumber">
        <button class="createButton" @click="createArrayWithNoise">Згенерувати вибірку із шумом</button>
        <div v-show="arrayWithNoise.length !== 0" class="coordinates">
          <div class="cordinatesLine">
            <div class="cordinateElement cordinateElementTitle">X</div><div class="cordinateElement" v-for="(value, i) of arrayWithNoise" :key="i">{{value.x}}</div>
          </div>
          <div class="cordinatesLine">
            <div class="cordinateElement cordinateElementTitle">Y</div><div class="cordinateElement" v-for="(value, i) of arrayWithNoise" :key="i">{{value.y}}</div>
          </div>
        </div>
      </div>
      <div class="blockNumber">
        <button class="createButton" @click="createCorrelationAnalysis">Згенерувати кореляційний аналіз</button>
        <div v-show="arrayCorrelationAnalysisResult.length !== 0" class="tableChangeNumber">
          <div class="tableTitleGorizontal">
            <span class="cellTitle">Вибірки</span>
            <span class="cellTitle">Значення</span>
            <span class="cellTitle">Результат</span>
          </div>
          <div class="blockVertical">
            <div class="tableTitleVertical">
              <span class="cellTitle" v-for="(value, i) of arrayType" :key="i">{{value}}</span>
            </div>
            <div class="tableValue">
              <div class="cell" v-for="(value, i) of arrayCorrelationAnalysisCombinate" :key="i">{{value}}</div>
            </div>
            <div class="tableValue">
              <div class="cell" v-for="(value, i) of arrayCorrelationAnalysisResult" :key="i">{{value}}</div>
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
    arraySinusoidFirstPeriod: [],
    arraySinusoidAntiphase: [],
    arrayWithNoise: [],
    arrayCorrelationAnalysisElement: [],
    arrayType: [
      'Вибірки А і Б',
      'Вибірки А і В'
    ],
    arrayCorrelationAnalysisCombinate: [],
    arrayCorrelationAnalysisResult: [],
    amplitude: 0,
    angularFrequency: 0,
    phase: 0,
    inputAmplitude: 0,
    inputAngularFrequency: 0,
    inputPhase: 0
  }),
  methods: {
    emitNumberStudent () {
      this.$emit('numberStudent', this.numberStudent)
    },
    emitNumberAmplitude () {
      this.amplitude = this.inputAmplitude
    },
    emitNumberAngularFrequency () {
      this.angularFrequency = this.inputAngularFrequency
    },
    emitNumberPhase () {
      this.phase = this.inputPhase
    },
    createArraySinusoidFirstPeriod () {
      this.arraySinusoidFirstPeriod.length = 0
      const t = Number(this.n) / 100
      for (let i = 0; i < Number(this.n); i += t) {
        const x = i
        const y = Number(this.amplitude) * Math.sin(Number(this.angularFrequency) * i + Number(this.phase))
        this.arraySinusoidFirstPeriod.push({ x: x, y: y })
      }
    },
    createArraySinusoidAntiphase () {
      this.arraySinusoidAntiphase.length = 0
      const t = Number(this.n) / 100
      for (let i = 0; i < Number(this.n); i += t) {
        const x = i
        const y = (Number(this.amplitude) / 2) * Math.sin(Number(this.angularFrequency) * i + Number(this.phase))
        this.arraySinusoidAntiphase.push({ x: x, y: y })
      }
    },
    createArrayWithNoise () {
      this.arrayWithNoise.length = 0
      const t = Number(this.n) / 100
      for (let i = 0; i < Number(this.n); i += t) {
        const x = i + (this.amplitude * 0.25)
        const y = (Number(this.amplitude) * Math.sin(Number(this.angularFrequency) * i + Number(this.phase))) + (this.amplitude * 0.25)
        this.arrayWithNoise.push({ x: x, y: y })
      }
    },
    createCorrelationAnalysis () {
      this.arrayCorrelationAnalysisElement.length = 0
      this.arrayCorrelationAnalysisCombinate.length = 0
      this.arrayCorrelationAnalysisResult.length = 0
      let xArraySinusoidFirstPeriod = 0
      let yArraySinusoidFirstPeriod = 0
      let xArraySinusoidAntiphase = 0
      let yArraySinusoidAntiphase = 0
      let xWithNoise = 0
      let yWithNoise = 0
      let sumFirstArraySinusoidFirstPeriod = 0
      let sumSecondArraySinusoidFirstPeriod = 0
      let sumThirdArraySinusoidFirstPeriod = 0
      let sumFirstArraySinusoidAntiphase = 0
      let sumSecondArraySinusoidAntiphase = 0
      let sumThirdArraySinusoidAntiphase = 0
      let sumFirstArraySinusoidWithNoise = 0
      let sumSecondArraySinusoidWithNoise = 0
      let sumThirdArraySinusoidWithNoise = 0
      let rArraySinusoidFirstPeriod = 0
      let rArraySinusoidAntiphase = 0
      let rArrayWithNoise = 0
      for (let i = 0; i < this.arraySinusoidFirstPeriod.length; i++) {
        xArraySinusoidFirstPeriod += this.arraySinusoidFirstPeriod[i].x
        yArraySinusoidFirstPeriod += this.arraySinusoidFirstPeriod[i].y
        xArraySinusoidAntiphase += this.arraySinusoidAntiphase[i].x
        yArraySinusoidAntiphase += this.arraySinusoidAntiphase[i].y
        xWithNoise += this.arrayWithNoise[i].x
        yWithNoise += this.arrayWithNoise[i].y
      }
      for (let i = 0; i < this.arraySinusoidFirstPeriod.length; i++) {
        sumFirstArraySinusoidFirstPeriod += (this.arraySinusoidFirstPeriod[i].x - xArraySinusoidFirstPeriod) * (this.arraySinusoidFirstPeriod[i].y - yArraySinusoidFirstPeriod)
        sumFirstArraySinusoidAntiphase += (this.arraySinusoidAntiphase[i].x - xArraySinusoidAntiphase) * (this.arraySinusoidAntiphase[i].y - yArraySinusoidAntiphase)
        sumFirstArraySinusoidWithNoise += (this.arrayWithNoise[i].x - xWithNoise) * (this.arrayWithNoise[i].y - yWithNoise)
        sumSecondArraySinusoidFirstPeriod += Math.pow(this.arraySinusoidFirstPeriod[i].x - xArraySinusoidFirstPeriod, 2)
        sumSecondArraySinusoidAntiphase += Math.pow(this.arraySinusoidAntiphase[i].x - xArraySinusoidAntiphase, 2)
        sumSecondArraySinusoidWithNoise += Math.pow(this.arrayWithNoise[i].x - xWithNoise, 2)
        sumThirdArraySinusoidFirstPeriod += Math.pow(this.arraySinusoidFirstPeriod[i].y - yArraySinusoidFirstPeriod, 2)
        sumThirdArraySinusoidAntiphase += Math.pow(this.arraySinusoidAntiphase[i].y - yArraySinusoidAntiphase, 2)
        sumThirdArraySinusoidWithNoise += Math.pow(this.arrayWithNoise[i].y - yWithNoise, 2)
      }
      rArraySinusoidFirstPeriod = sumFirstArraySinusoidFirstPeriod / (Math.sqrt(sumSecondArraySinusoidFirstPeriod * sumThirdArraySinusoidFirstPeriod))
      rArraySinusoidAntiphase = sumFirstArraySinusoidAntiphase / (Math.sqrt(sumSecondArraySinusoidAntiphase * sumThirdArraySinusoidAntiphase))
      rArrayWithNoise = sumFirstArraySinusoidWithNoise / (Math.sqrt(sumSecondArraySinusoidWithNoise * sumThirdArraySinusoidWithNoise))
      this.arrayCorrelationAnalysisElement.push(rArraySinusoidFirstPeriod, rArraySinusoidAntiphase, rArrayWithNoise)
      this.arrayCorrelationAnalysisCombinate.push(this.arrayCorrelationAnalysisElement[0] + ' ' + this.arrayCorrelationAnalysisElement[1], this.arrayCorrelationAnalysisElement[0] + ' ' + this.arrayCorrelationAnalysisElement[2])
      this.arrayCorrelationAnalysisCombinate.forEach(element => {
        const arrayNumbers = element.split(' ')
        const result = arrayNumbers[0] - arrayNumbers[1]
        if (result === 0) {
          this.arrayCorrelationAnalysisResult.push('Рівні по силі')
        } else {
          this.arrayCorrelationAnalysisResult.push('Не рівні по силі')
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
    .blockNumberStudent, .blockNumberAmplitude, .blockNumberAngularFrequency, .blockNumberPhase {
      display: flex;
      margin: 5px 0 20px 0;
      .title {
        font-size: 16px;
      }
      .input {
        margin: 0 5px;
      }
    }
    .blockNumberAmplitude {
      .input {
        margin: 0 5px 0 45px;
      }
    }
    .blockNumberAngularFrequency {
      .input {
        margin: 0 5px 0 12px;
      }
    }
    .blockNumberPhase {
      .input {
        margin: 0 5px 0 87px;
      }
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
    .createButton {
      background: linear-gradient(90deg, rgb(97, 97, 97)20%, rgb(129, 129, 129));
      color: white;
      text-shadow: 1px 1px 2px black;
      margin-bottom: 10px;
      cursor: pointer;
    }
    .containerTask {
      display: grid;
      grid-template-columns: repeat(2, max-content);
      grid-column-gap: 30px;
      grid-row-gap: 30px;
      justify-items: center;
      .blockNumber {
        display: grid;
        justify-items: center;
        align-items: flex-start;
        align-self: flex-start;
        width: max-content;
        .coordinates {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          .cordinatesLine {
            margin-left: 1px;
            .cordinateElementTitle {
              background: rgb(231, 231, 231);
            }
            .cordinateElement {
              display: flex;
              justify-content: center;
              border: 1px solid rgb(77, 77, 77);
              width: 100%;
              margin-top: -1px;
            }
          }
        }
        .tableChangeNumber {
          margin-bottom: 15px;
          .tableTitleGorizontal, .blockVertical {
          display: grid;
          grid-template-columns: 115px 190px 140px;
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
      .blockNumberStudent, .blockNumberAmplitude, .blockNumberAngularFrequency, .blockNumberPhase {
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
      .blockNumberStudent, .blockNumberAmplitude, .blockNumberAngularFrequency, .blockNumberPhase {
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 0 5px 0 5px;
        .title {
          padding: 0 0 5px 5px ;
        }
        .input {
          width: 200px;
          margin: 0px;
        }
        .button {
          width: max-content;
        }
      }
      .containerTask {
        grid-template-columns: repeat(1, max-content);
        .blockNumber {
          .tableChangeNumber {
          .tableTitleGorizontal, .blockVertical {
            grid-template-columns: 80px 130px 100px;
          }
          .cell, .cellTitle {
            font-size: 13px;
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
  @media (min-width: 900px) and (max-width: 1170px) {
    .containerPage {
      .blockNumberStudent, .blockNumberAmplitude, .blockNumberAngularFrequency, .blockNumberPhase {
        justify-content: center;
      }
      .containerTask {
        grid-template-columns: repeat(1, max-content);
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
