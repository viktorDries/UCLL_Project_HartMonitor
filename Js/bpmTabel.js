const template = document.createElement("template");
template.innerHTML = /*html*/ `
      <style>
        table {
          border-collapse: collapse;
          width: 500px;
          margin: 20px;
        }

        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: center;
        }

        th {
          background-color: #333;
          color: #fff;
        }

        @media only screen and (max-width: 500px) {
          table {
            width: 100%;
          }
        }
      </style>

      <table>
        <thead>
          <tr>
            <th>Meeting</th>
            <th>BPM Waarde</th>
          </tr>
        </thead>
        <tbody id="tableBody"></tbody>
      </table>
    `;

class HeartRateTable extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    //Aanmaken array voor afgelopen waardes in op te slaan
    this.values = [];

    // Bind the updateValues method to the instance
    this.updateValues = this.updateValues.bind(this);

    // Start generating random BPM values every 2 seconds
    setInterval(() => {
      const newBPMValue = this.generateRandomBPM();
      this.setAttribute("bpm-value", newBPMValue);
    }, 1000);
  }

  connectedCallback() {
    // luistert voor veranderingen aan de attributen
    const config = { attributes: true /*tract de attribuut value*/ , attributeOldValue: true /*tract de vorige attribuut waarde*/};
    const observer = new MutationObserver(this.updateValues); //bij elke wijziging aan het attribuut zal de methode updateValues uitgevoerd worden
    observer.observe(this, config); //observe doet het effectief kijken naar bovenstaande waarde

    // Initialiseren updateValues
    this.updateValues();
  }

  updateValues() {
    // attribuut ophalen
    const bpmValue = this.getAttribute("bpm-value");

    // update wanneer value veranderd
    if (bpmValue !== null && bpmValue !== this.values[0]) {
      // nieuwe waarde toevoegen aan de array
      this.values.unshift(bpmValue);

      // Houd 10 waardes bij
      if (this.values.length > 10) {
        this.values.pop(); // verwijderd het laatste item indien er meer dan 10 waardes in de array zitten
      }

      // table updaten
      this.updateTableBody();
    }
  }

  updateTableBody() {
    // table body element verkrijgen
    const tableBody = this.shadowRoot.getElementById("tableBody");

    tableBody.innerHTML = "";

    // index + waardes toevoegen aan de tabel
    this.values.forEach((value, index) => {
      const row = document.createElement("tr");
      const indexText = this.getIndexText(index);
      row.innerHTML = `
            <td>${indexText}</td>
            <td>${value}</td>
          `;
      tableBody.appendChild(row);
    });
  }

  // Tekst van de meeting
  getIndexText(index) {
    if (index === 0) {
      return "Meest recente meting";
    } else {
      return `${index + 1}de laatste meting`;
    }
  }

  // placeholder voor genereren inpu
  generateRandomBPM() {
    // random waarde tussen 60 & 100
    return Math.floor(Math.random() * (100 - 60 + 1) + 60);
  }
}

// Define the custom element
customElements.define("heart-rate-table", HeartRateTable);
