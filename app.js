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
    inStock: true,
    colors: ['Black', 'Cream', 'Brown'],
    description: 'Structured quilted finish with polished gold-tone hardware and an adjustable strap for effortless day-to-evening elegance.',
    image: './assets/images/Short Bags.jpg'
  },
  {
    id: 2,
    name: 'Luxury Tote Bag',
    category: 'bags',
    categoryLabel: 'Bags',
    price: 7000,
    inStock: true,
    colors: ['Black', 'Tan', 'Cream'],
    description: 'Spacious, durable, and refined—designed to carry your daily essentials in timeless Wumii Luxe style.',
    image: './assets/images/Tote Bag.jpg'
  },
  {
    id: 3,
    name: 'Handbag',
    category: 'bags',
    categoryLabel: 'Bags',
    price: 11000,
    inStock: true,
    colors: ['Black', 'White', 'Nude'],
    description: 'Sleek top-handle silhouette crafted for occasions that demand a clean, elevated statement piece.',
    image: './assets/images/Small Bag.jpg'
  },
  {
    id: 4,
    name: 'Gold Buckle Luxury Heels',
    category: 'shoes',
    categoryLabel: 'Shoes & Heels',
    price: 11000,
    inStock: true,
    sizes: ['37', '38', '39', '40', '41', '42'],
    colors: ['Black', 'Nude', 'Gold'],
    description: 'Balanced mid-high heel accented with a signature gold buckle for all-day comfort and poised sophistication.',
    image: './assets/images/Hills.jpg'
  },
  {
    id: 5,
    name: 'Basic Top',
    category: 'wears',
    categoryLabel: 'Wears',
    price: 7000,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Beige'],
    description: 'Soft, breathable everyday essential tailored for a flattering fit on its own or layered under jackets.',
    image: './assets/images/Basic Top.jpg'
  },
  {
    id: 6,
    name: 'Slide',
    category: 'shoes',
    categoryLabel: 'Shoes & Heels',
    price: 7500,
    inStock: true,
    sizes: ['37', '38', '39', '40', '41', '42'],
    colors: ['Black', 'Brown', 'White'],
    description: 'Minimalist slip-on slide with cushioned sole support—built for effortless errands and casual luxury outings.',
    image: './assets/images/Slide.jpg'
  },
  {
    id: 7,
    name: 'Slippers',
    category: 'shoes',
    categoryLabel: 'Shoes & Heels',
    price: 16500,
    inStock: true,
    sizes: ['37', '38', '39', '40', '41', '42'],
    colors: ['Black', 'Nude', 'Brown'],
    description: 'Plush, statement-sole designer slippers combining high-fashion comfort with standout street appeal.',
    image: './assets/images/Chewgum Slippers.jpg'
  },
  {
    id: 8,
    name: 'Luxury Hijab',
    category: 'islamic',
    categoryLabel: 'Islamic Wears',
    price: 7000,
    inStock: true,
    colors: ['Black', 'Nude', 'Cream', 'Dusty Rose'],
    description: 'Lightweight, non-slip premium drape that stays neatly in place while offering breathable all-day modesty.',
    image: './assets/images/Hijab.jpg'
  },
  {
    id: 9,
    name: 'Luxury Jalamia',
    category: 'islamic',
    categoryLabel: 'Islamic Wears',
    price: 15000,
    inStock: true,
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy Blue', 'Olive'],
    description: 'Regal full-length jalamia crafted from rich, flowing fabric with subtle detailing for Jummah, Eid, and special gatherings.',
    image: './assets/images/Jalamia.jpg'
  },
  {
    id: 10,
    name: 'Women Jalamia',
    category: 'islamic',
    categoryLabel: 'Islamic Wears',
    price: 15000,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Brown', 'Champagne'],
    description: 'Gracefully tailored women’s jalamia offering relaxed elegance, fluid movement, and refined modest coverage.',
    image: './assets/images/Ladies Jalamia.jpg'
  },
  {
    id: 11,
    name: 'Luxury Abaya',
    category: 'islamic',
    categoryLabel: 'Islamic Wears',
    price: 35000,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Emerald', 'Champagne'],
    description: 'Signature couture-inspired abaya with opulent drape and bespoke finishing for unforgettable luxury occasions.',
    image: './assets/images/Abaya.jpg'
  }
];

