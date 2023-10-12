function validateEmail(email) {
    // Expressão regular para verificar se o email é válido
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // Verifica se o email corresponde à expressão regular
    if (emailRegex.test(email)) {
        // Email válido
        document.getElementById('emailStatus').style.display = 'none';
    } else {
        // Email inválido
        document.getElementById('emailStatus').style.display = 'block';
        document.getElementById('emailStatus').textContent = 'Email inválido';
        document.getElementById('email').value = "";
    }
}