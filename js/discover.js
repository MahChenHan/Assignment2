let url = "https://example-data.draftbit.com/products";
const searchBar = document.getElementById('searchBar');
let category, query;

$(document).ready(function() {
    $(".loading-icon").hide(); 
    displayProducts(`${url}`); 


    $("#searchBar").keyup(function(e) {
        if (e.keyCode === 13) {
            e.preventDefault(); 
            $('#search').click();
        }
    });

    $('#search').on("click", function() { 
        query = $("#searchBar").val().replaceAll(' ', '%20'); 
        displayProducts(url + `?q=${query}`); 
        console.log(query);

    });
});


function displayProducts(url) { 
    $(".products-cards").html(""); 

    fetch(url) 
    .then(response => response.json())
    .then(function(data) {
        data.map(function(s) {
            if (s.list_price == null) { 
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
            
            $(".loading-icon").hide(); 
        });
    });
    
}

function selectCard(productId) { 
    localStorage.setItem("viewProductId", productId);
    window.location.href = "product.html";
}

const btnScrollToTop= document.querySelector("#btnScrollToTop");
btnScrollToTop.addEventListener("click", function(){
    window.scrollTo(0,0);

});
