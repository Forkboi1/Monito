// const nunjucks = require('nunjucks');
// nunjucks.configure('../views');
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
    } else if (password != verifyPassword){
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
        document.getElementById("login").toggleAttribute("hidden",true);
        window.location.href = "homepage.html"
        // const njkHTML = renderString("../views/homepage.njk", {data})
        // document.documentElement.innerHTML = njkHTML;
    })
    .catch(error => {
        // Alert the user if there's an error
        alert(error.message);
    });

}

async function validateLoginForm(){
    
    apiUrl = "https://swe363api.onrender.com/auth"

    let email = document.getElementById("username-email").value.trim();
    let password = document.getElementById("Logpassword").value.trim();
    if (email === "" ||  password === ""){
        alert("Please fill in all fields.");
        return;
    }

    await fetch(apiUrl,{method: "POST", headers: {"content-type": "application/json"}, body: JSON.stringify({email: email, password: password})
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Incorrect email or password.');
          }
          return response.json();
    })
    .then(data => {
        localStorage.setItem("user", JSON.stringify(data));
        // const njkHTML = renderString("../views/homepage.njk", {data})
        // document.documentElement.innerHTML = njkHTML;
        window.location.href = "homepage.html"
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
    document.getElementsByClassName("login-form-container")[0].setAttribute("hidden","");
    document.getElementsByClassName("register-form-container")[0].toggleAttribute("hidden",true);
}

function toggleLoginRegisterForm(){
    document.getElementsByClassName("login-form-container")[0].toggleAttribute("hidden");
    document.getElementsByClassName("register-form-container")[0].toggleAttribute("hidden");
}

async function showPosts(){
    apiUrl = "https://swe363api.onrender.com/post"
    if (localStorage.getItem("user")){
        document.getElementById("login").toggleAttribute("hidden",true);
    }

    await fetch(apiUrl,{
        method: "GET", 
        headers: {"content-type": "application/json"}
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("couldn't retrieve posts due to server");
          }
          return response.json();
    })
    .then(data => {

        data.posts.forEach(post => {
            if (post.postType === "pet"){
                postPetInHomepage(post);
            }else if(post.postType === "product") {
                postProductInHomepage(post);
            }else{
                postPetInHomepage(post);
            }
        })
    })
    .catch(error => {
        // Alert the user if there's an error
        alert(error.message);
      });
}

// render pet posts
function postPetInHomepage(postData){
    console.log()
    petBody = document.getElementsByClassName("product_view")[0]
    // renderPostFetch(postData._id, postData.userId)
    petBody.innerHTML +=`             
            <a href="./post.html?postId=${postData._id}&userId=${postData.userId}">
                <div class="animal">
                    <img src="${postData.photoUrls[0]}" alt="${postData.code} - ${postData.name}">
                    <table>
                        <tr>
                            <td><strong>${postData.code} - ${postData.name}</strong></td>
                        </tr>
                        <tr>
                            <td>Gene: ${postData.gender} # Age:${postData.age} Months</td>
                        </tr>
                        <tr>
                            <td><strong>${postData.price} SAR</strong></td>
                        </tr>
                    </table>
                </div>
            </a>`
}
// render product posts
function postProductInHomepage(postData){
    productBody = document.getElementsByClassName("product_view")[1]
    productBody.innerHTML +=`             
            <a href="./post.html?postId=${postData._id}&userId=${postData.userId}">
                <div class="animal">
                    <img src="${postData.photoUrls[0]}" alt="${postData.name}">
                    <table>
                        <tr>
                            <td><strong>${postData.name}</strong></td>
                        </tr>
                        <tr>
                            <td>Gene: ${postData.type} # Size: ${postData.weight}kg</td>
                        </tr>
                        <tr>
                            <td><strong>${postData.price} SAR</strong></td>
                        </tr>
                    </table>
                </div>
            </a>`
}

async function renderPostFetch(postId, userId){
    window.location.href = ""
    apiUrlGetUserInfo = "https://swe363api.onrender.com/users/" + userId;
    apiUrlGetPostInfo = "https://swe363api.onrender.com/post/" + postId;
    let post;
    let user;

    await fetch(apiUrlGetPostInfo,{
        method: "GET", 
        headers: {"content-type": "application/json"}
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("couldn't retrieve posts due to server");
          }
          return response.json();
    })
    .then(data => {
        post = data
    })
    .catch(error => {
        // Alert the user if there's an error
        alert(error.message);
      });

    await fetch(apiUrlGetUserInfo,{
        method: "GET", 
        headers: {"content-type": "application/json"}
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("couldn't retrieve posts due to server");
          }
          return response.json();
    })
    .then(data => {
        user = data
    })
    .catch(error => {
        // Alert the user if there's an error
        alert(error.message);
      });

      renderPostFetch(post);
      renderUserInfo(user, post);
      renderCommentsSection(user, post.comments);
}

