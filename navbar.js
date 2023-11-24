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
                <a href="#">Home</a>
                <a href="#">Afspeellijst</a>
                <a href="#">BPM-gegevens</a>
                <a href="#">Contact</a>
            </nav>
        `;
    }
}

customElements.define('navbar-component', NavbarComponent);