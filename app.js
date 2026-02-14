// Initialize Data
DB.init();

// Constants & Config
const BUILDER_STEPS = [
    { id: 'profile', title: 'Usage Profile', message: 'What will you use your new beast for?' },
    { id: 'budget', title: 'Budget Preference', message: 'Performance is key, but budget is reality. Choose your path.' },
    { id: 'ram', category: 'ram', title: 'Select RAM', message: 'Analyzing the best memory for your build...' },
    { id: 'gpu', category: 'gpu', title: 'Select Graphics Card', message: 'Choosing the perfect visual powerhouse...' },
    { id: 'cpu', category: ['cpu-intel', 'cpu-amd'], title: 'Select Processor', message: 'The heart of your PC. Let\'s pick the brain...' },
    { id: 'ssd', category: 'internal-storage', title: 'Select Storage', message: 'Blazing fast speed or massive storage?' },
    { id: 'mobo', category: 'motherboard', title: 'Select Motherboard', message: 'Connecting everything together...' }
];

// State
let currentCategory = 'all';
let cart = DB.getCart() || [];
let wishlist = DB.getWishlist() || [];
let builderState = {
    step: 0,
    profile: '',
    budget: '',
    selections: {}
};

// DOM Elements
const productGrid = document.getElementById('product-grid');
const categoryList = document.getElementById('category-list');
const cartCount = document.getElementById('cart-count');
const wishlistCount = document.getElementById('wishlist-count');
window.wishlistModal = document.getElementById('wishlist-modal');
const wishlistItemsContainer = document.getElementById('wishlist-items-container');
window.cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotal = document.getElementById('cart-total');
window.detailsModal = document.getElementById('product-details-modal');
const detailsContent = document.getElementById('product-detail-content');
window.builderModal = document.getElementById('builder-modal');
const builderContent = document.getElementById('builder-wizard-content');

window.closeBuyNowModal = function () {
    const modal = document.getElementById('buy-now-modal');
    if (modal) modal.classList.remove('open');
};

// --- UTILS ---

function getCategoryName(id) {
    const cat = CATEGORIES.find(c => c.id === id);
    return cat ? cat.name : id;
}

// --- RENDER FUNCTIONS ---

function renderCategories() {
    if (!categoryList) return;
    categoryList.innerHTML = CATEGORIES.map(cat => `
        <li class="category-item ${cat.id === currentCategory ? 'active' : ''}" 
            onclick="setCategory('${cat.id}')">
            <i class="fas ${cat.icon}"></i> ${cat.name}
        </li>
    `).join('');
}

function renderProducts(products = null) {
    const data = products || DB.getProducts(currentCategory);
    if (!productGrid) return;

    productGrid.innerHTML = data.filter(p => p).map(product => {
        const inWishlist = wishlist && wishlist.some(item => item && item.id === product.id);

        return `
        <div class="product-card glass-panel" onclick="openProductDetails('${product.id}')">
            <button class="wishlist-btn ${inWishlist ? 'active' : ''}" onclick="event.stopPropagation(); toggleWishlist('${product.id}')">
                <i class="${inWishlist ? 'fas' : 'far'} fa-heart"></i>
            </button>
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image" 
                     onerror="this.src='https://via.placeholder.com/300x300/141a25/00D9FF?text=Smart+Tech+Hub'">
            </div>
            <div class="card-content">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-footer">
                    <div class="price">₹${product.price ? product.price.toLocaleString() : 'N/A'}</div>
                    <div style="display: flex;">
                        <button class="buy-btn" onclick="event.stopPropagation(); openBuyNow('${product.id}')" title="Buy Now Inquiry">
                            <i class="fas fa-bolt"></i>
                        </button>
                        <button class="add-btn" onclick="event.stopPropagation(); addToCart('${product.id}')">
                            <i class="fas fa-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `}).join('');

    if (data.length === 0) {
        productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No products found in this category.</p>';
    }
}

