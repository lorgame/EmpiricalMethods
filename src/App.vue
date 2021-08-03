<template>
  <div id="app">
    <header class="header">
      <h3 v-if="windowWidth > 768" @click="navButton" class="navMenuView">Лабораторні роботи</h3>
      <fa-icon v-else @click="navButton" class="faIcon" icon="bars"></fa-icon>
      <h1 @click="titleButton" class="titleSite">
        <router-link class="routerHome" to="/">Емпіричні методи</router-link>
      </h1>
    </header>
    <main class="main" :style="{gridTemplateColumns: gridMode}">
      <transition :name="windowWidth >= 769 ? 'fade' : windowHeight > 635 ? 'mobiFull' : 'mobiSmall'" mode="out-in">
        <nav v-show="showMenu || showMenuMobile" class="navigationContainer">
          <ul class="menuList">
            <router-link class="routerLink" v-for="(value, i) of labaratoryArray" :key="i" :to="value.path">
              <li :style="heightMode" @click="itemArraySelect(value.id)" class="menuItem">{{ value.title }}</li>
            </router-link>
          </ul>
        </nav>
      </transition>
      <transition name="mainView" mode="out-in">
        <div v-show="!showMenuMobile">
          <router-view :style="routerViewMode" class="routerView" v-for="(value, i) of routerViewVariable" :key="i" @numberStudent="returnNumberStudent($event)" :title="value.title" :theme="value.theme" :content="value.content" :n="n"></router-view>
        </div>
      </transition>
    </main>
    <footer></footer>
  </div>
