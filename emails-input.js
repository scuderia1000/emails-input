/**
 * Simple email input form with tags
 *
 * Created by vvershov on 24.06.2020
 */
;(function (node, func) {
    node.EmailsInput = func();
}(this, function () {
    "use strict";

    function EmailsInput(inputContainer, options) {
        if (!inputContainer) return;

        if (!(this instanceof EmailsInput)) {
            var obj = Object.create(EmailsInput.prototype);
            return EmailsInput.apply(obj, arguments);
        }


        var emailsForm = this.getNodeElement(this.templates.main()),
            documentStyle = document.createElement('style'),
            style = this.templates.style();

        inputContainer.appendChild(emailsForm);

        document.head.appendChild(documentStyle);
        for (var i = 0; i < style.length; i++) {
            documentStyle.sheet.insertRule(style[i], i);
        }

        // add google Open Sans font
        var fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Open+Sans&display=swap';
        document.head.appendChild(fontLink);

        this.DOM = {
            input: emailsForm.querySelector('.emails-form__input'),
            emailsForm: emailsForm
        };

        // add test tags
        for (var i = 0; i < this.testEmails.length; i++) {
            this.addEmail(this.testEmails[i]);
        }

        this.DOM.input.addEventListener("keypress", this.onInput.bind(this));
        this.DOM.input.addEventListener("blur", this.onBlur.bind(this));
        this.DOM.input.addEventListener("paste", this.onPaste.bind(this));

        return this;
    }

    EmailsInput.prototype = {
        isIE: window.document.documentMode,

        validEmailCount: 0,

        templates: {
            main: function () {
                return ' \
                <div class="emails-form" \
                    tabIndex="-1"> \
                    <span contenteditable \
                        class="emails-form__input" \
                        data-placeholder="add more people..." \
                        aria-placeholder="add more people..."></span> \
                </div>';
            },

            tag: function (text, data) {
                var className = data ? data.className : '';

                return ' \
                <div class="emails-form__tag ' + className + '"> \
                    <div> \
                        <span class="emails-form__tag-text">' + text + '</span> \
                    </div> \
                    <button class="emails-form__tag-removeButton"> \
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"> \
                            <path fill-rule="evenodd" clip-rule="evenodd" \
                                  d="M8 0.8L7.2 0L4 3.2L0.8 0L0 0.8L3.2 4L0 7.2L0.8 8L4 4.8L7.2 8L8 7.2L4.8 4L8 0.8Z" fill="#050038"/> \
                        </svg> \
                    </button> \
                </div>';
            },
            // TODO новые стили добавлять в этот массив
            style: function () {
                return [
                    '.emails-form {background: #FFFFFF; border: 1px solid #C3C2CF; box-sizing: border-box; border-radius: 4px; ' +
                    'min-height: 96px; max-height: 96px; overflow: auto; display: flex; align-items: flex-start; ' +
                    'flex-wrap: wrap; position: relative; width: 100%}',
                    '.emails-form:focus {outline: 0; }',
                    '.emails-form__input {position: relative; margin: 8px; min-width: 125px; flex: 1; display: block; }',
                    '.emails-form__input:empty::before {position: absolute; content: attr(data-placeholder); color: #C3C2CF; ' +
                    'top: 0; bottom: 0; white-space: nowrap; }',
                    '.emails-form__input:focus {outline: 0; }',
                    '.emails-form__tag {display: inline-flex; align-items: center; margin: 8px 0 4px 8px; position: relative; ' +
                    '   background: rgba(102, 153, 255, 0.2); border-radius: 100px;}',
                    '.emails-form__tag > div { box-sizing: border-box; padding: 0 4px 0 10px; max-height: 24px;}',
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
                    '}',
                    '.emails-form__tag_invalid {\n' +
                    '    background: none;\n' +
                    '    border-radius: 0;\n' +
                    '    border-bottom: 1px dashed #D92929;\n' +
                    '}',
                    '.emails-form__tag-text {\n' +
                    '    overflow: hidden;\n' +
                    '    white-space: nowrap;\n' +
                    '    -ms-text-overflow: ellipsis;\n' +
                    '    text-overflow: ellipsis;\n' +
                    '    display: inline-block;\n' +
                    '}'
                ]
            },
        },

        testEmails: [
            'john@miro.com',
            'invalid.email',
            'mike@miro.com',
            'alexander@miro.com'
        ],

        onBlur: function (e) {
            var text = e.target.textContent;
            this.addEmail(text);
        },

        onInput: function (e) {
            var text = e.target.textContent.trim();
            switch (e.key) {
                case 'Enter':
                case ',':
                    e.preventDefault();
                    this.addEmail(text);
            }
        },

        onPaste: function(e) {
            e.preventDefault();
            var pastedData = (e.clipboardData || window.clipboardData).getData('text');
            if (pastedData) {
                var emails = pastedData.split(',');
                for (var i = 0; i < emails.length; i++) {
                    this.addEmail(emails[i].trim());
                }
            }
        },

        addEmail: function (text) {
            if (!text) return;

            this.DOM.input.textContent = '';

            var isEmailValid = this.isEmailValid(text),
                data = {
                    className: isEmailValid ? '' : 'emails-form__tag_invalid'
                },
                emailEl = this.getNodeElement(this.templates.tag(text.trim(), data)),
                removeButton = emailEl.querySelector('.emails-form__tag-removeButton');

            removeButton.addEventListener("click", this.removeEmail.bind(this));
            this.DOM.input.parentNode.insertBefore(emailEl, this.DOM.input);

            if (isEmailValid) {
                this.validEmailCount++;
            }

            if (!this.isIE) this.DOM.emailsForm.scrollTo(0, this.DOM.emailsForm.scrollHeight);
        },

        removeEmail: function (e) {
            var emailEl = this.getEmailNode(e.target);
            this.DOM.emailsForm.removeChild(emailEl);

            if (!emailEl.classList.contains('emails-form__tag_invalid')) {
                this.validEmailCount--;
            }
        },

        getEmailNode: function (node) {
            if (node.classList.contains('emails-form__tag')) {
                return node;
            } else {
                return this.getEmailNode(node.parentNode);
            }
        },

        getNodeElement: function (template) {
            var parser = new DOMParser(),
                nodeEl = parser.parseFromString(template, "text/html");

            return nodeEl.body.firstElementChild;
        },

        isEmailValid: function (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },

        addRandomEmail: function () {
            var email = Math.random().toString(36).substring(2, this.getRandomInteger(5, 11)),
                domain = Math.random().toString(36).substring(2, this.getRandomInteger(5, 9)),
                domainZone = Math.random().toString(36).replace(/[0-9]/g, '').substring(0, this.getRandomInteger(2, 4));

            this.addEmail(email + '@' + domain + domainZone);
        },

        getRandomInteger: function (min, max) {
            var rand = min + Math.random() * (max + 1 - min);
            return Math.floor(rand);
        },

        getValidEmailsCount: function () {
            alert('Valid email count: ' + this.validEmailCount);
        }
    };

    return EmailsInput;
}));