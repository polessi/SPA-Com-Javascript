function verificaCpf(cpf) {
    if (!cpf) return false; // Trata o caso de CPF nulo ou vazio

    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]+/g, '');

    // Aplicar a máscara de CPF (XXX.XXX.XXX-XX)
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    if (cpf.length !== 14 || /^(.)\1{10}$/.test(cpf)) {
        // CPF inválido
        document.getElementById('cpfStatus').style.display = 'block';
        document.getElementById('cpfStatus').textContent = 'CPF inválido';
        // Limpa o campo de CPF
        document.getElementById('cpf').value = "";
        return false;
    }

    // Verificação dos dígitos verificadores
    const cpfArray = cpf.replace(/[^\d]+/g, '').split("").map(Number);
    const verificador1 = calcularDigitoVerificador(cpfArray, 9);
    const verificador2 = calcularDigitoVerificador(cpfArray, 10);

    if (verificador1 === cpfArray[9] && verificador2 === cpfArray[10]) {
        document.getElementById('cpfStatus').style.display = 'none';

    } else {
        document.getElementById('cpfStatus').style.display = 'block';
        document.getElementById('cpfStatus').textContent = 'CPF inválido';
        document.getElementById('cpf').value = "";
    }
}

function calcularDigitoVerificador(cpfArray, posicao) {
    const soma = cpfArray
        .slice(0, posicao)
        .map((valor, indice) => valor * (posicao + 1 - indice))
        .reduce((acumulador, valor) => acumulador + valor, 0);

    const resto = soma % 11;

    return resto < 2 ? 0 : 11 - resto;
}

function mascara(i){
   
    var v = i.value;
    
    if(isNaN(v[v.length-1])){ // impede entrar outro caractere que não seja número
       i.value = v.substring(0, v.length-1);
       return;
    }
    
    i.setAttribute("maxlength", "14");
    if (v.length == 3 || v.length == 7) i.value += ".";
    if (v.length == 11) i.value += "-";
 
 }