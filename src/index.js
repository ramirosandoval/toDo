let taskList = document.querySelector("#current-project").querySelector("#tasks-list");
let selectedTask = "";

const giveEventListenerTo_MainAddTaskButton = () =>{
    const addTaskButton = document.querySelector("#current-project").querySelector("#add-toDo-button");
    
    addTaskButton.addEventListener("click", showForm);
}

const giveEventListenerTo_CancelFormButton = () =>{
    const cancelButton = document.getElementById("cancel-form-button");
    cancelButton.addEventListener("click", hideForm);
}

const giveEventListenerTo_AddTaskFormButton = () =>{
    const addTaskFormButton = document.querySelector(".add-element");

    addTaskFormButton.addEventListener("click", addNewTask);
}

const giveEventListenerTo_ExpandButtons = () =>{
    const expandButton = document.querySelectorAll(".expand-option");
    
    for (let i = 0; i < expandButton.length; i++) {
        expandButton[i].addEventListener("click", showComment);
    }
}

const giveEventListenerToEditTaskButtons = () =>{
    const editTaskButton = document.querySelectorAll(".edit-option");

    for (let i = 0; i < editTaskButton.length; i++) {
        editTaskButton[i].addEventListener("click", showEditForm);
    }
}

const giveEventListenerTo_RemoveTaskButtons = () =>{
    const removeTaskButton = document.querySelectorAll(".delete-option");

    for (let i = 0; i < removeTaskButton.length; i++) {
        removeTaskButton[i].addEventListener("click", eraseSelectedTask);
    }
}

const giveEventListenerToStarButton = () =>{
    const starButtons = document.querySelectorAll(".star-task");

    for (let i = 0; i< starButtons.length; i++) {
        starButtons[i].addEventListener("click", makeTaskImportantIfItsNot);
    }
}

const giveEventListenerToEditFormButtons = () =>{
    const cancelFormButton = document.querySelector("#cancel-edit-form-button");
    const editTaskButton = document.querySelector("#edit-task-form-button");

    cancelFormButton.addEventListener("click", hideEditForm);
    editTaskButton.addEventListener("click", editSelectedTask);
}

const giveEventListenerToIsDoneButton = () =>{
    const taskIsDoneButton = document.querySelectorAll(".task-is-done");

    for (let i = 0; i< taskIsDoneButton.length; i++){
        taskIsDoneButton[i].addEventListener("click", selectedTaskIsDone);
    }
}

const giveEventListenerToIsDoneSymbol = () =>{
    const isDoneSymbol = document.querySelectorAll("#isDoneSymbol");

    for (let i = 0; i < isDoneSymbol.length; i++) {
        isDoneSymbol[i].addEventListener("click", taskIsNotDone);
    }
}

const giveEventListenerTo_AddNewCategoryButton = () =>{
    const addNewCategoryButton = document.querySelector("#add-category");

    addNewCategoryButton.addEventListener("click", showNewCategoryForm);
}

const giveEventListenerTo_CancelNewCategoryButton = () =>{
    const cancelNewCategoryButton = document.querySelector("#cancel-new-category-form-button");

    cancelNewCategoryButton.addEventListener("click", hideNewCategoryForm);
}

const giveEventListenerTo_CreateNewCategoryButton = () =>{
    const cancelNewCategoryButton = document.querySelector("#create-new-category-form-button");

    cancelNewCategoryButton.addEventListener("click", createNewCategory);
}

const giveEventListenerToCategories = () =>{
    const categories = document.querySelectorAll(".categories")
    
    for (let i = 0; i < categories.length; i++) {

        if (categories[i].id == "category-selected") {
            categories[i].removeEventListener("click", showSelectedCategory);   
        }else{
            categories[i].addEventListener("click", showSelectedCategory);   
        }
    }
 }

const giveEventListenerToButtons = () =>{ ////////////////////////
    giveEventListenerTo_MainAddTaskButton();

    giveEventListenerTo_CancelFormButton();
    giveEventListenerTo_AddTaskFormButton();

    giveEventListenerTo_ExpandButtons();
    giveEventListenerToEditTaskButtons();
    giveEventListenerTo_RemoveTaskButtons();

    giveEventListenerToEditFormButtons();
    giveEventListenerToStarButton();
    giveEventListenerToIsDoneButton();
    giveEventListenerToIsDoneSymbol();

    giveEventListenerTo_AddNewCategoryButton();    
    giveEventListenerTo_CancelNewCategoryButton();
    giveEventListenerTo_CreateNewCategoryButton();
}

const taskGetsUserInputAsValue = (task) =>{

    const taskTitle = task.querySelector(".toDo-title");
    const taskComment = task.querySelector(".task-comment");

    const titleInput = document.querySelector(".title-input");
    const commentUserInput = document.querySelector(".comment-textarea");

    taskTitle.textContent = titleInput.value;
    taskComment.textContent = commentUserInput.value;
}

const restartFormValues = () =>{
    const titleInput = document.querySelector(".title-input");
    const commentUserInput = document.querySelector(".comment-textarea");

    commentUserInput.value = "";
    titleInput.value = "";
}

const showForm = () =>{
    const hiddenForm = document.querySelector("#add-task-hidden-form-section");
    
    hiddenForm.style.display = "flex";
}

const hideForm = () =>{
    restartFormValues();

    const hiddenForm = document.querySelector("#add-task-hidden-form-section");
    hiddenForm.style.display = "none";
}

