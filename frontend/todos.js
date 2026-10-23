const list = document.getElementById('list');
const API = 'http://localhost:3000';

function getHeaders() {
    const user = JSON.parse(localStorage.getItem('user'));
    return {
        'Content-Type': 'application/json',
        'x-user-id': user ? user.id : ''
    };
}

async function loadTodos() {
    const res = await fetch(`${API}/todos`, { headers: getHeaders() });
    if (res.status === 401) {
        alert('Сессия истекла');
        window.location.href = 'index.html';
        return;
    }
    const data = await res.json();
    list.innerHTML = '';
    data.forEach(todo => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <h3>${todo.title}</h3>
            <p>${todo.description}</p>
            <small>user: ${todo.user_id} | done: ${todo.is_done ? '✅' : '❌'}</small>
            <button class="btn btn-danger" onclick="deleteTodo(${todo.id})">Delete</button>
        `;
        list.appendChild(div);
    });
}

async function addTodo() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const is_done = document.getElementById('is_done').checked;

    const res = await fetch(`${API}/todos/add`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ title, description, is_done })
    });
    if (res.status === 401) {
        alert('Сессия истекла');
        window.location.href = 'index.html';
        return;
    }
    loadTodos();
}

async function deleteTodo(id) {
    await fetch(`${API}/todos/delete/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
    });
    loadTodos();
}

document.addEventListener('DOMContentLoaded', loadTodos);