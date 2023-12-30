// template
const template = document.createElement('template');
template.innerHTML = `
  <style>
    /* Use :host to apply styles within the shadow DOM */
    :host .heart {
      color: red;
      animation: heartbeat 1s infinite alternate;
    }

    @keyframes heartbeat {
      from {
        transform: scale(1);
      }

      to {
        transform: scale(1.2);
      }
    }

    div {
      /* Add any other styles you want for the container */
    }

    /* Add any other styles as needed */
  </style>
  <div>
    <span>BPM: <span class="bpm-value"></span></span>
    <span class="heart">❤️</span>
    <br>
    <span>Average BPM: <span class="average-bpm-value"></span></span>
    <span class="heart">❤️</span>
  </div>
`;

class BPMDisplay extends HTMLElement {
  constructor() {
    super();

    // aanmaken shadow dom
    this.attachShadow({ mode: 'open' });

    // Initialiseren BPM waarden
    this.bpm = 0;
    this.averageBPM = 0;

    // bpm waarde uit attribuut krijgen
    const initialBPM = this.getAttribute('bpmvalue');
    if (!isNaN(initialBPM)) {
      this.bpm = parseFloat(initialBPM);
    }

    // component renderen
    this.render();

    // kijkt naar veranderingen in attributen
    const observer = new MutationObserver(() => {
      const newBPM = this.getAttribute('bpmvalue');
      this.updateBPM(newBPM);
    });

    observer.observe(this, { attributes: true, attributeFilter: ['bpmvalue'] });

    // Simulate BPM changes (replace this with your actual logic to get BPM)
    setInterval(() => {
      const newBPM = Math.floor(Math.random() * 150) + 50;
      this.updateBPM(newBPM);
      this.updateAverageBPM(newBPM);
    }, 2000);
  }

  // Method to update BPM value
  updateBPM(newBPM) {
    if (!isNaN(newBPM)) {
      this.bpm = parseFloat(newBPM);
      this.render();
    }
  }

  // placeholder
  updateAverageBPM(newBPM) {
    // Simple moving average calculation (replace with your own logic)
    const alpha = 0.2; // Smoothing factor
    this.averageBPM = alpha * newBPM + (1 - alpha) * this.averageBPM;
    this.render();
  }

  // Method to render the component
  render() {
    // template renderen
    const content = document.importNode(template.content, true);

    // bpm waarde updaten in de content
    content.querySelector('.bpm-value').textContent = this.bpm.toFixed(0);
    content.querySelector('.average-bpm-value').textContent = this.averageBPM.toFixed(0);

    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(content);
  }
}

// Definiëren custom element
customElements.define('bpm-display', BPMDisplay);