class TestWebComponent extends HTMLElement{
    //array van attributes, bij wijziging hiervan wordt de attributeChangedCallback aangeroepen
    static observedAttributes = ["x-coord", "y-coord"];

    //constructor
    constructor(){
        super();
    }

    //aangeroepen wanneer in document gestoken
    connectedCallback(){
        console.log("Custom element has been added to the page");
    }
    
    //aangeroepen wanneer uit document gehaald
    disconnectedCallback(){
        console.log("Custom element has been removed from the page");
    }

    //aangeroepen wanneer verplaatst naar een ander document
    adoptedCallback(){
        console.log("Custom element has been moved to a new page");
    }

    //aangeroepen wanneer attributes veranderd worden, zie observedAttributes
    attributeChangedCallback(name, oldValue, newValue){
        console.log(`Attribute ${name} has changed from ${oldValue} to ${newValue}`);
    }
}

//definiëren element
customElements.define(`wc-component`, TestWebComponent);
