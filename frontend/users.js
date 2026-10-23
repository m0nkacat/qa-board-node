const list = document.getElementById('list');
const API = 'http://localhost:3000';

function getHeaders() {
    const user = JSON.parse(localStorage.getItem('user'));
    return {
        'Content-Type': 'application/json',
        'x-user-id': user ? user.id : ''
    };
}

async function loadUsers() {
    try {
        const res = await fetch(`${API}/users`, { headers: getHeaders() });
        if (res.status === 401) {
            alert('Сессия истекла');
            window.location.href = 'index.html';
            return;
        }
        const data = await res.json();
        list.innerHTML = '';
        data.forEach(u => {
            const div = document.createElement('div');
            div.className = 'card';
            div.innerHTML = `
                <h3>${u.full_name}</h3>
                <p>${u.email}</p>
                <small>login: ${u.login} | role: ${u.role}</small>
                <button class="btn btn-danger" onclick="deleteUser(${u.id})">Delete</button>
            `;
            list.appendChild(div);
        });
    } catch (err) {
        console.error(err);
    }
}

async function addUser() {
    const full_name = document.getElementById('full_name').value;
    const email = document.getElementById('email').value;
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value || 'user';

    const res = await fetch(`${API}/users/add`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ full_name, email, login, password, role })
    });
    if (res.status === 401) {
        alert('Сессия истекла');
        window.location.href = 'index.html';
        return;
    }
    loadUsers();
}

async function deleteUser(id) {
    await fetch(`${API}/users/delete/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
    });
    loadUsers();
}

document.addEventListener('DOMContentLoaded', loadUsers);