function renderCart() {
    if (!cartItemsContainer) return;
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: var(--text-muted); margin-top: 50px;">Your cart is empty</p>';
        if (cartTotal) cartTotal.textContent = '₹0';
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" class="cart-item-img" onerror="this.src='https://via.placeholder.com/70/141a25/00D9FF'">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">₹${(item.price || 0).toLocaleString()}</div>
                <div class="quantity-controls">
                    <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                    <span style="font-size: 14px; width: 20px; text-align: center;">${item.qty}</span>
                    <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                    <button class="qty-btn" onclick="removeFromCart('${item.id}')" style="margin-left: auto; border: none; color: #ff4757;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((acc, item) => acc + ((item.price || 0) * (item.qty || 0)), 0);
    if (cartTotal) cartTotal.textContent = '₹' + total.toLocaleString();
}

function renderWishlist() {
    if (!wishlistItemsContainer) return;
    if (wishlist.length === 0) {
        wishlistItemsContainer.innerHTML = '<p style="text-align: center; color: var(--text-muted); margin-top: 50px;">Your wishlist is empty</p>';
        return;
    }

    wishlistItemsContainer.innerHTML = wishlist.filter(item => item).map(item => `
        <div class="cart-item">
            <img src="${item.image}" class="cart-item-img" onerror="this.src='https://via.placeholder.com/70/141a25/00D9FF'">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">₹${(item.price || 0).toLocaleString()}</div>
                <button class="primary-btn" onclick="moveToCart('${item.id}')" style="margin-top: 10px; padding: 8px; font-size: 12px; width: auto;">
                    Move to Cart
                </button>
            </div>
            <button class="qty-btn" onclick="toggleWishlist('${item.id}')" style="border: none; color: #ff4757; height: auto; align-self: flex-start;">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

// --- BUILDER FUNCTIONS ---

window.openAIBuilder = function () {
    builderState = { step: 0, profile: '', budget: '', selections: {} };
    if (builderModal) builderModal.classList.add('open');
    renderBuilderStep();
};

window.renderBuilderStep = function () {
    const step = BUILDER_STEPS[builderState.step];
    if (!step) {
        renderBuilderReview();
        return;
    }

    let html = `
        <div class="builder-header">
            <i class="fas fa-wand-magic-sparkles" style="font-size: 40px; color: var(--primary); margin-bottom: 20px;"></i>
            <h2 style="font-size: 28px; color: var(--primary);">Step ${builderState.step + 1}: ${step.title}</h2>
            <p style="color: var(--text-muted); margin-top: 10px;">${step.message}</p>
        </div>
        <div class="builder-steps" style="margin-bottom: 30px;">
            ${BUILDER_STEPS.map((s, i) => `
                <div class="step-node ${i <= builderState.step ? 'active' : ''}">${i + 1}</div>
            `).join('')}
        </div>
        <div class="builder-options" id="builder-options">
    `;

    if (builderState.step === 0) {
        // Step 0: Profile
        html += `
            <div class="option-card" onclick="selectBuilderProfile('gaming')">
                <i class="fas fa-gamepad" style="font-size: 40px; margin-bottom: 20px; color: var(--primary);"></i>
                <h3>Gaming</h3>
                <p style="color: var(--text-muted); font-size: 13px;">Pro performance & high FPS.</p>
            </div>
            <div class="option-card" onclick="selectBuilderProfile('professional')">
                <i class="fas fa-video" style="font-size: 40px; margin-bottom: 20px; color: var(--secondary);"></i>
                <h3>Workstation</h3>
                <p style="color: var(--text-muted); font-size: 13px;">Editing & heavy rendering.</p>
            </div>
            <div class="option-card" onclick="selectBuilderProfile('casual')">
                <i class="fas fa-home" style="font-size: 40px; margin-bottom: 20px; color: var(--accent);"></i>
                <h3>Home/Office</h3>
                <p style="color: var(--text-muted); font-size: 13px;">Reliable everyday usage.</p>
            </div>
        `;
    } else if (builderState.step === 1) {
        // Step 1: Budget
        html += `
            <div class="option-card" onclick="selectBuilderBudget('high')">
                <i class="fas fa-crown" style="font-size: 40px; margin-bottom: 20px; color: #ffd700;"></i>
                <h3>Elite Build</h3>
                <p style="color: var(--text-muted); font-size: 13px;">No compromises on quality.</p>
            </div>
            <div class="option-card" onclick="selectBuilderBudget('low')">
                <i class="fas fa-thumbs-up" style="font-size: 40px; margin-bottom: 20px; color: var(--accent);"></i>
                <h3>Value King</h3>
                <p style="color: var(--text-muted); font-size: 13px;">Best performance for price.</p>
            </div>
        `;
    } else {
        // Component selection
        const allProducts = DB.getAllProducts();
        const cats = Array.isArray(step.category) ? step.category : [step.category];
        let filtered = allProducts.filter(p => cats.includes(p.category));

        if (filtered.length > 0) {
            // Intelligent filtering based on budget
            const prices = filtered.map(p => p.price);
            const medianPrice = prices.sort((a, b) => a - b)[Math.floor(prices.length / 2)];

            if (builderState.budget === 'high') {
                filtered = filtered.filter(p => p.price >= medianPrice).sort((a, b) => b.price - a.price);
            } else {
                filtered = filtered.filter(p => p.price <= medianPrice).sort((a, b) => a.price - b.price);
            }

            filtered.slice(0, 4).forEach(p => {
                html += `
                    <div class="option-card" onclick="selectBuilderItem('${step.id}', '${p.id}')">
                        <img src="${p.image}" style="width: 70px; height: 70px; object-fit: contain; margin-bottom: 10px;">
                        <h4 style="font-size: 13px; height: 36px; overflow: hidden; margin-bottom: 8px;">${p.name}</h4>
                        <p style="color: var(--accent); font-weight: bold; font-size: 14px;">₹${p.price.toLocaleString()}</p>
                    </div>
                `;
            });
        }
    }

    html += `</div>`;

    // Add navigation buttons
    html += `
        <div style="display: flex; gap: 15px; margin-top: 30px; justify-content: center;">
            ${builderState.step > 0 ? `<button class="back-btn" onclick="prevBuilderStep()"><i class="fas fa-chevron-left"></i><span>Back</span></button>` : ''}
            <button class="cancel-btn" onclick="builderModal.classList.remove('open')">
                <i class="fas fa-times-circle"></i>
                <span>Cancel</span>
            </button>
        </div>
    `;

    if (builderContent) builderContent.innerHTML = html;
};

window.prevBuilderStep = function () {
    if (builderState.step > 0) {
        builderState.step--;
        renderBuilderStep();
    }
};

window.selectBuilderProfile = function (profile) {
    builderState.profile = profile;
    builderState.step++;
    renderBuilderStep();
};

window.selectBuilderBudget = function (budget) {
    builderState.budget = budget;
    builderState.step++;
    renderBuilderStep();
};

window.selectBuilderItem = function (stepId, productId) {
    builderState.selections[stepId] = productId;
    builderState.step++;
    renderBuilderStep();
};

function renderBuilderReview() {
    const selectedItems = Object.values(builderState.selections).map(id => DB.getProduct(id)).filter(p => p);
    const total = selectedItems.reduce((acc, p) => acc + (p.price || 0), 0);

    if (builderContent) {
        builderContent.innerHTML = `
            <div class="builder-header">
                <h2 style="font-size: 28px; color: var(--accent);">Build Complete!</h2>
                <p style="color: var(--text-muted); margin-top: 10px;">Your custom ${builderState.profile} build is ready for assembly.</p>
            </div>
            
            <div style="background: rgba(255,255,255,0.03); padding: 25px; border-radius: 24px; margin-bottom: 30px; border: 1px solid var(--glass-border);">
                ${selectedItems.map(p => `
                    <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                        <div style="flex: 1;">
                            <span style="font-size: 14px; color: var(--text-main); font-weight: 500;">${p.name}</span>
                            <div style="font-size: 11px; color: var(--text-muted);">${getCategoryName(p.category)}</div>
                        </div>
                        <span style="color: var(--primary); font-weight: bold; font-size: 14px;">₹${p.price.toLocaleString()}</span>
                    </div>
                `).join('')}
                <div style="display: flex; justify-content: space-between; margin-top: 20px; font-size: 20px; font-weight: 800; border-top: 1px solid var(--glass-border); pt: 15px;">
                    <span>Total Budget</span>
                    <span style="color: var(--accent);">₹${total.toLocaleString()}</span>
                </div>
            </div>

            <div style="display: flex; gap: 15px;">
                <button class="primary-btn" onclick="addBuildToCart()" style="flex: 2;">
                    Add to Cart <i class="fas fa-shopping-cart" style="margin-left: 10px;"></i>
                </button>
                <button class="nav-btn" onclick="addBuildToWishlist()" style="width: 55px; height: 55px; border-radius: 12px; border-color: #ff4757; color: #ff4757;">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <div style="text-align: center; margin-top: 20px;">
                <button class="back-btn" onclick="prevBuilderStep()" style="display: inline-flex;"><i class="fas fa-arrow-left"></i> Edit Build</button>
            </div>
        `;
    }
}

window.addBuildToCart = function () {
    Object.values(builderState.selections).forEach(id => addToCart(id));
    if (builderModal) builderModal.classList.remove('open');
    alert('All build components added to your cart! 🚀');
};

window.addBuildToWishlist = function () {
    const selectedIds = Object.values(builderState.selections);
    selectedIds.forEach(id => {
        if (id && !wishlist.some(item => item && item.id === id)) {
            wishlist.push(DB.getProduct(id));
        }
    });
    saveWishlist();
    updateBadges();
    renderProducts();
    if (builderModal) builderModal.classList.remove('open');
    alert('All components saved to your wishlist! ❤️');
};

// --- CORE ACTIONS ---

window.setCategory = function (id) {
    if (id === 'builder') {
        openAIBuilder();
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) sidebar.classList.remove('mobile-active');
        const backdrop = document.getElementById('sidebar-backdrop');
        if (backdrop) backdrop.classList.remove('active');
        document.body.classList.remove('no-scroll');
        return;
    }

    currentCategory = id;
    renderCategories();
    renderProducts();

    const sidebar = document.querySelector('.sidebar');
    if (sidebar) sidebar.classList.remove('mobile-active');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (backdrop) backdrop.classList.remove('active');
    document.body.classList.remove('no-scroll');

    const titleEl = document.querySelector('.section-title');
    if (titleEl) titleEl.textContent = id === 'all' ? 'Featured Components' : getCategoryName(id);
};

window.openProductDetails = function (productId) {
    const product = DB.getProduct(productId);
    if (!product) return;

    if (detailsContent) {
        detailsContent.innerHTML = `
            <div class="detail-layout">
                <div class="detail-img-container">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x400/141a25/00D9FF'">
                </div>
                <div class="detail-info">
                    <div class="product-category" style="font-size: 14px; margin-bottom: 10px;">${getCategoryName(product.category)}</div>
                    <h2 style="font-size: 32px; margin-bottom: 20px;">${product.name}</h2>
                    <div class="price" style="font-size: 28px; margin-bottom: 25px;">₹${(product.price || 0).toLocaleString()}</div>
                    
                    <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; margin-bottom: 25px;">
                        <h4 style="margin-bottom: 10px; color: var(--primary);">Specifications</h4>
                        <p style="color: var(--text-muted); line-height: 1.6;">${product.description || 'No description available.'}</p>
                    </div>

                    <div style="display: flex; gap: 15px;">
                        <button class="primary-btn" onclick="addToCart('${product.id}'); detailsModal.classList.remove('open');">
                            Add to Cart <i class="fas fa-shopping-cart" style="margin-left: 10px;"></i>
                        </button>

                        <button class="nav-btn ${wishlist.some(i => i && i.id === product.id) ? 'active' : ''}" onclick="toggleWishlist('${product.id}')" style="width: 55px; height: 55px;">
                            <i class="${wishlist.some(i => i && i.id === product.id) ? 'fas' : 'far'} fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    if (detailsModal) detailsModal.classList.add('open');
};

window.addToCart = function (productId) {
    const product = DB.getProduct(productId);
    if (!product) return;

    const existingItem = cart.find(item => item && item.id === productId);

    if (existingItem) {
        existingItem.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    saveCart();
    updateBadges();

    const evt = window.event;
    const btn = evt ? evt.currentTarget : null;
    if (btn && (btn.classList.contains('add-btn') || btn.classList.contains('primary-btn'))) {
        const icon = btn.querySelector('i');
        if (icon) {
            const original = icon.className;
            icon.className = 'fas fa-check';
            setTimeout(() => icon.className = original, 1000);
        }
    }
};

window.removeFromCart = function (productId) {
    cart = cart.filter(item => item && item.id !== productId);
    saveCart();
    renderCart();
    updateBadges();
};

window.updateQuantity = function (productId, change) {
    const item = cart.find(item => item && item.id === productId);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) removeFromCart(productId);
        else {
            saveCart();
            renderCart();
            updateBadges();
        }
    }
};

