
let cartItems = []
function onLoad() {
    let cartItemsStr = localStorage.getItem('localCartItems')
    cartItems = cartItemsStr ? JSON.parse(cartItemsStr) : []
    displayItems()
    showNoOfItems()
}
onLoad()

function addToCart(itemId) {
    cartItems.push(itemId)
    localStorage.setItem('localCartItems' , JSON.stringify(cartItems))
    showNoOfItems()
}

function showNoOfItems() {
    let count = document.querySelector(".noOfItems")
    if (cartItems.length > 0) {
        count.style.display = "flex"
        count.innerHTML = `<span> ${cartItems.length} </span>`
    } else {
        count.style.display = "none"
    }
}

function displayItems() {
    let itemContainer = document.querySelector(".item-container")
    if (!itemContainer) {
        return;
    }
    let innerhtml = '';
    products.forEach((element) => {
        innerhtml += `<div class="item-card">
               <img draggable = "false" src="${element.image}" alt=" Product"> 
                <h3 class="company-name">${element.company}</h3>
                <h3 class="productName">${element.item_name}</h3>
               <p class="rating">${element.rating.stars} ⭐|| ${element.rating.count} </p>
               <h3 class="price">Rs. ${element.current_price} <span> Rs. ${element.original_price} </span> <span  class="discount">(${element.discount_percentage}%) </span> </h3>
               <button class="btn" onClick="addToCart(${element.id})">Add to cart</button>
          </div>`
    })
itemContainer.innerHTML = innerhtml
}

let bagItemsObject;
let html = '';

onload()

function onload() {
    loadBagItemsObject()
    displayBagItems()
}
function loadBagItemsObject() {
    bagItemsObject = cartItems.map((itemId) => {
        for (let i = 0; i < products.length; i++) {
            if (itemId == products[i].id) {
                return products[i]
            }
        }
    })
    console.log(bagItemsObject);
}


function displayBagItems() {
    let container = document.querySelector(".left")
    bagItemsObject.forEach((element) => { 
        html += `
        <div class="card">
        <div onClick = "deleteItem(${element.id})" class="delete"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#11111"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></div>
            <img src="${element.image}" alt="image">  
            <div class="contents">
              <h1 id="companyName">${element.company}</h1>
              <h2> ${element.item_name}</h2>
              <h3>Rs. ${element.current_price} &nbsp; <span class="originalPrice">Rs${element.original_price}</span> <span class="discount">&nbsp;(${element.discount_percentage} %)</span></h3>
              <h4><b>${element.return_period}days</b> return Available</h4>
              <h5>Delivery by  <span>${element.delivery_date}</span></h5>
            </div>
            </div>`
    })
container.innerHTML = html
}
 function deleteItem(itemId) {
     cartItems = cartItems.filter(cartItemId => cartItemId != itemId)
     localStorage.setItem('localCartItems', JSON.stringify(cartItems))
     onload()
     location.reload()
     showNoOfItems()
 }