let cart = [];
let activeCategory = 'all';
let searchQuery = '';
let activeQuickViewProduct = null;

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const productGrid = document.getElementById('productGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');
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

const quickViewModal = document.getElementById('quickViewModal');
const closeQuickViewBtn = document.getElementById('closeQuickViewBtn');
const qvCategory = document.getElementById('qvCategory');
const qvImage = document.getElementById('qvImage');
const qvName = document.getElementById('qvName');
const qvPrice = document.getElementById('qvPrice');
const qvDesc = document.getElementById('qvDesc');
const qvVariants = document.getElementById('qvVariants');
const qvAddBagBtn = document.getElementById('qvAddBagBtn');
const qvWhatsAppBtn = document.getElementById('qvWhatsAppBtn');

document.getElementById('bankNameDisplay').textContent = BANK_DETAILS.bankName;
document.getElementById('acctNumberDisplay').textContent = BANK_DETAILS.accountNumber;
document.getElementById('acctNameDisplay').textContent = BANK_DETAILS.accountName;

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

function formatNaira(amount) {
  return '₦' + amount.toLocaleString('en-NG');
}

function getSelectedVariantText(productId, prefix = '') {
  const sizeEl = document.getElementById(`${prefix}size-${productId}`);
  const colorEl = document.getElementById(`${prefix}color-${productId}`);
  const parts = [];
  if (sizeEl) parts.push(`Size: ${sizeEl.value}`);
  if (colorEl) parts.push(`Color: ${colorEl.value}`);
  return parts.join(', ');
}

