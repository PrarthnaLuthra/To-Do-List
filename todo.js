(function() {
    let tasks = [];
    const tasksList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');
    
    
    async function fetchTodos(){
        // GET REQUEST
    // fetch('https://jsonplaceholder.typicode.com/todos')
    //     .then(function(response){
    //     return response.json();
    // }).then (function(data){
    //     tasks=data.slice(0,10);
    //     renderList();
    // })
    // .catch(function(error){
    // console.log('error',error);
    // })
    try{
    
          const response =await fetch('https://jsonplaceholder.typicode.com/todos');
          const data = await response.json();
          tasks= data.slice(0,10);
          renderList();
    }catch(error){
    console.log(error);
    }
    }
    
    
    function addTasktoDOM(task){
        const li = document.createElement('li');
        li.innerHTML= `
        
        <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
        <label for="${task.id}">${task.title}</label>
        <img src="media/bin.svg" class="delete" data-id="${task.id}"  />
      
      `;
      tasksList.append(li);
    }
    
    function renderList () {
        tasksList.innerHTML='';
         for(let i=0;i<tasks.length; i++){
             addTasktoDOM(tasks[i]);
    
         }
         tasksCounter.innerHTML =tasks.length;
    }
    
    function toggleTask (taskId) {
    
      const task = tasks.filter(function(task){
            return task.id === Number (taskId);
    
        });
        if(task.length>0){
            const currentTask = task[0];
            currentTask.completed =!currentTask.completed;
            renderList();
            // Swal.fire(
            //     'Task Toggled Succesfully!'
            //   )
             showNotification('Task Toggled Succesfully!');
            return;
        }
       
        showNotification('Oops! Something Went Wrong! Could not toggle the task');
        
    }
    
    function deleteTask (taskId) {
        const newTasks = tasks.filter(function(task){
            return task.id !== Number(taskId);
    
        })
        tasks=newTasks;
        renderList();
        showNotification('You deleted the task successfully!!')
    }
    
    function addTask (task) {
        // if the task is present, it is pushed in to the task array! 
        if(task){
      
            tasks.push(task);
            renderList();
            showNotification('HII! You have added a task to your list successfully');
            return;
        }
        showNotification('OOPS! the task can not be added') 
    
    
    }
    
    function showNotification(text) {
        alert(text);
    }
    
    // To handle whatever the user is typing, basically to grab the input text of the user
    function handleInputKeypress(e){
        if(e.key=='Enter'){
            const text = e.target.value;
           
            if(!text){
                showNotification('Hey! The text cannot be empty!');
                return
            }
            const task ={
                title:text,
                id: Date.now(),
                completed: false
            }
            // once the user presses enter input box is empty and ask task is called  
    
            e.target.value = ''; 
            addTask(task);
    
    
        }
    }  
    
    // adding eventListener to input
    function handleClickListener(e){
        const target=e.target;
    
        if (target.className == 'delete'){
            const taskId = target.dataset.id;
            deleteTask(taskId);
            return;
    
        }else if(target.className == 'custom-checkbox'){
            const taskId = target.id;
            toggleTask(taskId);
            return;
    
        }
        
    
    }
    function initializeApp(){
        fetchTodos()
        addTaskInput.addEventListener('keyup',handleInputKeypress)
        document.addEventListener('click', handleClickListener)
    }
    initializeApp(); 
})()




