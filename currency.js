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

    baseImage = document.getElementById("post_pic")
    var image1 = document.getElementById("1");
    var image2 = document.getElementById("2");
    var image3 = document.getElementById("3");
    var image4 = document.getElementById("4");

    // Add click event listeners to other images
    image1.addEventListener("click", function () {

        baseImage.setAttribute("src", image1.src);
    });

    image2.addEventListener("click", function () {
        baseImage.setAttribute("src", image2.src);
    });

    image3.addEventListener("click", function () {
        baseImage.src = image3.src;
    });

    image4.addEventListener("click", function () {
        baseImage.src = image4.src;
    });

}

