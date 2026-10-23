const list = document.getElementById('list');
const API = 'http://localhost:3000';

function getHeaders() {
    const user = JSON.parse(localStorage.getItem('user'));
    return {
        'Content-Type': 'application/json',
        'x-user-id': user ? user.id : ''
    };
}

async function loadQuestions() {
    const res = await fetch(`${API}/questions`, { headers: getHeaders() });
    if (res.status === 401) {
        alert('Сессия истекла');
        window.location.href = 'index.html';
        return;
    }
    const data = await res.json();
    list.innerHTML = '';
    data.forEach(q => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <h3>${q.title}</h3>
            <p>${q.description}</p>
            <small>user: ${q.user_id}</small>
            <button class="btn btn-danger" onclick="deleteQ(${q.id})">Delete</button>
        `;
        list.appendChild(div);
    });
}

async function addQuestion() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    const res = await fetch(`${API}/questions/add`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ title, description })
    });
    if (res.status === 401) {
        alert('Сессия истекла');
        window.location.href = 'index.html';
        return;
    }
    loadQuestions();
}

async function deleteQ(id) {
    await fetch(`${API}/questions/delete/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
    });
    loadQuestions();
}

document.addEventListener('DOMContentLoaded', loadQuestions);