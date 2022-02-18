var cart = JSON.parse(localStorage.getItem('cart')); 
var totalPrice = 0; 
var spinned = false;
var isValid = true;


$(document).ready(function () {

    checkEmpty(); 

    function checkValidation()
    {
        var isValid = true;
        if($("#name").val() == null || $("#name").val() == ""){
            isValid = false;
        }

        if($("#address").val() == null || $("#address").val() == ""){
            isValid = false;
        }

        if($("#contact").val() == null || $("#contact").val() == ""){
            isValid = false;
        }

        return isValid;
    }

    $('.table-body').on('click', ".delete", function(e) { 
        $(".table-body").html("");
        totalPrice = 0; 
        cart.splice(e.target.attributes.value.value, 1); 
        localStorage.setItem('cart', JSON.stringify(cart)); 
        checkEmpty(); 
    });

    $('.delete-all').on('click', function(e) { 
        totalPrice = 0;
        localStorage.removeItem('cart'); 
        $(".table-body").html(""); 
        checkEmpty(); 
        location.reload();
    });

    $("#checkout-form").submit(function(e) {
        e.preventDefault();
        if (checkValidation() === false) { alert("The form was invalid."); $("#spinWheelModal").hide; location.reload(); }
        else
        {
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time;
            if (spinned === false)  {
                var padding = {top:20, right:40, bottom:0, left:0},
                            w = 600 - padding.left - padding.right,
                            h = 600 - padding.top  - padding.bottom,
                            r = Math.min(w, h)/2,
                            rotation = 0,
                            oldrotation = 0,
                            picked = 100000,
                            oldpick = [],
                            color = d3.scale.category20();
                        var data = [
                                    {"label":"10% off",  "value":1}, 
                                    {"label":"5% off",  "value":2}, 
                                    {"label":"$15 off",  "value":3}, 
                                    {"label":"$10 off",  "value":4}, 
                                    {"label":"$5 off",  "value":5}, 
                                    {"label":"15% off",  "value":6}, 
                                    {"label":"You lost.",  "value":7},

                        ];

                        var svg = d3.select('#chart')
                            .append("svg")
                            .data([data])
                            .attr("width",  w + padding.left + padding.right)
                            .attr("height", h + padding.top + padding.bottom);

                        var container = svg.append("g")
                            .attr("class", "chartholder")
                            .attr("transform", "translate(" + (w/2 + padding.left) + "," + (h/2 + padding.top) + ")");
                        var vis = container
                            .append("g");
            
                        var pie = d3.layout.pie().sort(null).value(function(d){return 1;});
                        var arc = d3.svg.arc().outerRadius(r);
                        var arcs = vis.selectAll("g.slice")
                            .data(pie)
                            .enter()
                            .append("g")
                            .attr("class", "slice");
            
                        arcs.append("path")
                            .attr("fill", function(d, i){ return color(i); })
                            .attr("d", function (d) { return arc(d); });
                        arcs.append("text").attr("transform", function(d){
                            d.innerRadius = 0;
                            d.outerRadius = r;
                            d.angle = (d.startAngle + d.endAngle)/2;
                            return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
                        })

                        .attr("text-anchor", "end")
                        .text( function(d, i) {
                            return data[i].label;
                        });
                        container.on("click", spin);

                        svg.append("g")
                            .attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h/2)+padding.top) + ")")
                            .append("path")
                            .attr("d", "M-" + (r*.15) + ",0L0," + (r*.05) + "L0,-" + (r*.05) + "Z")
                            .style({"fill":"black"});
                        container.append("circle")
                            .attr("cx", 0)
                            .attr("cy", 0)
                            .attr("r", 60)
                            .style({"fill":"white","cursor":"pointer"});

                        container.append("text")
                            .attr("x", 0)
                            .attr("y", 15)
                            .attr("text-anchor", "middle")
                            .text("SPIN")
                            .style({"font-weight":"bold", "font-size":"30px"});
                        
                        function rotTween(to) {
                          var i = d3.interpolate(oldrotation % 360, rotation);
                          return function(t) {
                            return "rotate(" + i(t) + ")";
                          };
                        }
                        
            }

            function spin(d){
                container.on("click", null);
                if(oldpick.length == data.length){
                    container.on("click", null);
                    return;
                }
                var  ps       = 360/data.length,
                     pieslice = Math.round(1440/data.length),
                     rng      = Math.floor((Math.random() * 1440) + 360);
                    
                rotation = (Math.round(rng / ps) * ps);
                
                picked = Math.round(data.length - (rotation % 360)/ps);
                picked = picked >= data.length ? (picked % data.length) : picked;
                rotation += 90 - Math.round(ps/2);
                vis.transition()
                    .duration(1500)
                    .attrTween("transform", rotTween)
                    .each("end", function(){
                        d3.select(".slice:nth-child(" + (picked + 1) + ") path")
                        oldrotation = rotation;
                        return(data[picked].value)
                        
                    });

                return(data[picked].value)
            }

            var spinvalue = spin();
            var discount = "";
            var dpercent = "";

            if ( spinvalue == 7)
            {
                discount = "";
            }
            
            if (spinvalue == 6)
            {
                discount = "15%";
            }
            if (spinvalue == 5)
            {
                discount = "5";
            }

            if (spinvalue == 4)
            {
                discount = "10";
            }
            if (spinvalue == 3)
            {
                discount = "15";
            }
            if (spinvalue == 2)
            {
                discount = "5%";

            }
            if (spinvalue == 1)
            {
                discount = "10%";
            }

            if (discount.slice(-1) == "%") { dpercent = parseInt(discount, 10); discount = 0; }

            let jsondata = {
                "name": $("#checkout-modal #name").val(),
                "address": $("#checkout-modal #address").val(),
                "contactNo": $("#checkout-modal #contact").val(),
                "totalPrice": ((totalRounded / 100) *  (100 - dpercent) - parseInt(discount,10)) ,
                "orderDate": dateTime
            };
                    
            $.ajax({
                "async": true,
                "crossDomain": true, 
                "url": "https://planetcommerce-d339.restdb.io/rest/orders",
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                    "x-apikey": "620e631834fd62156585873b",
                    "cache-control": "no-cache"
                },
                "processData": false,
                "data": JSON.stringify(jsondata)

            }).done(function() { 
                localStorage.removeItem('cart'); 
                totalPrice = 0;
                $(".table-body").html(""); 
                checkEmpty(); 
                alert("Your new total cost is: $" + ((totalRounded / 100) *  (100 - dpercent) - parseInt(discount,10)));
                alert("Your order was successful!");
                location.reload();
            })     
        }
    });

    $("#spinWheel-form").submit(function(f) { 

        spinWheel();
    })
});

