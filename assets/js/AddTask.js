const taskContainer = document.getElementById('task-container');

function addNewTask(id){
    console.log(id);
    console.log(taskContainer);
    let input = document.createElement('input')
    input.type="text";
    input.name="TaskName"
    input.placeholder="Task Name"
    input.classList.add("form-control")

    taskContainer.appendChild(input);
}