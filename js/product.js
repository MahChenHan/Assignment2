$(document).ready(function() {
  productId = localStorage.getItem('viewProductId');
  loadProducts(productId);
  $(".load-atc").hide();
  var cart;
  if (localStorage.getItem('cart') != null) { 
      cart = JSON.parse(localStorage.getItem('cart'));
  }
  
  else { 
      cart = [];
  }

  $(".qty").keyup(function(e) {
    if (e.keyCode === 13) { 
      e.preventDefault(); 
      if ($(".qty").val() <= 0) $(".qty").val(1); 
    }

  });

  $("#addtoCart").click(function() { 
      $(".atc-pop").show();
      if ($(".qty").val() <= 0) $(".qty").val(1); 
      var qty = Number($(".qty").val()); 
      var item = [productId, qty, size]; 
      var notDuplicate = true; 
      
      for (var i = 0; i < cart.length; i++) {
        if (item[0] === cart[i][0] && item[2] === cart[i][2]) {
          cart[i][1] += item[1]; 
          notDuplicate = false;
        }
      }

      if (notDuplicate) cart.push(item); 
      localStorage.setItem('cart', JSON.stringify(cart));
      setTimeout(function() {
        $(".atc-pop").hide();
      }, 1400);

  });

    $(".incre-button").on("click", function() {
            var $button = $(this);
            var oldValue = $button.parent().find("input").val();
        
            if ($button.text() == "+") { 
                if (oldValue >= 1 && oldValue < 99) newVal = parseFloat(oldValue) + 1;
                else newVal = 1;
            } 

            else {
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
      checkcategory(data.category); 
  });
}


function getstar(ratings) {
  const starTotal = 5 

  const starPercentage = (ratings / starTotal) * 100;

  const starPercentageRounded = `${(Math.round(starPercentage / 4) * 4)}%`;

  document.querySelector(`.product-rating .stars-inner`).style.width=starPercentageRounded; 
}

function checkcategory(category) {
  var string = '';
  switch(category) {   
    case 'underwear & socks': 
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

    case null:
    case '':
    case `view all`:
    case `wall decor`:
    case `sale`:
    case `$30-$50 handbags & wallets`:
    case `comforters`:
    {
      $('.product-category').html(`This item has no category in the database.`);
      size = '';
      break;
    }
  }

}

function setSize(value) { size = value; } 
