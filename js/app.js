'use strict';

// TODO: Fix duplication of images displayed immediately before
// TODO: Turn off event listeners after 25 selections
// TODO rel: Allow for 25 selections because there are only 20 images and each click subtracts from the whole
// TODO: display list of products with votes received

// VAR INIT =====

// array of product objects
var products = [];
// to prevent duplication in same render
var displayedProducts = [];
// to track clicked products
var clickedProducts = [];

// product objects
var leftProduct;
var centerProduct;
var rightProduct;

var productImageParent = document.getElementById('productImage');

// OBJECT CONSTRUCTOR =====
function Product(displayName, path){
  this.displayName = displayName;
  this.path = path;
  this.description = this.path.slice(0, this.path.length - 4);
  // TODO: track displayed and track clicked
  this.displayed = 0;
  this.clicked = 0;
}

// OBJECT METHODS =====
Product.prototype.render = render;
Product.prototype.pushToArray = function (){
  products.push(this);
};
Product.prototype.countDisplayed = function (){
  this.displayed ++;
};
Product.prototype.countClicked = function (){
  this.clicked ++;
};

// CREATE PRODUCT OBJECTS =====
new Product('Rolling Familiar Robot Bag', 'bag.jpg').pushToArray();
new Product('Convenient Banana Slicer', 'banana.jpg').pushToArray();
new Product('Ultimate Poopbook Accessory', 'bathroom.jpg').pushToArray();
new Product('Guaranteed Wet Toes Boots', 'boots.jpg').pushToArray();
new Product('Ultimate Breakfast Maker', 'breakfast.jpg').pushToArray();
new Product('Meatball Flavored Bubblegum', 'bubblegum.jpg').pushToArray();
new Product('The Most Uncomfortable Chair', 'chair.jpg').pushToArray();
new Product('Adorable Lord of Darkness Action Figure Complete With Victim', 'cthulhu.jpg').pushToArray();
new Product('Bark to Quack Transformer Accessory', 'dog-duck.jpg').pushToArray();
new Product('Canned Dragon Meat', 'dragon.jpg').pushToArray();
new Product('Utensi-Pen The Ultimate Multitasking Tool', 'pen.jpg').pushToArray();
new Product('Animal Powered Debris Removal System', 'pet-sweep.jpg').pushToArray();
new Product('Pizza Scissors', 'scissors.jpg').pushToArray();
new Product('Snuggle Shark', 'shark.jpg').pushToArray();
new Product('Baby Powered Debris Removal System', 'sweep.png').pushToArray();
new Product('Snuggle TaunTaun', 'tauntaun.jpg').pushToArray();
new Product('Canned Unicorn Meat', 'unicorn.jpg').pushToArray();
new Product('Dancing Octopus Limb USB', 'usb.gif').pushToArray();
new Product('Exercise in Futility Watering Can', 'water-can.jpg' ).pushToArray();
new Product('Sobriety Encouragement Wine Glass', 'wine-glass.jpg').pushToArray();

// MAIN =====
setup();
eventListener();

// FUNCTIONS =====
function setup () {
  leftProduct = generateProduct();
  render(leftProduct);
  centerProduct = generateProduct();
  render(centerProduct);
  rightProduct = generateProduct();
  render(rightProduct);

  console.log('products ' + products.length);
  console.log('clicked ' + clickedProducts.length);
  console.log('displayed ' + displayedProducts.length);
}

function eventListener (){
  productImageParent.addEventListener('click', function (event){
    var answer = event.target.getAttribute('id');
    var clickedObject = switchToArray(answer, clickedProducts, displayedProducts);
    clickedObject.countClicked();
    console.log(clickedObject.description + ' CLICKED: ' + clickedObject.clicked);
    removeChildren();
    resetArrays(displayedProducts, products);
    setup();
  });
}

function render(productObj){
  var image = document.createElement('img');
  image.setAttribute('src', 'images/' + productObj.path);
  image.setAttribute('id', productObj.description);
  image.setAttribute('width', '300px');
  image.setAttribute('height', '300px');
  productImageParent.appendChild(image);
  switchToArray(productObj, displayedProducts, products);
}

// randomly generates product from the products array
function generateProduct(){
  var index = Math.floor(Math.random() * products.length);
  var object = products[index];
  object.countDisplayed();
  return object;
}

// to prevent duplication when generating product
function switchToArray(productObj, toArray, fromArray){
  var index = fromArray.indexOf(productObj);
  var array = fromArray.splice(index, 1);
  toArray.push(array[0]);
  return(array[0]);
}

// to allow regeneration of displayed products
function resetArrays(){
  displayedProducts.forEach(function(product){
    products.push(product);
  });
  displayedProducts = [];
}

// to remove children and set up render of new images
function removeChildren(){
  while (productImageParent.hasChildNodes()){
    productImageParent.removeChild(productImageParent.firstChild);
  }
}
