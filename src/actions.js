export const addTask = (task) => {
    let tasks = JSON.parse(window.localStorage.getItem("Tasks"));
    if (!tasks) {
        tasks = [];
    }

    tasks.push(task);
    window.localStorage.setItem("Tasks", JSON.stringify(tasks));

    return true;
};

export const updateTask = (uTask) => {
    let tasks = JSON.parse(window.localStorage.getItem("Tasks"));

    if (tasks && tasks.length > 0 && uTask && uTask.id) {
        for (let i = 0; i < tasks.length; i++) {
            if (uTask.id === tasks[i].id) {
                tasks.splice(i, 1, uTask);
                break;
            }
        }
    }

    window.localStorage.setItem("Tasks", JSON.stringify(tasks));
    return true;
};



export const removeTasks = (rTasks) => {
    let tasks = JSON.parse(window.localStorage.getItem("Tasks"));

    if (tasks && tasks.length > 0 && rTasks && rTasks.length > 0) {
        for (let j = 0; j < rTasks.length; j++) {
            for (let i = 0; i < tasks.length; i++) {
                if (rTasks[j].id === tasks[i].id) {
                    tasks.splice(i, 1);
                    break;
                }
            }
        }
    }
    window.localStorage.setItem("Tasks", JSON.stringify(tasks));
};

export const getTasks = () => {
    let tasks = JSON.parse(window.localStorage.getItem("Tasks"));


    if (tasks && tasks.length > 0) {
        // Sort the list by due date
        tasks.sort(function (a, b) {
            var dateA = new Date(a.dueDateTime), dateB = new Date(b.dueDateTime);
            return dateA - dateB;
        });

        let openTaks = [], closedTask = [];

        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i]["status"] === "open") {
                openTaks.push(tasks[i]);
            } else {
                closedTask.push(tasks[i]);
            }
        }

        // Sort closed tasks 
        return openTaks.concat(closedTask);;
    } else {
        return [];
    }
};

export const completeAll = () => {
    let tasks = JSON.parse(window.localStorage.getItem("Tasks"));

    if (tasks && tasks.length > 0) {
        for (let i = 0; i < tasks.length; i++) {
            tasks[i]["status"] = "closed";
        }
    }

    window.localStorage.setItem("Tasks", JSON.stringify(tasks));
};

export const idGenerator = () => {
    let id = new Date().getTime() + '' + Math.floor(Math.random() * 100000);
    return id;
}

export const getCurrentDateTimeLocal = () => {

    function addZero(n) {
        return n < 10 ? '0' + n : n;
    }

    let CD = new Date();
    let currentDateTimeLocal = CD.getFullYear() + '-'
        + addZero(CD.getMonth()) + '-'
        + addZero(CD.getDate()) + 'T'
        + addZero(CD.getHours()) + ':'
        + addZero(CD.getMinutes()) + ':'
        + addZero(CD.getSeconds());
    return currentDateTimeLocal;
}

