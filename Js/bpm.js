// Maak een template element met de HTML en CSS voor de hartslagmeter
const template = document.createElement("template");
template.innerHTML = /*html*/`
  <style>
    * { font-size: 200%; }
    .heart-rate {
        font-weight: bold;
    }
  </style>

  <div>
    <p>Huidige hartslag:</p>
    <p class="heart-rate"></p>
  </div>
`;

// Definieer een custom element genaamd "heart-rate-display"
class HeartRateDisplay extends HTMLElement {
    constructor() { 
        super(); 
        this.attachShadow({ mode: "open" }); 
        // Initialiseer een lege array om de hartslaggegevens bij te houden
        this.heartRates = [];
    }

    // Wordt aangeroepen wanneer het element aan de DOM wordt toegevoegd
    connectedCallback() {
        // Clone de inhoud van het template in de Shadow DOM
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        // Selecteer het element met de klasse "heart-rate"
        this.heartRateElement = this.shadowRoot.querySelector('.heart-rate');
        // Begin met het bijwerken van de hartslag
        this.updateHeartRate();
    }

    // Wordt aangeroepen wanneer het attribuut "data" verandert
    static get observedAttributes() {
        return ['data'];
    }

    // Wordt aangeroepen wanneer de waarde van het attribuut "data" verandert
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'data') {
            // Parse de nieuwe waarde als een JSON-array en bewaar deze in de "heartRates" array
            this.heartRates = JSON.parse(newValue);
            // Update de hartslagweergave
            this.updateHeartRate();
        }
    }

    // Update de hartslagweergave met de meest recente hartslag
    updateHeartRate() {
        // Haal de laatste hartslag op uit de array
        const currentHeartRate = this.heartRates.length > 0 ? this.heartRates[this.heartRates.length - 1] : 'Geen gegevens';
        // Update de tekst van het element met de klasse "heart-rate"
        this.heartRateElement.textContent = currentHeartRate;
    }
}

// Registreer het custom element "heart-rate-display"
customElements.define("heart-rate-display", HeartRateDisplay);
