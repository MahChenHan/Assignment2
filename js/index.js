$(document).ready(function() {
    loadExample(); // Load random sneaker into carousel featuring sneaker slide
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
        $(".featured-product").html(html);
    })

    .catch(function(e) { // If there is an error getting the sneaker, use a place holder sneaker
        console.log(e);
        var html = (`
            <div class="carousel-feature-slide" onclick=selectCard('c116b14f-8f00-454b-915c-f3f51c7a297c')>
                <img src="https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/445769/sub/sggoods_445769_sub2.jpg?width=1600&impolicy=quality_75" class="d-block w-100">
                <div class="carousel-caption carousel-feature-text d-md-block">
                    <h5>FEATURING</h5>
                    <p>Wool blended oversized pea coat<p>
                </div>
            </div>
        `);
        $(".featured-product").html(html);
    });
}

function loadLatest() {
    $(".latest").html(""); // Clear the latest section
    $(".latest").css("justify-content","flex-start"); // Set the latest section back to left aligned

    fetch("https://example-data.draftbit.com/products?_limit=5") 
    .then(response => response.json())
    .then(function(data) {
        var products = data;
        products.map(function(s) {
            $(".latest").append(`
                <div class="card" id="${s.id}" onclick="selectCard('${s.id}')">
                    <img src="${s.image_url}" style = "width:40%; height: 100%;">
                    <div class="card-body">
                        <span class="product-brand">${s.brand}</span>
                        <span class="product-name">${s.name}</span>
                        <span class="product-price">$${s.list_price}</span>
                    </div>
                </div>
            `);
        });
    });
}

function selectCard(productID) {
    localStorage.setItem("viewProductId", productID); // Store the sneaker ID in local storage
    window.location.href = "product.html";
}

const btnScrollToTop= document.querySelector("#btnScrollToTop");
btnScrollToTop.addEventListener("click", function(){
    window.scrollTo(0,0);

});