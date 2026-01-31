// Initialize Data
DB.init();

// State
let currentCategory = 'all';
let cart = JSON.parse(localStorage.getItem(DB_KEYS.CART) || '[]');
let wishlist = JSON.parse(localStorage.getItem(DB_KEYS.WISHLIST) || '[]');

// DOM Elements
const productGrid = document.getElementById('product-grid');
const categoryList = document.getElementById('category-list');
const cartCount = document.getElementById('cart-count');
const wishlistCount = document.getElementById('wishlist-count');
const wishlistModal = document.getElementById('wishlist-modal');
const wishlistItemsContainer = document.getElementById('wishlist-items-container');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotal = document.getElementById('cart-total');
const recommendationsGrid = document.getElementById('recommendations-grid');
const detailsModal = document.getElementById('product-details-modal');
const detailsContent = document.getElementById('product-detail-content');
const builderModal = document.getElementById('builder-modal');
const builderContent = document.getElementById('builder-wizard-content');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    renderProducts();
    updateBadges();
    setupEventListeners();
    updateUserHeader();
    renderRecommendations();
});

function updateUserHeader() {
    const user = JSON.parse(localStorage.getItem('sth_current_user'));
    const container = document.getElementById('user-section');

    if (user) {
        let html = `
            <div class="desktop-only" style="text-align: right; margin-right: 10px;">
                <div style="font-size: 14px; font-weight: bold;">${user.name}</div>
                <div style="font-size: 11px; color: var(--text-muted); cursor: pointer; text-decoration: underline;" onclick="logout()">Logout</div>
            </div>
        `;

        if (user.role === 'admin') {
            html += `
                <a href="admin.html" class="nav-btn" title="Manage Store" style="background: rgba(0, 217, 255, 0.1); color: var(--primary);">
                    <i class="fas fa-cog"></i>
                </a>
            `;
        } else {
            html += `
                <div class="nav-btn">
                    <i class="fas fa-user-circle"></i>
                </div>
            `;
        }

        container.innerHTML = html;
    } else {
        container.innerHTML = `
            <a href="login.html" class="nav-btn" title="Login">
                <i class="fas fa-user"></i>
            </a>
        `;
    }
}

window.logout = function () { // Expose globally
    localStorage.removeItem('sth_current_user');
    window.location.reload();
};

// Render Functions
function renderCategories() {
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

    productGrid.innerHTML = data.map(product => {
        const inWishlist = wishlist.some(item => item.id === product.id);

        return `
        <div class="product-card glass-panel" onclick="openProductDetails('${product.id}')">
            <button class="wishlist-btn" onclick="event.stopPropagation(); toggleWishlist('${product.id}')" 
                    style="color: ${inWishlist ? '#ff4757' : 'white'}">
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
                    <button class="add-btn" onclick="event.stopPropagation(); addToCart('${product.id}')">
                        <i class="fas fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `}).join('');

    if (data.length === 0) {
        productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No products found in this category.</p>';
    }
}

