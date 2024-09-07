document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginDialog = document.getElementById('loginDialog');
    const closeDialogButton = document.getElementById('closeDialogButton');

    const showDialog = message => {
        const dialogMessage = document.getElementById('dialogMessage');
        if (dialogMessage) dialogMessage.textContent = message;
        if (loginDialog) loginDialog.showModal();
    };

    const validateForm = () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (!username || !password) {
            showDialog('Preencha todos os campos.');
            return false;
        }

        if (password.length < 6) {
            showDialog('A senha deve ter pelo menos 6 caracteres.');
            return false;
        }

        return true;
    };

    loginForm.addEventListener('submit', e => {
        e.preventDefault();

        if (validateForm()) {
            sessionStorage.setItem('loggedIn', 'true');
            window.location.href = 'Main.html';
        }
    });

    if (closeDialogButton) {
        closeDialogButton.addEventListener('click', () => {
            if (loginDialog) loginDialog.close();
        });
    }
});