</template>
<script>
import { FontAwesomeIcon as FaIcon } from '@fortawesome/vue-fontawesome'
export default {
  components: {
    FaIcon
  },
  data: () => ({
    n: 0,
    showMenu: false,
    showMenuMobile: false,
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    router: [],
    info: [
      {
        id: '0',
        title: 'Виконавець Войтанович Дмитро ІПЗ-31',
        path: '/',
        content: 'На даному сайті було розроблено 12 лабораторних робіт із предмету "Емпіричні методи". Особливістю даного продукту є те, що він застосовує технологію "Single-page application" за допомогою якої створюється можливість одноразового завантаження сторінки та в подальшій маршрутизації всередині сайту без перезавантажень.'
      },
      {
        id: '1',
        title: 'Лабораторна робота №1',
        path: '/laboratoryNumber1',
        theme: 'Найпростіша статистична обробка емпіричних даних',
        content: 'Написати програму, що генерує випадкову послідовність даних з (N + 10) елементів, які набувають значень із набору (1, 2, 3, 4, 5). N - номер студента у журналі старости. Одержати та вивести на екран вихідні дані, варіаційний ряд, статистичний розподіл, інтегральну частоту та частість.'
      },
      {
        id: '2',
        title: 'Лабораторна робота №2',
        path: '/laboratoryNumber2',
        theme: 'Обчислення середніх величин',
        content: `Написати програму, що генерує випадкову послідовність даних з (N + 10) елементів, які набувають значень із набору (1, 2, 3, ....,(N+1)). N - номер студента у журналі старости. 
Внести початкову та впорядковану послідовність. 
Обчислити моду, медіану, середне арифметичне сукупності. Обчислення кожної з цих величин має бути реалізоване у вигляді окремого блоку програми (функції/ процедури/класу/методу класу залежно від використовуваного середовища для виконання робіт). 
Написати програму, яка перевіряе розроблений раніше елемент для обчислення моди. Для цього сформувати таблицю прикладів, які відображають різні варіанти визначення моди та результати при цьому. Здійснити перевірку. Протокол перевірки в зрозумілій формі має відображатись на екрані.`
      },
      {
        id: '3',
        title: 'Лабораторна робота №3',
        path: '/laboratoryNumber3',
        theme: 'Основи статистичної обробки неперервних даних',
        content: 'Задатись двома вибірками із 20N елементів неперервних випадкових величин нормального та показникового розподілу в діапазоні від 0 до N включно. Побудувати гістограми.'
      },
      {
        id: '4',
        title: 'Лабораторна робота №4',
        path: '/laboratoryNumber4',
        theme: 'Обчислення дисперсії середнього квадратичного відхилення, коефіціентів асиметрії та ексцесу',
        content: `Задатись вибіркою із 5N елементів (нормального розподілу) в діапазоні від 0 до N включно з довільними параметрами.
Обчислити дисперсію, середные квадратичне відхилення, коефіцієнти асиметрії та ексцесу на основі змодельованих даних.`
      },
      {
        id: '5',
        title: 'Лабораторна робота №5',
        path: '/laboratoryNumber5',
        theme: 'Основи програмування перевірки статистичних гіпотез',
        content: 'Задатись вибіркою з (2А+5) елементів із показниковим (експотенційним) розподілом. Задатись вибіркою з 100*(2А+5) елементів із нормальним розподілом (А- номер у журналі старости). Написати програму, яка формує протокол стаистичного дослідження для довільних даних на основі критерію асиметрії та ексцесу, результати представити для одержаних вибірок. Для одержання нормального розподілу рекомендується використати спеціальні алгоритми (бібліотеки)'
      },
      {
        id: '6',
        title: 'Лабораторна робота №6',
        path: '/laboratoryNumber6',
        theme: 'Програмна реалізація критерію узгодженості Пірсона',
        content: 'Організувати ввід з консолі (N+20) цілих чисел в дапазоні від 0 до 20 включно. Запрограмувати перевірку на допустимі значення. Запрограмувати перевірку апроксимації Голдштейна для різних значень α. Ввести числа вручну випадковим чином. Організувати перевірку програмним чином на основі критерію х² на відповідність введеної вибірки нормальному та рівномірному розподілу за двома різними рівнями значущості. Вивести на екран вибірку та результати перевірок.'
      },
      {
        id: '7',
        title: 'Лабораторна робота №7',
        path: '/laboratoryNumber7',
        theme: 'Програмування перевірки на однорідність',
        content: `1.Задатись нормальним розподілом В₁ з (L+30) елементів з m = 10, σ² = 10.
2.Задатись нормальним розподілом В₁ з (L+30) елементів з m = 15, σ² = 10.
3.Задатись нормальним розподілом В₁ з (L+30) елементів з m = 10, σ² = 4.
4.Перевірити однорідність В₁; В₁ і В₂. Рівень значущості - 0,05.
В коротких теоретичних відомостях звіту представити використаний метод формування нормального розподілу.
Передбачити вивід вибірок та результатів перевірки однорідності відповідних вибірок у текстовий файл.`
      },
      {
        id: '8',
        title: 'Лабораторна робота №8',
        path: '/laboratoryNumber8',
        theme: 'Програмна реалізація перевірки на грубі помилки за критерієм Смірнова',
        content: `Задатись вибіркою з (N+30) елементів з нормальним розподілом та довільними параметрами. Провести дослідження. Замінити у вибірці найменше або найбільше значення на значення, яке:
  -випадає з діапазону згенерованої вибірки не більше ніж на 0,3 СКВ;
  -випадає з діапазону згенерованої вибірки не більше ніж на 1 СКВ; 
  -суттєво випадає з діапазону згенрованої вибрки. 
Провести дослідження. 
Розрахунки провести за допомогою розробленого програмного забезпечення. 
Для вирішення поставленого завдання розробити: 
  -програму, відповідно до варіанту; 
  -програму для аналізу даних. Робота з файлом повинна бути винесена в окремий клас. Передбачити коректну обробку помилок вводу/виводу для роботи з файлом яка генерує текстовий файл з даними даних. 
Продемонстувати вивід програми з явно помилковим вводом, вивід програми за відсутності файла даних.`
      },
      {
        id: '9',
        title: 'Лабораторна робота №9',
        path: '/laboratoryNumber9',
        theme: 'Програмна реалізація перевірки на грубі помилки за критерієм Ірвіна',
        content: `Задатись вибіркою з (N+30) елементів з нормальним розподілом (близьким до нього). Провести дослідження. Замінити у вибірці найменше або найбільше значення на значення, яке не входить у заданий діапазон. Провести дослідження.
Провести розрахунки з допомогою розробленого програмного забезпечення. 
Розробити: 
  -програму, яка генерує текстовий файл з даними відповідно до варіанту; 
  -програму для аналізу даних. Робота з файлом повинна бути винесена в окремий клас. Передбачити коректну обробку помилок вводу/виводу для роботи з файлом даних. 
Продемонстувати вивід програми з явно помилковим водом, вивід програми за відсутності файла даних.`
      },
      {
        id: '10',
        title: 'Лабораторна робота №10',
        path: '/laboratoryNumber10',
        theme: 'Проста лінійна регресія',
        content: 'Задатись довільною лінією у формі у=kx+b. Одержати дискретне представлення лінії в деякому невід`ємному діапазоні (N+10) точок, де N - номер у журналі. Додати до цих даних "шум" з нормальним розподілом - розмах варіації (N/5). Знайти рівняння регресії на основі "зашумлених" даних, вивести графіки та коефіцієнти вихідної лінії та регресійної моделі.'
      },
      {
        id: '11',
        title: 'Лабораторна робота №11',
        path: '/laboratoryNumber11',
        theme: 'Елементи кореляційного аналізу та їх програмна реалізація',
        content: `1.Задатись вибіркою А із 100 елементів, що відповідае 1-му періоду синусоїди з параметрами Т-секунд, Т - номер студента. 
2.Задатись вибіркою Б, що відповідає синусоїді з пункту 1 у протифазі з половинною амплітудою. 
3.Задатись вибіркою В, що утворюється з вибірки А шляхом додавання рівномірного шуму амплітудою 25% від початкової.
4.Здійснити кореляційний аналіз А і Б, А і В.`
      },
      {
        id: '12',
        title: 'Лабораторна робота №12',
        path: '/laboratoryNumber12',
        theme: 'Дисперсійний однофакторний аналіз',
        content: `Здійснити дисперсійний аналіз впливу швидкості пред'явлення слів на показники їх відтворення. Вихідні дані (по варіантах) наведено нижче. Для проведення розрахунків можна використовувати програму MicrosoftExel, але стандартний пакет для дисперсійного аналізу використовувати заборонено. Звіт оформити відповідно до прикладу. 
  1. Низька:  4, 7, 6, 5, 6, 4
     Середня: 5, 6, 5, 4, 5, 4
     Висока:  4, 4, 5, 6, 4, 3 
  2. Низька:  4, 7, 6, 5, 6, 7
     Середня: 5, 6, 5, 5, 5, 4
     Висока:  4, 4, 5, 3, 4, 3 
  3. Низька:  4, 6, 6, 5, 6, 4
     Середня: 5, 6, 5, 4, 5, 4
     Висока:  4, 4, 2, 6, 4, 3 
  4. Низька:  4, 7, 6, 6, 6, 4
     Середня: 5, 6, 5, 5, 5, 4
     Висока:  4, 2, 5, 6, 4, 3 
  5. Низька:  4, 7, 6, 5, 6, 4
     Середня: 5, 6, 2, 4, 5, 4
     Висока:  4, 1, 5, 6, 4, 3 
  6. Низька:  4, 7, 6, 3, 6, 7
     Середня: 5, 6, 5, 4, 5, 4
     Висока:  4, 4, 2, 6, 2, 2 
  7. Низька:  4, 8, 6, 5, 6, 5
     Середня: 4, 6, 5, 4, 5, 4
     Висока:  3, 3, 5, 6, 4, 3 
  8. Низька:  4, 6, 6, 6, 6, 6
     Середня: 5, 6, 5, 4, 5, 4
     Висока:  2, 4, 3, 6, 4, 3 
  9. Низька:  4, 1, 6, 5, 6, 4
     Середня: 5, 6, 2, 4, 2, 4
     Висока:  4, 4, 5, 6, 4, 3 
  10.Низька:  4, 2, 6, 5, 6, 4
     Середня: 5, 2, 5, 4, 2, 4
     Висока:  4, 1, 5, 5, 4, 3`
      }
    ]
  }),
  computed: {
    gridMode () {
      return this.showMenu ? '280px 1fr' : '1fr'
    },
    routerViewMode () {
      return this.showMenu ? 'padding-left: 290px; margin-left: -280px;' : 'padding-left: 10px; margin-left: 0px;'
    },
    heightMode () {
      return this.windowHeight > 568 && this.windowWidth <= 768 ? 'height: calc((100vh - 51px - 12px) / 12);' : 'height: max-content; padding: 10px;'
    },
    labaratoryArray () {
      return this.info.reduce((total, field) => {
        if (field.path !== '/') {
          total.push(field)
        }
        return total
      }, [])
    },
    homePageArray () {
      return [this.info.find(item => item.path === '/')]
    },
    routerViewVariable () {
      return this.$route.path === '/' ? this.homePageArray : this.router
    }
  },
  methods: {
    returnNumberStudent (e) {
      this.n = e
    },
    titleButton () {
      if (this.windowWidth <= 768 && this.showMenuMobile) {
        this.showMenuMobile = false
      }
    },
    navButton () {
      if (this.windowWidth > 768) {
        this.showMenu = !this.showMenu
      } else {
        this.showMenuMobile = !this.showMenuMobile
      }
    },
    itemArraySelect (e) {
      this.n = 0
      this.router.length = 0
      this.router.push(this.info.find(item => item.id === e))
      if (this.windowWidth <= 768) {
        this.showMenuMobile = false
      }
      return this.router
    },
    updateWindowWidth () {
      this.windowWidth = window.innerWidth
      this.windowHeight = window.innerHeight
      if (this.windowWidth > 768 && this.showMenuMobile === true) {
        this.showMenu = true
        this.showMenuMobile = false
      } else if (this.windowWidth <= 768 && this.showMenu === true) {
        this.showMenuMobile = false
        this.showMenu = false
      }
    }
  },
  created () {
    window.addEventListener('resize', this.updateWindowWidth)
  }
}
</script>
<style scoped lang="scss">
/* animation */
  .fade-enter-from, .fade-leave-to {
    top: -600px;
    position: relative;
  }
  .fade-enter-active, .fade-leave-active {
    transition: top 1s ease;
    position: relative;
    height: 0;
  }
  .fade-enter-to, .fade-leave-from {
    top: 0px;
    position: relative;
  }
  .mobiSmall-enter-from, .mobiSmall-leave-to {
    top: -600px;
    position: relative;
  }
  .mobiSmall-enter-active, .mobiSmall-leave-active {
    transition: top 1s ease;
    position: absolute !important;
  }
  .mobiSmall-enter-to, .mobiSmall-leave-from {
    top: 0px;
    position: relative;
  }
  .mobiFull-enter-from, .mobiFull-leave-to {
    top: calc(-100vh + 51px);
    position: relative;
  }
  .mobiFull-enter-active, .mobiFull-leave-active {
    transition: top 1s ease;
    position: absolute !important;
  }
  .mobiFull-enter-to, .mobiFull-leave-from {
    top: 0;
    position: relative;
  }
  .mainView-enter-from, .mainView-leave-to {
    opacity: 0;
  }
  .mainView-enter-active {
    transition: opacity 1s ease;
  }
  .mainView-leave-active {
    transition: opacity 1s ease;
  }
  .mainView-enter-to, .mainView-leave-from {
    opacity: 1;
  }
