### Github deployment link
- https://mahchenhan.github.io/PlanetCommerce/
### Pitch for our website
- https://drive.google.com/file/d/1R1uYFY1r3OWQusXaKy9HbqzMnu03k5Rv/view?usp=sharing
# PlanetCommerce

Our website is named 'PlanetCommerce'. This website will be a one-stop shop for users in need of almost everything, hence the name 'PlanetCommerce'. It will supply products of any kind, ranging from kitchen appliances to clothing. It will also reward users for checking out with a game that gives them a chance of winning discounts. We used Draftbit's products API to get our items.
 
## Design Process
[Wireframe for PlanetCommerce](https://xd.adobe.com/view/72239bdd-a8ae-44e3-919f-be5d3f50a356-2770/)
We designed this website with the everyday end-user in mind, focusing on ease-of-access and simplicity. 
* **Customers**
    * Customers will be able to view a large variety of products, ranging from appliances to clothing.
    * Customers would be able to earn a free spin when checking out with the chance of winning discounts.

 
## Features
### Existing Features
- A Logo
- Navigation Bar with Shopping Cart Icon
- Search Bar that filter through the available products
- Spin the wheel reward system modal 
- Contact page with messages linked to a database
- Checkout page with orders linked to a database
- Lottie Loading Animations
- Back to top button
- Footer


## Technologies Used

- HTML 
- CSS

- [JQuery](https://jquery.com)
- [JavaScript](https://www.javascript.com/)
- [Adobe XD](https://www.adobe.com/sea/products/xd.html)
    - Making of wireframe.
- [Bootstrap](https://getbootstrap.com/)
    - To make the responsive navigation bar, carousel and more.
- [RestDB](https://restdb.io/) 
    - To store contactform information, as well as order information.
- [Lottie](https://lottiefiles.com/)
    - Used Lottie for the loading animations and more.

## Testing

1. Contact form:
    1. Go to the "Contact Us" page
    2. Try to submit the empty form and verify that an error message about the required fields appears
    3. Try to submit the form with an invalid email address and verify that a relevant error message appears
    4. Try to submit the form with all inputs valid and verify that it is successful and is sent to the restdb API.

2. Cart:
    1. Go to the "Cart" page when it is empty
    2. Ensure that the user is not allowed to checkout, as well as total cost does not appear.
    3. Try to checkout when the cart is not empty and ensure that it works.
    4. Ensure that the Spin the wheel functions.
    5. Calculate the price after discount (if any) and ensure that the total tallies.
   
3. Discover:
    1. Go to the "Discover" page 
    2. Enter keywords into the searchbar, ensuring that all results are relevant.

4. Product: 
    1. Go to a "Product" page of a product without a category, ensuring that it does not show the category.
    2. Go to a "Product" page of a product with a category without sizes, ensuring the size buttons do not appear.
    3. Go to a "Product" page of a product with a category with sizes, ensuring the size buttons appear.
    4. Go to a "Product" page of a product and ensure that a quantity of less than or equal to 0 is not allowed.
  
## Credits

### Content
- Draftbit API → Products data API.
- restdb API → Storing of contactforms and order data.

### Media
- The photos used in this site were obtained from Uniqlo.

### Acknowledgements
- We received inspiration for this project from Uniqlo.


