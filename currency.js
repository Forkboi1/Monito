window.onload = main

function main() {
    let currency = document.getElementById("currencyBox")
    currency.selectedIndex = 0
    currency.addEventListener("change", change)
    function change() {
        var img = document.getElementById("curimg")
        let selected_currency = currency.selectedIndex
        if (selected_currency == 0) {
            img.setAttribute("src", "content/sa.png")
        }
        else if (selected_currency == 1) {
            img.setAttribute("src", "content/US.png")
        }
        else if (selected_currency == 2) {
            img.setAttribute("src", "content/EU.png")
        }
        else {
            img.setAttribute("src", "content/JP.png")
        }

    }



    lgn = document.getElementById("login");
    create = document.getElementById("createPost")
    lgn.addEventListener("click", function () {
        window.location.href = "loginpage.html";

    })
    create.addEventListener("click", function () {
        window.location.href = "loginpage.html";
    })

    reg = document.getElementById("goto-register-button")
    reg.addEventListener("click", function () {
        window.location.href = "registerpage.html";
    })

    pay_button.addEventListener("click", function () {
        alert("a")
        window.location.href = "thanks.html";

    })




}

