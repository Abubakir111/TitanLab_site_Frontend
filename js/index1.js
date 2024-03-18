const basketCount = document.querySelector('#cart')
const basketModl = document.querySelector('#basketModal')
const basketModlContent = document.querySelector('#basketModal-container')
const mobilBurgerModal = document.getElementById('mobil-burger-modal')
const burgerModalLiNav = document.querySelectorAll('.burger-modal-li')
const mainUnitContainer = document.getElementById('main_unit-container')
const productMainWrapp = document.getElementById('product__main_wrapp')
const navItem = document.querySelectorAll('.nav-item')
const productMain = document.getElementById('product__main')
const productAddBasketBtn = document.getElementById('product__add-basket_btn')

if (!localStorage.getItem('productData')) localStorage.setItem('productData', JSON.stringify([]))
else basketCount.textContent = JSON.parse(localStorage.getItem('productData')).length

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
        idElement.innerHTML += ` <div class="swiper-slide" >
                <div class="product-block-img-container">
                  <img
                    class="product-block-img"
                    src="${product.img}"
                    alt="Product 1"
                  />
                  <p class="product-title">${product.title}</p>
                </div>
                 <button class="product-btn"  onclick ="openProductDetails('${product.id}','${product.img}','${product.title}','${product.moreDetails}','${product.price}','${product.productOptionImage}','${product.typeOfProduct}')">Подробнее</button>
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
const basketProductHtml = (basketModlContent, storageProduct) => {
  let summ = 0
  storageProduct.forEach((count) => {
    count.quantity > 1 ? (summ += count.price * count.quantity) : (summ += count.price)
  })
  basketModlContent.innerHTML = `<div class="basketModal-product-block-wrapp">
                 ${storageProduct
                   .map(
                     (item, index) =>
                       `<div class="basketModal-product-block">
                       <div class="basketModal-img-container">
                         <img src="${item.img}" />
                         <div class="basketModal-title-container">
                           <h3>${item.title} <p class ="basket__title_view">${item.typeoFProduct}</p></h3>
                           <p>${item.quantity} штук</p>
                         </div>
                       </div>
                       <img src="./images/icons/cross.png" alt="delet" class="basketModal-delet-product" onclick="deletProductStorage(${index})" />
                     </div>`
                   )
                   .join('')}
                </div >
                <div class="basketModal-total-amount">
                  <div class="basketModal-total-container">
                    <div>Итог:</div>
                    <div>${summ}<span> рублей.</span></div>
                  </div>
                  <button class="basketModla-btn" type="button" onclick="openForm()">Оставить заявку</button>
                </div>`
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
  const basketProducts = JSON.parse(localStorage.getItem('productData'))
  // let summ = 0
  // basketProducts.forEach((count) => {
  //   count.quantity > 1 ? (summ += count.price * count.quantity) : (summ += count.price)
  // })
  basketProductHtml(basketModlContent, basketProducts)
}
const closeBasker = () => (basketModl.style.display = 'none')
const deletProductStorage = (id) => {
  const ProductsStorage = JSON.parse(localStorage.getItem('productData'))
  const newProductStorage = ProductsStorage.filter((elem, index) => index !== id)
  localStorage.setItem('productData', JSON.stringify(newProductStorage))
  basketProductHtml(basketModlContent, newProductStorage)
}

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

const openProductDetails = (id, img, title, details, price, productOptionImage, typeOfProduct) => {
  mainUnitContainer.style.display = 'none'
  productMainWrapp.style.display = 'flex'
  const productId = Number(id)
  const arraytypeOfProduct = typeOfProduct.split(',')
  let neWproductOptionImage = productOptionImage.split(',')
  productMain.innerHTML = `
         <div class="product__img_container">
          <img src="${img}" alt="product" class="product__img" />
          <div class="product__img_menu-container">
            ${neWproductOptionImage.map((item) => `<img src='${item}' alt='product' class='product__img_manu' />`)}
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
                <select class="product__options" id="product__options">
                  ${arraytypeOfProduct.map((item) => `<option value="${item}">${item}</option>`)}
                </select>
              </div>
              <div class="c_title_container">
                <div class="product__title_container">
                  <div class="product__title">Кол-во</div>
                <input class="product__options product_input" id ="product_input" type="number" value="1">
                </div>
              </div>
            </div>
          </div>
          <div class="product__description_container">${details}</div>
          <div class="product__price_contianer">
            <div class="product__price_container">${price}<span>Р</span></div>
            <button type="button" class="product__add-basket_btn" id = "product__add-basket_btn"onclick="addbasketProductStorage('${img}','${title}','${price}')">Добавить в корзину</button>
          </div>
        </div>
  `
}

// window.addEventListener('storage', function (e) {
//   console.log(e)
// })

const addbasketProductStorage = (img, title, price) => {
  const typeoFProduct = document.getElementById('product__options').value
  const quantity = Number(document.getElementById('product_input').value)
  addnewProduct = JSON.parse(localStorage.getItem('productData'))
  addnewProduct.push({ img: img, title: title, price: Number(price), typeoFProduct: typeoFProduct, quantity: quantity })
  localStorage.setItem('productData', JSON.stringify(addnewProduct))
  basketCount.textContent = JSON.parse(localStorage.getItem('productData')).length
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

const sliderImages = document.querySelectorAll('.imagenavigation')
const sliderElement = document.querySelector('.slider')
let currentSliden = 0

function changeSlide(direction) {
  if (direction === -1) {
    if (currentSlide === 0) {
      return
    }
    currentSlide--
  } else {
    if (currentSlide === sliderImages.length - 1) {
      currentSlide = 0
    } else {
      currentSlide++
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
