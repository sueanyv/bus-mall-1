'use strict';

// TODO: Prevent consecutive duplication
// TODO: have chart display all labels

// VAR INIT =====

// to prevent duplication in same render
var displayedProducts = [];
// to track clicked products
var clickedProducts = [];
// to store chart data
// collaborated with Don Pham
var dataArray = [[],[],[]];

// product objects
var leftProduct;
var centerProduct;
var rightProduct;

var numClick = 0;
var maxClick = 25;

var productImageParent = document.getElementById('productImage');
var productListParent = document.getElementById('productList');

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
  new Product('Ultimate Poopbooking Bathroom Fixture', 'bathroom.jpg'),
  new Product('Guaranteed Wet Toes Boots', 'boots.jpg'),
  new Product('Ultimate Breakfast Maker', 'breakfast.jpg'),
  new Product('Meatball Flavored Bubblegum', 'bubblegum.jpg'),
  new Product('The Most Uncomfortable Chair', 'chair.jpg'),
  new Product('Adorable Cthulhu Action Figure Complete With Victim', 'cthulhu.jpg'),
  new Product('Dog to Duck Transformer Accessory', 'dog-duck.jpg'),
  new Product('Canned Dragon Meat', 'dragon.jpg'),
  new Product('Utensi-Pen The Ultimate Multitasking Tool', 'pen.jpg'),
  new Product('Pet Powered Debris Removal System', 'pet-sweep.jpg'),
  new Product('Pizza Scissors', 'scissors.jpg'),
  new Product('Snuggle Shark', 'shark.jpg'),
  new Product('Baby Powered Sweep System', 'sweep.png'),
  new Product('Snuggle TaunTaun', 'tauntaun.jpg'),
  new Product('Canned Unicorn Meat', 'unicorn.jpg'),
  new Product('Dancing Octopus Limb USB', 'usb.gif'),
  new Product('Exercise in Futility Watering Can', 'water-can.jpg' ),
  new Product('Sobriety Encouragement Wine Glass', 'wine-glass.jpg')
];

// MAIN =====
removeChildren(productListParent);
setup();
eventListener();

// FUNCTIONS =====
function setup() {
  resetArrays();
  leftProduct = generateProduct();
  render(leftProduct);
  centerProduct = generateProduct();
  render(centerProduct);
  rightProduct = generateProduct();
  render(rightProduct);
}

function eventListener(){
  productImageParent.addEventListener('click', eventHandler, true);
}

function eventHandler(event) {
  numClick ++;

  var answer = event.target.getAttribute('id');
  var index = getClickedObjectIndex(answer, displayedProducts);
  displayedProducts[index].countClicked();

  clickedProducts.push(displayedProducts[index]);

  removeChildren(productImageParent);
  setup();

  if(maxClick <= numClick){
    productImageParent.removeEventListener('click', eventHandler, true);
    displayVoteList();
    chart();
    return;
  }
}

function render(productObj) {
  var image = document.createElement('img');
  image.setAttribute('src', 'images/' + productObj.path);
  image.setAttribute('id', productObj.description);
  image.setAttribute('width', '300px');
  image.setAttribute('height', '300px');
  productImageParent.appendChild(image);
  switchToDisplayArray(productObj, displayedProducts, products);
  // DELETEME check functionality
  // for(var i = 0; i < displayedProducts.length; i++) {
  //   console.log('Displayed: ' + displayedProducts[i].description);
  // }
  // for(i = 0; i < products.length; i++){
  //   console.log('Products: ' + products[i].description);
  // }

}

// randomly generates product from the products array
function generateProduct(){
  var index = Math.floor(Math.random() * products.length);
  var object = products[index];
  object.countDisplayed();
  return object;
}

// to prevent duplication when generating product
function switchToDisplayArray(productObj, displayedProducts, products){
  var index = products.indexOf(productObj);
  var array = products.splice(index, 1);
  var object = array[0];
  displayedProducts.push(object);
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
function removeChildren(parentNode){
  while (parentNode.hasChildNodes()){
    parentNode.removeChild(parentNode.firstChild);
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

// to display list of clicked
function displayVoteList(){
  resetArrays();
  var ul = document.createElement('ul');
  productListParent.appendChild(ul);
  for(var i = 0; i < products.length; i++){
    var li = document.createElement('li');
    li.textContent = products[i].clicked + ' votes for the ' + products[i].displayName;
    ul.appendChild(li);
  }
}

// modeled after CodeFellows Lecture Day 13
function chart() {
  var canvas = document.getElementById('chart');
  var ctx = canvas.getContext('2d');

  for(var i = 0; i < products.length; i++){
    dataArray[0].push(products[i].displayName)
    dataArray[1].push(products[i].clicked);
  }

  // displayedProducts.forEach(function(product){
  //   data.push(product.clicked);
  // });

  console.log('test data array' + dataArray);
  // modeled after the Getting Started example in the chartJS documentation
  var chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dataArray[0],
      datasets: [{
        label: 'Times Image Clicked',
        backgroundColor: 'rgb(66, 244, 188)',
        borderColor: 'rgb(66,244,188)',
        //test data
        data: dataArray[1],
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
