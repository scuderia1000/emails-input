function EmailsInput(inputContainer, settings) {
    var parser = new DOMParser(),
        emailsFormTemplate = parser.parseFromString(templates.main(), "text/html"),
        emailsForm = emailsFormTemplate.body.firstElementChild,
        documentStyle = document.createElement('style'),
        style = templates.style();

    inputContainer.appendChild(emailsForm);

    // TODO раскомментировать, когда будет сделаны все стили emails-form
    // document.head.appendChild(documentStyle);
    // for (var i = 0; i < style.length; i++) {
    //     documentStyle.sheet.insertRule(style[i], i);
    // }

    var input = emailsForm.querySelector('.emails-form__input');
    // add test tags
    for (var i = 0; i < testEmails.length; i++) {
        var tagEl = parser.parseFromString(templates.tag(testEmails[i]), "text/html");
        input.parentNode.insertBefore(tagEl.body.firstElementChild, input);
    }
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

    tag: function (text) {
        return ' \
            <div class="emails-form__tag"> \
                <div> \
                    <span class="emails-form__tag-text">' + text + '</span> \
                </div> \
                <button class="emails-form__tag-removeButton"> \
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"> \
                        <path fill-rule="evenodd" clip-rule="evenodd" \
                              d="M8 0.8L7.2 0L4 3.2L0.8 0L0 0.8L3.2 4L0 7.2L0.8 8L4 4.8L7.2 8L8 7.2L4.8 4L8 0.8Z" fill="#050038"/> \
                    </svg> \
                </button> \
            </div> \
        ';
    },
    // TODO новые стили добавлять в этот массив
    style: function () {
        return [
            '.emails-form {background: #FFFFFF; border: 1px solid #C3C2CF; box-sizing: border-box; border-radius: 4px; ' +
                'min-height: 96px; max-height: 96px; overflow: auto; display: flex; align-items: flex-start; ' +
                'flex-wrap: wrap; position: relative; width: 100%}',
            '.emails-form:focus {outline: 0; }',
            '.emails-form__input {position: relative; margin: 8px; min-width: 60px; flex: 1; display: block; }',
            '.emails-form__input:empty::before {position: absolute; content: attr(data-placeholder); color: #C3C2CF; ' +
                'top: 0; bottom: 0; white-space: nowrap; }',
            '.emails-form__input:focus {outline: 0; }',
            '.emails-form__tag {display: inline-flex; align-items: center; margin: 8px 0 4px 8px; position: relative; ' +
            '   background: rgba(102, 153, 255, 0.2); border-radius: 100px;}',
            '.emails-form__tag > div { box-sizing: border-box; padding: 0 4px 0 10px;}',
            '.emails-form__tag-removeButton {\n' +
            '    display: inline-flex;\n' +
            '    justify-content: center;\n' +
            '    align-items: center;\n' +
            '    cursor: pointer;\n' +
            '    color: black;\n' +
            '    width: 14px;\n' +
            '    height: 14px;\n' +
            '    outline: none;\n' +
            '    border: none;\n' +
            '    background: none;\n' +
            '    border-radius: 0;\n' +
            '    padding: 0;\n' +
            '    margin-right: 6px;\n' +
            '}'
        ]
    },
};

var testEmails = [
    'john@miro.com',
    'invalid.email',
    'mike@miro.com',
    'alexander@miro.com'
];