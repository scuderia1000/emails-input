var templates = {
    main() {
        return `<div class="emails-form"
                    tabIndex="-1">
                    <span contenteditable 
                        class="emails-form__input"
                        data-placeholder="add more people..."
                        aria-placeholder="add more people..."></span>
                </div>
        `;
    }
};

function EmailsInput(inputContainer, settings) {
    var parser = new DOMParser(),
        emailsForm = parser.parseFromString(templates.main(), "text/html");
    inputContainer.appendChild(emailsForm.body.firstElementChild);
    // inputContainer.parentNode.insertBefore(emailsForm.body.firstElementChild, inputContainer);



    // var style = document.createElement('style');
    // style.innerHTML = `
    //     #emails-input {
    //         width: 400px;
    //         height: 400px;
    //         background-color: antiquewhite;
    //     }
    // `;
    // document.head.appendChild(style);
}