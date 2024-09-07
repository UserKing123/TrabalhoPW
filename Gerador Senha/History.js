document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.getElementById('backButton');
    const passwordTableBody = document.querySelector('table tbody');

    if (sessionStorage.getItem('loggedIn') !== 'true') {
        window.location.href = 'login.html';
    }

    const loadPasswords = () => {
        const savedPasswords = JSON.parse(localStorage.getItem('savedPasswords')) || [];
        passwordTableBody.innerHTML = savedPasswords.map(({ name, password }) => `
            <tr>
                <td>${name}</td>
                <td>${password}</td>
                <td>
                    <button type="button" class="copyButton">Copiar</button>
                    <button type="button" class="deleteButton">Excluir</button>
                </td>
            </tr>
        `).join('');

        document.querySelectorAll('.deleteButton').forEach(button =>
            button.addEventListener('click', e => {
                const row = e.target.closest('tr');
                const passwordName = row.cells[0].textContent;
                const savedPasswords = JSON.parse(localStorage.getItem('savedPasswords')) || [];
                const updatedPasswords = savedPasswords.filter(p => p.name !== passwordName);
                localStorage.setItem('savedPasswords', JSON.stringify(updatedPasswords));
                row.remove();
            })
        );

        document.querySelectorAll('.copyButton').forEach(button =>
            button.addEventListener('click', e => {
                const password = e.target.closest('tr').cells[1].textContent;
                navigator.clipboard.writeText(password)
                    .then(() => showDialog('Senha copiada para a área de transferência!'))
                    .catch(() => showDialog('Falha ao copiar a senha.'));
            })
        );
    };

    loadPasswords();

    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = 'Main.html';
        });
    }

    const showDialog = message => {
        const dialog = document.createElement('dialog');
        const dialogMessage = document.createElement('p');
        const closeButton = document.createElement('button');

        dialogMessage.textContent = message;
        closeButton.textContent = 'Fechar';
        closeButton.addEventListener('click', () => {
            dialog.close();
        });

        dialog.appendChild(dialogMessage);
        dialog.appendChild(closeButton);
        document.body.appendChild(dialog);

        dialog.showModal();
    };
});
