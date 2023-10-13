function validateDateOfBirth() {
    var dataNascimento = document.getElementById("dataNascimento").value;
    var dtNascStatus = document.getElementById("dtNascStatus");

    if (!isValidDate(dataNascimento)) {
        dtNascStatus.innerHTML = "Data de nascimento inválida.";
        dtNascStatus.style.display = "block";
    } else {
        dtNascStatus.innerHTML = "";
        dtNascStatus.style.display = "none";
    }
}

function isValidDate(dateString) {
    var regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) {
        return false;
    }

    var parts = dateString.split("-");
    var year = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var day = parseInt(parts[2], 10);

    if (year < 1900 || year > new Date().getFullYear()) {
        return false;
    }
    if (month < 1 || month > 12) {
        return false;
    }
    if (day < 1 || day > new Date(year, month, 0).getDate()) {
        return false;
    }

    return true;
}