window.toggleWishlist = function (productId) {
    const product = DB.getProduct(productId);
    if (!product) return;

    const index = wishlist.findIndex(item => item && item.id === productId);
    if (index >= 0) wishlist.splice(index, 1);
    else wishlist.push(product);

    saveWishlist();
    updateBadges();
    renderProducts();
    if (wishlistModal && wishlistModal.classList.contains('open')) renderWishlist();
};

window.moveToCart = function (productId) {
    addToCart(productId);
    toggleWishlist(productId);
};

window.moveAllToCart = function () {
    if (!wishlist || wishlist.length === 0) return;
    wishlist.forEach(item => {
        if (item) addToCart(item.id);
    });
    wishlist = [];
    saveWishlist();
    updateBadges();
    renderProducts();
    renderWishlist();
    alert('All items moved to cart! 🛒');
};

// --- DIRECT BUY / INQUIRY ---

window.openBuyNow = function (productId) {
    const modal = document.getElementById('buy-now-modal');
    if (!modal) return;

    const product = DB.getProduct(productId);
    if (!product) return;

    document.getElementById('buy-now-product-id').value = productId;
    document.getElementById('modal-product-name').innerText = product.name;

    // Reset Form
    document.getElementById('buy-now-form').reset();
    document.getElementById('buy-now-form-container').classList.remove('hidden');
    document.getElementById('buy-now-success').classList.add('hidden');

    document.querySelectorAll('.wiz-step').forEach(s => s.classList.remove('active', 'slide-out-left', 'slide-in-right', 'slide-out-right', 'slide-in-left'));
    document.getElementById('wiz-step-1').classList.add('active');

    // Reset Progress Indicators
    const indicators = document.querySelectorAll('.step-dot');
    indicators.forEach(ind => {
        ind.classList.remove('active', 'completed');
        if (ind.dataset.step === '1') ind.classList.add('active');
    });

    // Populate Summary
    document.getElementById('buy-now-summary').innerHTML = `
        <div style="display: flex; gap: 15px; align-items: center;">
            <img src="${product.image}" style="width: 50px; height: 50px; object-fit: contain;">
            <div style="flex: 1;">
                <div style="font-weight: bold; color: white;">${product.name}</div>
                <div style="color: var(--primary); font-weight: bold;">₹${product.price.toLocaleString()}</div>
            </div>
            <button class="secondary-btn" onclick="importInquiryToCart('${product.id}')" style="font-size: 11px; padding: 5px 10px;">
                <i class="fas fa-cart-plus"></i> Import to Cart
            </button>
        </div>
    `;

    modal.classList.add('open');
};

