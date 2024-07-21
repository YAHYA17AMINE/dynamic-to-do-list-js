document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function addTask(taskText = taskInput.value.trim(), save = true) {
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

       
        const li = document.createElement('li');
        li.textContent = taskText;

      
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');

      
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            removeTaskFromLocalStorage(taskText);
        };

      
        li.appendChild(removeBtn);

   
        taskList.appendChild(li);

    
        taskInput.value = "";

    
        if (save) {
            saveTaskToLocalStorage(taskText);
        }
    }

    function saveTaskToLocalStorage(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function removeTaskFromLocalStorage(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(task => addTask(task, false));
    }


    loadTasks();


    addButton.addEventListener('click', () => addTask());

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
