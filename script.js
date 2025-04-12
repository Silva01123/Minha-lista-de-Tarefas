// 1. Selecionando o formulário e os elementos que vamos usar
const form = document.getElementById('task-form'); 
const input = document.getElementById('task-input'); 
const taskList = document.getElementById('task-list'); 

// 2. Adicionando um evento ao formulário quando ele for enviado (submit)
form.addEventListener('submit', function (event) {
  event.preventDefault(); 

  const taskText = input.value.trim(); 

  // 3. Verifica se o campo está vazio
  if (taskText === '') {
    alert('Por favor, digite uma tarefa.');
    return; 
  }

  // 4. Criar o elemento <li> com a nova tarefa
  const newTask = document.createElement('li'); 
  newTask.textContent = taskText; 

  // 5. Criar botão de remover tarefa
  const removeButton = document.createElement('button'); 
  removeButton.textContent = 'Remover'; 
  removeButton.classList.add('remove-btn'); 

  // 6. Adiciona evento ao botão para remover a tarefa
  removeButton.addEventListener('click', function () {
    taskList.removeChild(newTask); 
  });

  // 7. Adiciona o botão dentro do <li>
  newTask.appendChild(removeButton);

  // 8. Adiciona a tarefa pronta dentro da <ul>
  taskList.appendChild(newTask);

  // 9. Limpa o campo de texto depois de adicionar
  input.value = '';
});
