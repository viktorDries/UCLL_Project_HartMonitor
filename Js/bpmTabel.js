const template = document.createElement('template');
    template.innerHTML = /*html*/`
      <style>
        /* Styles for the heart rate table */
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

        /* Responsive styles */
        @media only screen and (max-width: 500px) {
          table {
            width: 100%;
          }
        }
      </style>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>BPM Value</th>
          </tr>
        </thead>
        <tbody id="tableBody"></tbody>
      </table>
    `;

    class HeartRateTable extends HTMLElement {
      constructor() {
        super();

        // Create a shadow root
        this.attachShadow({ mode: 'open' });

        // Initialize an array to store the values
        this.values = [];

        // Append the template content to the shadow DOM
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Bind the updateValues method to the instance
        this.updateValues = this.updateValues.bind(this);

        // Start generating random BPM values every 2 seconds
        setInterval(() => {
          const newBPMValue = this.generateRandomBPM();
          this.setAttribute('bpm-value', newBPMValue);
        }, 2000);
      }

      connectedCallback() {
        // Listen for changes to the attributes
        const config = { attributes: true, attributeOldValue: true };
        const observer = new MutationObserver(this.updateValues);
        observer.observe(this, config);

        // Initial update
        this.updateValues();
      }

      updateValues() {
        // Get the bpm-value attribute
        const bpmValue = this.getAttribute('bpm-value');

        // Only update if the value is changed
        if (bpmValue !== null && bpmValue !== this.values[0]) {
          // Add the new value to the array
          this.values.unshift(bpmValue);

          // Keep only the last 10 values
          if (this.values.length > 10) {
            this.values.pop(); // Remove the last element
          }

          // Update the table body
          this.updateTableBody();
        }
      }

      updateTableBody() {
        // Get the table body element
        const tableBody = this.shadowRoot.getElementById('tableBody');

        // Clear the existing content
        tableBody.innerHTML = '';

        // Populate the table with the values and indices
        this.values.forEach((value, index) => {
          const row = document.createElement('tr');
          const indexText = this.getIndexText(index);
          row.innerHTML = `
            <td>${indexText}</td>
            <td>${value}</td>
          `;
          tableBody.appendChild(row);
        });
      }

      // Function to generate random BPM values
      generateRandomBPM() {
        // Generate a random BPM value between 60 and 100
        return Math.floor(Math.random() * (100 - 60 + 1) + 60);
      }

      // Function to get the text for the index
      getIndexText(index) {
        if (index === 0) {
          return 'Meest recente meting';
        } else {
          return `${index + 1}de laatste meting`;
        }
      }
    }

    // Define the custom element
    customElements.define('heart-rate-table', HeartRateTable);