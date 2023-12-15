// // app.js

// // Webcomponent definities
// class ChartElement extends HTMLElement {
//     constructor() {
//       super();
//       this.attachShadow({ mode: 'open' });
//     }
  
//     connectedCallback() {
//       this.shadowRoot.innerHTML = `
//         <style>
//           chart-element {
//             width: 100%;
//             height: 300px;
//           }
//           canvas {
//             width: 100%;
//             height: 100%;
//           }
//         </style>
//         <canvas id="chartCanvas"></canvas>
//       `;
  
//       this.chartCanvas = this.shadowRoot.getElementById('chartCanvas');
//       this.ctx = this.chartCanvas.getContext('2d');
//       this.chartData = [];
//       this.drawChart();
//     }
  
//     drawChart() {
//       this.ctx.clearRect(0, 0, this.chartCanvas.width, this.chartCanvas.height);
  
//       this.ctx.beginPath();
//       this.ctx.moveTo(0, this.chartCanvas.height);
//       for (let i = 0; i < this.chartData.length; i++) {
//         const x = (i / this.chartData.length) * this.chartCanvas.width;
//         const y = this.chartCanvas.height - (this.chartData[i] / 150) * this.chartCanvas.height;
//         this.ctx.lineTo(x, y);
//       }
//       this.ctx.stroke();
//     }
  
//     updateChartData(data) {
//       this.chartData.push(data);
  
//       if (this.chartData.length > 100) {
//         this.chartData.shift();
//       }
  
//       this.drawChart();
//     }
//   }
  
//   customElements.define('chart-element', ChartElement);
  
//   // Simulated SerialPort class
//   class SimulatedSerialPort {
//     constructor() {
//       this.listeners = [];
//     }
  
//     async requestPort() {
//       return this; // Return self for simplicity in this example
//     }
  
//     async open() {
//       // Simulate opening the port
//     }
  
//     addEventListener(type, listener) {
//       this.listeners.push({ type, listener });
//     }
  
//     simulateData(data) {
//       // Simulate receiving data
//       this.listeners.forEach(({ type, listener }) => {
//         if (type === 'data') {
//           listener({ value: data, done: false });
//         }
//       });
//     }
//   }
  
//   // Web Serial API setup
//   const baudRate = 9600; // Set the baud rate according to your device
//   const serialPort = new SimulatedSerialPort(); // Use the simulated serial port
  
//   // Open the serial port
//   async function connectSerial() {
//     try {
//       await serialPort.requestPort();
//       await serialPort.open({ baudRate });
  
//       // Simulate receiving dummy data
//       setInterval(() => {
//         const dummyHeartRate = Math.floor(Math.random() * 100) + 60; // Simulate heart rate data
//         serialPort.simulateData(dummyHeartRate);
//         document.getElementById('heartRateChart').updateChartData(dummyHeartRate);
//       }, 1000);
//     } catch (error) {
//       console.error('Error opening simulated serial port:', error);
//     }
//   }
  
//   document.addEventListener('DOMContentLoaded', connectSerial);
  

// app.js
class ChartElement extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.shadowRoot.innerHTML = `
        <style>
          chart-element {
            width: 100%;
            height: 300px;
          }
          canvas {
            width: 100%;
            height: 100%;
          }
        </style>
        <canvas id="chartCanvas"></canvas>
      `;
  
      this.chartCanvas = this.shadowRoot.getElementById('chartCanvas');
      this.ctx = this.chartCanvas.getContext('2d');
      this.chartData = [];
      this.drawChart();
    }
  
    drawChart() {
      this.ctx.clearRect(0, 0, this.chartCanvas.width, this.chartCanvas.height);
  
      this.ctx.beginPath();
      this.ctx.moveTo(0, this.chartCanvas.height);
      for (let i = 0; i < this.chartData.length; i++) {
        const x = (i / this.chartData.length) * this.chartCanvas.width;
        const y = this.chartCanvas.height - (this.chartData[i] / 150) * this.chartCanvas.height;
        this.ctx.lineTo(x, y);
      }
      this.ctx.stroke();
    }
  
    updateChartData(data) {
      this.chartData.push(data);
  
      if (this.chartData.length > 100) {
        this.chartData.shift();
      }
  
      this.drawChart();
    }
  }
  
  customElements.define('chart-element', ChartElement);
  
  // Simulate receiving dummy data
  setInterval(() => {
    const dummyHeartRate = Math.floor(Math.random() * 100) + 60; // Simulate heart rate data
    document.getElementById('heartRateChart').updateChartData(dummyHeartRate);
  }, 1000);
  