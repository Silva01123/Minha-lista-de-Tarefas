const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('.filter-btn');

let currentFilter = 'all'; // pode ser: all, completed, pending

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#task-list li').forEach(li => {
    const text = li.firstChild.textContent.trim();
    const completed = li.classList.contains('completed');
    tasks.push({ text, completed });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => createTask(task.text, task.completed));
}

function createTask(taskText, isCompleted = false) {
  const newTask = document.createElement('li');
  newTask.textContent = taskText;
  newTask.classList.add('task-enter');
  if (isCompleted) newTask.classList.add('completed');

  newTask.addEventListener('click', function () {
    newTask.classList.toggle('completed');
    saveTasks();
    applyFilter(); // atualiza a exibição após marcar/desmarcar
  });

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remover';
  removeButton.classList.add('remove-btn');

  removeButton.addEventListener('click', function (event) {
    event.stopPropagation();
    newTask.classList.add('task-exit-active');
    newTask.classList.remove('task-enter', 'task-enter-active');
    setTimeout(() => {
      taskList.removeChild(newTask);
      saveTasks();
    }, 400);
  });

  newTask.appendChild(removeButton);
  taskList.appendChild(newTask);

  requestAnimationFrame(() => {
    newTask.classList.add('task-enter-active');
  });

  saveTasks();
  applyFilter(); // aplica o filtro após adicionar
}

// Aplica o filtro atual
function applyFilter() {
  const tasks = document.querySelectorAll('#task-list li');
  tasks.forEach(task => {
    const isCompleted = task.classList.contains('completed');

    if (
      currentFilter === 'all' ||
      (currentFilter === 'completed' && isCompleted) ||
      (currentFilter === 'pending' && !isCompleted)
    ) {
      task.style.display = 'flex';
    } else {
      task.style.display = 'none';
    }
  });
}

// Troca o filtro ao clicar nos botões
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    applyFilter();
  });
});

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const taskText = input.value.trim();
  if (taskText === '') {
    alert('Por favor, digite uma tarefa.');
    return;
  }
  createTask(taskText);
  input.value = '';
});

loadTasks();
