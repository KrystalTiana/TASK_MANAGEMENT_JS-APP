window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");
  
    // Initialize tasks from localStorage or an empty array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Function to update the list with saved tasks
    function updateTasks() {
      list_el.innerHTML = ''; // Clear the list
      tasks.forEach(task => {
        createTaskElement(task);
      });
    }
  
    // Function to create a task element
    function createTaskElement(taskText) {
      const task_el = document.createElement("div");
      task_el.classList.add("task");
  
      const task_content_el = document.createElement("div");
      task_content_el.classList.add("content");
  
      const task_input_el = document.createElement("input");
      task_input_el.classList.add("text");
      task_input_el.type = "text";
      task_input_el.value = taskText;
      task_input_el.setAttribute("readonly", "readonly");
  
      task_content_el.appendChild(task_input_el);
  
      const task_actions_el = document.createElement("div");
      task_actions_el.classList.add("actions");
  
      const task_edit_el = document.createElement("button");
      task_edit_el.classList.add("edit");
      task_edit_el.innerHTML = "Edit";
  
      const task_delete_el = document.createElement("button");
      task_delete_el.classList.add("delete");
      task_delete_el.innerHTML = "Delete";
  
      task_actions_el.appendChild(task_edit_el);
      task_actions_el.appendChild(task_delete_el);
  
      task_el.appendChild(task_content_el);
      task_el.appendChild(task_actions_el);
  
      list_el.appendChild(task_el);
  
      task_edit_el.addEventListener('click', () => {
        if (task_edit_el.innerText.toLowerCase() == 'edit') {
          task_input_el.removeAttribute("readonly");
          task_input_el.focus();
          task_edit_el.innerText = "Save";
        } else {
          task_input_el.setAttribute("readonly", "readonly");
          task_edit_el.innerText = "Edit";
          // Update the task in the tasks array when edited
          const taskIndex = tasks.indexOf(taskText);
          if (taskIndex !== -1) {
            tasks[taskIndex] = task_input_el.value;
            saveTasks();
          }
        }
      });
  
      task_delete_el.addEventListener('click', () => {
        // Add line-through style to the deleted task
        task_input_el.style.textDecoration = "line-through";
        // Remove the task from the tasks array when deleted
        const taskIndex = tasks.indexOf(taskText);
        if (taskIndex !== -1) {
          tasks.splice(taskIndex, 1);
          saveTasks();
        }
      });
    }
  
    // Event listener to handle form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const task = input.value.trim();
      if (!task) {
        alert("Please fill out the task");
        return;
      }
  
      tasks.push(task);
      saveTasks();
      createTaskElement(task);
  
      input.value = "";
    });
  
    // Initial call to populate tasks
    updateTasks();
  
    // Function to save tasks to localStorage
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  });