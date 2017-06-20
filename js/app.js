'use strict';

// array of product objects
var products = [];

var productImageParent = document.getElementById('productImage');

function Product(name, path){
  this.name = name;
  this.path = path;
}

Product.prototype.render = render;
Product.prototype.pushToArray = function (){
  products.push(this);
};

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

console.log(products);
console.log(randNum());

function render(products){
  var imagePath = products[randNum()].path;
  var image = document.createElement('img');
  image.setAttribute('src', 'images/' + imagePath);
  productImageParent.appendChild(image);
}

render(products);
render(products);
render(products);

function randNum(){
  return Math.floor(Math.random() * products.length);
}
