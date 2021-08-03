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
    <div class="blockAlfa">
      <span class="title">Оберіть значення альфа:</span>
      <div>
        <select name="alfa" class="dropList" v-model="selectElementAlfa">
          <option>Значення α</option>
          <option>0.99</option>
          <option>0.975</option>
          <option>0.95</option>
          <option>0.9</option>
          <option>0.8</option>
          <option>0.7</option>
          <option>0.6</option>
          <option>0.5</option>
          <option>0.4</option>
          <option>0.3</option>
          <option>0.2</option>
          <option>0.1</option>
          <option>0.05</option>
          <option>0.025</option>
          <option>0.01</option>
        </select>
        <button :disabled="selectElementAlfa === 'Значення α'" class="button" @click="editAlfaValue">Зберегти</button>
        </div>
    </div>
    <div class="blockSignificance">
      <span class="title">Оберіть тип значущості:</span>
      <div>
        <select name="significance" class="dropList" v-model="selectElementSignificance">
          <option>Значущість</option>
          <option>Однобічна ліва</option>
          <option>Однобічна права</option>
          <option>Двобічна</option>
        </select>
        <button :disabled="selectElementSignificance === 'Значущість'" class="button" @click="editSignificanceValue">Зберегти</button>
        </div>
    </div>
    <div class="containerTask">
      <div class="blockNumber">
        <button class="createButton" @click="createTable">Згенерувати вибірку показникового розподілу</button>
        <div v-show="arrayElements !== 0" class="table">
          <input @input="checkElement" pattern="2[0]|1[0-9]|[0-9]" type="text" class="cell" v-for="(value, i) of arrayElements" :key="i">
        </div>
        <button :disabled='disabledMode' v-show="arrayElements.length !== 0" class="createButton" @click="saveElements">Зберегти набір елементів</button>
      </div>
      <div class="blockNumber">
        <button class="createButton" @click="apraxiaGoldshteyn">Перевірити значення апроксимації Голдштейна</button>
        <div class="apraxiaTableBlock">
          <div v-show="alfa !== 'Значення α' && saveArrayElements.length !== 0 && arrayApraxia.length !== 0">
            <div class="titleBlock">
              <span class="titleCell">Число</span>
              <span class="titleCell">Результат</span>
              <span class="titleCell">Правдивість</span>
            </div>
            <div class="valueBlock">
              <div>
                <span class="valueCell" v-for="(value, i) of apraxiaArrayElements" :key="i">{{value.value}}</span>
              </div>
              <div>
                <span class="valueCell" v-for="(value, i) of arrayApraxia" :key="i">{{value.value}}</span>
              </div>
              <div>
                <span class="valueCell" v-for="(value, i) of arrayCheckKvantil" :key="i">{{value.boolean}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="blockNumber">
        <button class="createButton" @click="createSignificance">Згенерувати рівні значущості</button>
        <div class="significanceTable" v-show="arraySignificanceTable.length !== 0">
            <div class="titleBlock" ref="titleSignificanceBlock">
              <span class="titleCell leftSignificance">Ліва значущість</span>
              <span class="titleCell rightSignificance">Права значущість</span>
            </div>
            <div class="valueBlock" ref="valueSignificanceBlock">
              <div class='leftSignificance'>
                <span class="valueCell" v-for="(value, i) of arraySignificanceTable" :key="i">{{value.minValue}}</span>
              </div>
              <div class='rightSignificance'>
                <span class="valueCell" v-for="(value, i) of arraySignificanceTable" :key="i">{{value.maxValue}}</span>
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
    checkCell: 0,
    checkCellTrue: 0,
    a: [1.0000886, 0.4713941, 0.0001348028, -0.008553069, 0.00312558, -0.0008426812, 0.00009780499],
    b: [-0.2237368, 0.02607083, 0.01128186, -0.01153761, 0.005169654, 0.00253001, -0.001450117],
    c: [-0.01513904, -0.008986007, 0.02277679, -0.01323293, -0.006950356, 0.001060438, 0.001565326],
    alfa: 'Значення α',
    selectElementAlfa: 'Значення α',
    significance: 'Значущість',
    selectElementSignificance: 'Значущість',
    number: [],
    arrayElements: [],
    arrayForCheck: [],
    saveArrayElements: [],
    apraxiaArrayElements: [],
    arrayApraxia: [],
    kvantil: [
      { number: 1, alfa: 0.01, value: 0.0002 },
      { number: 2, alfa: 0.01, value: 0.0201 },
      { number: 3, alfa: 0.01, value: 0.1148 },
      { number: 4, alfa: 0.01, value: 0.2971 },
      { number: 5, alfa: 0.01, value: 0.5543 },
      { number: 6, alfa: 0.01, value: 0.8721 },
      { number: 7, alfa: 0.01, value: 1.2390 },
      { number: 8, alfa: 0.01, value: 1.6465 },
      { number: 9, alfa: 0.01, value: 2.0879 },
      { number: 10, alfa: 0.01, value: 2.5582 },
      { number: 11, alfa: 0.01, value: 3.0535 },
      { number: 12, alfa: 0.01, value: 3.5706 },
      { number: 13, alfa: 0.01, value: 4.1069 },
      { number: 14, alfa: 0.01, value: 4.6604 },
      { number: 15, alfa: 0.01, value: 5.2293 },
      { number: 16, alfa: 0.01, value: 5.8122 },
      { number: 17, alfa: 0.01, value: 6.4078 },
      { number: 18, alfa: 0.01, value: 7.0149 },
      { number: 19, alfa: 0.01, value: 7.6327 },
      { number: 20, alfa: 0.01, value: 8.2604 },
      { number: 1, alfa: 0.025, value: 0.0010 },
      { number: 2, alfa: 0.025, value: 0.0506 },
      { number: 3, alfa: 0.025, value: 0.2158 },
      { number: 4, alfa: 0.025, value: 0.4844 },
      { number: 5, alfa: 0.025, value: 0.8312 },
      { number: 6, alfa: 0.025, value: 1.2373 },
      { number: 7, alfa: 0.025, value: 1.6899 },
      { number: 8, alfa: 0.025, value: 2.1797 },
      { number: 9, alfa: 0.025, value: 2.7004 },
      { number: 10, alfa: 0.025, value: 3.2470 },
      { number: 11, alfa: 0.025, value: 3.8157 },
      { number: 12, alfa: 0.025, value: 4.4038 },
      { number: 13, alfa: 0.025, value: 5.0088 },
      { number: 14, alfa: 0.025, value: 5.6287 },
      { number: 15, alfa: 0.025, value: 6.2621 },
      { number: 16, alfa: 0.025, value: 6.9077 },
      { number: 17, alfa: 0.025, value: 7.5642 },
      { number: 18, alfa: 0.025, value: 8.2307 },
      { number: 19, alfa: 0.025, value: 8.9065 },
      { number: 20, alfa: 0.025, value: 9.5908 },
      { number: 1, alfa: 0.05, value: 0.0039 },
      { number: 2, alfa: 0.05, value: 0.1026 },
      { number: 3, alfa: 0.05, value: 0.3518 },
      { number: 4, alfa: 0.05, value: 0.7107 },
      { number: 5, alfa: 0.05, value: 1.1455 },
      { number: 6, alfa: 0.05, value: 1.6354 },
      { number: 7, alfa: 0.05, value: 2.1673 },
      { number: 8, alfa: 0.05, value: 2.7326 },
      { number: 9, alfa: 0.05, value: 3.3251 },
      { number: 10, alfa: 0.05, value: 3.9403 },
      { number: 11, alfa: 0.05, value: 4.5748 },
      { number: 12, alfa: 0.05, value: 5.2260 },
      { number: 13, alfa: 0.05, value: 5.8919 },
      { number: 14, alfa: 0.05, value: 6.5706 },
      { number: 15, alfa: 0.05, value: 7.2609 },
      { number: 16, alfa: 0.05, value: 7.9616 },
      { number: 17, alfa: 0.05, value: 8.6718 },
      { number: 18, alfa: 0.05, value: 9.3905 },
      { number: 19, alfa: 0.05, value: 10.1170 },
      { number: 20, alfa: 0.05, value: 10.8508 },
      { number: 1, alfa: 0.1, value: 0.0158 },
      { number: 2, alfa: 0.1, value: 0.2107 },
      { number: 3, alfa: 0.1, value: 0.5844 },
      { number: 4, alfa: 0.1, value: 1.0636 },
      { number: 5, alfa: 0.1, value: 1.6103 },
      { number: 6, alfa: 0.1, value: 2.2041 },
      { number: 7, alfa: 0.1, value: 2.8331 },
      { number: 8, alfa: 0.1, value: 3.4895 },
      { number: 9, alfa: 0.1, value: 4.1682 },
      { number: 10, alfa: 0.1, value: 4.8652 },
      { number: 11, alfa: 0.1, value: 5.5778 },
      { number: 12, alfa: 0.1, value: 6.3038 },
      { number: 13, alfa: 0.1, value: 7.0415 },
      { number: 14, alfa: 0.1, value: 7.7895 },
      { number: 15, alfa: 0.1, value: 8.5468 },
      { number: 16, alfa: 0.1, value: 9.3122 },
      { number: 17, alfa: 0.1, value: 10.0852 },
      { number: 18, alfa: 0.1, value: 10.8649 },
      { number: 19, alfa: 0.1, value: 11.6509 },
      { number: 20, alfa: 0.1, value: 12.4426 },
      { number: 1, alfa: 0.2, value: 0.0642 },
      { number: 2, alfa: 0.2, value: 0.4463 },
      { number: 3, alfa: 0.2, value: 1.0052 },
      { number: 4, alfa: 0.2, value: 1.6488 },
      { number: 5, alfa: 0.2, value: 2.3425 },
      { number: 6, alfa: 0.2, value: 3.0701 },
      { number: 7, alfa: 0.2, value: 3.8223 },
      { number: 8, alfa: 0.2, value: 4.5936 },
      { number: 9, alfa: 0.2, value: 5.3801 },
      { number: 10, alfa: 0.2, value: 6.1791 },
      { number: 11, alfa: 0.2, value: 6.9887 },
      { number: 12, alfa: 0.2, value: 7.8073 },
      { number: 13, alfa: 0.2, value: 8.6339 },
      { number: 14, alfa: 0.2, value: 9.4673 },
      { number: 15, alfa: 0.2, value: 10.3070 },
      { number: 16, alfa: 0.2, value: 11.1521 },
      { number: 17, alfa: 0.2, value: 12.0023 },
      { number: 18, alfa: 0.2, value: 12.8570 },
      { number: 19, alfa: 0.2, value: 13.7158 },
      { number: 20, alfa: 0.2, value: 14.5784 },
      { number: 1, alfa: 0.3, value: 0.1485 },
      { number: 2, alfa: 0.3, value: 0.7133 },
      { number: 3, alfa: 0.3, value: 1.4237 },
      { number: 4, alfa: 0.3, value: 2.1947 },
      { number: 5, alfa: 0.3, value: 2.9999 },
      { number: 6, alfa: 0.3, value: 3.8276 },
      { number: 7, alfa: 0.3, value: 4.6713 },
      { number: 8, alfa: 0.3, value: 5.5274 },
      { number: 9, alfa: 0.3, value: 6.3933 },
      { number: 10, alfa: 0.3, value: 7.2672 },
      { number: 11, alfa: 0.3, value: 8.1479 },
      { number: 12, alfa: 0.3, value: 9.0343 },
      { number: 13, alfa: 0.3, value: 9.9257 },
      { number: 14, alfa: 0.3, value: 10.8215 },
      { number: 15, alfa: 0.3, value: 11.7212 },
      { number: 16, alfa: 0.3, value: 12.6243 },
      { number: 17, alfa: 0.3, value: 13.5307 },
      { number: 18, alfa: 0.3, value: 14.4399 },
      { number: 19, alfa: 0.3, value: 15.3517 },
      { number: 20, alfa: 0.3, value: 16.2659 },
      { number: 1, alfa: 0.4, value: 0.2750 },
      { number: 2, alfa: 0.4, value: 1.0217 },
      { number: 3, alfa: 0.4, value: 1.8692 },
      { number: 4, alfa: 0.4, value: 2.7528 },
      { number: 5, alfa: 0.4, value: 3.6555 },
      { number: 6, alfa: 0.4, value: 4.5702 },
      { number: 7, alfa: 0.4, value: 5.4932 },
      { number: 8, alfa: 0.4, value: 6.4226 },
      { number: 9, alfa: 0.4, value: 7.3570 },
      { number: 10, alfa: 0.4, value: 8.2955 },
      { number: 11, alfa: 0.4, value: 9.2373 },
      { number: 12, alfa: 0.4, value: 10.1820 },
      { number: 13, alfa: 0.4, value: 11.1291 },
      { number: 14, alfa: 0.4, value: 12.0785 },
      { number: 15, alfa: 0.4, value: 13.0297 },
      { number: 16, alfa: 0.4, value: 13.9827 },
      { number: 17, alfa: 0.4, value: 14.9373 },
      { number: 18, alfa: 0.4, value: 15.8932 },
      { number: 19, alfa: 0.4, value: 16.8504 },
      { number: 20, alfa: 0.4, value: 17.8088 },
      { number: 1, alfa: 0.5, value: 0.4549 },
      { number: 2, alfa: 0.5, value: 1.3863 },
      { number: 3, alfa: 0.5, value: 2.3660 },
      { number: 4, alfa: 0.5, value: 3.3567 },
      { number: 5, alfa: 0.5, value: 4.3515 },
      { number: 6, alfa: 0.5, value: 5.3481 },
      { number: 7, alfa: 0.5, value: 6.3458 },
      { number: 8, alfa: 0.5, value: 7.3441 },
      { number: 9, alfa: 0.5, value: 8.3428 },
      { number: 10, alfa: 0.5, value: 9.3418 },
      { number: 11, alfa: 0.5, value: 10.3410 },
      { number: 12, alfa: 0.5, value: 11.3403 },
      { number: 13, alfa: 0.5, value: 12.3398 },
      { number: 14, alfa: 0.5, value: 13.3393 },
      { number: 15, alfa: 0.5, value: 14.3389 },
      { number: 16, alfa: 0.5, value: 15.3385 },
      { number: 17, alfa: 0.5, value: 16.3382 },
      { number: 18, alfa: 0.5, value: 17.3379 },
      { number: 19, alfa: 0.5, value: 18.3377 },
      { number: 20, alfa: 0.5, value: 19.3374 },
      { number: 1, alfa: 0.6, value: 0.7083 },
      { number: 2, alfa: 0.6, value: 1.8326 },
      { number: 3, alfa: 0.6, value: 2.9462 },
      { number: 4, alfa: 0.6, value: 4.0446 },
      { number: 5, alfa: 0.6, value: 5.1319 },
      { number: 6, alfa: 0.6, value: 6.2108 },
      { number: 7, alfa: 0.6, value: 7.2832 },
      { number: 8, alfa: 0.6, value: 8.3505 },
      { number: 9, alfa: 0.6, value: 9.4136 },
      { number: 10, alfa: 0.6, value: 10.4732 },
      { number: 11, alfa: 0.6, value: 11.5298 },
      { number: 12, alfa: 0.6, value: 12.5838 },
      { number: 13, alfa: 0.6, value: 13.6356 },
      { number: 14, alfa: 0.6, value: 14.6853 },
      { number: 15, alfa: 0.6, value: 15.7332 },
      { number: 16, alfa: 0.6, value: 16.7795 },
      { number: 17, alfa: 0.6, value: 17.8244 },
      { number: 18, alfa: 0.6, value: 18.8679 },
      { number: 19, alfa: 0.6, value: 19.9102 },
      { number: 20, alfa: 0.6, value: 20.9514 },
      { number: 1, alfa: 0.7, value: 1.0742 },
      { number: 2, alfa: 0.7, value: 2.4079 },
      { number: 3, alfa: 0.7, value: 3.6649 },
      { number: 4, alfa: 0.7, value: 4.8784 },
      { number: 5, alfa: 0.7, value: 6.0644 },
      { number: 6, alfa: 0.7, value: 7.2311 },
      { number: 7, alfa: 0.7, value: 8.3834 },
      { number: 8, alfa: 0.7, value: 9.5245 },
      { number: 9, alfa: 0.7, value: 10.6564 },
      { number: 10, alfa: 0.7, value: 11.7807 },
      { number: 11, alfa: 0.7, value: 12.8987 },
      { number: 12, alfa: 0.7, value: 14.0111 },
      { number: 13, alfa: 0.7, value: 15.1187 },
      { number: 14, alfa: 0.7, value: 16.2221 },
      { number: 15, alfa: 0.7, value: 17.3217 },
      { number: 16, alfa: 0.7, value: 18.4179 },
      { number: 17, alfa: 0.7, value: 19.5110 },
      { number: 18, alfa: 0.7, value: 20.6014 },
      { number: 19, alfa: 0.7, value: 21.6891 },
      { number: 20, alfa: 0.7, value: 22.7745 },
      { number: 1, alfa: 0.8, value: 1.6424 },
      { number: 2, alfa: 0.8, value: 3.2189 },
      { number: 3, alfa: 0.8, value: 4.6416 },
      { number: 4, alfa: 0.8, value: 5.9886 },
      { number: 5, alfa: 0.8, value: 7.2893 },
      { number: 6, alfa: 0.8, value: 8.5581 },
      { number: 7, alfa: 0.8, value: 9.8032 },
      { number: 8, alfa: 0.8, value: 11.0321 },
      { number: 9, alfa: 0.8, value: 12.2421 },
      { number: 10, alfa: 0.8, value: 13.4420 },
      { number: 11, alfa: 0.8, value: 14.6314 },
      { number: 12, alfa: 0.8, value: 15.8120 },
      { number: 13, alfa: 0.8, value: 16.9848 },
      { number: 14, alfa: 0.8, value: 18.1508 },
      { number: 15, alfa: 0.8, value: 19.3107 },
      { number: 16, alfa: 0.8, value: 20.4651 },
      { number: 17, alfa: 0.8, value: 21.6146 },
      { number: 18, alfa: 0.8, value: 22.7595 },
      { number: 19, alfa: 0.8, value: 23.9004 },
      { number: 20, alfa: 0.8, value: 25.0375 },
      { number: 1, alfa: 0.9, value: 2.7055 },
      { number: 2, alfa: 0.9, value: 4.6052 },
      { number: 3, alfa: 0.9, value: 6.2514 },
      { number: 4, alfa: 0.9, value: 7.7794 },
      { number: 5, alfa: 0.9, value: 9.2364 },
      { number: 6, alfa: 0.9, value: 10.6446 },
      { number: 7, alfa: 0.9, value: 12.0170 },
      { number: 8, alfa: 0.9, value: 13.3616 },
      { number: 9, alfa: 0.9, value: 14.6837 },
      { number: 10, alfa: 0.9, value: 15.9872 },
      { number: 11, alfa: 0.9, value: 17.2750 },
      { number: 12, alfa: 0.9, value: 18.5493 },
      { number: 13, alfa: 0.9, value: 19.8119 },
      { number: 14, alfa: 0.9, value: 21.0641 },
      { number: 15, alfa: 0.9, value: 22.3071 },
      { number: 16, alfa: 0.9, value: 23.5418 },
      { number: 17, alfa: 0.9, value: 24.7690 },
      { number: 18, alfa: 0.9, value: 25.9894 },
      { number: 19, alfa: 0.9, value: 27.2036 },
      { number: 20, alfa: 0.9, value: 28.4120 },
      { number: 1, alfa: 0.95, value: 3.8415 },
      { number: 2, alfa: 0.95, value: 5.9915 },
      { number: 3, alfa: 0.95, value: 7.8147 },
      { number: 4, alfa: 0.95, value: 9.4877 },
      { number: 5, alfa: 0.95, value: 11.0705 },
      { number: 6, alfa: 0.95, value: 12.5916 },
      { number: 7, alfa: 0.95, value: 14.0671 },
      { number: 8, alfa: 0.95, value: 15.5073 },
      { number: 9, alfa: 0.95, value: 16.9190 },
      { number: 10, alfa: 0.95, value: 18.3070 },
      { number: 11, alfa: 0.95, value: 19.6751 },
      { number: 12, alfa: 0.95, value: 21.0261 },
      { number: 13, alfa: 0.95, value: 22.3620 },
      { number: 14, alfa: 0.95, value: 23.6848 },
      { number: 15, alfa: 0.95, value: 24.9958 },
      { number: 16, alfa: 0.95, value: 26.2962 },
      { number: 17, alfa: 0.95, value: 27.5871 },
      { number: 18, alfa: 0.95, value: 28.8693 },
      { number: 19, alfa: 0.95, value: 30.1435 },
      { number: 20, alfa: 0.95, value: 31.4104 },
      { number: 1, alfa: 0.975, value: 5.0239 },
      { number: 2, alfa: 0.975, value: 7.3778 },
      { number: 3, alfa: 0.975, value: 8.3484 },
      { number: 4, alfa: 0.975, value: 11.1433 },
      { number: 5, alfa: 0.975, value: 12.8325 },
      { number: 6, alfa: 0.975, value: 14.4494 },
      { number: 7, alfa: 0.975, value: 16.0128 },
      { number: 8, alfa: 0.975, value: 17.5345 },
      { number: 9, alfa: 0.975, value: 19.0228 },
      { number: 10, alfa: 0.975, value: 20.4832 },
      { number: 11, alfa: 0.975, value: 21.9200 },
      { number: 12, alfa: 0.975, value: 23.3367 },
      { number: 13, alfa: 0.975, value: 24.7356 },
      { number: 14, alfa: 0.975, value: 26.1189 },
      { number: 15, alfa: 0.975, value: 27.4884 },
      { number: 16, alfa: 0.975, value: 28.8454 },
      { number: 17, alfa: 0.975, value: 30.1910 },
      { number: 18, alfa: 0.975, value: 31.5264 },
      { number: 19, alfa: 0.975, value: 32.8523 },
      { number: 20, alfa: 0.975, value: 34.1696 },
      { number: 1, alfa: 0.99, value: 6.6349 },
      { number: 2, alfa: 0.99, value: 9.2103 },
      { number: 3, alfa: 0.99, value: 11.3449 },
      { number: 4, alfa: 0.99, value: 13.2767 },
      { number: 5, alfa: 0.99, value: 15.0863 },
      { number: 6, alfa: 0.99, value: 16.8119 },
      { number: 7, alfa: 0.99, value: 18.4753 },
      { number: 8, alfa: 0.99, value: 20.0902 },
      { number: 9, alfa: 0.99, value: 21.6660 },
      { number: 10, alfa: 0.99, value: 23.2093 },
      { number: 11, alfa: 0.99, value: 24.7250 },
      { number: 12, alfa: 0.99, value: 26.2170 },
      { number: 13, alfa: 0.99, value: 27.6882 },
      { number: 14, alfa: 0.99, value: 29.1412 },
      { number: 15, alfa: 0.99, value: 30.5779 },
      { number: 16, alfa: 0.99, value: 31.9999 },
      { number: 17, alfa: 0.99, value: 33.4087 },
      { number: 18, alfa: 0.99, value: 34.8053 },
      { number: 19, alfa: 0.99, value: 36.1909 },
      { number: 20, alfa: 0.99, value: 37.5662 }
    ],
    arrayCheckKvantil: [],
    arraySignificanceTable: [],
    disabledMode: true
  }),
  methods: {
    emitNumberStudent () {
      this.$emit('numberStudent', this.numberStudent)
    },
    editAlfaValue () {
      this.alfa = this.selectElementAlfa
    },
    editSignificanceValue () {
      this.significance = this.selectElementSignificance
    },
    createTable () {
      if (this.n === 0) {
        alert('Введіть номер студента')
      } else {
        this.arrayElements.length = 0
        for (let i = 0; i < parseInt(this.n) + 20; i++) {
          this.arrayElements.push('')
        }
      }
    },
    checkElement () {
      this.arrayForCheck.length = 0
      this.arrayForCheck = [].map.call(document.querySelectorAll('.table'), function (block) {
        return [].map.call(block.querySelectorAll('.cell'), function (inp) {
          return inp.value
        })
      })
      const patternTestArray = []
      this.arrayForCheck.forEach(obj => {
        obj.forEach(element => {
          const patternTest = /^(2[0]|1[0-9]|[0-9])$/
          const validElement = patternTest.test(element)
          patternTestArray.push(validElement)
        })
      })
      this.checkCell = patternTestArray.reduce((total, field) => total + (field === true ? 1 : 0), 0)
      if (this.checkCell === parseInt(this.n) + 20) {
        this.disabledMode = false
      } else {
        this.disabledMode = true
      }
    },
    saveElements () {
      this.saveArrayElements.length = 0
      this.arrayForCheck.forEach(obj => {
        obj.forEach(element => {
          this.saveArrayElements.push({ value: element })
        })
      })
    },
    apraxiaGoldshteyn () {
      if (this.n !== 0 && this.alfa !== 'Значення α' && this.saveArrayElements.length !== 0) {
        this.arrayApraxia.length = 0
        this.apraxiaArrayElements.length = 0
        this.apraxiaArrayElements = this.apraxiaArrayElements.concat(this.saveArrayElements)
        this.saveArrayElements.forEach(element => {
          let x = 0
          let sumNumber = 0
          for (let i = 0; i <= 6; i++) {
            if ((Number(this.alfa) >= 0.5) && (Number(this.alfa) <= 0.999)) {
              const d = 2.0637 * Math.pow(Math.log(1 / (1 - Number(this.alfa))) - 0.16, 0.4274) - 1.5774
              sumNumber += Math.pow(Number(element.value), -i / 2) * Math.pow(d, i) * (this.a[i] + (this.b[i] / Number(element.value)) + (this.c[i] / Math.pow(Number(element.value), 2)))
            } else if ((Number(this.alfa) >= 0.001) && (Number(this.alfa) < 0.5)) {
              const d = -2.0637 * Math.pow(Math.log(1 / Number(this.alfa)) - 0.16, 0.4274) + 1.5774
              sumNumber += Math.pow(Number(element.value), -i / 2) * Math.pow(d, i) * (this.a[i] + (this.b[i] / Number(element.value)) + (this.c[i] / Math.pow(Number(element.value), 2)))
            }
          }
          x = Number(element.value) * Math.pow(sumNumber, 3)
          this.arrayApraxia.push({ value: +(x.toFixed(4)) })
        })
        const arrayKvantil = []
        this.kvantil.forEach(element => {
          if (element.alfa === Number(this.alfa)) {
            arrayKvantil.push(element)
          }
        })
        this.arrayCheckKvantil.length = 0
        this.arrayApraxia.forEach(element => {
          const checkValue = arrayKvantil.find(item => item.value === Number(element.value))
          if (checkValue !== undefined) {
            this.arrayCheckKvantil.push({ boolean: 'Вірно' })
          } else {
            this.arrayCheckKvantil.push({ boolean: 'Не вірно' })
          }
        })
      } else if (this.n === 0) {
        alert('Введіть номер студента')
      } else if (this.alfa === 'Значення α') {
        alert('Оберіть та збережіть значення α')
      } else if (this.saveArrayElements.length === 0) {
        alert('Введіть та збережіть набір елементів вибірки')
      }
    },
    createSignificance () {
      const leftColumn = document.querySelectorAll('.leftSignificance')
      const rigthColumn = document.querySelectorAll('.rightSignificance')
      const titleCell = this.$refs.titleSignificanceBlock
      const valueCell = this.$refs.valueSignificanceBlock
      if (this.significance === 'Двобічна') {
        titleCell.style.gridTemplateColumns = '2fr 2fr'
        valueCell.style.gridTemplateColumns = '2fr 2fr'
        leftColumn.forEach(element => {
          element.style.display = 'block'
        })
        rigthColumn.forEach(element => {
          element.style.display = 'block'
        })
      } else if (this.significance === 'Однобічна ліва') {
        titleCell.style.gridTemplateColumns = '1fr'
        valueCell.style.gridTemplateColumns = '1fr'
        leftColumn.forEach(element => {
          element.style.display = 'block'
        })
        rigthColumn.forEach(element => {
          element.style.display = 'none'
        })
      } else if (this.significance === 'Однобічна права') {
        titleCell.style.gridTemplateColumns = '1fr'
        valueCell.style.gridTemplateColumns = '1fr'
        leftColumn.forEach(element => {
          element.style.display = 'none'
        })
        rigthColumn.forEach(element => {
          element.style.display = 'block'
        })
      }
      if (this.n !== 0 && this.alfa !== 'Значення α' && this.saveArrayElements.length !== 0 && this.significance === 'Двобічна') {
        this.arraySignificanceTable.length = 0
        const arrayMinValue = []
        const arrayMaxValue = []
        const arrayNumbers = []
        this.saveArrayElements.forEach(element => {
          arrayNumbers.push(Number(element.value))
        })
        arrayNumbers.sort((a, b) => {
          return a - b
        })
        const persent = Number(this.alfa) * 100
        const elementPersent = 100 / this.saveArrayElements.length
        const significanceLength = parseInt((persent / elementPersent) / 2)
        if (significanceLength > 0) {
          for (let i = 0; i < significanceLength; i++) {
            const arrayMin = arrayNumbers.splice(0, 1)
            const minValue = arrayMin[0]
            arrayMinValue.push(minValue)
            const arrayMax = arrayNumbers.splice(-1, 1)
            const maxValue = arrayMax[0]
            arrayMaxValue.push(maxValue)
          }
        } else if (significanceLength === 0) {
          alert('Відсоток рівня значущості менше ніж відсоток, що дорівнює одному елементу вибірки. Збільшість відсоток значущості.')
        }
        for (let i = 0; i < arrayMinValue.length && i < arrayMaxValue.length; i++) {
          this.arraySignificanceTable.push({ minValue: arrayMinValue[i], maxValue: arrayMaxValue[i] })
        }
      } else if (this.n !== 0 && this.alfa !== 'Значення α' && this.saveArrayElements.length !== 0 && this.significance === 'Однобічна ліва') {
        this.arraySignificanceTable.length = 0
        const arrayMinValue = []
        const arrayNumbers = []
        this.saveArrayElements.forEach(element => {
          arrayNumbers.push(Number(element.value))
        })
        arrayNumbers.sort((a, b) => {
          return a - b
        })
        const persent = Number(this.alfa) * 100
        const elementPersent = 100 / this.saveArrayElements.length
        const significanceLength = parseInt((persent / elementPersent))
        if (significanceLength > 0) {
          for (let i = 0; i < significanceLength; i++) {
            const arrayMin = arrayNumbers.splice(0, 1)
            const minValue = arrayMin[0]
            arrayMinValue.push(minValue)
          }
        } else if (significanceLength === 0) {
          alert('Відсоток рівня значущості менше ніж відсоток, що дорівнює одному елементу вибірки. Збільшість відсоток значущості.')
        }
        for (let i = 0; i < arrayMinValue.length; i++) {
          this.arraySignificanceTable.push({ minValue: arrayMinValue[i] })
        }
      } else if (this.n !== 0 && this.alfa !== 'Значення α' && this.saveArrayElements.length !== 0 && this.significance === 'Однобічна права') {
        this.arraySignificanceTable.length = 0
        const arrayMaxValue = []
        const arrayNumbers = []
        this.saveArrayElements.forEach(element => {
          arrayNumbers.push(Number(element.value))
        })
        arrayNumbers.sort((a, b) => {
          return a - b
        })
        const persent = Number(this.alfa) * 100
        const elementPersent = 100 / this.saveArrayElements.length
        const significanceLength = parseInt((persent / elementPersent))
        if (significanceLength > 0) {
          for (let i = 0; i < significanceLength; i++) {
            const arrayMax = arrayNumbers.splice(-1, 1)
            const maxValue = arrayMax[0]
            arrayMaxValue.push(maxValue)
          }
        } else if (significanceLength === 0) {
          alert('Відсоток рівня значущості менше ніж відсоток, що дорівнює одному елементу вибірки. Збільшість відсоток значущості.')
        }
        for (let i = 0; i < arrayMaxValue.length; i++) {
          this.arraySignificanceTable.push({ maxValue: arrayMaxValue[i] })
        }
      } else if (this.n === 0) {
        alert('Введіть номер студента')
      } else if (this.alfa === 'Значення α') {
        alert('Оберіть та збережіть значення α')
      } else if (this.significance === 'Значущість') {
        alert('Оберіть та збережіть тип значущості')
      } else if (this.saveArrayElements.length === 0) {
        alert('Введіть та збережіть набір елементів вибірки')
      }
    }
  },
  updated () {
    this.arrayForCheck.length = 0
    this.arrayForCheck = [].map.call(document.querySelectorAll('.table'), function (block) {
      return [].map.call(block.querySelectorAll('.cell'), function (inp) {
        return inp.value
      })
    })
    const patternTestArray = []
    this.arrayForCheck.forEach(obj => {
      obj.forEach(element => {
        const patternTest = /^(2[0]|1[0-9]|[0-9])$/
        const validElement = patternTest.test(element)
        patternTestArray.push(validElement)
      })
    })
    this.checkCellTrue = patternTestArray.reduce((total, field) => total + (field === true ? 1 : 0), 0)
    if (this.arrayElements.length === 0) {
      this.disabledMode = true
    } else if (this.checkCellTrue === this.arrayElements.length) {
      this.disabledMode = false
    } else {
      this.disabledMode = true
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
        margin: 0 5px 0 8px;
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
    .blockAlfa {
      display: flex;
      margin: 5px 0 15px 0;
      .title {
        font-size: 16px;
      }
      .dropList {
        width: 177px;
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
    .blockSignificance {
      display: flex;
      margin: 5px 0 20px 0;
      .title {
        font-size: 16px;
      }
      .dropList {
        width: 177px;
        margin: 0 5px 0 9px;
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
          &:disabled {
            background: rgb(173, 173, 173) !important;
            cursor: default;
          }
        }
        .table {
          display: grid;
          background: rgb(77, 77, 77);
          width: max-content;
          grid-template-columns: repeat(7, max-content);
          margin-bottom: 10px;
          .cell {
            width: 40px;
            text-align: center;
            background: white;
            border: 1px solid rgb(77, 77, 77);
            border-collapse: collapse;
            font-size: 17px;
            margin-left: -1px;
            margin-top: -1px;
            outline: none;
            &:invalid {
              box-shadow: 0 0 5px rgba($color: red, $alpha: .7) inset;
            }
          }
        }
        .apraxiaTableBlock {
          display: grid;
          width: max-content;
          font-size: 17px;
          .titleBlock {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            .titleCell {
              border: 1px solid rgb(77, 77, 77);
              background: rgb(231, 231, 231);
              margin-left: -1px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
          .valueBlock {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            margin-bottom: -1px;
            .valueCell {
              border: 1px solid rgb(77, 77, 77);
              margin: -1px 0 0 -1px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
        .significanceTable {
          display: grid;
          font-size: 17px;
          width: max-content;
          .titleBlock {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            .titleCell {
              border: 1px solid rgb(77, 77, 77);
              background: rgb(231, 231, 231);
              margin-left: -1px;
              display: flex;
              justify-content: center;
              align-items: center;
              text-align: center;
            }
          }
          .valueBlock {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            margin-bottom: -1px;
            .valueCell {
              border: 1px solid rgb(77, 77, 77);
              margin: -1px 0 0 -1px;
              display: flex;
              justify-content: center;
              align-items: center;
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
      .blockNumberStudent, .blockAlfa, .blockSignificance, .containerTask {
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
      .blockAlfa, .blockSignificance {
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 0 5px 0 5px;
        .title {
          padding: 0 0 5px 5px ;
        }
        .dropList {
          width: 208px;
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
  @media (min-width: 900px) and (max-width: 1300px) {
    .containerPage {
      .blockNumberStudent, .blockAlfa, .blockSignificance {
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
