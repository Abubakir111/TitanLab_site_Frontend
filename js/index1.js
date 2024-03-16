const basketCount = document.querySelector('#cart')
const basketModl = document.querySelector('#basketModal')
const mobilBurgerModal = document.getElementById('mobil-burger-modal')
const burgerModalLiNav = document.querySelectorAll('.burger-modal-li')
const mainUnitContainer = document.getElementById('main_unit-container')
const productMainWrapp = document.getElementById('product__main_wrapp')
const navItem = document.querySelectorAll('.nav-item')
const productMain = document.getElementById('product__main')

const fetchData = async () => {
  try {
    const response = await fetch('../dataProduct/dataProduct.json')
    const { eSigs, chewingGum, iqos, sticks } = await response.json()
    const eSigsBlock = document.querySelector('#eSigs')
    const chewingGumBlock = document.querySelector('#chewingGum')
    const iqosBlock = document.querySelector('#iqos')
    const sticksBlock = document.querySelector('#sticks')
    const HTMLTemplate = (idElement, data) => {
      for (let product of data) {
        // console.log(product)
        idElement.innerHTML += ` <div class="swiper-slide" >
                <div class="product-block-img-container">
                  <img
                    class="product-block-img"
                    src="${product.img}"
                    alt="Product 1"
                  />
                  <p class="product-title">${product.title}</p>
                </div>
                 <button class="product-btn"  onclick ="openProductDetails('${product.id}','${product.img}','${product.title}','${product.moreDetails}','${product.price}','${product.productOptionImage}')">Подробнее</button>
                </div> `
      }
    }
    const swiperBreakpoits = {
      350: {
        slidesPerView: 2,
        spaceBetween: 6
      },
      648: {
        slidesPerView: 3,
        spaceBetween: 6
      },
      780: {
        slidesPerView: 3,
        spaceBetween: 35
      },
      1000: {
        slidesPerView: 4,
        spaceBetween: 35
      }
    }
    const swiper1 = new Swiper('.swiper', {
      slidesPerView: 4,
      spaceBetween: 35,
      direction: 'horizontal',
      loop: true,
      navigation: {
        nextEl: '.nextslides'
      },
      breakpoints: swiperBreakpoits
    })
    const swiper2 = new Swiper('.swiper2', {
      slidesPerView: 4,
      spaceBetween: 35,
      direction: 'horizontal',
      loop: true,
      navigation: {
        nextEl: '.nextslides2'
      },
      breakpoints: swiperBreakpoits
    })
    const swiper3 = new Swiper('.swiper3', {
      slidesPerView: 4,
      spaceBetween: 35,
      direction: 'horizontal',
      loop: true,
      navigation: {
        nextEl: '.nextslides3'
      },
      breakpoints: swiperBreakpoits
    })
    const swiper4 = new Swiper('.swiper4', {
      slidesPerView: 4,
      spaceBetween: 35,
      direction: 'horizontal',
      loop: true,
      navigation: {
        nextEl: '.nextslides4'
      },
      breakpoints: swiperBreakpoits
    })
    const reviewsSwiper = new Swiper('.slider-container', {
      slidesPerView: 3,
      spaceBetween: 31,
      direction: 'horizontal',
      loop: true,
      navigation: {
        nextEl: '#review__prev',
        prevEl: '#review__next'
      },
      breakpoints: {
        350: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        500: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        780: {
          slidesPerView: 3,
          spaceBetween: 35
        },
        1000: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      }
      // breakpoints: swiperBreakpoits
    })
    // <a href="${`./product-details.html`}"></a>
    HTMLTemplate(eSigsBlock, eSigs)
    HTMLTemplate(chewingGumBlock, chewingGum)
    HTMLTemplate(iqosBlock, iqos)
    HTMLTemplate(sticksBlock, sticks)
    return { eSigs, chewingGum, iqos, sticks }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
fetchData()

// const productDetails = (id, img, title, moreDetails, price, productOptionImage) => {
//   const nubID = Number(id)
//   const pricedata = Number(price)
//   let str = productOptionImage
//   let arrimg = str.split(',')
//   const productDatas = {
//     productId: nubID,
//     img: img,
//     productOptionImage: arrimg,
//     title: title,
//     moreDetails: moreDetails,
//     price: pricedata
//   }
//   localStorage.setItem('productDetails', JSON.stringify([productDatas]))
// }

// if (localStorage.getItem('productData')) {
//   const productData = JSON.parse(localStorage.getItem('productData'))
//   basketCount.textContent = productData.length
// } else localStorage.setItem('productData', JSON.stringify([]))

// const addPorductBasket = (id, title, img, moreDetails, price) => {
//   const nubID = Number(id)

//   const productDatas = {
//     productId: nubID,
//     title: title,
//     img: img,
//     moreDetails: moreDetails
//   }
//   let addProducts = JSON.parse(localStorage.getItem('productData')) || []
//   const productExists = addProducts.some((data) => data.productId === nubID)
//   if (!productExists) {
//     addProducts.push(productDatas)
//     localStorage.setItem('productData', JSON.stringify(addProducts))
//     basketCount.textContent = addProducts.length
//   }
// }

document.addEventListener('DOMContentLoaded ', function () {
  var downloadTrigger = document.getElementById('downloadTrigger')

  downloadTrigger.addEventListener('click ', function () {
    var downloadLink = document.createElement('a ')
    downloadLink.href = 'Новый-документ.pdf ' // Замените на путь к вашему документу
    downloadLink.download = 'Типы.pdf ' // Замените на желаемое имя файла

    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  })
})

// Проверяем, было ли уже показано окно
if (!localStorage.getItem('ageConfirmationShown')) {
  // Если окно еще не было показано, показываем его
  window.onload = function () {
    document.getElementById('ageModal').style.display = 'flex'
  }

  // Помечаем, что окно было показано
  localStorage.setItem('ageConfirmationShown', 'true')
}

// Функция для обработки ответа "Да"
function confirmAge() {
  document.getElementById('ageModal').style.display = 'none'
  // Записываем информацию о подтверждении возраста
  localStorage.setItem('ageConfirmed', 'true')
}

const rejectAge = () => alert('Вы должны быть старше 18 лет для доступа к сайту.')

const openForm = () => {
  if (basketModl.style.display == 'block') basketModl.style.display = 'none'
  if (mobilBurgerModal.style.display == 'block') mobilBurgerModal.style.display = 'none'
  document.getElementById('myForm').style.display = 'flex'
}

const closeForm = () => (document.getElementById('myForm').style.display = 'none ')
const openMobalBurger = () => {
  if (basketModl.style.display == 'block') basketModl.style.display = 'none'
  mobilBurgerModal.style.display = 'block'
}
const closeMobalBurger = () => (mobilBurgerModal.style.display = 'none')
const openBasker = () => {
  basketModl.style.display = 'block'
  if (basketModl.style.display == 'block') mobilBurgerModal.style.display = 'none'
}
const closeBasker = () => (basketModl.style.display = 'none')

burgerModalLiNav.forEach((nav) => {
  nav.addEventListener('click', () => {
    mobilBurgerModal.style.display = 'none'
    if (mainUnitContainer.style.display == 'none' && productMainWrapp.style.display == 'flex') {
      mainUnitContainer.style.display = 'block'
      productMainWrapp.style.display = 'none'
    }
  })
})
navItem.forEach((nav) => {
  nav.addEventListener('click', () => {
    if (mainUnitContainer.style.display == 'none' && productMainWrapp.style.display == 'flex') {
      mainUnitContainer.style.display = 'block'
      productMainWrapp.style.display = 'none'
    }
  })
})
const openProductDetails = (id, img, title, details, price, productOptionImage) => {
  mainUnitContainer.style.display = 'none'
  productMainWrapp.style.display = 'flex'
  const productId = Number(id)
  let neWproductOptionImage = productOptionImage.split(',')
  console.log(neWproductOptionImage)
  productMain.innerHTML = `
         <div class="product__img_container">
          <img src="${img}" alt="product" class="product__img" />
          <div class="product__img_menu-container">
            <img src="${neWproductOptionImage[0]}" alt="product" class="product__img_manu" />
            <img src="${neWproductOptionImage[1]}" alt="product" class="product__img_manu" />
            <img src="${neWproductOptionImage[2]}" alt="product" class="product__img_manu" />
          </div>
          <div class="productMobal_add_price-container">
            <div class="product__price_container">${price}<span>Р</span></div>
            <button type="button" class="product__add-basket_btn">Добавить в корзину</button>
          </div>
        </div>
        <div class="product__info_container">
          <div class="product__title_contianer">
            <h1>${title}</h1>
            <div class="product__view-quantity_container">
              <div class="product__title_container">
                <div class="product__title">Вид</div>
                <select class="product__options">
                  <option value="">13г</option>
                  <option value="">10гр</option>
                  <option value="">20гр</option>
                </select>
              </div>
              <div class="product__view_title_container">
                <div class="product__title_container">
                  <div class="product__title">Кол-во</div>
                  <select class="product__options">
                    <option value="">5 коробок</option>
                    <option value="">10 коробок</option>
                    <option value="">20 коробок</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="product__description_container">${details}</div>
          <div class="product__price_contianer">
            <div class="product__price_container">${price}<span>Р</span></div>
            <button type="button" class="product__add-basket_btn">Добавить в корзину</button>
          </div>
        </div>
  `
}

function submitForm() {
  var formData = new FormData(document.getElementById('applicationForm '))

  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        // Ваши действия после успешной отправки формы
        alert('Заявка успешно отправлена! ')
        closeForm() // Закрываем форму после успешной отправки
      } else {
        // Ваши действия в случае ошибки отправки формы
        alert('Произошла ошибка при отправке заявки. ')
      }
    }
  }

  xhr.open('POST ', 'submit.php ', true)
  xhr.send(formData)
}