window.switchWizStep = function (step) {
    const currentStep = document.querySelector('.wiz-step.active');
    const targetStep = document.getElementById(`wiz-step-${step}`);
    const currentStepNum = parseInt(currentStep.id.split('-').pop());
    const isForward = step > currentStepNum;

    if (!currentStep || !targetStep) return;

    // Remove previous animation classes
    document.querySelectorAll('.wiz-step').forEach(s => {
        s.classList.remove('active', 'slide-out-left', 'slide-in-right', 'slide-out-right', 'slide-in-left');
    });

    if (isForward) {
        currentStep.classList.add('slide-out-left');
        targetStep.classList.add('active', 'slide-in-right');
    } else {
        currentStep.classList.add('slide-out-right');
        targetStep.classList.add('active', 'slide-in-left');
    }

    // Update Progress Indicators
    const indicators = document.querySelectorAll('.step-dot');

    indicators.forEach(ind => {
        const indStep = parseInt(ind.dataset.step);
        ind.classList.remove('active', 'completed');
        if (indStep === step) {
            ind.classList.add('active');
        } else if (indStep < step) {
            ind.classList.add('completed');
        }
    });

    // Clean up animation classes after completion
    setTimeout(() => {
        currentStep.classList.remove('slide-out-left', 'slide-out-right');
    }, 400);
};

