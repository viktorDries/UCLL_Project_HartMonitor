// Create a template element to hold the HTML and CSS for the counter
const template = document.createElement("template");
template.innerHTML = /*html*/`
  <style>
    * { font-size: 300%; }
    button {
        margin: 10px;
    }
    .hidden { 
        display: none; 
    }
  </style>

  <!-- Buttons for controlling the counter -->
  <button id="terug">⏪</button>
  <button id="play">▶️</button>
  <button id="pauze" class="hidden">⏸️</button>
  <button id="verder">⏩</button>`;

// Define a custom element named "my-counter"
class MyCounter extends HTMLElement {
    constructor() {
        // Call the super constructor to initialize the element
        super();
        // Attach the Shadow DOM in "open" mode
        this.attachShadow({ mode: "open" });
    }

    // Invoked when the element is added to the DOM
    connectedCallback() {
        // Clone the content of the template into the Shadow DOM
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Attach event listeners to the buttons
        this.shadowRoot.getElementById("verder").onclick = () => this.log("Verder");
        this.shadowRoot.getElementById("terug").onclick = () => this.log("Terug");
        this.shadowRoot.getElementById("play").onclick = () => this.togglePlayPause("play");
        this.shadowRoot.getElementById("pauze").onclick = () => this.togglePlayPause("pauze");
    }

    // Log a message to the console
    log(message) {
        console.log(message);
    }

    // Toggle between play and pause states
    togglePlayPause(action) {
        // Toggle the visibility of play and pause buttons
        this.shadowRoot.getElementById("pauze").classList.toggle("hidden");
        this.shadowRoot.getElementById("play").classList.toggle("hidden");

        // Log the action (play or pause) to the console
        this.log(action);
    }
}

// Register the custom element "my-counter"
customElements.define("my-counter", MyCounter);