/* end animation */
  .header {
    display: grid;
    grid-template-columns: 280px 1fr;
    background: linear-gradient(90deg, rgb(97, 97, 97)20%, rgb(204, 204, 204));
    border-bottom: 1px solid rgb(70, 70, 70);
    height: 50px;
    z-index: 2;
    position: relative;
    .navMenuView {
      display: flex;
      justify-self: center;
      align-self: center;
      border-bottom: 2px solid rgba(0, 0, 0, 0);
      margin: 0;
      font-size: 20px;
      color: white;
      text-shadow: 1px 1px 2px black;
      cursor: pointer;
    }
    .titleSite {
      display: flex;
      justify-self: center;
      align-items: center;
      margin: 0;
      height: 100%;
      .routerHome {
        color: white;
        text-shadow: 1px 1px 2px black;
        text-decoration: none;
      }
    }
  }
  .main {
    display: grid;
    position: relative;
    .navigationContainer {
      width: 280px;
      position: relative;
      z-index: 1;
      .menuList {
        margin: 0;
        padding: 0;
        .routerLink {
          text-decoration: none;
          transition: color 0.5s;
          color: rgb(192, 192, 192);
          &:hover, &:active {
            transition: color 0.5s;
            color: rgb(255, 255, 255);
          }
          .menuItem {
            list-style-type: none;
            font-size: 20px;
            padding: 10px 0 10px 10px;
            transition: padding 0.5s;
            border-top: 1px solid rgb(160, 160, 160);
            border-bottom: 1px solid rgb(160, 160, 160);
            border-right: 1px solid rgb(160, 160, 160);
            background: linear-gradient(90deg, rgb(97, 97, 97)20%, rgb(104, 104, 104));
            text-shadow: 1px 1px 2px black;
            &:first-child {
              border-top: 0px;
            }
          }
        }
      }
    }
    .routerView {
      transition: margin-left 1s ease;
      transition: padding-left 1s ease;
      margin-bottom: 5px;
      padding-right: 10px;
    }
  }
  @media (min-width: 1940px) {
    #app {
      height: inherit;
      max-width: 1920px;
      box-shadow: 0 0 10px rgba(0,0,0,0.5);
      margin: 0 calc(50% - 1920px / 2);
    }
  }
  @media (min-width: 0px) and (max-width: 768px) {
    .header {
      display: grid;
      grid-template-columns: 30px 1fr;
      .faIcon {
        display: flex;
        justify-self: right;
        align-self: center;
        height: 25px;
        width: 25px;
        color: white;
      }
    }
    .main {
      .navigationContainer {
        width: 100%;
        height: calc(100vh - 51px);
        .menuList {
          height: inherit;
          .routerLink {
            .menuItem {
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 0px;
            }
          }
        }
      }
      .routerView {
        margin-left: 0 !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
    }
  }
  @media (max-width: 768px) and (min-width: 0px) {
    #app {
      font-family: 'Arial', 'Times New Roman', Times, cursive, serif !important;
      font-size: 14px;
    }
  }
</style>
