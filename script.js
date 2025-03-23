const form = document.getElementById('form')
const input = document.getElementById('input')
const activeTodosUL = document.getElementById('active-todos')
const completedTodosUL = document.getElementById('completed-todos')

const todos = JSON.parse(localStorage.getItem('todos')) || { active: [], completed: [] }

// Load saved todos
if(todos.active) {
  todos.active.forEach(todo => addTodo(todo, false))
}
if(todos.completed) {
  todos.completed.forEach(todo => addTodo(todo, true))
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  addTodo()
})

function addTodo(todo, isCompleted = false) {
  let todoText = input.value 

  if(todo) {
    todoText = todo.text
  }

  if(todoText) {
    const todoEl = document.createElement('li')
    todoEl.innerText = todoText

    // Add click event to toggle completion
    todoEl.addEventListener('click', () => {
      if (!todoEl.classList.contains('completed')) {
        todoEl.classList.add('completed')
        activeTodosUL.removeChild(todoEl)
        completedTodosUL.appendChild(todoEl)
        updateLS()
      }
    })

    // Add right-click event to delete
    todoEl.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      todoEl.remove()
      updateLS()
    })

    // Add to appropriate list
    if (isCompleted) {
      todoEl.classList.add('completed')
      completedTodosUL.appendChild(todoEl)
    } else {
      activeTodosUL.appendChild(todoEl)
    }

    input.value = ''
    updateLS()
  }
}

function updateLS() {
  const activeTodos = Array.from(activeTodosUL.children).map(todoEl => ({
    text: todoEl.innerText,
    completed: false
  }))

  const completedTodos = Array.from(completedTodosUL.children).map(todoEl => ({
    text: todoEl.innerText,
    completed: true
  }))

  localStorage.setItem('todos', JSON.stringify({
    active: activeTodos,
    completed: completedTodos
  }))
}