const API = 'http://localhost:3000';

function saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

function getUser() {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
}

function showUI() {
    const user = getUser();
    const guestBlock = document.getElementById('guestBlock');
    const userBlock = document.getElementById('userBlock');
    const logoutBtn = document.getElementById('logoutBtn');
    const statusMessage = document.getElementById('statusMessage');

    if (user) {
        guestBlock.style.display = 'none';
        userBlock.style.display = 'block';
        logoutBtn.style.display = 'inline-block';
        statusMessage.textContent = `Привет, ${user.full_name}!`;
    } else {
        guestBlock.style.display = 'block';
        userBlock.style.display = 'none';
        logoutBtn.style.display = 'none';
        statusMessage.textContent = 'Войдите или зарегистрируйтесь';
    }
}

async function register() {
    const full_name = document.getElementById('reg_full_name').value.trim();
    const email = document.getElementById('reg_email').value.trim();
    const login = document.getElementById('reg_login').value.trim();
    const password = document.getElementById('reg_password').value;

    if (!full_name || !email || !login || !password) {
        alert('Заполни все поля, брат');
        return;
    }

    const res = await fetch(`${API}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name, email, login, password })
    });
    const data = await res.json();
    if (res.ok) {
        saveUser(data.user);
        showUI();
    } else {
        alert(data.error);
    }
}

async function login() {
    const login = document.getElementById('reg_login').value.trim();
    const password = document.getElementById('reg_password').value;

    if (!login || !password) {
        alert('Логин и пароль не могут быть пустыми');
        return;
    }

    const res = await fetch(`${API}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password })
    });
    const data = await res.json();
    if (res.ok) {
        saveUser(data.user);
        showUI();
    } else {
        alert(data.error);
    }
}

function logout() {
    localStorage.removeItem('user');
    showUI();
}

document.addEventListener('DOMContentLoaded', showUI);