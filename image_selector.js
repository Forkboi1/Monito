window.onload = main

function main() {
    baseImage = document.getElementById("post_pic")
    var image1 = document.getElementById("1");
    var image2 = document.getElementById("2");
    var image3 = document.getElementById("3");
    var image4 = document.getElementById("4");

    // Add click event listeners to other images
    image1.addEventListener("click", function () {
        baseImage.src = image1.src;
    });

    image2.addEventListener("click", function () {
        baseImage.src = image2.src;
    });

    image3.addEventListener("click", function () {
        baseImage.src = image3.src;
    });

    image4.addEventListener("click", function () {
        baseImage.src = image4.src;
    });

}