const addNewTask = () =>{
    const task = document.querySelector("#prototype-task").cloneNode(true);

    task.style.display = "block";
    taskGetsUserInputAsValue(task);    
    taskList.appendChild(task);
    console.log(taskList.lastElementChild);

    
    hideForm();
    giveEventListenerToButtons();
}

const showComment = (e) =>{
    let commentDisplay = e.target.closest(".task-container-element").querySelector(".comment-container").style.display;

    if(commentDisplay == "none"){
        e.target.closest(".task-container-element").querySelector(".comment-container").style.display = "block";
    }else{
        e.target.closest(".task-container-element").querySelector(".comment-container").style.display = "none";
    }
}

const showEditForm = (e) =>{
    selectedTask = e.target.closest(".task-container-element");

    const hiddenEditForm = document.getElementById("hidden-edit-form-section");
    const hiddenEditFormTitle = hiddenEditForm.querySelector(".title-input");
    const hiddenEditFormComment = hiddenEditForm.querySelector(".comment-textarea");

    const titleInput = e.target.closest(".task-container-element").querySelector(".toDo-title");
    const commentUserInput = e.target.closest(".task-container-element").querySelector(".task-comment");

    hiddenEditFormTitle.value = titleInput.textContent;
    hiddenEditFormComment.value = commentUserInput.textContent;

    hiddenEditForm.style.display = "flex";
}

const hideEditForm = (e) =>{
    const editForm = e.target.closest("#hidden-edit-form-section");

    editForm.style.display = "none";
}

const editSelectedTask = (e) =>{
    const editedTitle = e.target.closest("#hidden-edit-form-section").querySelector(".title-input").value;
    const editedComment = e.target.closest("#hidden-edit-form-section").querySelector(".comment-textarea").value


    selectedTask.querySelector(".toDo-title").textContent = editedTitle;
    selectedTask.querySelector(".task-comment").textContent= editedComment;

    hideEditForm(e);
}

const eraseSelectedTask = (e) =>{
    e.target.closest(".task-container-element").remove();
}

const makeTaskImportantIfItsNot = (e) =>{

    if(e.target.innerHTML == "star"){
        e.target.innerHTML = "star_border";
        e.target.style.color = "";

    }else{
        e.target.style.color = "gold";
        e.target.innerHTML = "star";
    }
}

const selectedTaskIsDone = (e) =>{
    const isDoneSymbol = e.target.closest(".task").querySelector("#isDoneSymbol");
    const isDoneButton = e.target.closest(".task-is-done");

    isDoneButton.style.display = "none";
    isDoneSymbol.style.display = "block";
} 

const taskIsNotDone = (e) =>{
    const isDoneSymbol = e.target;
    const isDoneButton = e.target.closest(".task").querySelector(".task-is-done");

    isDoneButton.style.display = "block";
    isDoneSymbol.style.display = "none";
}

const showNewCategoryForm = () =>{
    const newCategoryForm = document.querySelector("#hidden-new-category-form");

    newCategoryForm.style.display = "block";
}

const hideNewCategoryForm = () =>{
    const newCategoryForm = document.querySelector("#hidden-new-category-form");

    newCategoryForm.style.display = "none";
}

const addNewCategoryToSidebarProjectsList = (newCategory) =>{
    const sidebarList = document.querySelector("#categories-list");
    const newCategoryListElement = document.querySelector(".prototype-category-list-element").cloneNode(true);
    const previousCategoryListElement = sidebarList.querySelector("#category-selected");

    previousCategoryListElement.removeAttribute("id");
    newCategoryListElement.textContent = newCategory.querySelector("#current-project-title").textContent;
    newCategoryListElement.style.display = "list-item";
    sidebarList.appendChild(newCategoryListElement);   
}

const createNewCategory = (e) =>{
    const newCategoryTitle = document.querySelector("#new-category-title-input").value;
    const newCategory = document.querySelector(".prototype-to-do").cloneNode(true);
    const mainContainer = document.querySelector("#main-container");
    const previousCategory = mainContainer.querySelector("#current-project");
    const previousCategoryName = previousCategory.querySelector("#current-project-title").textContent;

    previousCategory.style.display = "none";
    previousCategory.removeAttribute("id");
    previousCategory.setAttribute("id", previousCategoryName);

    mainContainer.appendChild(newCategory);
    mainContainer.lastElementChild.setAttribute("id", "current-project");
    newCategory.querySelector("#current-project-title").textContent = newCategoryTitle;

    giveEventListenerTo_MainAddTaskButton();
    addNewCategoryToSidebarProjectsList(newCategory);
    hideNewCategoryForm();
    giveEventListenerToCategories();
}

const showSelectedCategory = (e) =>{
    const selectedCategoryId = e.target.textContent;
    const selectedCategory = document.getElementById(selectedCategoryId);
    const currentCategory = document.querySelector("#current-project");
    const sidebar = document.querySelector("#categories-left-sidebar");
    const currentCategorySidebarElement = sidebar.querySelector("#category-selected");
    const currentCategorySidebarElementName = currentCategorySidebarElement.textContent;
    const selectedCategorySidebarElement = e.target;
    
    currentCategory.removeAttribute("id");
    currentCategory.setAttribute("id", currentCategorySidebarElementName);
    currentCategory.style.display = "none";
    currentCategorySidebarElement.removeAttribute("id");

    selectedCategorySidebarElement.setAttribute("id", "category-selected");
    selectedCategory.setAttribute("id", "current-project");
    console.log(selectedCategory);
    giveEventListenerToCategories();
    taskList = document.querySelector("#current-project").querySelector("#tasks-list");
}

giveEventListenerToButtons();