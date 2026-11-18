const WHATSAPP_NUMBER = '2348039902723';

const BANK_DETAILS = {
  bankName: 'Opay',
  accountNumber: '8039902723',
  accountName: 'Zainab Adewumi Adewuyi'
};

const products = [
  {
    id: 1,
    name: 'Luxury Quilted Handbag',
    category: 'bags',
    categoryLabel: 'Bags',
    price: 10000,
    image: '/assets/images/Short Bags.jpg'
  },
  {
    id: 2,
    name: 'Luxury Tote Bag',
    category: 'bags',
    categoryLabel: 'Bags',
    price: 7000,
    image: '/assets/images/Tote Bag.jpg'
  },
  {
    id: 3,
    name: 'Handbag',
    category: 'bags',
    categoryLabel: 'Bags',
    price: 11000,
    image: '/assets/images/Small Bag.jpg'
  },
  {
    id: 4,
    name: 'Gold Buckle Luxury Heels',
    category: 'shoes',
    categoryLabel: 'Shoes & Heels',
    price: 11000,
    image: '/assets/images/Hills.jpg'
  },
  {
    id: 5,
    name: 'Basic Top',
    category: 'wears',
    categoryLabel: 'Wears',
    price: 7000,
    image: '/assets/images/Basic Top.jpg'
  },
  {
    id: 6,
    name: 'Slide',
    category: 'shoes',
    categoryLabel: 'Shoes & Heels',
    price: 7500,
    image: '/assets/images/Slide.jpg'
  },
  {
    id: 7,
    name: 'Slippers',
    category: 'shoes',
    categoryLabel: 'Shoes & Heels',
    price: 16500,
    image: '/assets/images/Chewgum Slippers.jpg'
  },
  {
    id: 8,
    name: 'Luxury Hijab',
    category: 'islamic',
    categoryLabel: 'Islamic Wears',
    price: 7000,
    image: '/assets/images/Hijab.jpg'
  },
  {
    id: 8,
    name: 'Luxury Jalamia',
    category: 'islamic',
    categoryLabel: 'Islamic Wears',
    price: 15000,
    image: '/assets/images/Jalamia.jpg'
  },
  {
    id: 8,
    name: 'Women Jalamia',
    category: 'islamic',
    categoryLabel: 'Islamic Wears',
    price: 15000,
    image: '/assets/images/Ladies Jalamia.jpg'
  },
  {
    id: 8,
    name: 'Luxury Abaya',
    category: 'islamic',
    categoryLabel: 'Islamic Wears',
    price: 35000,
    image: '/assets/images/Abaya.jpg'
  }
];

let cart = [];

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const productGrid = document.getElementById('productGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const overlay = document.getElementById('overlay');
const bagDrawer = document.getElementById('bagDrawer');
const openBagBtn = document.getElementById('openBagBtn');
const closeBagBtn = document.getElementById('closeBagBtn');
const bagItemsContainer = document.getElementById('bagItems');
const bagCount = document.getElementById('bagCount');
const bagTotal = document.getElementById('bagTotal');
const proceedCheckoutBtn = document.getElementById('proceedCheckoutBtn');
const checkoutModal = document.getElementById('checkoutModal');
const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
const checkoutForm = document.getElementById('checkoutForm');
const modalTotal = document.getElementById('modalTotal');
const copyAcctBtn = document.getElementById('copyAcctBtn');

document.getElementById('bankNameDisplay').textContent = BANK_DETAILS.bankName;
document.getElementById('acctNumberDisplay').textContent = BANK_DETAILS.accountNumber;
document.getElementById('acctNameDisplay').textContent = BANK_DETAILS.accountName;

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

function formatNaira(amount) {
  return '₦' + amount.toLocaleString('en-NG');
}

function renderProducts(filterCategory = 'all') {
  const filtered = filterCategory === 'all'
    ? products
    : products.filter(item => item.category === filterCategory);

  productGrid.innerHTML = filtered.map(product => {
    const waText = encodeURIComponent(
      `Hello Wumii Luxe! I would like to order:\n• ${product.name} (${formatNaira(product.price)})`
    );

    return `
      <div class="product-card">
        <div class="product-img-wrap">
          <span class="product-badge">${product.categoryLabel}</span>
          <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy" />
        </div>
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">${formatNaira(product.price)}</p>
          <div class="product-actions">
            <button class="btn-card-bag" onclick="addToBag(${product.id})">Add to Bag</button>
            <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${waText}" target="_blank" rel="noopener" class="btn-card-wa">
              Order on WhatsApp
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function addToBag(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateBagUI();
  openBag();
}

function changeQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }
  updateBagUI();
}

function removeFromBag(productId) {
  cart = cart.filter(i => i.id !== productId);
  updateBagUI();
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function updateBagUI() {
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalAmount = getCartTotal();

  bagCount.textContent = totalQty;
  bagTotal.textContent = formatNaira(totalAmount);
  modalTotal.textContent = formatNaira(totalAmount);
  proceedCheckoutBtn.disabled = cart.length === 0;

  if (cart.length === 0) {
    bagItemsContainer.innerHTML = '<p class="empty-bag">Your luxury bag is currently empty.</p>';
    return;
  }

  bagItemsContainer.innerHTML = cart.map(item => `
    <div class="bag-item">
      <img src="${item.image}" alt="${item.name}" />
      <div class="bag-item-details">
        <div class="bag-item-title">${item.name}</div>
        <div class="bag-item-price">${formatNaira(item.price * item.qty)}</div>
        <div class="qty-controls">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
          <button class="remove-item-btn" onclick="removeFromBag(${item.id})">Remove</button>
        </div>
      </div>
    </div>
  `).join('');
}

function openBag() {
  bagDrawer.classList.add('open');
  overlay.classList.add('active');
}

function closeAllModals() {
  bagDrawer.classList.remove('open');
  checkoutModal.classList.remove('open');
  overlay.classList.remove('active');
}

openBagBtn.addEventListener('click', openBag);
closeBagBtn.addEventListener('click', closeAllModals);
overlay.addEventListener('click', closeAllModals);

proceedCheckoutBtn.addEventListener('click', () => {
  bagDrawer.classList.remove('open');
  checkoutModal.classList.add('open');
});

closeCheckoutBtn.addEventListener('click', closeAllModals);

copyAcctBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(BANK_DETAILS.accountNumber);
  copyAcctBtn.textContent = 'Copied!';
  setTimeout(() => {
    copyAcctBtn.textContent = 'Copy';
  }, 2000);
});

checkoutForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const address = document.getElementById('custAddress').value.trim();

  const itemsList = cart
    .map(item => `• ${item.name} (x${item.qty}) - ${formatNaira(item.price * item.qty)}`)
    .join('\n');

  const message =
    `*NEW ORDER - WUMII LUXE*\n\n` +
    `*Customer:* ${name}\n` +
    `*Phone:* ${phone}\n` +
    `*Delivery Address:* ${address}\n\n` +
    `*Order Items:*\n${itemsList}\n\n` +
    `*Subtotal:* ${formatNaira(getCartTotal())}\n` +
    `*Payment Method:* Bank Transfer\n\n` +
    `I have made the transfer. Attaching my payment receipt now to confirm dispatch rider delivery!`;

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank', 'noopener');
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.category);
  });
});

renderProducts();
updateBagUI();

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});