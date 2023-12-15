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

  <button id="verder">⏪</button>
  <button id="play">▶️</button>
  <button id="pauze" class="hidden">⏸️</button>
  <button id="terug">⏩</button>`;

class MyCounter extends HTMLElement {
    constructor() { 
        super(); 
        this.attachShadow({ mode: "open" }); 
    }

    connectedCallback() {
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.getElementById("verder").onclick = () => this.log("Verder");
        this.shadowRoot.getElementById("terug").onclick = () => this.log("Terug");
        this.shadowRoot.getElementById("play").onclick = () => this.togglePlayPause("play");
        this.shadowRoot.getElementById("pauze").onclick = () => this.togglePlayPause("pauze");
    }

    log(message) {
        console.log(message);
    }

    togglePlayPause(action) {
        this.shadowRoot.getElementById("pauze").classList.toggle("hidden");
        this.shadowRoot.getElementById("play").classList.toggle("hidden");
        this.log(action);
    }
}

customElements.define("my-counter", MyCounter);
