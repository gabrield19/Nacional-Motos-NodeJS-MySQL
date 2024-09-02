const carritoIcon = document.querySelector("#carrito-icon");
const carrito = document.querySelector(".carrito");
const closecarrito = document.querySelector("#carrito-close");

carritoIcon.addEventListener("click", () => {
    carrito.classList.add("activate");
});

closecarrito.addEventListener("click", () => {
    carrito.classList.remove("activate");
});

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", start);
}
else {
    start();
}

function start() {
    addEvents();
}

function update() {

    addEvents();
    updateTotal();
}

function addEvents() {

    let carritoRemove_btns = document.querySelectorAll(".carrito-remove");
    console.log(carritoRemove_btns);

    carritoRemove_btns.forEach((btn) => {
        btn.addEventListener("click", handle_removecarritoItem);

    });

    let carritoQuantity_inputs = document.querySelectorAll(".carrito-quantity");

    carritoQuantity_inputs.forEach((input) => {
        input.addEventListener("change", handle_changeItemQuantity);

    });

    let carritoadd_btns = document.querySelectorAll(".carrito-add");

    carritoadd_btns.forEach((btn) => {
        btn.addEventListener("click", handle_carritoaddItem);
    });

}

const buy_btn = document.querySelector(".btn-buy");
buy_btn.addEventListener("click", handle_buybtn);

let itemsadded = [];

function handle_carritoaddItem() {

    let product = this.parentElement;
    let title = product.querySelector(".producto-title").innerHTML;
    let price = product.querySelector(".producto-price").innerHTML;
    let imgSrc = product.querySelector(".producto-img").src;

    console.log(title, price, imgSrc);


    let newtoadd = {
        title,
        price,
        imgSrc
    };

    if (itemsadded.find((el) => el.title == newtoadd.title)) {
        alert("Este artículo ya existe");
        return;
    }
    else {
        itemsadded.push(newtoadd);

    }

    let carritoBoxElement = carritoboxComponent(title, price, imgSrc);
    let newnode = document.createElement("div");
    newnode.innerHTML = carritoBoxElement;
    const carritoContent = carrito.querySelector(".carrito-content");
    carritoContent.appendChild(newnode);
    update();
};

function handle_removecarritoItem() {
    const itemElement = this.parentElement;
    // By using the trim() method, we ensured that both the item title from the DOM and the titles in the itemsadded array had no extra spaces, making the comparison accurate.
    const itemTitle = itemElement.querySelector(".carrito-producto-title").innerHTML.trim();

    // Remove the item from the DOM
    itemElement.remove();

    // Update the itemsadded array
    itemsadded = itemsadded.filter(el => el.title.trim() !== itemTitle);

    // Update the cart
    update();
}


function handle_changeItemQuantity() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    this.value = Math.floor(this.value);

    update();
}

function handle_buybtn() {
    if (itemsadded.length <= 0) {
        alert("No hay algún pedido para realizar \nEscoga un producto primero");
        return;
    }

    const carritoContent = carrito.querySelector(".carrito-content");
    carritoContent.innerHTML = "";
    alert("Su pedido se realizó con exito :)");
    itemsadded = [];
    update();
}

function updateTotal() {
    let carritoBoxes = document.querySelectorAll(".carrito-box");
    const totalElement = document.querySelector(".total-price");
    let total = 0;

    carritoBoxes.forEach((carritobox) => {
        let priceElement = carritobox.querySelector(".carrito-price");
        let price = parseFloat(priceElement.innerHTML.replace(/[^0-9-]+/g, "")); // Remove non-numeric characters
        let quantity = carritobox.querySelector(".carrito-quantity").value;

        total += price * quantity;
    });
    console.log(total);
    total = parseFloat(total).toFixed(2); // Ensure total is a number before formatting
   
    const formatter = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
    });

    totalElement.innerHTML = formatter.format(total);
}


function carritoboxComponent(title, price, imgSrc) {
    
   
    
    return `
    <div class="carrito-box">
        <img src=${imgSrc} alt="" class="carrito-img"></img>

        <div class ="detail-box">

<div class="carrito-producto-title"> ${title}</div>

<div class="carrito-price"> ${price}</div>
<input type="number" value="1" class="carrito-quantity">

        </div>      

<object data="./assets/images/trash-alt-regular-24.png" type="image/png" class="carrito-remove"></object>

    </div>
`
}