document.addEventListener('DOMContentLoaded', () => {
  const navbarLinks = document.querySelectorAll('.navbar a')
  // Устанавливаем обработчик событий для скролла
  window.addEventListener('scroll', () => {
    updateActiveNav()
  })

  navbarLinks.forEach((link) => {
    link.addEventListener('click', function (event) {
      event.preventDefault()
      navbarLinks.forEach((link) => link.classList.remove('active'))
      this.classList.add('active')
      updateAnimationPosition(this)

      const targetId = this.getAttribute('href').substring(1)
      scrollToSection(targetId)
    })
  })

  function updateActiveNav() {
    const scrollPosition = window.scrollY
    const navbar = document.querySelector('.navbar')
    const navbarHeight = navbar.offsetHeight

    navbarLinks.forEach((link) => {
      const targetId = link.getAttribute('href').substring(1)
      const targetSection = document.getElementById(targetId)

      if (targetSection) {
        let offset = 0

        // Рассчитываем смещение в зависимости от способа скролла
        if (scrollPosition >= targetSection.offsetTop - navbarHeight - 130) {
          offset = 200 // Если скролл произошел ручками
        } else {
          offset = 200 // Если скролл был инициирован нажатием на кнопку навигации
        }

        // Увеличиваем отступ для элемента с ID "contact"
        if (targetId === 'contact') {
          offset += 700 // Больший отступ для раздела "Контакты"
        }

        const targetSectionTop = targetSection.offsetTop - navbarHeight - offset
        const targetSectionBottom = targetSectionTop + targetSection.offsetHeight

        if (scrollPosition >= targetSectionTop && scrollPosition < targetSectionBottom) {
          navbarLinks.forEach((link) => link.classList.remove('active'))
          link.classList.add('active')
          updateAnimationPosition(link)
        }
      }
    })
  }

  function updateAnimationPosition(clickedLink) {
    const navbarAnimation = document.querySelector('.navbar_animation')
    const linkRect = clickedLink.getBoundingClientRect()
    navbarAnimation.style.width = `${linkRect.width}px`
    navbarAnimation.style.left = `${linkRect.left}px`
  }

  function scrollToSection(targetId) {
    const targetSection = document.getElementById(targetId)
    if (targetSection) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight
      window.scrollTo({
        top: targetSection.offsetTop - navbarHeight - 100, // Смещение на 50px вверх при скролле ручками
        behavior: 'smooth'
      })
    }
  }
})