async function loadCart() {
    var products = [];
    cart.map(s => {
        let product = fetch(`https://example-data.draftbit.com/products/${s[0]}`)
        .then(res => res.json())
        .then(data => {
            return data;
        });
        products.push(product);
    });
    products = await Promise.all(products);
    displayBag(products);
}

function displayBag(products) {
    $('.bag-loading').hide();
    $(".table-body").html("");
    var htmlString = '';
    for (var i = 0; i < cart.length; i++) {
        if (cart[i][0] == products[i].id) {
            var productPrice = products[i].list_price * cart[i][1];
            totalPrice += productPrice;
            totalRounded = Math.round(totalPrice * 100) / 100
            htmlString += (`
                <tr>
                    <th scope="row">${i + 1}</th>
                    <td><img src = ${products[i].image_url} style = "max-width: 500px;" id = "cart-img" onclick=selectCard('${products[i].id}')></img></td>
                    <td style = "font-size: 20px;" >${products[i].name}</td>
                    <td style = "font-size: 20px;" >${cart[i][1]}</td>
                    <td style = "font-size: 20px;" >${cart[i][2]}</td>
                    <td style = "font-size: 20px;" >$${productPrice}</td>
                    <td class="delete" value="${i}" style = "font-size: 20px;">Delete</td>
                </tr>
            `);
        }
    }
    $('.table-body').html(htmlString);
    $('#total-cost').html(`$${totalRounded}`);
}

function checkEmpty() { 
    if (localStorage.getItem('cart') == null || localStorage.getItem('cart') == "[]") {
        $('.table-body').append(`<tr><th colspan="6" style="font-size: 30px; text-align: center;">Your cart is empty.</th></tr>`);
        $('footer').css('position','absolute');
        $('footer').css('bottom','0');
        $('.total-cost-header').hide();
        $('.shopping-form-box').hide();
        $('.delete-all').hide();
        $('.checkout-box').hide();
        
    }

    else { loadCart(); $('.discover-box').hide(); }
}

function selectCard(productID) {
    localStorage.setItem("viewProductId", productID); 
    window.location.href = "product.html";
}

