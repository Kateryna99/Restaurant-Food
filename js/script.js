function smoothSectionOpen() {
    document.addEventListener('DOMContentLoaded', () => {
        const linkCollection = document.querySelectorAll(`[href*='#']`)

        for (let item of linkCollection) {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                if (item.hash.length) {
                    const block = document.querySelector(item.hash)

                    block.scrollIntoView({behavior: 'smooth'})
                }
            })
        }
    })
}

smoothSectionOpen()

//////////////////////////////
const header = document.querySelector('.header')
const burger = header.querySelector('.burger')
const navMenu = header.querySelector('.nav-menu')
const closeIcon = navMenu.querySelector('.nav-menu__icon')
const menuLinks = navMenu.querySelectorAll('.nav-menu__link')

const openMenu = () => {
    burger.addEventListener('click', () => {
        navMenu.classList.add('nav-menu--active')
    })
}
openMenu()
const closeMenu = () => {
    closeIcon.addEventListener('click', () => {
        navMenu.classList.remove('nav-menu--active')
    })

    for (let item of menuLinks) {
        item.addEventListener('click', () => {
            navMenu.classList.remove('nav-menu--active')
        })
    }
}
closeMenu()

const headerAction = () => {
    window.addEventListener('scroll', () => {
        window.scrollY > 200 ? header.classList.add('header--active') : header.classList.remove('header--active')
    })
}
headerAction()


///////////////

const menuSwiper = new Swiper(".menu-swiper", {
    direction: 'horizontal',
    slidesPerView: 1,
    mousewheel: true,
    loop: false,
    grid: {
        rows: 1,
        fill: 'row',
    },

    breakpoints: {

        650: {
            slidesPerView: 2,
            spaceBetween: 20,

        },

        950: {
            mousewheel: false,
            spaceBetween: 60,
            grid: {
                rows: 2,
            }
        }

    }

});


const advantagesSwiper = new Swiper('.advantages-swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    slidesPerView: 1,
    spaceBetween: 60,
    mousewheel: true,


    breakpoints: {
        991: {
            slidesPerView: 2,
        },
        1124: {
            slidesPerView: 3,
            mousewheel: false,
        }
    }

});

const articlesSwiper = new Swiper('.articles-swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    slidesPerView: 1,
    spaceBetween: 60,
    mousewheel: true,
    centeredSlides: true,

    breakpoints: {
        1024: {
            slidesPerView: 2,
            mousewheel: false,
            centeredSlides: false,
        }
    }
});


const calorieSwiper = new Swiper('.calorie-swiper', {
    direction: 'horizontal',
    loop: false,
    slidesPerView: 1,
    mousewheel: true,
    spaceBetween: 30,

    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1100: {
            slidesPerView: 3,
            spaceBetween: 60,
            mousewheel: false,
        }
    }
});
/////////////

const reservationForm = document.querySelector('.reservation-form')
const popUpReservation = document.querySelector('.pop-up--reservation')
const popUpFeedback = document.querySelector('.pop-up--feedback')
const dateInput = document.getElementById('date')
dateInput.min = new Date().toLocaleDateString('en-CA')