// Открывает новую страницу с подробной информацией о товаре
// const openProductDetails = () => window.open('product-details.html', '_blank')

// слайдер банера
const sliderImages = document.querySelectorAll('.imagenavigation')
const sliderElement = document.querySelector('.slider')
let currentSliden = 0

// function changeSlide(direction) {
//   currentSlide += direction
//   if (currentSlide < 0) {
//     currentSlide = sliderImages.length - 1
//   } else if (currentSlide >= sliderImages.length) {
//     currentSlide = 0
//   }
//   slider.style.transform = `translateX(-${currentSlide * sliderImages[0].clientWidth}px)`
// }
// document.querySelector('.prev-btn').addEventListener('click', () => {
//   changeSlide(-1)
// })
// document.querySelector('.next-btn').addEventListener('click', () => {
//   changeSlide(1)
// })

function changeSlide(direction) {
  if (direction === -1) {
    // User clicked "previous " button
    if (currentSlide === 0) {
      // If it's the first slide, return and don't change the slide
      return
    }
    currentSlide-- // Decrease the index
  } else {
    // User clicked "next " button
    if (currentSlide === sliderImages.length - 1) {
      // If it's the last slide, reset the index to 0
      currentSlide = 0
    } else {
      currentSlide++ // Increase the index
    }
  }
  sliderElement.style.transform = `translateX(-${currentSlide * sliderImages[0].clientWidth}px)`
}

