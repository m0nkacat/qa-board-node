
async function loadQuestions() {
    const res = await fetch('http://localhost:3000/questions');
    const data = await res.json();

    console.log('QUESTIONS:', data);
}

async function addQuestion() {
    await fetch('http://localhost:3000/questions/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: 'Test question',
            description: 'some text',
            user_id: 1
        })
    });

    loadQuestions();
}


async function loadTags() {
    const res = await fetch('http://localhost:3000/tags');
    const data = await res.json();
    console.log('TAGS:', data);
}

async function addTag() {
    await fetch('http://localhost:3000/tags/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'javascript'
        })
    });

    loadTags();
}


async function loadTodos() {
    const res = await fetch('http://localhost:3000/todos');
    const data = await res.json();
    console.log('TODOS:', data);
}

async function addTodo() {
    await fetch('http://localhost:3000/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user_id: 1,
            title: 'Do homework',
            description: 'math task'
        })
    });

    loadTodos();
}