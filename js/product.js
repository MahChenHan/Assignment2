$(document).ready(function() {
  productId = localStorage.getItem('viewProductId');
  loadProducts(productId);
  var cart;
  if (localStorage.getItem('cart') != null) { // If user has an exisiting shopping bag, get the shopping bag array
      cart = JSON.parse(localStorage.getItem('cart'));
  }
  
  else { // Otherwise, create an empty shopping bag array
      cart = [];
  }

  $(".qty").keyup(function(e) {
    if (e.keyCode === 13) { // If user press enter
      e.preventDefault(); // Prevent page refresh
      if ($(".qty").val() <= 0) $(".qty").val(1); // If user set their input as less than or equal to 0, set back to 1
    }

  });

  $("#addtoCart").click(function() { // If user clicks add to bag
      $("#addtoCart").hide(); // Hide the add to bag button

      if ($(".qty").val() <= 0) $(".qty").val(1); // If user set their input as less than or equal to 0, set back to 1
      
      var qty = Number($(".qty").val()); // Otherwise, get the value of the qty input
      var item = [productId, qty, size]; // Item array to store the inputs the user set
      var notDuplicate = true; // Create a not duplicate variable for check
      console.log("hi2");
      
      // Check if the user has already added the same sneaker with the same size
      for (var i = 0; i < cart.length; i++) {
        if (item[0] === cart[i][0] && item[2] === cart[i][2]) {
          cart[i][1] += item[1]; // Add the qty together if they are the same
          notDuplicate = false;
          console.log("hi1");
        }
      }

      if (notDuplicate) cart.push(item); // Otherwise, add the item
      localStorage.setItem('cart', JSON.stringify(cart));
      setTimeout(function() {
        $("#addtoCart").show(); 
      }, 2000);
      console.log("hi");

  });

    // +/- qty button increment
    $(".incre-button").on("click", function() {
            var $button = $(this);
            var oldValue = $button.parent().find("input").val();
        
            if ($button.text() == "+") { 
                // Don't allow incrementing above 99
                if (oldValue >= 1 && oldValue < 99) newVal = parseFloat(oldValue) + 1;
                else newVal = 1;
            } 

            else {
                // Don't allow decrementing below 1
                if (oldValue > 1) newVal = parseFloat(oldValue) - 1;
                else newVal = 1;
            }

        $button.parent().find("input").val(newVal);
    });
});

function loadProducts(product_id) {
  var url = `https://example-data.draftbit.com/products/${product_id}`;
  fetch(url)
  .then(response => response.json())
  .then(function(data) {
      $('.product-img').append(`<img src="${data.image_url}" alt="${data.name}" style = "width: 88%; height: 100%;"/>`);
      $('.product-name').html(data.name);
      $('.product-brand').append(data.brand);
      $('.product-price').append(data.list_price);
      $('.product-category').append(data.category);
      $('.product-description').append(data.description);
      
      getstar(data.average_product_rating);
      checkcategory(data.category); // Check the category size
  });
}


function getstar(ratings) {
  const starTotal = 5 
  // 2
  const starPercentage = (ratings / starTotal) * 100;
  // 3
  const starPercentageRounded = `${(Math.round(starPercentage / 4) * 4)}%`;
  // 4
  document.querySelector(`.product-rating .stars-inner`).style.width=starPercentageRounded; 
}

function checkcategory(category) {
  var string = '';
  switch(category) {
      
    case 'underwear & socks': // If the sneaker is for men, get sizes from US6 to US12
    case 'pants':
    case `women's jeans`:
    case `pants & leggings`:
    case `sports bras`:
    case `jeans`:
    case `sports apparel`:
    case `swimsuits & cover-ups`:
    case `coats & jackets`:
    case `tanks & camis`:
    case `evening and cocktail dresses`:
    case `activewear`:
    case "fit and flare dresses":
    case `levi’s`:
    case `ankle, crops & capris`:
    case `cardigans`:
    case `shorts`:
    case `women's sweaters`:
    case `graduation dresses`:
    case `school uniforms`:
    case `juniors' jeans`:
    case `dresses`:
    case `women`:
    case `basketball`:
    case `shoe, handbag & accessories sale`:
    case `casual shoes`:
    case `comfort shoes`:
    {
      $('.size-label').html(`Size:`);
      string += `
        <input type="radio" class="btn-check" name="size" id="sizeXS" onclick="setSize('XS')" >
        <label class="btn btn-outline-primary" for="sizeXS">XS</label>
      `;

      string += `
        <input type="radio" class="btn-check" name="size" id="sizeS" onclick="setSize('S')"checked>
        <label class="btn btn-outline-primary" for="sizeS">S</label>
      `;

      string += `
      <input type="radio" class="btn-check" name="size" id="sizeM" onclick="setSize('M')" >
      <label class="btn btn-outline-primary" for="sizeM">M</label>
      `;

      string += `
      <input type="radio" class="btn-check" name="size" id="sizeL" onclick="setSize('L')">
      <label class="btn btn-outline-primary" for="sizeL">L</label>
      `;

      string += `
      <input type="radio" class="btn-check" name="size" id="sizeXL" onclick="setSize('XL')">
      <label class="btn btn-outline-primary" for="sizeXL">XL</label>
      `;

      $('.size').append(string);
      size = 'S';
      break;

    }

    case '':
      $('.product-category').html(`This item has no category in the database.`);
      //$('.size').html();
      $('.product-size .btn-group').style.width =" 0px;";
      size = '';
      break;
    
  }

}

function setSize(value) { size = value; } // If user clicks on a size radio button, set the size value to size variable