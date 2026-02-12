// PIPELINE SIMULATION
async function startPipeline() {
  const stages = ["code", "build", "test", "deploy"];

  for (let stage of stages) {
    let element = document.getElementById(stage);
    element.classList.add("active");
    await new Promise(r => setTimeout(r, 1000));
    element.classList.remove("active");
    element.classList.add("success");
  }

  addLog("Deployment completed successfully 🚀");
}

// METRICS CHART
const ctx = document.getElementById('metricsChart');
const metricsChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'CPU Usage %',
      data: [],
      borderColor: '#3b82f6'
    }]
  },
  options: {
    responsive: true,
    animation: false
  }
});

function updateMetrics() {
  const time = new Date().toLocaleTimeString();
  const value = Math.floor(Math.random() * 80) + 10;

  metricsChart.data.labels.push(time);
  metricsChart.data.datasets[0].data.push(value);

  if (metricsChart.data.labels.length > 10) {
    metricsChart.data.labels.shift();
    metricsChart.data.datasets[0].data.shift();
  }

  metricsChart.update();
}

setInterval(updateMetrics, 2000);

// LOG STREAM
const logs = [
  "Pulling latest Docker image...",
  "Running unit tests...",
  "Container started successfully.",
  "Health check passed.",
  "Autoscaler evaluated metrics.",
  "Scaling replica set..."
];

function addLog(message) {
  const logStream = document.getElementById("logStream");
  const logEntry = document.createElement("div");
  logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
  logStream.appendChild(logEntry);
  logStream.scrollTop = logStream.scrollHeight;
}

setInterval(() => {
  const randomLog = logs[Math.floor(Math.random() * logs.length)];
  addLog(randomLog);
}, 3000);

// KUBERNETES SCALING
let podCount = 3;

function scaleUp() {
  podCount++;
  document.getElementById("pods").textContent = podCount;
  addLog("Scaled up pod count.");
}

function scaleDown() {
  if (podCount > 1) {
    podCount--;
    document.getElementById("pods").textContent = podCount;
    addLog("Scaled down pod count.");
  }
}