let currentSlide = 0
const totalSlides = document.querySelectorAll('.slide').length

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
  updateSlider()
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides
  updateSlider()
}

function updateSlider() {
  const slideWidth = document.querySelector('.review').offsetWidth + 20 // 20px - margin-right
  const newTransformValue = -currentSlide * slideWidth + 'px'
  document.querySelector('.slides').style.transform = 'translateX(' + newTransformValue + ')'
}
function toggleMenu() {
  var navbar = document.getElementById('navbar')
  navbar.style.display = navbar.style.display === 'block' ? 'none' : 'block'
  var burgerMenu = document.querySelector('.burger-menu')
  burgerMenu.classList.toggle('active')
}

// document.addEventListener("DOMContentLoaded", function () {
//   const burgerMenu = document.querySelector(".burger-menu");
//   const navbar = document.querySelector(".navbar");

//   // Обработчик клика на бургер-меню
//   burgerMenu.addEventListener("click", function () {
//     navbar.classList.toggle("show-nav");
//   });
// });

// function toggleText(elementId) {
//   var element = document.getElementById(elementId);
//   if (element.style.display === "none") {
//     element.style.display = "block";
//     // Скрываем кнопку "Читать полностью"
//     var trigger = document.querySelector(".read-more-trigger");
//     trigger.style.display = "none";
//     // Можно добавить здесь другие действия при раскрытии текста
//   } else {
//     element.style.display = "none";
//     // Можно добавить здесь другие действия при скрытии текста
//   }
// }
// document.addEventListener("DOMContentLoaded", function () {
//   const slider = document.querySelector(".product-slider");
//   const slides = slider.querySelectorAll(".product-block");
//   let currentIndex = 0;

//   function moveSlide(direction) {
//     currentIndex += direction;

//     if (currentIndex >= slides.length) {
//       currentIndex = 0; // Возвращаемся к первому слайду
//     } else if (currentIndex < 0) {
//       currentIndex = slides.length - 1; // Переходим к последнему слайду
//     }

//     let totalOffset = 0;
//     for (let i = 0; i < currentIndex; i++) {
//       totalOffset += slides[i].offsetWidth; // Учитываем ширину каждого предыдущего слайда
//     }

//     let offset;
//     // Задаем определенные значения смещения для каждого слайда
//     if (currentIndex === 0) {
//       offset = -100; // Смещение для первого слайда
//     } else if (currentIndex === 1) {
//       offset = -490; // Смещение для второго слайда
//     } else if (currentIndex === 2) {
//       offset = -880; // Смещение для третьего слайда
//     } else if (currentIndex === 3) {
//       offset = -1270; // Смещение для четвертого слайда
//     } else if (currentIndex === 4) {
//       offset = -1660; // Смещение для пятого слайда
//     } else if (currentIndex === 5) {
//       offset = -2050; // Смещение для шестого слайда
//     }

//     slider.style.transition = "transform 0.7s ease";
//     slider.style.transform = `translateX(${offset}px)`;
//   }

//   // Обработка клика на кнопку
//   const nextslides = document.querySelector(".nextslides");
//   nextslides.addEventListener("click", () => moveSlide(1));
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const slider2 = document.getElementById("product-slider-2");
//   const slides2 = slider2.querySelectorAll(".product-block");
//   let currentIndex2 = 0;

//   function moveSlide(direction) {
//     currentIndex2 += direction;

//     if (currentIndex2 >= slides2.length) {
//       currentIndex2 = 0; // Возвращаемся к первому слайду
//     } else if (currentIndex2 < 0) {
//       currentIndex2 = slides2.length - 1; // Переходим к последнему слайду
//     }

//     let totalOffset = 0;
//     for (let i = 0; i < currentIndex2; i++) {
//       totalOffset += slides2[i].offsetWidth; // Учитываем ширину каждого предыдущего слайда
//     }

