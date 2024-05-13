const nunjuck = require("nunjucks");

document.getElementById("login-button").addEventListener("click",validateLoginForm)
document.getElementById("register-button").addEventListener("click",validateRegisterForm)
document.getElementById("logout-button").addEventListener("click",logout)
document.getElementById("toggle-form-button").addEventListener("click",toggleLoginRegisterForm)
document.documentElement.addEventListener("DOMContentLoaded",startWeb);

function startweb(){
    const njkHTML = nunjuck.renderString("../views/loginpage.njk", {});
    document.documentElement.innerHTML = njkHTML
}
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


function validateRegisterForm(){
    apiUrl = "https://swe363api.onrender.com/register"
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let username = document.getElementById("username").value.trim();
    let verifyPassword = document.getElementById("verify-password").value.trim();
    if (email === "" |  password === "" | username === "" | verifyPassword === ""){
        alert("Please fill in all fields.");
        return;
    } else if (password === verifyPassword){
        alert("two password should be identical!!");
        return
    }

    fetch(apiUrl,{method: "POST", headers:{'Content-Type': 'application/json'}, 
    body: JSON.stringify({email: email, password: password, username: username})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('choose other email or password.');
        }
        return response.json();

    })
    .then(data => {
        localStorage.setItem("user", JSON.stringify(data));
    })
    .then(njkTemplate => {
        const njkHTML = nunjuck.renderString("../views/homepage.njk", 
        localStorage.getItem);
        document.documentElement.innerHTML = njkHTML;
        document.getElementById("login").toggleAttribute("hidden",true);
    })
    .catch(error => {
        // Alert the user if there's an error
        alert(error.message);
    });

}

function validateLoginForm(){
    apiUrl = "https://swe363api.onrender.com/auth"
    let email = document.getElementById("username-email").value.trim();
    let password = document.getElementById("password").value.trim();
    if (email === "" |  password === ""){
        alert("Please fill in all fields.");
        return;
    }

    fetch(apiUrl,{method: "POST", headers:{'Content-Type': 'application/json'}, body: JSON.stringify({email: email, password: password})
    })
    .then((req,response) => {
        if (!response.ok) {
            throw new Error('Incorrect email or password.');
          }
          return response.json();
    })
    .then(data => {
        localStorage.setItem("user", JSON.stringify(data));
        document.getElementById("login").toggleAttribute("hidden",true);
    })
    .catch(error => {
        // Alert the user if there's an error
        alert(error.message);
      });
}

function userLoged(){
    const userInfo = localStorage.getItem("user")
    if (userInfo != null){
        document.getElementById("login").toggleAttribute("hidden",true);
    }
}
function logout(){
    localStorage.removeItem("user");
    document.getElementsByClassName("login-form-container").setAttribute("hidden","");
    document.getElementsByClassName("register-form-container").toggleAttribute("hidden",true);
}

function toggleLoginRegisterForm(){
    document.getElementsByClassName("login-form-container").toggleAttribute("hidden");
    document.getElementsByClassName("register-form-container").toggleAttribute("hidden");
    document.documentElement.innerHTML = ""
}