window.openProductDetails = function (productId) {
    const product = DB.getProduct(productId);
    if (!product) return;

    detailsContent.innerHTML = `
        <div class="detail-layout">
            <div class="detail-img-container">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x400/141a25/00D9FF'">
            </div>
            <div class="detail-info">
                <div class="product-category" style="font-size: 14px; margin-bottom: 10px;">${getCategoryName(product.category)}</div>
                <h2 style="font-size: 32px; margin-bottom: 20px;">${product.name}</h2>
                <div class="price" style="font-size: 28px; margin-bottom: 25px;">₹${product.price ? product.price.toLocaleString() : 'N/A'}</div>
                
                <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; margin-bottom: 25px;">
                    <h4 style="margin-bottom: 10px; color: var(--primary);">Specifications & Details</h4>
                    <p style="color: var(--text-muted); line-height: 1.6;">${product.description}</p>
                    <div style="margin-top: 15px; display: flex; gap: 20px; font-size: 14px;">
                        <span><i class="fas fa-check-circle" style="color: var(--accent);"></i> In Stock (${product.stock})</span>
                        <span><i class="fas fa-shipping-fast" style="color: var(--primary);"></i> Express Delivery</span>
                    </div>
                </div>

                <div style="display: flex; gap: 15px;">
                    <button class="primary-btn" onclick="addToCart('${product.id}'); detailsModal.classList.remove('open');">
                        Add to Cart <i class="fas fa-shopping-cart" style="margin-left: 10px;"></i>
                    </button>
                    <button class="nav-btn"onclick="toggleWishlist('${product.id}')" style="width: 55px; height: 55px;">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    detailsModal.classList.add('open');
};

function renderCart() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: var(--text-muted); margin-top: 50px;">Your cart is empty</p>';
        cartTotal.textContent = '₹0';
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" class="cart-item-img" onerror="this.src='https://via.placeholder.com/70/141a25/00D9FF'">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
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

    const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    cartTotal.textContent = '₹' + total.toLocaleString();
}

function renderWishlist() {
    if (wishlist.length === 0) {
        wishlistItemsContainer.innerHTML = '<p style="text-align: center; color: var(--text-muted); margin-top: 50px;">Your wishlist is empty</p>';
        return;
    }

    wishlistItemsContainer.innerHTML = wishlist.map(item => `
        <div class="cart-item">
            <img src="${item.image}" class="cart-item-img" onerror="this.src='https://via.placeholder.com/70/141a25/00D9FF'">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
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

// Actions
window.setCategory = function (id) {
    currentCategory = id;
    renderCategories();
    renderProducts();

    const sidebar = document.querySelector('.sidebar');
    if (sidebar) sidebar.classList.remove('mobile-active');

    // Update section title
    const title = id === 'all' ? 'Featured Components' : getCategoryName(id);
    const titleEl = document.querySelector('.section-title');
    if (titleEl) titleEl.textContent = title;
};

window.addToCart = function (productId) {
    const product = DB.getProduct(productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    saveCart();
    updateBadges();
    renderRecommendations(); // Refresh based on new cart state

    // Optional: Show feedback
    const evt = window.event || (arguments.length > 1 ? arguments[1] : null);
    const btn = evt ? evt.currentTarget : null;

    if (btn) {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        btn.appendChild(ripple);

        // Visual feedback
        const originalContent = btn.innerHTML;
        const width = btn.offsetWidth;
        btn.style.width = width + 'px'; // Prevent collapsing
        btn.innerHTML = '<i class="fas fa-check"></i>';
        const originalBg = btn.style.background;
        btn.style.background = '#06FFA5';
        btn.style.color = '#000';

        setTimeout(() => {
            btn.innerHTML = originalContent;
            btn.style.background = originalBg;
            btn.style.color = '';
            if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
        }, 1200);
    }
};

window.removeFromCart = function (productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
    updateBadges();
    renderRecommendations();
};

window.updateQuantity = function (productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            renderCart();
            updateBadges();
            renderRecommendations();
        }
    }
};

window.toggleWishlist = function (productId) {
    const index = wishlist.findIndex(item => item.id === productId);
    if (index >= 0) {
        wishlist.splice(index, 1);
    } else {
        const product = DB.getProduct(productId);
        wishlist.push(product);
    }

    localStorage.setItem(DB_KEYS.WISHLIST, JSON.stringify(wishlist));
    updateBadges();
    renderProducts(); // Re-render grid
    if (wishlistModal.classList.contains('open')) renderWishlist(); // Re-render modal if open
};

window.moveToCart = function (productId) {
    addToCart(productId);
    toggleWishlist(productId); // Remove from wishlist
};

window.moveAllToCart = function () {
    if (wishlist.length === 0) return;
    wishlist.forEach(item => {
        addToCart(item.id);
    });
    wishlist = [];
    localStorage.setItem(DB_KEYS.WISHLIST, JSON.stringify(wishlist));
    updateBadges();
    renderProducts();
    renderWishlist();
    renderRecommendations();
};

