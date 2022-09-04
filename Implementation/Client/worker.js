const {Client, logger, Variables} = require("camunda-external-task-client-js");
const config = { baseUrl: 'https://camunda.matmacsystem.it/engine-rest', use: logger, asyncResponseTimeout: 10000 };
const mqtt = require('mqtt');
// create a Client instance with custom configuration
const client = new Client(config);

var RESTClient = require("node-rest-client").Client;
var restclient = new RESTClient();

function hasSubArray(source, dest) {
    var c =  source.filter(i => dest.includes(i));
    return c.length !== 0;
}

function loadDisease(disease){
    return new Promise((resolve, reject) =>
    {
        var args = {
            headers: { "Content-Type": "application/json" },
        };
        restclient.get(
            "http://localhost:9090/api/v1/disease/" + disease.id,
            args,
            function (data, response) {
                var forbidden_food = [];
                if (response.statusCode === 200) {
                    data.forbidden_food.forEach(food => {
                        if (!forbidden_food.includes(food.id)) {
                            forbidden_food.push(food.id);
                        }
                    });
                }
                resolve(forbidden_food);
            }
        )
    });
}

client.subscribe('get-menu', async function({ task, taskService }) {

    const processVariables = new Variables();
    const menu = [
        {
            "id": 0,
            "name": "Pasta al pomodoro",
            "food": [10,15,30,20],
            "meal": "lunch"
        },
        {
            "id": 1,
            "name": "Torta",
            "food": [10,11],
            "meal": "dinner"
        },
        {
            "id": 2,
            "name": "Verdure",
            "food": [12,13],
            "meal": "breakfast"
        },
        {
            "id": 3,
            "name": "Pane integrale",
            "food": [20,21],
            "meal": "breakfast"
        }
    ];
    processVariables.set("menu", menu);

    console.log(`Loaded menu`);

    // Complete the task
    await taskService.complete(task, processVariables);
});

client.subscribe('verify-cf', async function({ task, taskService }) {
    var cf = task.variables.get('cf');
    const hId = task.variables.get('hid');
    console.log("Given fiscal code: " + cf);

    const processVariables = new Variables();
    var args = {
        data: { fiscal_code: cf, structure_id: hId },
        headers: { "Content-Type": "application/json" },
    };
    restclient.post(
        "http://localhost:9090/api/v1/patient/verify",
        args,
        function (data, response) {
            console.log("> Response: " + response.statusCode);
            if(response.statusCode === 200) {
                // parsed response body as js object
                processVariables.set("pid", data.id);
                // raw response
                console.log("Received patient id: " + data.id);
                // Complete the task
                taskService.complete(task, processVariables);
            } else if(response.statusCode === 404) {
                taskService.handleBpmnError(task, "404", "Invalid fiscal code");
            } else {
                taskService.handleBpmnError(task, "400", "An error occurred");
            }
        }
    );
    //taskService.complete(task, processVariables);
});

client.subscribe('cf-error', async function({task, taskService}){
    console.log("Error in CF Validation");
    await taskService.complete(task);
});

client.subscribe('filter-by-pid', async function({ task, taskService }) {
    var pid = task.variables.get('pid');
    var menu = task.variables.get('menu');
    var args = {
        headers: { "Content-Type": "application/json" },
    };
    const processVariables = new Variables();
    var forbidden_food = [];
    let requests = [];

    restclient.get(
        "http://localhost:9090/api/v1/patient/"+pid+"/diseases",
        args,
        function (data, response) {
            console.log("> Response: " + response.statusCode);
            if(response.statusCode === 200) {
                console.log(JSON.stringify(data))
                data.forEach(disease => {
                    requests.push(loadDisease(disease));
                });
                Promise.all(requests).then((allRes) => {
                    allRes.forEach(subArr => {
                       subArr.forEach(el => {
                           if (!forbidden_food.includes(el)) {
                               forbidden_food.push(el);
                           }
                       });
                    });
                    console.log("Forbidden: " + JSON.stringify(forbidden_food));
                    console.log("Menu: " + JSON.stringify(menu));
                    var filtered = menu.filter(m => !hasSubArray(m.food, forbidden_food));
                    console.log("Filtered: " + JSON.stringify(filtered))
                    processVariables.set("filtered_menu", filtered);
                    // Complete the task
                    taskService.complete(task, processVariables);
                });
            } else {
                taskService.handleBpmnError(task, "400", "Patient not found");
            }
        }
    );
});

client.subscribe('filtered-menu-send', async function({ task, taskService }) {
    const client = mqtt.connect('mqtt://server.matmacsystem.it:1883', {
        clientId: '',
        clean: true,
        connectTimeout: 4000,
        reconnectPeriod: 1000,
    });
    client.on('connect', () => {
        client.publish('camunda/order/request', JSON.stringify(task.variables.get('filtered_menu')), { qos: 0, retain: false }, (error) => {
            if (error) {
                console.error(error)
            }
        });
    });
    await taskService.complete(task);
});

client.subscribe('invalid-order-send', async function({task, taskService}){
    await taskService.complete(task);
});

client.subscribe('order-confirmation', async function({task, taskService}){
    console.log("Order confirmation sent");
    await taskService.complete(task);
});

client.subscribe('expired-session-send', async function({task, taskService}){
    console.log("Session expired, message sent");
    await taskService.complete(task);
});