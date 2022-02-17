let url = "https://example-data.draftbit.com/products";
const searchBar = document.getElementById('searchBar');
let category, query;

$(document).ready(function() {
    displayProducts(`${url}`); // Inital sneaker data load

    // If user press enter in search fill
    $("#searchBar").keyup(function(e) {
        if (e.keyCode === 13) {
            e.preventDefault(); // Prevent page refresh
            $('#search').click();
        }
    });

    $('#search').on("click", function() { // If user searches for a sneaker
        query = $("#searchBar").val().replaceAll(' ', '%20'); // Get the search input and replace all the spaces with "%20"
        displayProducts(url + `?q=${query}`); // Load the sneaker data
        console.log(query);

    });
});


function displayProducts(url) { // Load sneaker data
    $(".products-cards").html(""); // Clear sneaker cards

    fetch(url) // Get saved global variable url
    .then(response => response.json())
    .then(function(data) {
        data.map(function(s) {
            if (s.list_price == null) { // If the price is null means that the sneaker is unavailable
                $(".products-cards").append(`
                <li class="products-card" id="${s.id}" style="opacity: 0.7">
                    <img src="${s.image_url}" alt="${s.name}" />
                    <span class="products-name">${s.name}</span>
                    <span class="products-brand">${s.brand}</span>
                    <span class="products-list_price">Not Available</span>
                </li>
                `);
            }       

            else {
                $(".products-cards").append(`
                    <li class="products-card" onclick="selectCard('${s.id}')" id="${s.id}" style="cursor: pointer">
                        <img src="${s.image_url}" alt="${s.name}" />
                        <span class="products-brand">${s.brand}</span>
                        <span class="products-name">${s.name}</span>   
                        <span class="products-list_price">$${s.list_price}</span>
                        
                    </li>
                `);
            }
        });
    });
    
}

function selectCard(productId) { // If user has selected a sneaker, direct them to the product page
    localStorage.setItem("viewProductId", productId);
    window.location.href = "product.html";
}

const btnScrollToTop= document.querySelector("#btnScrollToTop");
btnScrollToTop.addEventListener("click", function(){
    window.scrollTo(0,0);

});