function renderRecommendations() {
    if (!recommendationsGrid) return; // Guard clause

    const allProducts = DB.getAllProducts();

    // Core categories we want to push: "The Essentials"
    const coreCategories = ['ram', 'internal-storage', 'motherboard', 'cpu-intel', 'cpu-amd'];

    // 1. Filter products that are NOT in cart and NOT in wishlist
    let candidates = allProducts.filter(p =>
        !cart.some(item => item.id === p.id) &&
        !wishlist.some(item => item.id === p.id)
    );

    // 2. Prioritize Core Categories
    let recommendations = candidates.filter(p => coreCategories.includes(p.category));

    // 3. Fallback: If not enough core items, fill with others
    if (recommendations.length < 4) {
        const others = candidates.filter(p => !coreCategories.includes(p.category));
        recommendations = [...recommendations, ...others];
    }

    // 4. SORT BY PRICE: LOW TO HIGH
    recommendations.sort((a, b) => a.price - b.price);

    // 5. Take top 4
    const finalSuggestions = recommendations.slice(0, 4);

    recommendationsGrid.innerHTML = finalSuggestions.map((product, index) => `
        <div class="product-card glass-panel" style="animation: fadeInUp 0.5s ease forwards; animation-delay: ${index * 0.1}s;">
            <button class="wishlist-btn" onclick="toggleWishlist('${product.id}')">
                <i class="far fa-heart"></i>
            </button>
            <div class="product-image-container" style="height: 150px;">
                <img src="${product.image}" alt="${product.name}" class="product-image" 
                     onerror="this.src='https://via.placeholder.com/200x200/141a25/00D9FF?text=STH'">
            </div>
            <div class="card-content" style="padding: 15px;">
                <div class="product-category" style="font-size: 10px;">${getCategoryName(product.category)}</div>
                <h4 class="product-title" style="font-size: 13px; height: 34px; margin-bottom: 5px;">${product.name}</h4>
                <div class="product-footer">
                    <div class="price" style="font-size: 14px;">₹${product.price ? product.price.toLocaleString() : 'N/A'}</div>
                    <button class="add-btn" onclick="event.stopPropagation(); addToCart('${product.id}')" style="width: 35px; height: 35px;">
                        <i class="fas fa-cart-plus" style="font-size: 14px;"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}


// Utils
function saveCart() {
    localStorage.setItem(DB_KEYS.CART, JSON.stringify(cart));
}

function updateBadges() {
    cartCount.textContent = cart.reduce((acc, item) => acc + item.qty, 0);
    cartCount.classList.toggle('hidden', cart.length === 0);

    wishlistCount.textContent = wishlist.length;
    wishlistCount.classList.toggle('hidden', wishlist.length === 0);
}

function getCategoryName(id) {
    const cat = CATEGORIES.find(c => c.id === id);
    return cat ? cat.name : id;
}

function setupEventListeners() {
    // Search
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        if (term.length === 0) {
            renderProducts();
            return;
        }

        const allProducts = DB.getAllProducts();
        const filtered = allProducts.filter(p =>
            p.name.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term)
        );
        renderProducts(filtered);
    });

    // Cart Modal
    const cartBtn = document.getElementById('cart-btn');
    const closeCart = document.getElementById('close-cart');

    cartBtn.addEventListener('click', () => {
        cartModal.classList.add('open');
        renderCart();
    });

    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('open');
    });

    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('open');
        }
    });

    // Clear Cart
    document.getElementById('clear-cart-btn').addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your cart?')) {
            cart = [];
            saveCart();
            renderCart();
            updateBadges();
        }
    });

    // Checkout
    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        window.location.href = 'checkout.html';
    });

    // Wishlist Modal
    const wishlistBtn = document.getElementById('wishlist-btn');
    const closeWishlist = document.getElementById('close-wishlist');

    wishlistBtn.addEventListener('click', () => {
        wishlistModal.classList.add('open');
        renderWishlist();
    });

    closeWishlist.addEventListener('click', () => {
        wishlistModal.classList.remove('open');
    });

    wishlistModal.addEventListener('click', (e) => {
        if (e.target === wishlistModal) {
            wishlistModal.classList.remove('open');
        }
    });

    // Product Details Modal
    document.getElementById('close-details').addEventListener('click', () => {
        detailsModal.classList.remove('open');
    });

    detailsModal.addEventListener('click', (e) => {
        if (e.target === detailsModal) {
            detailsModal.classList.remove('open');
        }
    });

    // PC Builder Wizard
    const builderBtn = document.getElementById('builder-btn');
    const closeBuilder = document.getElementById('close-builder');

    let builderState = {
        step: 0,
        profile: '', // gaming, professional, casual
        budget: '',  // high, low
        selections: {}
    };

    const builderSteps = [
        { id: 'profile', title: 'Usage Profile', items: ['gaming', 'professional', 'casual'] },
        { id: 'budget', title: 'Budget Preference', items: ['high', 'low'] },
        { id: 'ram', category: 'ram', title: 'Select RAM' },
        { id: 'gpu', category: 'gpu', title: 'Select Graphics Card' },
        { id: 'cpu', category: ['cpu-intel', 'cpu-amd'], title: 'Select Processor' },
        { id: 'ssd', category: 'internal-storage', title: 'Select Storage' },
        { id: 'mobo', category: 'motherboard', title: 'Select Motherboard' }
    ];

    builderBtn.addEventListener('click', () => {
        builderState = { step: 0, profile: '', budget: '', selections: {} };
        builderModal.classList.add('open');
        renderBuilderStep();
    });

    closeBuilder.addEventListener('click', () => {
        builderModal.classList.remove('open');
    });

    window.renderBuilderStep = function () {
        const step = builderSteps[builderState.step];
        let html = `
            <div class="builder-header">
                <h2 style="font-size: 28px; color: var(--primary);">${step.title}</h2>
                <p style="color: var(--text-muted);">Step ${builderState.step + 1} of ${builderSteps.length}</p>
            </div>
            <div class="builder-steps">
                ${builderSteps.map((s, i) => `
                    <div class="step-node ${i <= builderState.step ? 'active' : ''}">${i + 1}</div>
                `).join('')}
            </div>
            <div class="builder-options">
        `;

        if (builderState.step === 0) {
            // Profile Choice
            html += `
                <div class="option-card" onclick="selectBuilderProfile('gaming')">
                    <i class="fas fa-gamepad" style="font-size: 40px; margin-bottom: 20px; color: var(--primary);"></i>
                    <h3>Gaming</h3>
                    <p style="color: var(--text-muted);">Maximum FPS and smooth gameplay experience.</p>
                </div>
                <div class="option-card" onclick="selectBuilderProfile('professional')">
                    <i class="fas fa-video" style="font-size: 40px; margin-bottom: 20px; color: var(--secondary);"></i>
                    <h3>Professional</h3>
                    <p style="color: var(--text-muted);">Editing, rendering, and content creation.</p>
                </div>
            `;
        } else if (builderState.step === 1) {
            // Budget Choice
            html += `
                <div class="option-card" onclick="selectBuilderBudget('high')">
                    <i class="fas fa-crown" style="font-size: 40px; margin-bottom: 20px; color: #ffd700;"></i>
                    <h3>High Performance</h3>
                    <p style="color: var(--text-muted);">No compromises, top-tier components.</p>
                </div>
                <div class="option-card" onclick="selectBuilderBudget('low')">
                    <i class="fas fa-wallet" style="font-size: 40px; margin-bottom: 20px; color: var(--accent);"></i>
                    <h3>Value King</h3>
                    <p style="color: var(--text-muted);">Best bang for your buck reliability.</p>
                </div>
            `;
        } else {
            // Component Selection
            const allProducts = DB.getAllProducts();
            const cats = Array.isArray(step.category) ? step.category : [step.category];

            let filtered = allProducts.filter(p => cats.includes(p.category));

            // Apply budget filtering
            const avgPrice = filtered.reduce((acc, p) => acc + p.price, 0) / filtered.length;
            if (builderState.budget === 'high') {
                filtered = filtered.filter(p => p.price >= avgPrice).sort((a, b) => b.price - a.price);
            } else {
                filtered = filtered.filter(p => p.price < avgPrice).sort((a, b) => a.price - b.price);
            }

            // Take top 4 for the wizard
            filtered.slice(0, 4).forEach(p => {
                html += `
                    <div class="option-card" onclick="selectBuilderItem('${step.id}', '${p.id}')">
                        <img src="${p.image}" style="width: 80px; height: 80px; object-fit: contain; margin-bottom: 15px;">
                        <h4 style="font-size: 14px; height: 38px; overflow: hidden;">${p.name}</h4>
                        <p style="color: var(--accent); font-weight: bold; margin-top: 10px;">₹${p.price.toLocaleString()}</p>
                    </div>
                `;
            });
        }

        html += `</div>`;

        // Final Review Step injection
        if (builderState.step === builderSteps.length) {
            renderBuilderReview();
            return;
        }

        builderContent.innerHTML = html;
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
        if (builderState.step === builderSteps.length) {
            renderBuilderReview();
        } else {
            renderBuilderStep();
        }
    };

    function renderBuilderReview() {
        const selectedItems = Object.values(builderState.selections).map(id => DB.getProduct(id));
        const total = selectedItems.reduce((acc, p) => acc + p.price, 0);

        builderContent.innerHTML = `
            <div class="builder-header">
                <h2 style="font-size: 28px; color: var(--accent);">Build Complete!</h2>
                <p style="color: var(--text-muted);">Your custom ${builderState.profile} build is ready.</p>
            </div>
            
            <div style="background: rgba(255,255,255,0.05); padding: 25px; border-radius: 20px; margin-bottom: 30px;">
                ${selectedItems.map(p => `
                    <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                        <span style="font-size: 14px;">${p.name}</span>
                        <span style="color: var(--primary);">₹${p.price.toLocaleString()}</span>
                    </div>
                `).join('')}
                <div style="display: flex; justify-content: space-between; margin-top: 20px; font-size: 20px; font-weight: 800;">
                    <span>Build Total</span>
                    <span style="color: var(--accent);">₹${total.toLocaleString()}</span>
                </div>
            </div>

            <button class="primary-btn" onclick="addBuildToCart()">
                Add Entire Build to Cart <i class="fas fa-check-circle" style="margin-left: 10px;"></i>
            </button>
        `;
    }

    window.addBuildToCart = function () {
        Object.values(builderState.selections).forEach(id => {
            addToCart(id);
        });
        builderModal.classList.remove('open');
        // Show success alert or similar
        alert('All build components added to your cart!');
    };

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMobileMenu = document.getElementById('close-mobile-menu');
    const sidebar = document.querySelector('.sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');

    function toggleSidebar(show) {
        if (show) {
            sidebar.classList.add('mobile-active');
            backdrop.classList.add('active');
            document.body.classList.add('no-scroll');
        } else {
            sidebar.classList.remove('mobile-active');
            backdrop.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSidebar(true);
        });
    }

    if (closeMobileMenu) {
        closeMobileMenu.addEventListener('click', () => {
            toggleSidebar(false);
        });
    }

    if (backdrop) {
        backdrop.addEventListener('click', () => {
            toggleSidebar(false);
        });
    }

    // Close sidebar when clicking outside (fallback)
    document.addEventListener('click', (e) => {
        if (sidebar && sidebar.classList.contains('mobile-active')) {
            if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                toggleSidebar(false);
            }
        }
    });
}
