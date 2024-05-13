// import { renderString } from "../node_modules/nunjucks";

// document.getElementById("login-button").addEventListener("click",validateLoginForm)
// document.getElementById("register-button").addEventListener("click",validateRegisterForm)
// document.getElementById("logout-button").addEventListener("click",logout)
// document.getElementById("toggle-form-button").addEventListener("click",toggleLoginRegisterForm)
// document.addEventListener("DOMContentLoaded",startWeb);

// function startWeb(){
//     const njkHTML = nunjuck.renderString("../views/loginpage.njk", {});
//     document.documentElement.innerHTML = njkHTML
// }
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


async function validateRegisterForm(){
    apiUrl = "https://swe363api.onrender.com/register"
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("Regpassword").value.trim();
    let username = document.getElementById("username").value.trim();
    let verifyPassword = document.getElementById("verify-password").value.trim();
    if (email === "" ||  password === "" || username === "" || verifyPassword === ""){
        alert("Please fill in all fields.");
        return;
    } else if (password === verifyPassword){
        alert("two password should be identical!!");
        return
    }

    await fetch(apiUrl,{method: "POST", headers:{'Content-Type': 'application/json'}, 
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
        const njkHTML = renderString("../views/homepage.njk", {data})
        document.documentElement.innerHTML = njkHTML;
        document.getElementById("login").toggleAttribute("hidden",true);
    })
    .catch(error => {
        // Alert the user if there's an error
        alert(error.message);
    });

}

async function validateLoginForm(){
    
    // apiUrl = "https://swe363api.onrender.com/auth"

    // let email = document.getElementById("username-email").value.trim();
    // let password = document.getElementById("Logpassword").value.trim();
    // if (email === "" ||  password === ""){
    //     alert("Please fill in all fields.");
    //     return;
    // }

    // await fetch(apiUrl,{method: "POST", body: JSON.stringify({email: email, password: password})
    // })
    // .then((response) => {
    //     if (!response.ok) {
    //         throw new Error('Incorrect email or password.');
    //       }
    //       return response.json();
    // })
    // .then(data => {
    //     localStorage.setItem("user", JSON.stringify(data));
    //     // const njkHTML = renderString("../views/homepage.njk", {data})
    //     // document.documentElement.innerHTML = njkHTML;
    //     window.location.href = "homepage.html"
    //     document.getElementById("login").toggleAttribute("hidden",true);
    // })
    // .catch(error => {
    //     // Alert the user if there's an error
    //     alert(error.message);
    //   });


    const apiUrl = "https://swe363api.onrender.com/auth";
    const email = document.getElementById("username-email").value.trim();
    const password = document.getElementById("Logpassword").value.trim();

    if (email === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }
    req = new Request("http://localhost:3000/question", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    })
    
    try {
        // const response = await fetch(apiUrl, {
        //     method: "POST",
        //     body: JSON.stringify({ email, password })
        // });

        const response = await fetch(req);
        if (!response.ok) {
            throw new Error('Incorrect email or password.');
        }

        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        window.location.href = "homepage.html";
    } catch (error) {
        alert(error.message);
    }
}

function userLoged(){
    const userInfo = localStorage.getItem("user")
    if (userInfo != null){
        document.getElementById("login").toggleAttribute("hidden",true);
    }
}
function logout(){
    localStorage.removeItem("user");
    document.getElementsByClassName("login-form-container")[0].setAttribute("hidden","");
    document.getElementsByClassName("register-form-container")[0].toggleAttribute("hidden",true);
}

function toggleLoginRegisterForm(){
    document.getElementsByClassName("login-form-container")[0].toggleAttribute("hidden");
    document.getElementsByClassName("register-form-container")[0].toggleAttribute("hidden");
}