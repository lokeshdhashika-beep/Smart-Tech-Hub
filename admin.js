// Protect Route
const user = DB.getCurrentUser();
if (!user || user.role !== 'admin') {
    window.location.href = 'login.html';
}

// Initialize Data
DB.init();

// State
let products = [];
let orders = DB.getOrders();
let inquiries = DB.getInquiries();
let currentView = 'dashboard';
let editingId = null;
let salesChart = null;

// DOM Elements
const views = {
    dashboard: document.getElementById('view-dashboard'),
    products: document.getElementById('view-products'),
    orders: document.getElementById('view-orders'),
    inquiries: document.getElementById('view-inquiries'),
    publicAccess: document.getElementById('view-public-access') // Add this
};
const navItems = document.querySelectorAll('.nav-item[data-view]');
const productModal = document.getElementById('product-modal');
const productForm = document.getElementById('product-form');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    setupNavigation();
    setupDashboard();
    setupProductManagement();
});

function loadData() {
    products = DB.getAllProducts();
    orders = DB.getOrders();
    inquiries = DB.getInquiries();
}

// Navigation
function setupNavigation() {
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            // Remove active class
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class
            item.classList.add('active');

            // Hide all views
            Object.values(views).forEach(view => view.classList.add('hidden'));

            // Show selected view
            const viewName = item.getAttribute('data-view');
            views[viewName].classList.remove('hidden');

            // Refresh data
            if (viewName === 'products') renderProductsTable();
            if (viewName === 'orders') renderOrdersTable();
            if (viewName === 'inquiries') renderInquiriesTable();
            if (viewName === 'public-access') renderPublicAccess(); // Add this line
            if (viewName === 'dashboard') updateDashboardStats();
        });
    });
}

// Dashboard
function setupDashboard() {
    updateDashboardStats();
    renderSalesChart();
}

function updateDashboardStats() {
    // Recalculate every time we view dashboard
    products = DB.getAllProducts(); // Refresh in case changed
    orders = DB.getOrders();

    const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
    const totalOrders = orders.length;
    const totalProducts = products.length;

    document.getElementById('total-revenue').textContent = '₹' + totalRevenue.toLocaleString();
    document.getElementById('total-orders').textContent = totalOrders;
    document.getElementById('total-products').textContent = totalProducts;
}

function renderSalesChart() {
    const ctx = document.getElementById('salesChart').getContext('2d');

    // Mock monthly data for demonstration since we don't have historical data
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const data = [120000, 190000, 150000, 250000, 220000, 300000];

    // If we had real data, we would aggregate 'orders' by month here

    salesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Sales (₹)',
                data: data,
                borderColor: '#00D9FF',
                backgroundColor: 'rgba(0, 217, 255, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: { color: '#fff' }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#a0aec0' }
                },
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#a0aec0' }
                }
            }
        }
    });
}

// Product Management
function setupProductManagement() {
    // Populate Category Select
    const catSelect = document.getElementById('product-category');
    CATEGORIES.forEach(cat => {
        if (cat.id !== 'all') {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.name;
            catSelect.appendChild(option);
        }
    });

    // Add Product Button
    document.getElementById('add-product-btn').addEventListener('click', () => {
        openModal();
    });

    // Cancel Button
    document.getElementById('cancel-product-btn').addEventListener('click', () => {
        productModal.classList.remove('open');
    });

    // Form Submit
    productForm.addEventListener('submit', handleProductSubmit);

    // Initial Render
    renderProductsTable();
}

