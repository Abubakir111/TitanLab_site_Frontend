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
const reviewBlockBtns = document.querySelectorAll('.review__more_btn')

if (!localStorage.getItem('productData')) localStorage.setItem('productData', JSON.stringify([]))
else basketCount.textContent = JSON.parse(localStorage.getItem('productData')).length

const swiperBanner = new Swiper('.swiper_baner', {
  slidesPerView: 1,
  spaceBetween: 10,
  direction: 'horizontal',
  loop: false,
  navigation: {
    nextEl: '#nextslide_baner',
    prevEl: '#prevslide_baner'
  }
})

const fetchData = async () => {
  try {
    const response = await fetch('./dataProduct/dataProduct.json')
    const { eSigs, chewingGum, iqos, sticks } = await response.json()
    const eSigsBlock = document.querySelector('#eSigs')
    const chewingGumBlock = document.querySelector('#chewingGum')
    const iqosBlock = document.querySelector('#iqos')
    const sticksBlock = document.querySelector('#sticks')

    const HTMLTemplate = (idElement, data) => {
      for (let product of data) {
        const new_test = JSON.stringify(product)
        idElement.innerHTML += ` 
      <div class="swiper-slide">
        <div class="product-contaianer-wrapp">
          <div class="product-contaianer">
            <div class="product-block">
              <div class="product-block-img-container">
                <img class="product-block-img" src="${product.img}" alt="Product 1" />
                <p class="product-title">${product.title}</p>
              </div>
              <button
                class="product-btn"
                data-test = '${new_test}'
             
              >
                Подробнее
              </button>
            </div>
          </div>
        </div>
      </div> `
      }
    }
    const swiperDefultSetting = {
      slidesPerView: 4,
      spaceBetween: 35,
      direction: 'horizontal',
      loop: true,
      watchOverflow: false
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
        slidesPerView: 2,
        spaceBetween: 10
      },
      1000: {
        slidesPerView: 3,
        spaceBetween: 35
      },
      1290: {
        slidesPerView: 4,
        spaceBetween: 35
      }
    }
    const swiperESigsBlock = new Swiper('.eSigsBlock', {
      ...swiperDefultSetting,
      navigation: {
        nextEl: '#eSigsBlocknextBtn'
      },
      breakpoints: swiperBreakpoits
    })
    const swiperChewingGumBlcok = new Swiper('.chewingGumBlcok', {
      ...swiperDefultSetting,
      navigation: {
        nextEl: '#chewingGumnexBtn'
      },
      breakpoints: swiperBreakpoits
    })
    const swiperIqosBlock = new Swiper('.iqosBlock', {
      ...swiperDefultSetting,
      navigation: {
        nextEl: '#iqosBlocknexBtn'
      },
      breakpoints: swiperBreakpoits
    })
    const swiperSticksBlock = new Swiper('.sticksBlock', {
      ...swiperDefultSetting,
      navigation: {
        nextEl: '#sticksBlocknexBtn'
      },
      breakpoints: swiperBreakpoits
    })
    const reviewsSwiper = new Swiper('.reviews', {
      slidesPerView: 3,
      spaceBetween: 31,
      direction: 'horizontal',
      // loop: true,
      navigation: {
        nextEl: '#nextReview',
        prevEl: '#prevReview'
      },
      watchOverflow: false,
      breakpoints: {
        350: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        500: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        780: {
          slidesPerView: 2,
          spaceBetween: 35
        },
        1000: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      },
      on: {
        slideChange: function () {
          if (reviewsSwiper.isBeginning) {
            reviewsSwiper.navigation.prevEl[0].style.display = 'none'
            reviewsSwiper.navigation.nextEl[0].style.display = 'block'
          }
          if (reviewsSwiper.isEnd) {
            reviewsSwiper.navigation.prevEl[0].style.display = 'block'
            reviewsSwiper.navigation.nextEl[0].style.display = 'none'
          }
        }
      }
    })
    HTMLTemplate(eSigsBlock, eSigs)
    HTMLTemplate(chewingGumBlock, chewingGum)
    HTMLTemplate(iqosBlock, iqos)
    HTMLTemplate(sticksBlock, sticks)

    const test_product_data = document.querySelectorAll('.product-btn')
    console.log(test_product_data)
    test_product_data.forEach((el) => {
      el.addEventListener('click', (e) => {
        mainUnitContainer.style.display = 'none'
        productMainWrapp.style.display = 'flex'
        const newproduct = e.target.getAttribute('data-test')
        const Testproduct = JSON.parse(newproduct)
        console.log(Testproduct)
        const { img, moreDetails, productOptionImage, title, typeOfProduct, price } = Testproduct
        productMain.innerHTML = `
       <div class="product__img_container">
        <img src="${img}" alt="product" class="product__img" />
        <div class="product__img_menu-container">
          ${productOptionImage.map((item) => `<img src='${item}' alt='product' class='product__img_manu' />`).join('')}
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
                       ${typeOfProduct
                         .map((item) => `<option value='${item.type}' id ="${item.id}">${item.type}</option>`)
                         .join('')}
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
        <div class="product__description_container">${moreDetails}</div>
        <div class="product__price_contianer">
          <div class="product__price_container">${price} <span>&#8381;</span></div>
          <button type="button" class="product__add-basket_btn" id = "product__add-basket_btn"onclick="addbasketProductStorage('${img}','${title}','${price}')">Добавить в корзину</button>
        </div>
      </div>
`
      })
    })

    return { eSigs, chewingGum, iqos, sticks }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

fetchData()

let moreButtonState = false
reviewBlockBtns.forEach((moreBtn) => {
  moreBtn.addEventListener('click', () => {
    moreButtonState = !moreButtonState
    if (moreButtonState) {
      moreBtn.parentNode.querySelector('.text').style.height = 'max-content'
      moreBtn.textContent = 'свернуть'
    } else {
      if (outerWidth > 500) {
        moreBtn.parentNode.querySelector('.text').style.height = '170px'
      } else if (outerWidth < 500) {
        moreBtn.parentNode.querySelector('.text').style.height = '94px'
      }
      moreBtn.textContent = 'подробнее...'
    }
  })
})

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
  // console.log(storageProduct)
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
                           <h3>${item.title} <p class ="basket__title_view">${item.typeOFProduct}</p></h3>
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
  basketProductHtml(basketModlContent, basketProducts)
}
const closeBasker = () => (basketModl.style.display = 'none')
const deletProductStorage = (id) => {
  const ProductsStorage = JSON.parse(localStorage.getItem('productData'))
  const newProductStorage = ProductsStorage.filter((elem, index) => index !== id)
  localStorage.setItem('productData', JSON.stringify(newProductStorage))
  basketProductHtml(basketModlContent, newProductStorage)
  basketCount.textContent = newProductStorage.length
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

const addbasketProductStorage = (img, title, price) => {
  const typeoFProduct = document.getElementById('product__options')
  const quantity = Number(document.getElementById('product_input').value)
  const typeID = typeoFProduct.options[typeoFProduct.selectedIndex].id
  const typeValue = typeoFProduct.value
  console.log(quantity)
  addnewProduct = JSON.parse(localStorage.getItem('productData'))
  let newQuantity = 0
  if (quantity == 0) {
    newQuantity = 1
    document.getElementById('product_input').value = newQuantity
  } else newQuantity = quantity
  if (addnewProduct.length == 0) {
    addnewProduct.push({
      img: img,
      title: title,
      quantity: newQuantity,
      typeID: Number(typeID),
      typeOFProduct: typeValue,
      price: Number(price)
    })
    localStorage.setItem('productData', JSON.stringify(addnewProduct))
  } else {
    addnewProduct = addnewProduct.map((item) => {
      if (item.title === title && item.typeID === Number(typeID)) {
        ;(item.quantity = item.quantity + newQuantity), (item.price = item.price + Number(price))
        return item
      } else return item
    })
    let isFound = addnewProduct.some((item) => item.title === title && item.typeID === Number(typeID))
    if (!isFound) {
      addnewProduct.push({
        img: img,
        title: title,
        quantity: newQuantity,
        typeID: Number(typeID),
        typeOFProduct: typeValue,
        price: Number(price)
      })
    }
    localStorage.setItem('productData', JSON.stringify(addnewProduct))
  }
  basketProductHtml(basketModlContent, addnewProduct)
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
