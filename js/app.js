'use strict';

// array of product objects
var products = [];
var displayedProducts = [];
var clickedProducts = [];

var productImageParent = document.getElementById('productImage');

function Product(displayName, path){
  this.displayName = displayName;
  this.path = path;
  this.description = this.path.slice(0, this.path.length - 4);
  // TODO: track displayed and track clicked
  this.displayed = 0;
  this.clicked = 0;
}

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

function setup () {
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

  var leftProduct = generateProduct();
  var centerProduct = generateProduct();
  var rightProduct = generateProduct();

  render(leftProduct);
  render(centerProduct);
  render(rightProduct);

  resetArrays();
}

setup();

productImageParent.addEventListener('click', function (event){
  var answer = event.target.getAttribute('id');
  switchToArray(answer, clickedProducts, displayedProducts);
}
);

function render(productObj){
  var image = document.createElement('img');
  image.setAttribute('src', 'images/' + productObj.path);
  image.setAttribute('id', productObj.description);
  image.setAttribute('width', '300px');
  image.setAttribute('height', '300px');
  productImageParent.appendChild(image);
  switchToArray(productObj, displayedProducts, products);
}

function generateProduct(){
  var index = Math.floor(Math.random() * products.length);
  return products[index];
}

function switchToArray(productObj, toArray, fromArray){
  var index = fromArray.indexOf(productObj);
  toArray.push(fromArray.splice(fromArray[index], 1));
}

function resetArrays(){
  displayedProducts.forEach(function(product){
    products.push(product);
  });
  displayedProducts = [];
}
