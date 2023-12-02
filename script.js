async function login() {
    const loginEmail = document.getElementById("loginEmail").value;
    const loginPassword = document.getElementById("loginPassword").value;

    try {
        const response = await fetch('https://apiusers.azurewebsites.net/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: loginEmail, password: loginPassword }),
        });

        // Verificar o status da resposta HTTP
        if (response.ok) {
            const data = await response.json();
            console.log('Usuário autenticado:', data);
            window.location.href = 'paginicial.html';
            // Verificar se a autenticação foi bem-sucedida
            
        } else {
            // Tratar erros de resposta HTTP
            console.error('Erro durante a autenticação. Código de status:', response.status);
            // Exibir mensagem de erro genérica
            alert('Credenciais inválidas. Por favor, tente novamente.');
        }
    } catch (error) {
        console.error('Erro durante a autenticação:', error);
        // Tratar outros erros, se necessário
        alert('Erro inesperado. Por favor, tente novamente.');
    }
}


async function createUser() {
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;

    const userData = {
        email: email,
        name: name,
        password: password
    };

    try {
        const response = await fetch('https://apiusers.azurewebsites.net/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log('Usuário criado com sucesso:', responseData);
            window.location.href = 'paginicial.html';
        } else {
            const responseData = await response.json();
            console.error('Erro durante a criação do usuário. Código de status:', response.status);
            document.getElementById('response-message').innerText = `Erro: ${responseData.error}`;
        }
    } catch (error) {
        console.error('Erro durante a requisição:', error);
        document.getElementById('response-message').innerText = 'Erro inesperado. Por favor, tente novamente.';
    }
}