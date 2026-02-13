// LOGIN
function login() {

const user = document.getElementById("username").value;
const pass = document.getElementById("password").value;

if(user && pass) {

document.getElementById("loginScreen").classList.add("hidden");
document.getElementById("dashboard").classList.remove("hidden");

startMetrics();
startTerminal();

}

}

// METRICS
let chart;

function startMetrics(){

const ctx = document.getElementById("metricsChart");

chart = new Chart(ctx, {

type: "line",

data: {

labels: [],

datasets: [

{
label: "CPU %",
data: [],
borderColor: "cyan"
},

{
label: "Memory %",
data: [],
borderColor: "orange"
}

]

}

});

setInterval(updateMetrics,2000);

}

function updateMetrics(){

const time = new Date().toLocaleTimeString();

chart.data.labels.push(time);

chart.data.datasets[0].data.push(rand());
chart.data.datasets[1].data.push(rand());

if(chart.data.labels.length>10){

chart.data.labels.shift();

chart.data.datasets.forEach(d=>d.data.shift());

}

chart.update();

}

function rand(){

return Math.floor(Math.random()*80)+10;

}

// DEPLOYMENT
async function startDeployment(){

await stage("code");
await stage("build");
await stage("test");
await stage("deploy");

terminal("Deployment successful");

}

async function stage(id){

const el=document.getElementById(id);

el.classList.add("active");

await sleep(1000);

el.classList.remove("active");

el.classList.add("success");

}

function rollback(){

terminal("Rolling back deployment...");
setHealth("yellow");

setTimeout(()=>{
terminal("Rollback completed");
setHealth("green");
},2000);

}

function simulateError(){

terminal("Deployment failed!");

document.getElementById("deploy").classList.add("failed");

setHealth("red");

}

// HEALTH
function setHealth(color){

const env=document.getElementById("envStatus");

env.className="status "+color;

env.innerText=color.toUpperCase();

}

// TERMINAL
function startTerminal(){

setInterval(()=>{

terminal(randomLog());

},3000);

}

function terminal(msg){

const t=document.getElementById("terminal");

t.innerHTML+=msg+"<br>";

t.scrollTop=t.scrollHeight;

}

function randomLog(){

const logs=[

"Pulling container...",
"Scaling pods...",
"Health check passed",
"Monitoring metrics",
"Sync complete"

];

return logs[Math.floor(Math.random()*logs.length)];

}

// CLUSTER SWITCH
function switchCluster(cluster){

terminal("Switched to "+cluster+" cluster");

setHealth("green");

}

function sleep(ms){

return new Promise(r=>setTimeout(r,ms));

}
