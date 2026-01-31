const USERS_KEY = 'sth_users';
const CURRENT_USER_KEY = 'sth_current_user';

// Init Users DB if empty
if (!localStorage.getItem(USERS_KEY)) {
    const defaultUsers = [
        // Admin Account
        { id: 'u1', name: 'Admin', email: 'admin', password: 'admin', role: 'admin' },
        // Demo User
        { id: 'u2', name: 'Demo User', email: 'user@demo.com', password: '123', role: 'user' }
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
}

// Check current page
const isLoginPage = document.getElementById('login-form');

if (isLoginPage) {
    // === Login Page Logic ===
    // Animation is handled in login.html script

    // Login Handler
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-password').value;

        // Admin hardcoded check or DB check
        const users = JSON.parse(localStorage.getItem(USERS_KEY));
        const user = users.find(u => (u.email === email || u.name === email) && u.password === pass); // allow username 'admin'

        if (user) {
            loginUser(user);
        } else {
            alert('Invalid credentials!');
            // Hint for admin
            if (email === 'admin') alert('Try password: admin');
        }
    });

    // Signup Handler
    document.getElementById('signup-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const pass = document.getElementById('signup-pass').value;

        const users = JSON.parse(localStorage.getItem(USERS_KEY));

        if (users.find(u => u.email === email)) {
            alert('Email already exists!');
            return;
        }

        const newUser = {
            id: 'u-' + Date.now(),
            name, email, password: pass, role: 'user'
        };

        users.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));

        loginUser(newUser);
    });

}

function loginUser(user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    // Redirect based on role? Or just generic
    if (user.role === 'admin') {
        window.location.href = 'admin.html';
    } else {
        window.location.href = 'index.html';
    }
}

function logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
    window.location.href = 'login.html';
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
}

function requireAdmin() {
    const user = getCurrentUser();
    if (!user || user.role !== 'admin') {
        alert('Access Denied. Admins only.');
        window.location.href = 'login.html';
    }
}