window.selectPaymentMethod = function (method) {
    document.getElementById('selected-payment-method').value = method;
    document.querySelectorAll('.pay-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.method === method);
    });

    document.getElementById('upi-qr-view').classList.toggle('hidden', method !== 'upi');
    document.getElementById('phone-view').classList.toggle('hidden', method !== 'phone');
    document.getElementById('cod-view').classList.toggle('hidden', method !== 'cod');

    if (method === 'upi') generateDirectQR();
};

function generateDirectQR() {
    const container = document.getElementById('direct-qr-code');
    if (!container) return;
    container.innerHTML = '';
    const p = DB.getProduct(document.getElementById('buy-now-product-id').value);
    const amount = p ? (p.price || 0) : 0;
    const upiStr = `upi://pay?pa=9894465996@upi&pn=SmartTechHub&am=${amount}&cu=INR`;
    new QRCode(container, {
        text: upiStr,
        width: 100,
        height: 100,
        colorDark: "#000000",
        colorLight: "#ffffff"
    });
}

window.importInquiryToCart = function (productId) {
    const product = DB.getProduct(productId);
    if (!product) return;
    cart = [{ ...product, qty: 1 }];
    saveCart();
    updateBadges();
    renderCart();
    const modal = document.getElementById('buy-now-modal');
    if (modal) modal.classList.remove('open');
    if (cartModal) cartModal.classList.add('open');
};

