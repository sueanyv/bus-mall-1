'use strict';

// TODO: Prevent consecutive duplication
// TODO: Turn off event listeners after 25 selections
// TODO: display list of products with votes received

// FYI count displayed and count clicked is working

// VAR INIT =====

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
function Product(displayName, path) {
  this.displayName = displayName;
  this.path = path;
  this.description = this.path.slice(0, this.path.length - 4);
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

// CREATE PRODUCT ARRAY OF OBJECTS =====
var products = [
  new Product('Rolling Familiar Robot Bag', 'bag.jpg'),
  new Product('Convenient Banana Slicer', 'banana.jpg'),
  new Product('Ultimate Poopbook Accessory', 'bathroom.jpg'),
  new Product('Guaranteed Wet Toes Boots', 'boots.jpg'),
  new Product('Ultimate Breakfast Maker', 'breakfast.jpg'),
  new Product('Meatball Flavored Bubblegum', 'bubblegum.jpg'),
  new Product('The Most Uncomfortable Chair', 'chair.jpg'),
  new Product('Adorable Lord of Darkness Action Figure Complete With Victim', 'cthulhu.jpg'),
  new Product('Bark to Quack Transformer Accessory', 'dog-duck.jpg'),
  new Product('Canned Dragon Meat', 'dragon.jpg'),
  new Product('Utensi-Pen The Ultimate Multitasking Tool', 'pen.jpg'),
  new Product('Animal Powered Debris Removal System', 'pet-sweep.jpg'),
  new Product('Pizza Scissors', 'scissors.jpg'),
  new Product('Snuggle Shark', 'shark.jpg'),
  new Product('Baby Powered Debris Removal System', 'sweep.png'),
  new Product('Snuggle TaunTaun', 'tauntaun.jpg'),
  new Product('Canned Unicorn Meat', 'unicorn.jpg'),
  new Product('Dancing Octopus Limb USB', 'usb.gif'),
  new Product('Exercise in Futility Watering Can', 'water-can.jpg' ),
  new Product('Sobriety Encouragement Wine Glass', 'wine-glass.jpg')
];

// MAIN =====
setup();
eventListener();

// FUNCTIONS =====
function setup() {
  leftProduct = generateProduct();
  render(leftProduct);
  centerProduct = generateProduct();
  render(centerProduct);
  rightProduct = generateProduct();
  render(rightProduct);
}

function eventListener() {
  productImageParent.addEventListener('click', eventHandler);
}

function eventHandler(event) {
  var answer = event.target.getAttribute('id');
  var index = getClickedObjectIndex(answer, displayedProducts);
  displayedProducts[index].countClicked();

  // DELETEME did this work?
  console.log(displayedProducts[index].description + ': ' + displayedProducts[index].clicked);

  clickedProducts.push(displayedProducts[index]);

  // DELETEME array check
  console.log(displayedProducts);
  console.log(products);
  console.log(clickedProducts);

  resetArrays();
  removeChildren();
  setup();
}

function render(productObj) {
  var image = document.createElement('img');
  image.setAttribute('src', 'images/' + productObj.path);
  image.setAttribute('id', productObj.description);
  image.setAttribute('width', '300px');
  image.setAttribute('height', '300px');
  productImageParent.appendChild(image);
  switchArray(productObj, displayedProducts, products);
}

// randomly generates product from the products array
function generateProduct(){
  var index = Math.floor(Math.random() * products.length);
  var object = products[index];
  object.countDisplayed();
  return object;
}

// to prevent duplication when generating product
function switchArray(productObj, toArray, fromArray){
  var index = fromArray.indexOf(productObj);
  var array = fromArray.splice(index, 1);
  var object = array[0];
  toArray.push(object);
  return(object);
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

// to compare array of clicked object names
function getClickedObjectIndex(answer, displayedProducts){
  var index;
  displayedProducts.forEach(function(product){
    if (product.description === answer){
      index = displayedProducts.indexOf(product);
    }
  });
  return index;
}
