$(document).ready(function() {
    $(".latest").html(`<lottie-player id ="loading-latest" src="https://assets6.lottiefiles.com/packages/lf20_FT6Ci5.json"  background="transparent"  speed="1"  style="width: 500px; height: 500;"  loop  autoplay></lottie-player>`); // Clear the latest section
    
    loadExample(); 
    loadLatest(); 
});

function loadExample() {
    fetch("https://example-data.draftbit.com/products/"+ Math.floor(Math.random() * 100))
    .then(response => response.json())
    .then(data => {
        let html ="";
        html+= `
        <a onclick=selectCard('${data.id}')>
            <img src="${data.image_url}" style = "padding-left: 25%;" class="d-block w-75" alt="...">
            <div class="carousel-caption d-md-block">
            <h5 style = "-webkit-text-stroke: 1px white; font-weight: normal; font-size: 30px; color: black;">${data.name}</h5>
            </div>
        </a>`
        $(".random-product").html(html);
    })
}

function loadLatest() {
    $(".latest").html(""); 
    $(".latest").css("justify-content","flex-start"); 
    fetch("https://example-data.draftbit.com/products?_limit=5") 
    .then(response => response.json())
    .then(function(data) {
        var products = data;
        products.map(function(s) {
            $(".latest").append(`
                <div class="card" id="${s.id}" onclick="selectCard('${s.id}')">
                    <img src="${s.image_url}" style = "width:40%; height: 100%;">
                    <div class="card-body">
                        <span class="products-brand">${s.brand}</span>
                        <span class="products-name">${s.name}</span>
                        <span class="products-price">$${s.list_price}</span>
                    </div>
                </div>
            `);
        });
    });
}

function selectCard(productID) {
    localStorage.setItem("viewProductId", productID); 
    window.location.href = "product.html";
}

const btnScrollToTop= document.querySelector("#btnScrollToTop");
btnScrollToTop.addEventListener("click", function(){
    window.scrollTo(0,0);
});
