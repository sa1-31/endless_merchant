// ✅ DOM elementləri
const productsView = document.getElementById('productsView');
const cartView = document.getElementById('cartView');
const ordersView = document.getElementById('ordersView');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const ordersList = document.getElementById('ordersList');

const confirmModal = document.getElementById('confirmModal');
const confirmAmount = document.getElementById('confirmAmount');
const walletBtn = document.getElementById('walletBtn');

// ✅ Products
const products = [
  {id:1,name:"Endless Sweatshirt",priceEDS:300,img:"./images/endless-sweatshirt.png"},
  {id:2,name:"Endless Beanie",priceEDS:150,img:"./images/endless-beanie.png"},
  {id:3,name:"Endless Jacket",priceEDS:500,img:"./images/endless-jacket.png"},
  {id:4,name:"Endless Watch",priceEDS:800,img:"./images/endless-watch.png"},
  {id:5,name:"Nessy Sweatshirt",priceEDS:350,img:"./images/nessy-sweatshirt.png"},
  {id:6,name:"Nessy Beanie",priceEDS:180,img:"./images/nessy-beanie.png"},
  {id:7,name:"Nessy Jacket",priceEDS:520,img:"./images/nessy-jacket.png"},
  {id:8,name:"Nessy Watch",priceEDS:820,img:"./images/nessy-watch.png"}
];

// ✅ State
let cart = [];
let orders = [];
let wallet = null;

// ------------------------- FUNCTIONS -------------------------

// Show view
function showView(view){
  ['products','cart','orders'].forEach(v=>{
    document.getElementById(v+'View').classList.add('hidden');
  });
  if(view==='products') renderProducts();
  if(view==='cart') renderCart();
  if(view==='orders') renderOrders();
}

// Connect wallet
function connectWallet(){
  wallet = '0xABCD1234EFGH';
  walletBtn.innerText = wallet.slice(0,6)+'...'+wallet.slice(-4);
}

// Render products
function renderProducts(){
  productsView.classList.remove('hidden');
  productsView.innerHTML = '';
  products.forEach(p=>{
    productsView.innerHTML += `
      <div class="product-card">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.priceEDS} EDS (~$${(p.priceEDS*0.01).toFixed(2)})</p>
        <button class="neon-button" onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

// Update cart count in navbar
function updateCartCount(){
  const count = cart.length;
  const span = document.getElementById('cart-count');
  if(span) span.innerText = count;
}

// Add to cart
function addToCart(id){
  const product = products.find(p=>p.id===id);
  cart.push(product);
  alert(product.name + ' added to cart!');
  updateCartCount();
}

// Group items with quantity
function groupItems(arr){
  const map = {};
  arr.forEach(i => map[i.id] = map[i.id] ? {...i, qty: map[i.id].qty+1} : {...i, qty:1});
  return Object.values(map);
}

// Render Cart
function renderCart(){
  cartView.classList.remove('hidden');
  cartItems.innerHTML = '';
  const grouped = groupItems(cart);
  grouped.forEach(i=>{
    cartItems.innerHTML += `
      <div class="cart-item">
        <div class="item-left">
          <img src="${i.img}">
          <span>${i.name} ×${i.qty}</span>
        </div>
        <span>${i.priceEDS * i.qty} EDS</span>
      </div>
    `;
  });
  const total = cart.reduce((a,b)=>a+b.priceEDS,0);
  cartTotal.innerText = `Total: ${total} EDS (~$${(total*0.01).toFixed(2)})`;
}

// Open confirm modal
function openConfirm(){
  if(cart.length === 0){
    alert('Cart is empty');
    return;
  }
  const total = cart.reduce((a,b)=>a+b.priceEDS,0);
  confirmAmount.innerText = `You will pay ${total} EDS (~$${(total*0.01).toFixed(2)})`;
  confirmModal.classList.add('active');
}

// Close confirm modal
function closeConfirm(){
  confirmModal.classList.remove('active');
}

// Confirm order
function confirmOrder(){
  orders.push(groupItems(cart));  // add order
  cart = [];                       // empty cart
  updateCartCount();               // update navbar
  closeConfirm();                  // close modal
  showView('orders');              // go to orders
}

// Render orders
function renderOrders(){
  ordersView.classList.remove('hidden');
  ordersList.innerHTML = '';
  orders.forEach(order=>{
    order.forEach(i=>{
      ordersList.innerHTML += `
        <div class="order-item">
          <div class="item-left">
            <img src="${i.img}">
            <div>
              <div>${i.name} ×${i.qty}</div>
            </div>
          </div>
        </div>
      `;
    });
  });
}

// ------------------------- INITIALIZE -------------------------
showView('products');
updateCartCount();