window.openCartCheckout = function () {
    window.location.href = 'checkout.html';
};

window.logout = function () {
    DB.setCurrentUser(null);
    window.location.reload();
};

// --- UTILS ---

function safeJSONParse(key, fallback) {
    try {
        const data = localStorage.getItem(key);
        if (!data || data === 'undefined' || data === 'null') return fallback;
        const parsed = JSON.parse(data);
        return parsed || fallback;
    } catch (e) {
        console.warn(`Error parsing ${key} from localStorage`, e);
        return fallback;
    }
}

function saveCart() { DB.saveCart(cart); }
function saveWishlist() { DB.saveWishlist(wishlist); }

function updateBadges() {
    if (cartCount) {
        cartCount.textContent = cart.reduce((acc, item) => acc + (item.qty || 0), 0);
        cartCount.classList.toggle('hidden', cart.length === 0);
    }
    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
        wishlistCount.classList.toggle('hidden', wishlist.length === 0);
    }
}

function setupEventListeners() {
    // Search
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            if (term.length === 0) { renderProducts(); return; }
            const filtered = DB.getAllProducts().filter(p =>
                (p.name && p.name.toLowerCase().includes(term)) ||
                (p.description && p.description.toLowerCase().includes(term))
            );
            renderProducts(filtered);
        });
    }

    // Modal Triggers
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) cartBtn.addEventListener('click', () => { if (cartModal) cartModal.classList.add('open'); renderCart(); });

    const wishlistBtn = document.getElementById('wishlist-btn');
    if (wishlistBtn) wishlistBtn.addEventListener('click', () => { if (wishlistModal) wishlistModal.classList.add('open'); renderWishlist(); });

    const builderBtn = document.getElementById('builder-btn');
    if (builderBtn) builderBtn.addEventListener('click', openAIBuilder);

    // Closers
    ['close-cart', 'close-wishlist', 'close-details', 'close-builder', 'close-buy-now'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', () => {
            const modal = document.querySelector('.modal-overlay.open');
            if (modal) modal.classList.remove('open');
        });
    });

    // Clear Cart
    const clearCartBtn = document.getElementById('clear-cart-btn');
    if (clearCartBtn) clearCartBtn.addEventListener('click', () => {
        if (confirm('Clear entire cart?')) { cart = []; saveCart(); renderCart(); updateBadges(); }
    });

    // Checkout
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) checkoutBtn.addEventListener('click', openCartCheckout);

    // Sidebar Mobile
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMobileBtn = document.getElementById('close-mobile-menu');
    const sidebar = document.querySelector('.sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    const closeMobileMenu = () => {
        if (sidebar) sidebar.classList.remove('mobile-active');
        if (backdrop) backdrop.classList.remove('active');
        document.body.classList.remove('no-scroll');
    };
    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', () => {
        if (sidebar) sidebar.classList.add('mobile-active');
        if (backdrop) backdrop.classList.add('active');
        document.body.classList.add('no-scroll');
    });
    if (closeMobileBtn) closeMobileBtn.addEventListener('click', closeMobileMenu);
    if (backdrop) backdrop.addEventListener('click', closeMobileMenu);

    // Global Modal Click Outside
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });
    });

    // Buy Now Form Handling
    const buyNowForm = document.getElementById('buy-now-form');
    if (buyNowForm) {
        buyNowForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const productId = document.getElementById('buy-now-product-id').value;
            const product = DB.getProduct(productId);
            const user = DB.getCurrentUser();
            const inquiry = {
                id: 'inq-' + Date.now(),
                customerId: user ? user.email : 'guest',
                customer: {
                    name: document.getElementById('buyer-name').value,
                    email: document.getElementById('buyer-email').value,
                    phone: document.getElementById('buyer-phone').value,
                    pin: document.getElementById('buyer-pin').value,
                    city: document.getElementById('buyer-city').value,
                    landmark: document.getElementById('buyer-landmark').value || '',
                    address: document.getElementById('buyer-address').value,
                    paymentMethod: document.getElementById('selected-payment-method').value
                },
                product: product,
                date: new Date().toISOString(),
                status: 'Pending'
            };
            DB.saveInquiry(inquiry);

            // Hide Progress Bar on Success
            const progressContainer = document.querySelector('.wizard-progress-container');
            if (progressContainer) progressContainer.style.display = 'none';

            document.getElementById('buy-now-form-container').classList.add('hidden');
            document.getElementById('buy-now-success').classList.remove('hidden');
        });
    }
}

