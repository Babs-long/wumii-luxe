const WHATSAPP_NUMBER = '2348039902723';

const BANK_DETAILS = {
  bankName: 'GTBank (Update with her bank)',
  accountNumber: '0123456789',
  accountName: 'Wumii Luxe'
};

const products = [
  {
    id: 1,
    name: 'Luxury Quilted Handbag',
    category: 'bags',
    categoryLabel: 'Bags',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    name: 'Crystal Embellished Abaya',
    category: 'islamic',
    categoryLabel: 'Islamic Wears',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    name: 'Classic Tailored Blazer Set',
    category: 'wears',
    categoryLabel: 'Wears',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    name: 'Gold Buckle Luxury Heels',
    category: 'shoes',
    categoryLabel: 'Shoes & Heels',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 5,
    name: 'Royal Silk Jalamia',
    category: 'islamic',
    categoryLabel: 'Islamic Wears',
    price: 30000,
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 6,
    name: 'Structured Tan Tote Bag',
    category: 'bags',
    categoryLabel: 'Bags',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 7,
    name: 'Chic Gold-Trimmed Slides',
    category: 'shoes',
    categoryLabel: 'Shoes & Heels',
    price: 16500,
    image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 8,
    name: 'Premium Chiffon Scarf & Pin Set',
    category: 'islamic',
    categoryLabel: 'Islamic Wears',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=600&q=80'
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