class CoolHeading extends HTMLElement {
    constructor() {
        super();

    }

    connectedCallback() {
        const template = document.querySelector('template');
        const clone = document.importNode(template.content, true);
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(clone);
    }
}

customElements.define('app-comp', CoolHeading);