function renderPostInfo(post){
    let postCard = document.getElementById("post_desc");
    let postButtons = document.getElementById("post_buttons");

    postCard.innerHTML = `<table>
    <caption><strong>Animal Info</strong></caption>
    <tr>
        <td>
            <strong>Name:</strong>${post.name}
        </td>
        <td>
            <strong>Age:</strong>${post.age} Months
        </td>
        <td>
            <strong>Gender:</strong>${post.gender}
        </td>
        <td>
            <strong>Height</strong>${post.height}cm
        </td>
    </tr>
    <tr>
        <td>
            <strong>Species:</strong>${post.species}
        </td>
        <td>
            <strong>Type:</strong>${post.type}
        </td>
        <td>
            <strong>Mutation:</strong>${post.mutation}
        </td>
        <td>
            <strong>Weight</strong>${post.weight}Kg
        </td>
    </tr>
    <tr>
        <td>
            <strong>Tame:</strong>${post.tame}
        </td>
        <td>
            <strong>Clipped:</strong>${post.clipped}
        </td>
        <td colspan="2">
            <strong>Breeding Location:</strong>${post.breedingLocation}
        </td>
    </tr>
    <tr>
        <td colspan="2">
            <strong>code:</strong>${post.code}
        </td>
        <td style="font-size: 30px;" colspan="2">
            <strong>Price: ${post.price} SAR</strong>
        </td>
    </tr>
</table>`;

    postButtons.innerHTML = `
    <button id="cart_button">Add to Cart</button>
    <button id="wish_button">Add to WishList</button>
    <form action="GET">
         <label for="quantity" style="font-weight: 800; margin-right: 8px;">Quantity</label>
         <input type="number" id="quantity" name="quantity" min="0" max="1" value="1"> 
    </form>`;

}

function renderUserInfo(user, post){
    let userCard = document.getElementById("post_card");
    userCard.innerHTML = `<p><strong>Animal Description:</strong></p>
    <p id="desc">${post.description}</p>
    <p><strong>Seller Rating: ${displayRatingStars(user.rate)}</strong></p>
    <p><strong>Seller Location: ${user.userLocation.split(",")[1]}</strong></p>
    <a href="">@${user.username}</a>`
}

function displayRatingStars(ratingList){

}

function renderCommentsSection(user, comments){
    let commentSection = document.getElementById("comment_section");
    comments.forEach(comment => {
        commentSection.innerHTML += `<div class="comment">
        <p><a href="" class="bolded">By: @${comment.username}</a></p>
        <p>${comment.text}</p>
        <p class="right_aligned bolded"> ${comment.addedAt}</p>
    </div>`
    });
}
function personal_page(){
   if(localStorage.getItem('user') == null){
    window.location.href = "loginpage.html";
   }
   else{
    document.getElementById("login").style.display ="none";
   const userLocal = localStorage.getItem('user');
   const user = JSON.parse(userLocal).user;
// Access the username property from the user object
const username = user.username;
   const name = document.getElementById('name')
   name.innerHTML +=`
   <strong>${username}</strong>
   `
   const name2 = document.getElementById('name2')
   name2.innerHTML +=`
   <strong>${username}</strong>
   `
   const name3= document.getElementById('name_div')
   name3.innerHTML+=`
   <input type="text" id="fName" name="fName" value=${username}>`
   const email = document.getElementById('email_div')
   email.innerHTML+=`
   <input type="text" id="email" name="email" value=${user.email}>`
   const password = document.getElementById("password_div")
   password.innerHTML+=`
   <input type="password" id="password" name="password" value=${user.password}>`
}
}
function edit_user(){
const userLocal = localStorage.getItem('user');
const user = JSON.parse(userLocal).user;
    const emailValue = document.getElementById('email').value;
    const passwordValue = document.getElementById('password').value;
    const usernameValue = document.getElementById('fName').value;
    const token =  JSON.parse(userLocal).token;
    fetch("https://swe363api.onrender.com/users/", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'x-auth': token
            },
            body: JSON.stringify({
                email: emailValue,
                password: passwordValue,
                username: usernameValue
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('invalid');
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            // Alert the user if there's an error
            alert(error.message);
        });
}