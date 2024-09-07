document.addEventListener('DOMContentLoaded', () => {
    const copyButton = document.getElementById('copyButton');
    const saveButton = document.getElementById('saveButton');
    const generateButton = document.getElementById('generateButton');
    const logoutButton = document.getElementById('logoutButton');
    const successDialog = document.getElementById('successDialog');
    const closeDialogButton = document.getElementById('closeDialogButton');
    const inputText = document.getElementById('inputText');
    const lowercaseCheckbox = document.getElementById('lowercaseCheckbox');
    const uppercaseCheckbox = document.getElementById('uppercaseCheckbox');
    const numberCheckbox = document.getElementById('numberCheckbox');
    const symbolCheckbox = document.getElementById('symbolCheckbox');
    const minSizeInput = document.getElementById('minSizeInput');
    const maxSizeInput = document.getElementById('maxSizeInput');

    if (sessionStorage.getItem('loggedIn') !== 'true') {
        window.location.href = 'login.html';
    }

    const showDialog = message => {
        const dialogMessage = document.getElementById('dialogMessage');
        if (dialogMessage) dialogMessage.textContent = message;
        if (successDialog) successDialog.showModal();
    };

    const generatePassword = () => {
        const minLength = parseInt(minSizeInput.value) || 8;
        const maxLength = parseInt(maxSizeInput.value) || 12;
        const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

        const chars = {
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            number: '0123456789',
            symbol: '!@#$%^&*()-_=+[]{}|;:,.<>?'
        };

        let characterSet = '';
        if (lowercaseCheckbox.checked) characterSet += chars.lowercase;
        if (uppercaseCheckbox.checked) characterSet += chars.uppercase;
        if (numberCheckbox.checked) characterSet += chars.number;
        if (symbolCheckbox.checked) characterSet += chars.symbol;

        if (!characterSet) {
            showDialog('Selecione pelo menos um tipo de caractere.');
            return '';
        }

        return Array.from({ length }, () => characterSet[Math.floor(Math.random() * characterSet.length)]).join('');
    };

    const savePassword = password => {
        const name = prompt('Digite um nome para a senha:');
        if (!name) return;

        const savedPasswords = JSON.parse(localStorage.getItem('savedPasswords')) || [];
        savedPasswords.push({ name, password });
        localStorage.setItem('savedPasswords', JSON.stringify(savedPasswords));
    };

    if (copyButton) {
        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(inputText.value)
                .then(() => showDialog('Senha copiada com sucesso!'))
                .catch(() => showDialog('Falha ao copiar a senha.'));
        });
    }

    if (saveButton) {
        saveButton.addEventListener('click', () => {
            const password = inputText.value;
            if (!password) {
                showDialog('Gere uma senha antes de salvar.');
                return;
            }
            savePassword(password);
            showDialog('Senha salva com sucesso!');
        });
    }

    if (generateButton) {
        generateButton.addEventListener('click', () => {
            inputText.value = generatePassword();
            showDialog('Senha gerada com sucesso!');
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            sessionStorage.removeItem('loggedIn');
            window.location.href = 'login.html';
        });
    }

    if (closeDialogButton) {
        closeDialogButton.addEventListener('click', () => {
            if (successDialog) successDialog.close();
        });
    }

    const saveSettings = () => {
        localStorage.setItem('lowercase', lowercaseCheckbox.checked);
        localStorage.setItem('uppercase', uppercaseCheckbox.checked);
        localStorage.setItem('number', numberCheckbox.checked);
        localStorage.setItem('symbol', symbolCheckbox.checked);
    };

    if (lowercaseCheckbox) lowercaseCheckbox.addEventListener('change', saveSettings);
    if (uppercaseCheckbox) uppercaseCheckbox.addEventListener('change', saveSettings);
    if (numberCheckbox) numberCheckbox.addEventListener('change', saveSettings);
    if (symbolCheckbox) symbolCheckbox.addEventListener('change', saveSettings);

    const [storedLowercase, storedUppercase, storedNumber, storedSymbol] = [
        localStorage.getItem('lowercase'),
        localStorage.getItem('uppercase'),
        localStorage.getItem('number'),
        localStorage.getItem('symbol')
    ];

    if (storedLowercase !== null) lowercaseCheckbox.checked = JSON.parse(storedLowercase);
    if (storedUppercase !== null) uppercaseCheckbox.checked = JSON.parse(storedUppercase);
    if (storedNumber !== null) numberCheckbox.checked = JSON.parse(storedNumber);
    if (storedSymbol !== null) symbolCheckbox.checked = JSON.parse(storedSymbol);
});