//     let offset;
//     // Задаем определенные значения смещения для каждого слайда
//     if (currentIndex2 === 0) {
//       offset = -100; // Смещение для первого слайда
//     } else if (currentIndex2 === 1) {
//       offset = -490; // Смещение для второго слайда
//     } else if (currentIndex2 === 2) {
//       offset = -880; // Смещение для третьего слайда
//     } else if (currentIndex2 === 3) {
//       offset = -1270; // Смещение для четвертого слайда
//     } else if (currentIndex2 === 4) {
//       offset = -1660; // Смещение для пятого слайда
//     } else if (currentIndex2 === 5) {
//       offset = -2050; // Смещение для шестого слайда
//     }

//     slider2.style.transition = "transform 0.7s ease";
//     slider2.style.transform = `translateX(${offset}px)`;
//   }

//   // Обработка клика на кнопку только для второй секции
//   const nextslides2 = document.querySelector(".nextslides1");
//   nextslides2.addEventListener("click", () => moveSlide(1));
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const slider3 = document.getElementById("product-slider-3");
//   const slides3 = slider3.querySelectorAll(".product-block");
//   let currentIndex3 = 0;

//   function moveSlide(direction) {
//     currentIndex3 += direction;

//     if (currentIndex3 >= slides3.length) {
//       currentIndex3 = 0; // Возвращаемся к первому слайду
//     } else if (currentIndex3 < 0) {
//       currentIndex3 = slides3.length - 1; // Переходим к последнему слайду
//     }

//     let totalOffset = 0;
//     for (let i = 0; i < currentIndex3; i++) {
//       totalOffset += slides3[i].offsetWidth; // Учитываем ширину каждого предыдущего слайда
//     }

//     let offset;
//     // Задаем определенные значения смещения для каждого слайда
//     if (currentIndex3 === 0) {
//       offset = -100; // Смещение для первого слайда
//     } else if (currentIndex3 === 1) {
//       offset = -490; // Смещение для второго слайда
//     } else if (currentIndex3 === 2) {
//       offset = -880; // Смещение для третьего слайда
//     } else if (currentIndex3 === 3) {
//       offset = -1270; // Смещение для четвертого слайда
//     } else if (currentIndex3 === 4) {
//       offset = -1660; // Смещение для пятого слайда
//     } else if (currentIndex3 === 5) {
//       offset = -2050; // Смещение для шестого слайда
//     }

//     slider3.style.transition = "transform 0.7s ease";
//     slider3.style.transform = `translateX(${offset}px)`;
//   }

//   // Обработка клика на кнопку только для третьей секции
//   const nextslides3 = document.querySelector(".nextslides2");
//   nextslides3.addEventListener("click", () => moveSlide(1));
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const slider4 = document.getElementById("product-slider-4");
//   const slides4 = slider4.querySelectorAll(".product-block");
//   let currentIndex4 = 0;

//   function moveSlide(direction) {
//     currentIndex4 += direction;

//     if (currentIndex4 >= slides4.length) {
//       currentIndex4 = 0; // Возвращаемся к первому слайду
//     } else if (currentIndex4 < 0) {
//       currentIndex4 = slides4.length - 1; // Переходим к последнему слайду
//     }

//     let totalOffset = 0;
//     for (let i = 0; i < currentIndex4; i++) {
//       totalOffset += slides4[i].offsetWidth; // Учитываем ширину каждого предыдущего слайда
//     }

//     let offset;
//     // Задаем определенные значения смещения для каждого слайда
//     if (currentIndex4 === 0) {
//       offset = -100; // Смещение для первого слайда
//     } else if (currentIndex4 === 1) {
//       offset = -490; // Смещение для второго слайда
//     } else if (currentIndex4 === 2) {
//       offset = -880; // Смещение для третьего слайда
//     } else if (currentIndex4 === 3) {
//       offset = -1270; // Смещение для четвертого слайда
//     } else if (currentIndex4 === 4) {
//       offset = -1660; // Смещение для пятого слайда
//     } else if (currentIndex4 === 5) {
//       offset = -2050; // Смещение для шестого слайда
//     }

//     slider4.style.transition = "transform 0.7s ease";
//     slider4.style.transform = `translateX(${offset}px)`;
//   }

//   // Обработка клика на кнопку только для третьей секции
//   const nextslides4 = document.querySelector(".nextslides3");
//   nextslides4.addEventListener("click", () => moveSlide(1));
// });
//
