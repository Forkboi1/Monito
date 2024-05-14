
async function main() {
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
    productSection = document.getElementById("products")
    cartPosts = []
    console.log(JSON.parse(localStorage.getItem("user")).token)
    await fetch("https://swe363api.onrender.com/cart", {
        method: "GET",
        headers: { "content-type": "application/json", "x-auth": JSON.parse(localStorage.getItem("user")).token }
    }).then(response => response.json()).then(data => { cartPosts = data; });

    if (cartPosts.length > 0) {
        console.log(cartPosts)
        cartPosts.forEach(post => {
            productSection.innerHTML += `<div class ="product"><img src="${post.photoUrls[0]}" alt="">
                <div>
                    <p class="bolded_p">${post.title}</p>
                    <p class="description">${post.description}</p>
                </div>
                <input class ="number_of_items" type ="number" min="1" max="1" value="1">
                <p class="price">${post.price} SAR</p>
                <img class="delete" src="content/delete.png" alt="delete"></div>`
        });
    }



    to_pay = document.getElementById("pay")

    to_pay.addEventListener("click", function () {
        window.location.href = "pay.html";

    })
}