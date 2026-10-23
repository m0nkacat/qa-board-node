const list = document.getElementById('list');
const API = 'http://localhost:3000';

function getHeaders() {
    const user = JSON.parse(localStorage.getItem('user'));
    return {
        'Content-Type': 'application/json',
        'x-user-id': user ? user.id : ''
    };
}

async function loadTags() {
    const res = await fetch(`${API}/tags`, { headers: getHeaders() });
    if (res.status === 401) {
        alert('Сессия истекла');
        window.location.href = 'index.html';
        return;
    }
    const data = await res.json();
    list.innerHTML = '';
    data.forEach(t => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <h3>${t.name}</h3>
            <button class="btn btn-danger" onclick="deleteTag(${t.id})">Delete</button>
        `;
        list.appendChild(div);
    });
}

async function addTag() {
    const name = document.getElementById('name').value;
    const res = await fetch(`${API}/tags/add`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ name })
    });
    if (res.status === 401) {
        alert('Сессия истекла');
        window.location.href = 'index.html';
        return;
    }
    loadTags();
}

async function deleteTag(id) {
    await fetch(`${API}/tags/delete/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
    });
    loadTags();
}

document.addEventListener('DOMContentLoaded', loadTags);