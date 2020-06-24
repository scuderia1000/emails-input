function EmailsInput(inputContainer, settings) {
    var parser = new DOMParser(),
        emailsForm = parser.parseFromString(templates.main(), "text/html"),
        documentStyle = document.createElement('style'),
        style = templates.style();

    inputContainer.appendChild(emailsForm.body.firstElementChild);
    document.head.appendChild(documentStyle);

    // TODO раскомментировать, когда будет сделаны все стили emails-form
    // for (var i = 0; i < style.length; i++) {
    //     documentStyle.sheet.insertRule(style[i], i);
    // }
}

var templates = {
    main: function () {
        return '<div class="emails-form" \
                    tabIndex="-1"> \
                    <span contenteditable \
                        class="emails-form__input" \
                        data-placeholder="add more people..." \
                        aria-placeholder="add more people..."></span> \
                </div> \
        ';
    },

    tag: function () {

    },
    // TODO раскомментировать, когда будет сделаны все стили
    //  emails-form, новые стили добавлять в этот массив
    // style: function () {
    //     return [
    //         '.emails-form {background: #FFFFFF; border: 1px solid #C3C2CF; box-sizing: border-box; border-radius: 4px; ' +
    //             'min-height: 96px; max-height: 96px; }',
    //         '.emails-form:focus {outline: 0; }',
    //         '.emails-form__input {position: relative; margin: 8px; min-width: 60px; flex: 1; display: block; }',
    //         '.emails-form__input:empty::before {position: absolute; content: attr(data-placeholder); color: #C3C2CF; ' +
    //             'top: 0; bottom: 0; white-space: nowrap; }',
    //         '.emails-form__input:focus {outline: 0; }'
    //     ]
    // },
};