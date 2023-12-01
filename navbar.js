class NavbarComponent extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = /*html*/`
            <style>
                nav {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-evenly;
                    background-color: red;
                    margin: 0;
                    padding: 5px 2.5px;
                };
            </style>

            <nav>
                <a href="index.html">Home</a>
                <a href="afspeellijst.html">Afspeellijst</a>
                <a href="BPM.html">BPM-gegevens</a>
                <a href="contact.html">Contact</a>
            </nav>
        `;
    }
}

customElements.define('nav-comp', NavbarComponent);