 // Create a new custom element for the footer component
 class FooterComponent extends HTMLElement {
    constructor() {
      super();

      // Create a shadow root
      this.attachShadow({ mode: 'open' });

      // Define the HTML content
      this.shadowRoot.innerHTML = `
        <style>
          .footer-container {
            display: flex;
            justify-content: space-around;
            background-color: #333;
            color: #fff;
            padding: 20px;
          }

          .footer-section {
            max-width: 250px;
          }

          ul {
            list-style: none;
            padding: 0;
          }

          ul li {
            margin-bottom: 8px;
          }

          a {
            color: #fff;
            text-decoration: none;
          }
        </style>
        <div class="footer-container">
          <div class="footer-section">
            <h3>Concept</h3>
            <p>
                Deze site is gemaakt zodat je makkelijk gegevens over je bpm kan bekijken. <br/>
                <hr/>
                De muziek zal zichzelf automatisch matchen aan je hartritme voor die optimale sportervaring.<br/>
            </p>
          </div>

          <div class="footer-section">
            <h3>Participanten</h3>
            <ul>
              <li><a href="#">Viktor Dries 2-ICT</a></li>
              <li><a href="#">Bram Lemmens 2-ICT</a></li>
              <li><a href="#">Calvin Liaci 3-ICT</a></li>
              <li><a href="#">Preben Steegmans 3-ELO</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h3>Contact</h3>
            <p><a href="mailto:viktor.dries@student.ucll.be">viktor.dries@student.ucll.be</a></p>
            <p><a href="mailto:bram.lemmens2@student.ucll.be">bram.lemmens2@student.ucll.be</a></p>
            <p><a href="mailto:calvin.liaci@student.ucll.be">calvin.liaci@student.ucll.be</a></p>
            <p><a href="mailto:preben.steegmans@student.ucll.be">preben.steegmans@student.ucll.be</a></p>
          </div>
        </div>
      `;
    }
  }

  // Define the custom element
  customElements.define('footer-component', FooterComponent);