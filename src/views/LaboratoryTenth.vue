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
     <div class="blockNumberK">
      <span class="title">Введіть кутовий коефіцієнт:</span>
      <div>
        <input class="input" min="0" max="360" type="number" v-model="numberK">
        <button class="button" :disabled="numberK > 360 || numberK < 0" @click="emitNumberK">Зберегти</button>
      </div>
    </div>
    <div class="blockNumberB">
      <span class="title">Введіть вільне значення:</span>
      <div>
        <input class="input" min="-10" max="10" type="number" v-model="numberB">
        <button class="button" :disabled="numberB < -10 || numberB > 10" @click="emitNumberB">Зберегти</button>
      </div>
    </div>
    <div class="containerTask">
      <div class="blockNumber">
        <button class="createButton" @click="createLine">Згенерувати лінію</button>
        <div v-show="arraySystemElement.length !== 0" class="graphic">
          <div class="line" ref="line"></div>
          <div class="lineX"><span class="titleLine">X<br>&#11166;</span></div>
          <div class="lineY"><span class="titleLine">&#11165;Y</span></div>
          <div class="cellBlock">
            <div class="cell cordinatesCell" v-for="(value, i) of arraySystemElement" :key="i" :style="{height: value.y === 0 ? '2px' : '15px', width: value.x === 0 ? '2px' : '15px'}">
              <span class="cellTitleX" :style="{marginTop: value.x === 0 && value.y === 0 ? '-1px' : '0px', display: value.y === 0 && value.x !== -1 ? 'flex' : 'none'}">{{value.x}}</span>
              <span class="cellTitleY" :style="{display: value.x === 0 && value.y !== 0 ? 'flex' : 'none'}">{{value.y}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="blockNumber">
        <button class="createButton" @click="createCoordinates">Згенерувати координати лінії</button>
        <div v-show="arrayLineElement.length !== 0" class="coordinates">
          <div class="cordinatesLine">
            <div class="cordinateElement cordinateElementTitle">X</div><div class="cordinateElement" v-for="(value, i) of arrayLine" :key="i">{{value.x}}</div>
          </div>
          <div class="cordinatesLine">
            <div class="cordinateElement cordinateElementTitle">Y</div><div class="cordinateElement" v-for="(value, i) of arrayLine" :key="i">{{value.y}}</div>
          </div>
        </div>
      </div>
      <div class="blockNumber">
        <button class="createButton" @click="createNoice">Згенерувати шум</button>
        <div v-show="arrayNoice.length !== 0" class="coordinates">
          <div class="cordinatesLine">
            <div class="cordinateElement cordinateElementTitle">X</div><div class="cordinateElement" v-for="(value, i) of arrayNoice" :key="i">{{value.x}}</div>
          </div>
          <div class="cordinatesLine">
            <div class="cordinateElement cordinateElementTitle">Y</div><div class="cordinateElement" v-for="(value, i) of arrayNoice" :key="i">{{value.y}}</div>
          </div>
        </div>
      </div>
      <div class="blockNumber">
        <button class="createButton" @click="regressionEquation">Згенерувати регресію</button>
        <div v-show="arrayRegression.length !== 0" class="coordinates">
          <div class="cordinatesLine">
            <div class="cordinateElement cordinateElementTitle">X</div><div class="cordinateElement" v-for="(value, i) of arrayRegression" :key="i">{{value.x}}</div>
          </div>
          <div class="cordinatesLine">
            <div class="cordinateElement cordinateElementTitle">Y</div><div class="cordinateElement" v-for="(value, i) of arrayRegression" :key="i">{{value.y}}</div>
          </div>
        </div>
      </div>
       <div class="blockNumber">
        <button class="createButton" @click="createLineRegression">Згенерувати точки регресії</button>
        <div v-show="createPoint !== false" class="graphic">
          <div class="linePoint" :style="{ marginLeft: i === 0 ? (value.x * 7.5 - 3) + 'px' :  (value.x * 14 - 10.5) + 'px', marginTop: i === 0 ? -(value.y * 7.5 + 3) + 'px' : -(value.y * 14) + 'px' }" v-for="(value, i) of arrayRegression" :key="i"></div>
          <div class="lineX"><span class="titleLine">X<br>&#11166;</span></div>
          <div class="lineY"><span class="titleLine">&#11165;Y</span></div>
          <div class="cellBlock">
            <div class="cell cordinatesCell" v-for="(value, i) of arraySystemElement" :key="i" :style="{height: value.y === 0 ? '2px' : '15px', width: value.x === 0 ? '2px' : '15px'}">
              <span class="cellTitleX" :style="{marginTop: value.x === 0 && value.y === 0 ? '-1px' : '0px', display: value.y === 0 && value.x !== -1 ? 'flex' : 'none'}">{{value.x}}</span>
              <span class="cellTitleY" :style="{display: value.x === 0 && value.y !== 0 ? 'flex' : 'none'}">{{value.y}}</span>
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
    numberK: 0,
    numberB: 0,
    k: 0,
    b: 0,
    arraySystemElement: [],
    arrayLineElement: [],
    arrayLine: [],
    arrayNoice: [],
    arrayRegression: [],
    createPoint: false
  }),
  methods: {
    emitNumberStudent () {
      this.$emit('numberStudent', this.numberStudent)
    },
    emitNumberK () {
      this.k = Number(this.numberK)
    },
    emitNumberB () {
      this.b = Number(this.numberB)
    },
    createLine () {
      if (this.n !== 0) {
        this.arraySystemElement.length = 0
        for (let yi = 10; yi >= -10; yi--) {
          const y = yi
          for (let xi = -10; xi <= 10; xi++) {
            const x = xi
            this.arraySystemElement.push({ y: y, x: x })
          }
        }
        const line = this.$refs.line
        line.style.transform = 'rotate(' + this.k + 'deg)'
        if (this.b === 0) {
          line.style.marginLeft = (this.b)
        } else if (this.b === 1 || this.b === -1) {
          line.style.marginLeft = (this.b * 14) + 'px'
        } else if (String(this.b).slice(0, 1) === '-') {
          line.style.marginLeft = (this.b * 28) + 14 + 'px'
        } else {
          line.style.marginLeft = (this.b * 28) - 14 + 'px'
        }
      } else {
        alert('Ввведіть номер студента та збережіть його')
      }
    },
    createCoordinates () {
      if (this.arraySystemElement.length !== 0) {
        this.arrayLineElement.length = 0
        this.arrayLine.length = 0
        const line = this.$refs.line
        const cordinatesLine = line.getBoundingClientRect()
        const cells = document.querySelectorAll('.cordinatesCell')
        cells.forEach(element => {
          const cordinatesItem = element.getBoundingClientRect()
          const valueElementX = Number(element.querySelector('.cellTitleX').innerHTML)
          const valueElementY = Number(element.querySelector('.cellTitleY').innerHTML)
          if ((this.k === -270 || this.k === -90 || this.k === 90 || this.k === 270) && cordinatesItem.top > cordinatesLine.top && cordinatesItem.bottom < cordinatesLine.bottom && cordinatesItem.left <= cordinatesLine.left && cordinatesItem.right >= cordinatesLine.left && cordinatesLine.right <= cordinatesItem.right && cordinatesLine.right >= cordinatesItem.left) {
            this.arrayLineElement.push({ x: valueElementX, y: valueElementY })
          } else if ((this.k === -360 || this.k === -180 || this.k === 0 || this.k === 180 || this.k === 360) && cordinatesItem.top >= cordinatesLine.top && cordinatesItem.bottom <= cordinatesLine.bottom) {
            this.arrayLineElement.push({ x: valueElementX, y: valueElementY })
          }
        })
        if (this.k !== -360 && this.k !== -270 && this.k !== -180 && this.k !== -90 && this.k !== 360 && this.k !== 270 && this.k !== 180 && this.k !== 90 && this.k !== 0) {
          cells.forEach(element => {
            const valueElementX = Number(element.querySelector('.cellTitleX').innerHTML)
            const valueElementY = Number(element.querySelector('.cellTitleY').innerHTML)
            const cordinatesItem = element.getBoundingClientRect()
            if (cordinatesItem.top <= cordinatesLine.top && cordinatesItem.top <= cordinatesLine.bottom && cordinatesItem.bottom >= cordinatesLine.top && cordinatesItem.bottom <= cordinatesLine.bottom) {
              if ((cordinatesItem.left <= cordinatesLine.left && cordinatesItem.right >= cordinatesLine.left) || (cordinatesItem.left >= cordinatesLine.left && cordinatesItem.right <= cordinatesLine.right)) {
                if (this.arrayLineElement.length !== 0 && this.arrayLineElement.find(item => item.x !== valueElementX && item.y !== valueElementY) !== undefined) {
                  this.arrayLineElement.push({ x: valueElementX, y: valueElementY })
                } else {
                  this.arrayLineElement.push({ x: valueElementX, y: valueElementY })
                }
              } else if ((cordinatesItem.left <= cordinatesLine.right && cordinatesItem.right >= cordinatesLine.right) || (cordinatesItem.left >= cordinatesLine.left && cordinatesItem.right <= cordinatesLine.right)) {
                if (this.arrayLineElement.length !== 0 && this.arrayLineElement.find(item => item.x !== valueElementX && item.y !== valueElementY) !== undefined) {
                  this.arrayLineElement.push({ x: valueElementX, y: valueElementY })
                } else {
                  this.arrayLineElement.push({ x: valueElementX, y: valueElementY })
                }
              }
            } else if (cordinatesItem.top >= cordinatesLine.top && cordinatesItem.top <= cordinatesLine.bottom && cordinatesItem.bottom >= cordinatesLine.top && cordinatesItem.bottom >= cordinatesLine.bottom) {
              if ((cordinatesItem.left <= cordinatesLine.left && cordinatesItem.right >= cordinatesLine.left) || (cordinatesItem.left >= cordinatesLine.left && cordinatesItem.right <= cordinatesLine.right)) {
                if (this.arrayLineElement.length !== 0 && this.arrayLineElement.find(item => item.x !== valueElementX && item.y !== valueElementY) !== undefined) {
                  this.arrayLineElement.push({ x: valueElementX, y: valueElementY })
                } else {
                  this.arrayLineElement.push({ x: valueElementX, y: valueElementY })
                }
              } else if ((cordinatesItem.left <= cordinatesLine.right && cordinatesItem.right >= cordinatesLine.right) || (cordinatesItem.left >= cordinatesLine.left && cordinatesItem.right <= cordinatesLine.right)) {
                if (this.arrayLineElement.length !== 0 && this.arrayLineElement.find(item => item.x !== valueElementX && item.y !== valueElementY) !== undefined) {
                  this.arrayLineElement.push({ x: valueElementX, y: valueElementY })
                } else {
                  this.arrayLineElement.push({ x: valueElementX, y: valueElementY })
                }
              }
            } else if (cordinatesItem.top >= cordinatesLine.top && cordinatesItem.top <= cordinatesLine.bottom && cordinatesItem.bottom >= cordinatesLine.top && cordinatesItem.bottom <= cordinatesLine.bottom) {
              if ((cordinatesItem.left <= cordinatesLine.left && cordinatesItem.right >= cordinatesLine.left) || (cordinatesItem.left >= cordinatesLine.left && cordinatesItem.right <= cordinatesLine.right)) {
                if (this.arrayLineElement.length !== 0 && this.arrayLineElement.find(item => item.x !== valueElementX && item.y !== valueElementY) !== undefined) {
                  this.arrayLineElement.push({ x: valueElementX, y: valueElementY })
                } else {
                  this.arrayLineElement.push({ x: valueElementX, y: valueElementY })
                }
              } else if ((cordinatesItem.left <= cordinatesLine.right && cordinatesItem.right >= cordinatesLine.right) || (cordinatesItem.left >= cordinatesLine.left && cordinatesItem.right <= cordinatesLine.right)) {
                if (this.arrayLineElement.length !== 0 && this.arrayLineElement.find(item => item.x !== valueElementX && item.y !== valueElementY) !== undefined) {
                  this.arrayLineElement.push({ x: valueElementX, y: valueElementY })
                } else {
                  this.arrayLineElement.push({ x: valueElementX, y: valueElementY })
                }
              }
            }
          })
        }
        if (this.arrayLineElement.length !== 0) {
          const arrayX = []
          const arrayY = []
          this.arrayLineElement.forEach(element => {
            if (element.x >= 0 && element.y >= 0) {
              arrayX.push(element.x)
              arrayY.push(element.y)
            }
          })
          arrayX.sort((a, b) => {
            return a - b
          })
          arrayY.sort((a, b) => {
            return a - b
          })
          const yMax = arrayY[arrayY.length - 1]
          const xMax = arrayX[arrayX.length - 1]
          let yStep = yMax / ((parseInt(this.n) + 10) - 1)
          const xStep = (xMax - this.b) / ((parseInt(this.n) + 10) - 1)
          let y = 0
          if (String(this.b).slice(0, 1) === '-') {
            y = Math.abs(this.b) / xStep * yStep
          }
          yStep = (yMax - y) / ((parseInt(this.n) + 10) - 1)
          let x = 0
          if (String(this.b).slice(0, 1) !== '-' && this.b !== 0) {
            x = this.b
          }
          for (let i = y; i <= yMax; i += yStep) {
            if ((x ^ 0) === x && (y ^ 0) === y) {
              this.arrayLine.push({ x: x, y: y })
            } else if ((x ^ 0) !== x && (y ^ 0) !== y) {
              this.arrayLine.push({ x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) })
            } else if ((x ^ 0) === x && (y ^ 0) !== y) {
              this.arrayLine.push({ x: x, y: Number(y.toFixed(2)) })
            } else if ((x ^ 0) !== x && (y ^ 0) === y) {
              this.arrayLine.push({ x: Number(x.toFixed(2)), y: y })
            }
            y += yStep
            x += xStep
          }
        }
      } else {
        alert('Згенеруйте лінію')
      }
    },
    createNoice () {
      if (this.n === 0) {
        alert('Ввведіть номер студента та збережіть його')
      } else if (this.arraySystemElement.length === 0) {
        alert('Згенеруйте лінію')
      } else if (this.arrayLineElement.length === 0) {
        alert('Згенеруйте координати лінії')
      } else {
        this.arrayNoice.length = 0
        const noice = parseInt(this.n) / 5
        this.arrayLine.forEach(element => {
          const xNoice = element.x + noice
          const yNoice = element.y + noice
          if ((xNoice ^ 0) === xNoice && (yNoice ^ 0) === yNoice) {
            this.arrayNoice.push({ x: xNoice, y: yNoice })
          } else if ((xNoice ^ 0) !== xNoice && (yNoice ^ 0) !== yNoice) {
            this.arrayNoice.push({ x: Number(xNoice.toFixed(2)), y: Number(yNoice.toFixed(2)) })
          } else if ((xNoice ^ 0) === xNoice && (yNoice ^ 0) !== yNoice) {
            this.arrayNoice.push({ x: xNoice, y: Number(yNoice.toFixed(2)) })
          } else if ((xNoice ^ 0) !== xNoice && (yNoice ^ 0) === yNoice) {
            this.arrayNoice.push({ x: Number(xNoice.toFixed(2)), y: yNoice })
          }
        })
      }
    },
    regressionEquation () {
      if (this.n === 0) {
        alert('Ввведіть номер студента та збережіть його')
      } else if (this.arraySystemElement.length === 0) {
        alert('Згенеруйте лінію')
      } else if (this.arrayLineElement.length === 0) {
        alert('Згенеруйте координати лінії')
      } else if (this.arrayNoice.length === 0) {
        alert('Згенеруйте шум')
      } else {
        this.arrayRegression.length = 0
        let middleX = 0
        let middleY = 0
        let sumXY = 0
        let sumSquareX = 0
        let alfa = 0
        let beta = 0
        this.arrayNoice.forEach(element => {
          middleX += element.x
          middleY += element.y
          sumXY += element.x * element.y
          sumSquareX += Math.pow(element.x, 2)
        })
        middleX = middleX / this.arrayNoice.length
        middleY = middleY / this.arrayNoice.length
        alfa = (sumXY - 10 * middleX * middleY) / (sumSquareX - 10 * Math.pow(middleX, 2))
        beta = middleY - alfa * middleX
        this.arrayNoice.forEach(element => {
          const y = alfa * element.x - beta
          this.arrayRegression.push({ y: +(y.toFixed(1)), x: element.x })
        })
      }
    },
    createLineRegression () {
      if (this.n === 0) {
        alert('Ввведіть номер студента та збережіть його')
      } else if (this.arraySystemElement.length === 0) {
        alert('Згенеруйте лінію')
      } else if (this.arrayLineElement.length === 0) {
        alert('Згенеруйте координати лінії')
      } else if (this.arrayNoice.length === 0) {
        alert('Згенеруйте шум')
      } else if (this.arrayNoice.length === 0) {
        alert('Згенеруйте регресію')
      } else {
        this.createPoint = true
        this.arraySystemElement.length = 0
        for (let yi = 10; yi >= -10; yi--) {
          const y = yi
          for (let xi = -10; xi <= 10; xi++) {
            const x = xi
            this.arraySystemElement.push({ y: y, x: x })
          }
        }
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
    .blockNumberStudent, .blockNumberK, .blockNumberB {
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
    .blockNumberK {
      .input {
        width: 139px;
      }
    }
    .blockNumberB {
      .input {
        width: 167px;
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
        .graphic {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          margin-top: 10px;
          width: 283px;
          height: 283px;
          .lineY, .lineX, .line {
            position: absolute;
            height: 2px;
            width: calc(100% - 1px);
            margin: -1px 0 0 0;
            display: flex;
            border: 0;
          }
          .linePoint {
            width: 4px;
            height: 4px;
            background: red;
            border: 1px solid rgb(118, 3, 3);
            border-radius: 50%;
            position: absolute;
            left: 50%;
            top: 50%;
          }
          .lineX, .lineY {
            align-self: center;
            background: black;
            z-index: 0;
          }
          .line {
            // height: 1px;
            align-self: center;
            background: red;
            width: calc(100% - 1px);
            z-index: 1;
          }
          .lineX {
            margin: -1px 0 0 0;
            .titleLine {
              margin: -22px 0 0 0;
              position: relative;
              left: calc(100% - 5px);
              line-height: 15px;
            }
          }
          .lineY {
            transform: rotate(90deg);
            .titleLine {
              margin: -10px 0px 0px -20px;
              transform: rotate(-90deg);
            }
          }
          .cellBlock {
            display: grid;
            grid-template-columns: repeat(21, 1fr);
            width: 281px;
            height: 281px;
            margin-left: 1px;
            .cell {
              font-size: 9px;
              margin: -1px 0 0 -1px;
              .cellTitleY {
                display: flex;
                margin-left: -14px;
                justify-content: center;
              }
              .cellTitleX {
                display: flex;
                justify-content: center;
                margin-top: 0px;
              }
            }
          }
        }
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
      }
    }
  }
  //Style for adaptive page - global
  @media (min-width: 0px) and (max-width: 1825px) {
    .containerPage {
      .containerTask {
        justify-items: center;
        grid-row-gap: 20px;
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }
  @media (min-width: 0px) and (max-width: 1023px) {
    .containerPage {
      .blockNumberStudent, .blockNumberK, .blockNumberB {
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
      .blockNumberStudent, .blockNumberB, .blockNumberK {
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
      .blockNumberStudent, .blockNumberK, .blockNumberB {
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
      .blockNumberStudent, .blockNumberK, .blockNumberB {
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
    }
  }
</style>
