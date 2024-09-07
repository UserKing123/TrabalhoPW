document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const signupDialog = document.getElementById('signupDialog');
    const closeDialogButton = document.getElementById('closeDialogButton');

    const showDialog = message => {
        const dialogMessage = document.getElementById('dialogMessage');
        if (dialogMessage) dialogMessage.textContent = message;
        if (signupDialog) signupDialog.showModal();
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

    signupForm.addEventListener('submit', e => {
        e.preventDefault();

        if (validateForm()) {
            const userInfo = {
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            };

            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            sessionStorage.setItem('loggedIn', 'true');
            window.location.href = 'Main.html';
        }
    });

    if (closeDialogButton) {
        closeDialogButton.addEventListener('click', () => {
            if (signupDialog) signupDialog.close();
        });
    }
});
