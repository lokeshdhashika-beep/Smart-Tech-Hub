// Initialize Data
DB.init();

// State
let cart = JSON.parse(localStorage.getItem(DB_KEYS.CART) || '[]');
const orderId = 'ORD-' + Date.now().toString().slice(-6);
const orderDate = new Date().toLocaleDateString();

// Redirect if empty
if (cart.length === 0) {
    window.location.href = 'index.html';
}

// Elements
const billItems = document.getElementById('bill-items');
const billTotal = document.getElementById('bill-total');
const billDate = document.getElementById('bill-date');
const orderIdEl = document.getElementById('order-id');
const qrContainer = document.getElementById('qrcode');
const printBtn = document.getElementById('print-btn');
const confirmBtn = document.getElementById('confirm-pay-btn');

// Init
document.addEventListener('DOMContentLoaded', () => {
    billDate.textContent = orderDate;
    orderIdEl.textContent = orderId;
    renderBill();
    generateQR();
});

function renderBill() {
    let total = 0;

    billItems.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        return `
        <div class="bill-item">
            <span>
                <span style="font-weight: 600;">${item.qty}x</span> 
                ${item.name}
            </span>
            <span>₹${itemTotal.toLocaleString()}</span>
        </div>
    `}).join('');

    billTotal.textContent = '₹' + total.toLocaleString();
}

function generateQR() {
    const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

    // Mock UPI String
    const upiString = `upi://pay?pa=store@upi&pn=SmartTechHub&am=${total}&cu=INR`;

    new QRCode(qrContainer, {
        text: upiString,
        width: 180,
        height: 180,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

// Actions
printBtn.addEventListener('click', () => {
    window.print();
});

confirmBtn.addEventListener('click', () => {
    const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

    const newOrder = {
        id: orderId,
        date: new Date().toISOString(),
        items: cart,
        total: total,
        status: 'Completed',
        paymentMethod: 'QR Code'
    };

    // Save Order
    const orders = JSON.parse(localStorage.getItem(DB_KEYS.ORDERS) || '[]');
    orders.push(newOrder);
    localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(orders));

    // Clear Cart
    localStorage.setItem(DB_KEYS.CART, JSON.stringify([]));

    // Show Success
    confirmBtn.innerHTML = '<i class="fas fa-check"></i> Paid Successfully';
    confirmBtn.style.background = '#06FFA5';
    confirmBtn.disabled = true;

    setTimeout(() => {
        alert('Thank you for your purchase!');
        window.location.href = 'index.html';
    }, 1000);
});