function renderProductsTable() {
    products = DB.getAllProducts();
    const tbody = document.getElementById('products-table-body');

    tbody.innerHTML = products.map(p => `
        <tr>
            <td><img src="${p.image}" class="table-img" onerror="this.src='https://via.placeholder.com/40/141a25/00D9FF?text=Img'"></td>
            <td>${p.name}</td>
            <td>${getCategoryName(p.category)}</td>
            <td>₹${p.price.toLocaleString()}</td>
            <td>${p.stock}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editProduct('${p.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete-btn" onclick="deleteProduct('${p.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function openModal(product = null) {
    productModal.classList.add('open');
    const title = document.getElementById('modal-title');

    if (product) {
        title.textContent = 'Edit Product';
        editingId = product.id;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-category').value = product.category;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-stock').value = product.stock;
        document.getElementById('product-image').value = product.image;
        document.getElementById('product-desc').value = product.description;
    } else {
        title.textContent = 'Add Product';
        editingId = null;
        productForm.reset();
        document.getElementById('product-image').value = 'images/placeholder.jpg';
    }
}

async function handleProductSubmit(e) {
    e.preventDefault();

    const newProduct = {
        id: editingId || 'prod-' + Date.now(),
        name: document.getElementById('product-name').value,
        category: document.getElementById('product-category').value,
        price: Number(document.getElementById('product-price').value),
        stock: Number(document.getElementById('product-stock').value),
        image: document.getElementById('product-image').value,
        description: document.getElementById('product-desc').value
    };

    if (editingId) {
        // Update existing
        // We need to keep the ID
        newProduct.id = editingId;
    }

    DB.saveProduct(newProduct);

    productModal.classList.remove('open');
    renderProductsTable();
    updateDashboardStats(); // Update counts
}

window.editProduct = function (id) {
    const product = DB.getProduct(id);
    if (product) openModal(product);
};

window.deleteProduct = function (id) {
    if (confirm('Are you sure you want to delete this product?')) {
        DB.deleteProduct(id);
        renderProductsTable();
        updateDashboardStats();
    }
};

function getCategoryName(id) {
    const cat = CATEGORIES.find(c => c.id === id);
    return cat ? cat.name : id;
}

// Orders View
function renderOrdersTable() {
    orders = DB.getOrders();
    const tbody = document.getElementById('orders-table-body');

    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color: var(--text-muted);">No orders found</td></tr>';
        return;
    }

    // Sort by date desc
    const sortedOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date));

    tbody.innerHTML = sortedOrders.map(order => `
        <tr>
            <td>#${order.id.slice(-6)}</td>
            <td>${new Date(order.date).toLocaleDateString()}</td>
            <td>${order.items.length} items</td>
            <td>₹${order.total.toLocaleString()}</td>
            <td><span style="color: var(--accent); white-space: nowrap;">${order.status || 'Completed'}</span></td>
        </tr>
    `).join('');
}
// --- INQUIRIES ---

function renderInquiriesTable() {
    const tbody = document.getElementById('inquiries-table-body');
    inquiries = DB.getInquiries();

    if (inquiries.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 20px;">No inquiries found.</td></tr>';
        return;
    }

    inquiries.sort((a, b) => new Date(b.date) - new Date(a.date)); // Newest first

    tbody.innerHTML = inquiries.map(inq => {
        const date = new Date(inq.date).toLocaleDateString();
        const productImg = inq.product ? inq.product.image : '';
        const productName = inq.product ? inq.product.name : 'Unknown Product';
        const customer = inq.customer;
        const paymentLabel = customer.paymentMethod ? customer.paymentMethod.toUpperCase() : 'N/A';

        return `
        <tr>
            <td style="font-size: 11px;">${date}</td>
            <td>
                <div style="font-weight: bold;">${customer.name}</div>
                <div style="font-size: 11px; color: var(--text-muted);">${customer.email || 'No Email'}</div>
                <div style="font-size: 11px; color: var(--primary);">${customer.phone}</div>
            </td>
            <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <img src="${productImg}" style="width: 30px; height: 30px; object-fit: contain; border-radius: 4px;">
                    <span style="font-size: 12px;">${productName}</span>
                </div>
            </td>
            <td>
                <div style="font-size: 12px; font-weight: bold; color: var(--accent);">${paymentLabel}</div>
            </td>
            <td style="max-width: 250px; font-size: 11px; color: var(--text-muted);">
                <div>${customer.city}, ${customer.pin}</div>
                <div style="font-style: italic;">LM: ${customer.landmark}</div>
                <div style="margin-top: 4px; color: white;">${customer.address}</div>
            </td>
            <td>
                <button class="delete-btn" onclick="deleteInquiry('${inq.id}')"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `}).join('');
}

window.deleteInquiry = function (id) {
    if (confirm('Are you sure you want to delete this inquiry?')) {
        DB.deleteInquiry(id);
        renderInquiriesTable();
    }
};

// --- PUBLIC ACCESS ---

function renderPublicAccess() {
    // We can't get the real local IP from JS, so we'll show a placeholder or ask them to check the console
    const ipDisplay = document.getElementById('local-ip-display');
    if (ipDisplay) {
        ipDisplay.innerHTML = `
            <span style="font-size: 14px; color: var(--accent);">Check the black server window!</span>
        `;
    }
}
