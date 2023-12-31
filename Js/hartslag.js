class ChartElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.chartData = Array.from({ length: 20 }, () => this.generateRandomValue(40, 120));
  }

  connectedCallback() {
    this.render();
    this.startContinuousUpdate();
  }

  render() {
    this.shadowRoot.innerHTML = this.getTemplate();
    this.chartCanvas = this.shadowRoot.getElementById('chartCanvas');
    this.ctx = this.chartCanvas.getContext('2d');
    this.drawChart();
  }

  getTemplate() {
    return `
      <style>
        :host {
          display: block;
          width: 500px;
          height: 300px;
          position: relative;
          overflow: hidden;
          border: 1px solid #ddd; /* Light gray border */
          box-sizing: border-box;
          margin: 20px; /* Margin around the chart */
          background-color: #fff; /* White background */
        }

        canvas {
          width: 100%;
          height: 100%;
        }

        .scale-left {
          position: absolute;
          width: 15px; /* Width of the scale */
          height: 100%;
          background-color: #f5f5f5;
          left: 0; /* Position at the left */
          top: 0;
        }

        .scale-line {
          width: 100%;
          height: 1px;
          background-color: #ddd;
        }

        .scale-label {
          font-size: 10px;
          color: #555;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .border-text {
          position: absolute;
          top: 5%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 14px;
          font-weight: bold;
          color: #333; /* Dark gray text */
        }
      </style>
      <canvas id="chartCanvas" width="300" height="300"></canvas>
      <div class="scale-left" id="scaleLeft">
        <div class="scale-line" style="top: 0;"></div>
        <div class="scale-line" style="top: 25%;"></div>
        <div class="scale-line" style="top: 50%;"></div>
        <div class="scale-line" style="top: 75%;"></div>
        <div class="scale-line" style="top: 100%;"></div>
        <div class="scale-label" style="top: 0;">120</div>
        <div class="scale-label" style="top: 25%;">90</div>
        <div class="scale-label" style="top: 50%;">60</div>
        <div class="scale-label" style="top: 75%;">30</div>
        <div class="scale-label" style="top: 100%;">0</div>
      </div>
      <div class="border-text">Hart Slag</div>
    `;
  }

  drawChart() {
    this.ctx.clearRect(0, 0, this.chartCanvas.width, this.chartCanvas.height);
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.chartCanvas.height);

    for (let i = 0; i < this.chartData.length; i++) {
      const x = (i / (this.chartData.length - 1)) * this.chartCanvas.width;
      const y =
        this.chartCanvas.height -
        ((this.chartData[i] - 40) / (120 - 40)) * this.chartCanvas.height;
      //console.log(x);
      //console.log(y);
      this.ctx.lineTo(x, y);
    }

    this.ctx.strokeStyle = '#4CAF50'; /* Green line */
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }

  generateRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  startContinuousUpdate() {
    // Update the chart every second (adjust the interval as needed)
    setInterval(() => {
      this.chartData.shift(); // Remove the oldest data point
      this.chartData.push(this.generateRandomValue(40, 120)); // Add a new random data point
      this.drawChart(); // Redraw the chart with updated data
    }, 1000);
  }
}

customElements.define('chart-element', ChartElement);