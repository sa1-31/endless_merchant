const products = [
  {id:1,name:"Endless Sweatshirt",priceEDS:300,img:"images/endless-sweatshirt.png"},
  {id:2,name:"Endless Beanie",priceEDS:150,img:"images/endless-beanie.png"},
  {id:3,name:"Endless Jacket",priceEDS:500,img:"images/endless-jacket.png"},
  {id:4,name:"Endless Watch",priceEDS:800,img:"images/endless-watch.png"},
  {id:5,name:"Nessy Sweatshirt",priceEDS:350,img:"images/nessy-sweatshirt.png"},
  {id:6,name:"Nessy Beanie",priceEDS:180,img:"images/nessy-beanie.png"},
  {id:7,name:"Nessy Jacket",priceEDS:520,img:"images/nessy-jacket.png"},
  {id:8,name:"Nessy Watch",priceEDS:820,img:"images/nessy-watch.png"}
];

let cart = [];
let orders = [];
let wallet = null;

function showView(view){
  ['products','cart','orders'].forEach(v=>{
    document.getElementById(v+'View').classList.add('hidden');
  });
  if(view==='products') renderProducts();
  if(view==='cart') renderCart();
  if(view==='orders') renderOrders();
}

function connectWallet(){
  wallet = '0xABCD1234EFGH';
  walletBtn.innerText = wallet.slice(0,6)+'...'+wallet.slice(-4);
}

function renderProducts(){
  const c = productsView;
  c.classList.remove('hidden');
  c.innerHTML='';
  products.forEach(p=>{
    c.innerHTML += `
      <div class="product-card">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p>${p.priceEDS} EDS</p>
        <button class="neon-button" onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

function updateCartCount(){
  const count = cart.length;
  const span = document.getElementById('cart-count');
  if(span) span.innerText = count;
}

function addToCart(id){
  const product = products.find(p=>p.id===id);
  cart.push(product);

  // Alert
  alert(product.name + ' added to cart!');

  // Cart count yenilə
  updateCartCount();
}

function updateCartCount(){
  const count = cart.length;
  document.getElementById('cart-count').innerText = count;
}
function groupItems(arr){
  const map = {};
  arr.forEach(i => map[i.id] = map[i.id] ? {...i, qty: map[i.id].qty+1} : {...i, qty:1});
  return Object.values(map);
}

function renderCart(){
  cartView.classList.remove('hidden');
  cartItems.innerHTML='';
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
  cartTotal.innerText = `Total: ${total} EDS`;
}

function openConfirm(){
  if(cart.length === 0){
    alert('Cart is empty');
    return;
  }

  const total = cart.reduce((a,b)=>a+b.priceEDS,0);
  confirmAmount.innerText = `You will pay ${total} EDS`;
  confirmModal.classList.add('active');
}

function closeConfirm(){
  confirmModal.classList.remove('active');
}

function confirmOrder(){
  orders.push(groupItems(cart));  // order
  cart = [];                       // cart
  updateCartCount();               //uray
  closeConfirm();                  // mo
  showView('orders');              // o
}
  cart = [];
  closeConfirm();
  showView('orders');
}

function renderOrders(){
  ordersView.classList.remove('hidden');
  ordersList.innerHTML='';

  orders.forEach(order=>{
    order.items.forEach(i=>{
      ordersList.innerHTML += `
        <div class="order-item">
          <div class="item-left">
            <img src="${i.img}">
            <div>
              <div>${i.name} ×${i.qty}</div>
              <small style="opacity:.6">${order.status}</small>
            </div>
          </div>
        </div>
      `;
    });
  });
}

showView('products');
