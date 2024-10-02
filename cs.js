let notifyCard=document.querySelector('.notifyCard')
let ncTitle=document.querySelector('.notifyCard h1');
let removeSide=document.getElementById('removeSide')

let open=document.getElementById('open');

let All=document.getElementById('All');
let Modern=document.getElementById('Modern');
let Energy=document.getElementById('Energy');
let Limes=document.getElementById('Limes');
let Coke=document.getElementById('Coke');

let AllCount=document.querySelector('.AllCount');
let MCount=document.querySelector('.MCount');
let ECount=document.querySelector('.ECount');
let LCount=document.querySelector('.LCount');
let CCount=document.querySelector('.CCount');


let reset=document.getElementById('reset')
let itemsCase = document.querySelector('.itemsCase');
let sidedetails = document.querySelector('.sidedetails');
let allProductListBox = document.querySelector('.allProductListBox');
/* ------------------------------------ - ----------------------------------- */

removeSide.addEventListener('click',()=>{
  sidedetails.style.display='none'
})

console.log(removeSide)

open.addEventListener('click',()=>{
  sidedetails.style.display='block'
})
fetch('./wholeProducts.json')
  .then(response => response.json())
  .then(wholeProducts => {
    wholeProducts.forEach(product => {
/* ------------------------------------Items count----------------------------------- */
    let AllCountNumber=wholeProducts.length
    AllCount.textContent=AllCountNumber;

    const ModernC = wholeProducts.filter(item => item.code === "Modern").length;
    MCount.textContent=ModernC;
    const EnergyC = wholeProducts.filter(item => item.code === "Energy").length;
    ECount.textContent=EnergyC;
    const LimesC = wholeProducts.filter(item => item.code === "Limes").length;
    LCount.textContent=LimesC;
    const CokeC = wholeProducts.filter(item => item.code === "Coke").length;
    CCount.textContent=CokeC;
/* ------------------------------------Items count----------------------------------- */


      let newBox = document.createElement('div');
      newBox.classList.add('box');

      let texts = document.createElement('div');
      texts.classList.add('texts');

      let title = document.createElement('h1');
      title.classList.add('tCost');
      title.textContent = '$' + product.price;
      texts.appendChild(title);

      let addBtn = document.createElement('button');
      addBtn.classList.add('item-btn');
      addBtn.textContent = '+';
      texts.appendChild(addBtn);


      addBtn.addEventListener('click', () => {
      
        ncTitle.textContent=`Order ${product.menuTitle} added to Order Details`
        setTimeout(() => {
          notifyCard.style.display = 'block'; 
      
          
          setTimeout(() => {
              notifyCard.style.display = 'none'; 
          }, 4000); 
      },0);

        const existingProduct = allProductListBox.querySelector(`.sideProducts[data-title="${product.menuTitle}"]`);
     
        
        if (!existingProduct) {
          let sideProducts = document.createElement('div');
          sideProducts.classList.add('sideProducts');
          sideProducts.setAttribute('data-title', product.menuTitle);

          let sideItemImage=document.createElement('img');
          sideItemImage.classList.add('sideItemImage');
          sideItemImage.src = product.image;
          sideItemImage.alt = 'picimgx';

          let sideTextBox=document.createElement('div');
          sideTextBox.classList.add('sideTextBox');
          
          let sideProductTitle=document.createElement('h1');
          sideProductTitle.classList.add('sideProductTitle');
          sideProductTitle.textContent=product.menuTitle;
          
          let sideProductType=document.createElement('h1');
          sideProductType.classList.add('sideProductType');
          sideProductType.textContent='Type : '+product.code;
          
          let countBox=document.createElement('div');
          countBox.classList.add('countBox')
          
          
          let sideCost=document.createElement('h1');
          sideCost.classList.add('sideCost');
          sideCost.textContent='$'+(product.price);

          let counter=document.createElement('div');
          counter.classList.add('counter');
       
          let counterValue=1;
      
          
          let cUp=document.createElement('button');
          cUp.classList.add('cUp')
          cUp.textContent='+'

          let ctitle=document.createElement('h1');
          ctitle.classList.add('ctitle')
          ctitle.textContent=counterValue;

          let cDown=document.createElement('button');
          cDown.classList.add('cDown')
          cDown.textContent='-'

          cUp.addEventListener('click',()=>{
          counterValue++;
            ctitle.textContent = counterValue;
            sideCost.textContent='$'+(product.price*counterValue).toFixed(2);
           })
           cDown.addEventListener('click',()=>{
            if (counterValue > 1) { 
              counterValue--;
              ctitle.textContent = counterValue; 
              sideCost.textContent='$'+(product.price*counterValue).toFixed(2);
          }
           })
         
          counter.appendChild(cDown);
          counter.appendChild(ctitle);
          counter.appendChild(cUp);

          let cancelBtn=document.createElement('button');
          cancelBtn.classList.add('cancelBtn');
          cancelBtn.innerHTML = `<span class="material-symbols-outlined">delete</span>`;

          cancelBtn.addEventListener('click',()=>{
            sideProducts.remove(sidedetails)
          })

          reset.addEventListener('click',()=>{
            sideProducts.remove(sidedetails)
          })
/* -------------------------------------------------- */


          sideProducts.appendChild(sideItemImage);
          sideProducts.appendChild(sideTextBox)
          sideProducts.appendChild(cancelBtn)
          sideTextBox.appendChild(sideProductTitle)
          sideTextBox.appendChild(sideProductType)
          sideTextBox.appendChild(countBox)
          countBox.appendChild(sideCost)
          countBox.appendChild(counter)
          allProductListBox.appendChild(sideProducts);

            

      
        }else {
          alert(`The product "${product.menuTitle}" is already added to the sidebox.`);
        }
        
      });
   
      let nameTitle = document.createElement('h1');
      nameTitle.classList.add('nameTitle');
      nameTitle.textContent = product.menuTitle;

      let imageBox = document.createElement('div');
      imageBox.classList.add('imageBox');

      let inImg = document.createElement('img');
      inImg.classList.add('inImg');
      inImg.src = product.image;
      inImg.alt = 'picimg';

      let codeTitle = document.createElement('h1');
      codeTitle.classList.add('codeTitle');
      codeTitle.textContent = product.code;

      imageBox.appendChild(inImg);
      newBox.appendChild(imageBox);
      newBox.appendChild(nameTitle);
      newBox.appendChild(texts);
      newBox.appendChild(codeTitle);
      itemsCase.appendChild(newBox);
    });
    Coke.addEventListener('click',()=>{
      const items=wholeProducts.filter(item => item.code === "Coke");
      console.log(items)
    })
  })
  .catch(error => 
    alert('Error fetching the JSON data:', error)
  );

const filterItems=[All,Modern, Energy,Coke,Limes];
filterItems.map((i)=>{
  i.addEventListener('click', () => {
    filterProducts(`${i.id}`);
  });
  
})
  function filterProducts(filterCode) {
    const allBoxes = document.querySelectorAll('.box');
    
    allBoxes.forEach(box => {
      const productCode = box.querySelector('.codeTitle').textContent;
  
      if (filterCode === 'All' || productCode === filterCode) {
        box.style.display = 'block';
      } else {
        box.style.display = 'none';
      }
    });
  }

  
  
  
  