function selectAction() {
    const selectCollection = document.getElementsByClassName('reservation-form__custom-select')

    const selectCollectionLength = selectCollection.length

    for (let i = 0; i < selectCollectionLength; i++) {
        const selectEl = selectCollection[i].getElementsByTagName('select')[0]
        const selectElLength = selectEl.length


        const selectedItem = document.createElement('div')
        selectedItem.classList.add('reservation-form__select-selected')
        selectedItem.innerHTML = selectEl.options[selectEl.selectedIndex].innerHTML
        selectCollection[i].appendChild(selectedItem)

        const optionList = document.createElement('ul')
        optionList.classList.add('reservation-form__select-list','reservation-form__select-hide')

        for (let j = 1; j < selectElLength; j++) {
            const optionItem = document.createElement('li')
            optionItem.innerHTML = selectEl.options[j].innerHTML
            optionItem.addEventListener('click', function(event){
                const parentLength = selectEl.length
                const prevEl = this.parentNode.previousSibling

                for (let i = 0; i < parentLength; i++) {
                    if (selectEl.options[i].innerHTML === this.innerHTML) {
                        selectEl.selectedIndex = i
                        prevEl.innerHTML = this.innerHTML
                        const selectedItem = this.parentNode.getElementsByClassName('reservation-form__same-as-selected')
                        const selectedItemLength = selectedItem.length
                        for (let k = 0; k < selectedItemLength; k++) {
                            selectedItem[k].removeAttribute('class')
                        }
                        this.classList.add('reservation-form__same-as-selected')
                        break;
                    }
                }
                prevEl.click()
            })
            optionList.append(optionItem)
        }
        selectCollection[i].append(optionList)

        selectedItem.addEventListener('click', function(e){
            e.stopPropagation()
            closeAllSelect(this)
            optionList.classList.toggle("reservation-form__select-hide")
            selectedItem.classList.toggle('reservation-form__select-selected--active')
        })
    }
}

function closeAllSelect(element) {
    const arrNo = []
    const selectItemsCollection = document.getElementsByClassName('reservation-form__select-list')
    const selectedBlock = document.getElementsByClassName('reservation-form__select-selected')

    for (let i = 0; i < selectedBlock.length; i++) {
        if (element === selectedBlock[i])
            arrNo.push(i)
        else selectedBlock[i].classList.remove('reservation-form-select-selected--active')
    }
    for (let i = 0; i < selectItemsCollection.length; i++) {
        if (arrNo.indexOf(i))
            selectItemsCollection[i].classList.add('select-hide')
    }
}

selectAction()

function startReservationPopUp() {
    reservationForm.addEventListener('submit',(event)=>{
        event.preventDefault()
        popUpReservation.classList.add('pop-up--reservation--active')
    })
    closePopUpOnClick(popUpReservation,'pop-up--reservation--active')
    startFeedbackPopup(popUpReservation)

}
startReservationPopUp()
function startFeedbackPopup(formItem) {
    formItem.addEventListener('submit',(event)=>{
        event.preventDefault()
        if(formItem.classList.contains('pop-up--reservation--active'))
            formItem.classList.remove('pop-up--reservation--active')

        popUpFeedback.classList.add('pop-up--feedback--active')


        setTimeout(()=>{
            popUpFeedback.classList.remove('pop-up--feedback--active')
        },2000)

        closePopUpOnClick(popUpFeedback,'pop-up--feedback--active')

    })

}

function closePopUpOnClick(popUpItem, popUpClass) {
    document.addEventListener('click',(event)=>{
        const currentItem = event.target
        if(currentItem.classList.contains('pop-up'))
            popUpItem.classList.remove(popUpClass)
    })
}


///////////Review
const reviewPrevIcon = document.querySelectorAll('.review-counter__icon--prev')
const reviewNextIcon = document.querySelectorAll('.review-counter__icon--next')
const reviewBlockCollection = document.querySelectorAll('.review-card')

function reviewBlockAction(elements) {
    for (let item of elements){
        item.addEventListener('click',(event)=>{
            const currentIcon = event.target
            const data = currentIcon.getAttribute('data-block')
            const currentBlock = document.getElementById(data)
            for (let item of reviewBlockCollection){
                item.classList.remove('review-card--active')
            }
            currentBlock.classList.add('review-card--active')
        })
    }
}
reviewBlockAction(reviewPrevIcon)
reviewBlockAction(reviewNextIcon)


/////Footer
const footerForm = document.querySelector('.footer-form')
startFeedbackPopup(footerForm)

////////POPUP

function checkInputValidity() {

    document.addEventListener('DOMContentLoaded', () => {
        const numberInput = document.getElementById('pop-up-phone')
        const nameInput = document.getElementById('pop-up-name')
        const phoneMask = {
            mask: '+46 000 000 000'
        }
        IMask(numberInput, phoneMask)

        nameInput.addEventListener('input', () => {
            nameInput.value = nameInput.value.replace(/\d+/, '')
        })
    })
}

checkInputValidity()