function updateUserHeader() {
    const user = DB.getCurrentUser();
    const container = document.getElementById('user-section');
    if (!container) return;
    if (user) {
        let html = `
            <div class="desktop-only" style="text-align: right; margin-right: 10px;">
                <div style="font-size: 14px; font-weight: bold; color: var(--primary);">${user.name}</div>
                <div style="font-size: 11px; color: var(--text-muted); cursor: pointer; text-decoration: underline;" onclick="logout()">Logout</div>
            </div>
        `;
        html += user.role === 'admin'
            ? `<a href="admin.html" class="nav-btn" title="Admin Dashboard" style="border-color: var(--primary);"><i class="fas fa-cog" style="color: var(--primary);"></i></a>`
            : `<div class="nav-btn"><i class="fas fa-user-circle"></i></div>`;
        container.innerHTML = html;
    } else {
        container.innerHTML = `<a href="login.html" class="nav-btn" title="Login"><i class="fas fa-user"></i></a>`;
    }
}

window.addEventListener('storage', () => {
    updateUserHeader();
    cart = safeJSONParse(DB_KEYS.CART, []);
    wishlist = safeJSONParse(DB_KEYS.WISHLIST, []);
    updateBadges();
    renderCart();
    renderWishlist();
});

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // DB.init() is called at the top, but UI sync happens here
    updateUserHeader();
    updateBadges();
    renderCategories();
    renderProducts();
    setupEventListeners();
    initHashRouting(); // Initialize Hash Routing
});

// --- HASH ROUTING & SHARING ---

// 1. Handle URL Hash Changes
function initHashRouting() {
    // Check initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
}

function handleHashChange() {
    const hash = window.location.hash;
    if (hash.startsWith('#product-')) {
        const productId = hash.replace('#product-', '');
        // Wait for DB to be ready if needed, or just open
        const product = DB.getProduct(productId);
        if (product) {
            openProductDetails(productId);
        }
    }
}

// 2. Generate Share Link
window.copyShareLink = function (productId) {
    // specific IP if available, else localhost
    const baseUrl = window.location.href.split('#')[0];
    const shareUrl = `${baseUrl}#product-${productId}`;

    navigator.clipboard.writeText(shareUrl).then(() => {
        // Show feedback
        const btn = event.currentTarget;
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btn.classList.add('success');

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.remove('success');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        alert('Could not copy link. Manually copy this:\n' + shareUrl);
    });
};


