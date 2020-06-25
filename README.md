# Emails input - simple tags emails input component

![alt text](https://github.com/scuderia1000/emails-input/EmailsInput.jpg?raw=true)

Transform input text to tags component.

Live Demo https://scuderia1000.github.io/emails-input/

## Usage example
```
<div id="emails-input"></div>
<script src="emails-input.js"></script>
<script>
    var inputContainerNode = document.querySelector('#emails-input');
    var emailsInput = EmailsInput(inputContainerNode);
</script>
```

## Features

- Component can be use in any other form or app independently
- Auto validate email
- Supports past multiple emails, separated by comma, with converting it to tags block
- Component styles do not depend on page styles
- Possibility to create several emails editors on the same page

## Usage
A Email block can be created by pressing Enter, entering comma, or by losing focus on the
input field.

## Features functions
### addRandomEmail() 
Generate random email and add it to EmailInput. Email format may be valid or invalid.
### getValidEmailsCount()
Shows an alert with valid emails count.