function orderDirectWhatsApp(productId, prefix = '') {
  const product = products.find(p => p.id === productId);
  if (!product || product.inStock === false) return;

  const variantText = getSelectedVariantText(productId, prefix);
  const variantLabel = variantText ? ` [${variantText}]` : '';
  const waText = encodeURIComponent(
    `Hello Wumii Luxe! I would like to order:\n• ${product.name}${variantLabel} (${formatNaira(product.price)})`
  );
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`, '_blank', 'noopener');
}

function buildVariantControls(product, prefix = '') {
  if (product.inStock === false) return '';

  const hasSizes = Array.isArray(product.sizes) && product.sizes.length > 0;
  const hasColors = Array.isArray(product.colors) && product.colors.length > 0;

  if (!hasSizes && !hasColors) return '';

  return `<div class="product-variants">
    ${hasSizes ? `
      <select id="${prefix}size-${product.id}" class="variant-select" aria-label="Select Size">
        ${product.sizes.map(s => `<option value="${s}">Size: ${s}</option>`).join('')}
      </select>
    ` : ''}
    ${hasColors ? `
      <select id="${prefix}color-${product.id}" class="variant-select" aria-label="Select Color">
        ${product.colors.map(c => `<option value="${c}">${c}</option>`).join('')}
      </select>
    ` : ''}
  </div>`;
}

function openQuickView(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const available = product.inStock !== false;
  activeQuickViewProduct = product;
  qvCategory.textContent = product.categoryLabel;
  qvImage.src = product.image;
  qvImage.alt = product.name;
  qvName.textContent = product.name;
  qvPrice.textContent = available ? formatNaira(product.price) : `${formatNaira(product.price)} • Sold Out`;
  qvDesc.textContent = product.description || '';
  qvVariants.innerHTML = buildVariantControls(product, 'qv-');

  qvAddBagBtn.disabled = !available;
  qvWhatsAppBtn.disabled = !available;
  qvAddBagBtn.textContent = available ? 'Add to Bag' : 'Sold Out';

  if (available) {
    const cardSize = document.getElementById(`size-${product.id}`);
    const cardColor = document.getElementById(`color-${product.id}`);
    const qvSize = document.getElementById(`qv-size-${product.id}`);
    const qvColor = document.getElementById(`qv-color-${product.id}`);

    if (cardSize && qvSize) qvSize.value = cardSize.value;
    if (cardColor && qvColor) qvColor.value = cardColor.value;
  }

  quickViewModal.classList.add('open');
  overlay.classList.add('active');
}

qvAddBagBtn.addEventListener('click', () => {
  if (!activeQuickViewProduct || activeQuickViewProduct.inStock === false) return;
  addToBag(activeQuickViewProduct.id, 'qv-');
});

qvWhatsAppBtn.addEventListener('click', () => {
  if (!activeQuickViewProduct || activeQuickViewProduct.inStock === false) return;
  orderDirectWhatsApp(activeQuickViewProduct.id, 'qv-');
});

closeQuickViewBtn.addEventListener('click', closeAllModals);

function renderProducts() {
  const query = searchQuery.toLowerCase().trim();

  const filtered = products.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.categoryLabel.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    productGrid.innerHTML = `<p class="no-results">No items found matching "${searchQuery}". Try another keyword or select "All".</p>`;
    return;
  }

  productGrid.innerHTML = filtered.map(product => {
    const available = product.inStock !== false;

    return `
      <div class="product-card ${available ? '' : 'sold-out'}">
        <div class="product-img-wrap" onclick="openQuickView(${product.id})">
          <span class="product-badge">${product.categoryLabel}</span>
          ${available ? '' : '<span class="sold-out-badge">Sold Out</span>'}
          <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy" />
          <span class="quickview-hint">Quick View</span>
        </div>
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">${formatNaira(product.price)}</p>
          ${buildVariantControls(product)}
          <div class="product-actions">
            <button class="btn-card-bag" ${available ? '' : 'disabled'} onclick="addToBag(${product.id})">
              ${available ? 'Add to Bag' : 'Sold Out'}
            </button>
            <button type="button" class="btn-card-wa" ${available ? '' : 'disabled'} onclick="orderDirectWhatsApp(${product.id})">
              Order on WhatsApp
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function addToBag(productId, prefix = '') {
  const product = products.find(p => p.id === productId);
  if (!product || product.inStock === false) return;

  const variant = getSelectedVariantText(productId, prefix);
  const cartKey = `${product.id}-${variant}`;

  const existing = cart.find(item => item.cartKey === cartKey);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, variant, cartKey, qty: 1 });
  }

  quickViewModal.classList.remove('open');
  updateBagUI();
  openBag();
}

function changeQty(cartKey, delta) {
  const item = cart.find(i => i.cartKey === cartKey);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.cartKey !== cartKey);
  }
  updateBagUI();
}

function removeFromBag(cartKey) {
  cart = cart.filter(i => i.cartKey !== cartKey);
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
        ${item.variant ? `<div class="bag-item-variant">${item.variant}</div>` : ''}
        <div class="bag-item-price">${formatNaira(item.price * item.qty)}</div>
        <div class="qty-controls">
          <button class="qty-btn" onclick="changeQty('${item.cartKey}', -1)">-</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="changeQty('${item.cartKey}', 1)">+</button>
          <button class="remove-item-btn" onclick="removeFromBag('${item.cartKey}')">Remove</button>
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
  quickViewModal.classList.remove('open');
  overlay.classList.remove('active');
}

openBagBtn.addEventListener('click', openBag);
closeBagBtn.addEventListener('click', closeAllModals);
overlay.addEventListener('click', closeAllModals);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAllModals();
});

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
    .map(item => {
      const variantLabel = item.variant ? ` [${item.variant}]` : '';
      return `• ${item.name}${variantLabel} (x${item.qty}) - ${formatNaira(item.price * item.qty)}`;
    })
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

searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  clearSearchBtn.classList.toggle('visible', searchQuery.length > 0);
  renderProducts();
});

clearSearchBtn.addEventListener('click', () => {
  searchQuery = '';
  searchInput.value = '';
  clearSearchBtn.classList.remove('visible');
  renderProducts();
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.category;
    renderProducts();
  });
});

renderProducts();
updateBagUI();