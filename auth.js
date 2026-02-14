// Check current page
const isLoginPage = document.getElementById('login-form');

if (isLoginPage) {
    // Login Handler
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-password').value;

        // Use DB to find user
        const user = DB.findUser(u => (u.email === email || u.name === email) && u.password === pass);

        if (user) {
            loginUser(user);
        } else {
            alert('Invalid credentials!');
            if (email === 'admin') alert('Try password: admin');
        }
    });

    // Signup Handler
    document.getElementById('signup-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const pass = document.getElementById('signup-pass').value;

        if (DB.findUser(u => u.email === email)) {
            alert('Email already exists!');
            return;
        }

        const newUser = {
            id: 'u-' + Date.now(),
            name, email, password: pass, role: 'user'
        };

        DB.saveUser(newUser);
        loginUser(newUser);
    });
}

function loginUser(user) {
    DB.setCurrentUser(user);
    if (user.role === 'admin') {
        window.location.href = 'admin.html';
    } else {
        window.location.href = 'index.html';
    }
}

function logout() {
    localStorage.removeItem('sth_current_user'); // Still using explicit key name for safety during transition if needed, but DB.setCurrentUser(null) is better
    DB.setCurrentUser(null);
    window.location.href = 'login.html';
}

function getCurrentUser() {
    return DB.getCurrentUser();
}

function requireAdmin() {
    const user = getCurrentUser();
    if (!user || user.role !== 'admin') {
        alert('Access Denied. Admins only.');
        window.location.href = 'login.html';
    }
}
