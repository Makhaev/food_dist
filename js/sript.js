window.addEventListener("DOMContentLoaded",()=>{
const tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent=document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');

      function hideTabContent (){
        tabsContent.forEach((item)=>{
            item.style.display='none'
        })
        tabs.forEach((item)=>{
            item.classList.remove('tabheader__item_active')
        })
      }

      function showTab(i=0){
        tabsContent[i].style.display='block';
        tabs[i].classList.add('tabheader__item_active')
      }
      hideTabContent()
      showTab()

      tabsParent.addEventListener('click',(event)=>{
        const target = event.target;
        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item,i)=>{
                if(target==item){
                    hideTabContent()
                    showTab(i)  
                }
            })
        }
      })
    
   
        // Timer

        const didlane = "2023-09-11";
        function getTime(endTime){
            let days,hours,minutes,seconds;
            const t = Date.parse(endTime) - Date.parse(new Date());
            if(t<=0){
                days = 0;
                hours = 0;
                minutes = 0;
                seconds = 0;
            }else{
                days = Math.floor(t/(1000*60*60*24)),
                hours = Math.floor((t/(1000*60*60)%24)),
                minutes = Math.floor((t/(1000*60*60)%60)),
                seconds = Math.floor((t/1000)%60);
                
            }

                  return{
                    'total': t,
                    'days': days,
                    'hours': hours,
                    'minutes': minutes,
                    'seconds': seconds

                  }
        }

        function getZero(num){
            if(num >=0 && num<10){
                return `0${num}`
            }else{
                return num;
            }
        }




        function setClock(selector,endTime){
            const timer = document.querySelector(selector),
                  days=timer.querySelector('#days'),
                  hours=timer.querySelector('#hours'),
                  minutes=timer.querySelector('#minutes'),
                  seconds=timer.querySelector('#seconds'),
                  timeInterval = setInterval(upDateClock,1000);

                  upDateClock()

            
             function upDateClock(){
                const t = getTime(endTime);

                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML =getZero(t.seconds);

                if(t.total <=0){
                    clearInterval(timeInterval)
                }
                
             }
        }
       
        setClock('.timer',didlane)

        // modal

        const modalTrigger = document.querySelectorAll('[data-modal]');
        const modal = document.querySelector('.modal');
        const modalCloseBtn = document.querySelector('[data-close]');

        
        function openModal(){
            modal.classList.add('show');
            modal.classList.remove('hide')
            document.body.style.overflow ='hidden'
            clearInterval(openMod)
        }
        

        modalTrigger.forEach(btn=>{
            btn.addEventListener('click',openModal)
        })



        function modalClose(){
            modal.classList.add('hide');
            modal.classList.remove('show')
            document.body.style.overflow =''
        }
        

        modalCloseBtn.addEventListener('click',modalClose)


        modal.addEventListener('click',(e)=>{
            if(e.target===modal){
             modalClose()

            }
        })

        document.addEventListener('keydown',(e)=>{
            if(e.code==='Escape'&& modal.classList.contains('show')){
                modalClose()  
            }
        })



        // const openMod = setTimeout(openModal,10000);

       function showOpenModal(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1){
            openModal()
            removeEventListener('scroll',showOpenModal)
         }

       }

        window.addEventListener('scroll',showOpenModal)


    //   используем классы
      class MenuCard{
        constructor(src,alt,title,descr,prise,parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.prise=prise;
            this.classes = classes;
            this.parent=document.querySelector(parentSelector)
            this.transfer = 27;
            this.changeTouan();

        }
        changeTouan(){
            this.prise = this.prise * this.transfer
        }
        render(){
            const element = document.createElement('div');
            if(this.classes.length === 0){
                this.element = 'menu__item';
                element.classList.add(this.element)
            }else{
                this.classes.forEach(className=> element.classList.add(className));
            }
            element.innerHTML = `
          
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.prise}</span>грн/день</div>
            </div>
       
            `;

            this.parent.append(element)
        }


      }

      new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        

      ).render()
      
      new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
         11,
        '.menu .container',
        

      ).render()
      
      new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        34,
        '.menu .container',
      

      ).render();

      const forms = document.querySelectorAll('form');
      const message = {
        loading: 'Загрузка',
        success: 'Спасибо!скоро мы c вами свяжемся',
        failure:'Что-то пошло не так'
      }

      forms.forEach(item=>{
        postData(item)
      })

      function postData(form){
        form.addEventListener('submit', (e)=>{
            e.preventDefault();
            
           const statusMessage =document.createElement('div');
           statusMessage.classList.add('status')
           statusMessage.textContent = message.loading
           form.append(statusMessage)
          
           const request = new XMLHttpRequest();
           request.open('POST', 'server.php');
           request.setRequestHeader('Content-type', 'multipart/form-data');

           const formData= new FormData(form)
           request.send(formData)
           
           request.addEventListener('load',()=>{
            if(request.status===200){
                console.log(request.response)
                statusMessage.textContent = message.success
            }else{
                statusMessage.textContent = message.failure
            }
           


           })
        })
      }

         


        
})


