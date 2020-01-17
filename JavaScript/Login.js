var username = document.getElementsByName("username"),
    password = document.getElementsByName("password"),
    warning = document.getElementById("warning");

function zero() {
    warning.innerHTML = "";
}
function isEnter(k) {
    if (k.keyCode == 13) {
        password[0].focus();
        return false;
    }
}
function check(){
    if (username[0].value == "") {
        warning.innerHTML = "*Username is empty!";
        return false;
    }
    else 
        if (username[0].value != "Thien Nam") {
            warning.innerHTML = "*Username is incorrect!";
            return false;
        }
    if (password[0].value == "") {
        warning.innerHTML = "*Password is empty!";
        return false;
    }
    else 
        if (password[0].value != "11111") {
            warning.innerHTML = "*Password is incorrect!";
            return false;
        }
};

function message() {
    alert("This function is coming soon...")
}