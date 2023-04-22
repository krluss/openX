fetch('https://fakestoreapi.com/users')
  .then(response => response.json())
  .then(data => {
    localStorage.setItem('users', JSON.stringify(data));
  })
  .catch(error => console.error(error));

fetch('https://fakestoreapi.com/carts/?startdate=2000-01-01&enddate=2023-04-07')
  .then(response => response.json())
  .then(data => {
    localStorage.setItem('carts', JSON.stringify(data));
  })
  .catch(error => console.error(error));

fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {
    localStorage.setItem('products', JSON.stringify(data));
  })
  .catch(error => console.error(error));


const users = JSON.parse(localStorage.getItem('users'));
const carts = JSON.parse(localStorage.getItem('carts'));
const products = JSON.parse(localStorage.getItem('products'));

let categoryValues = {};
let highestValue = 0;
let highestCart = {};
let cartsPrices = {};
let user1
let user2
let maxDistance = 0;

products.forEach(product => {
  if (categoryValues[product.category]) {
      categoryValues[product.category] += Math.round(product.price);
  } else {
      categoryValues[product.category] = Math.round(product.price);
  }
});

carts.forEach(cart => {
  let cartValue = 0;
  cart.products.forEach(product => {
      let matchingProduct = products.find(p => p.id === product.productId);
      cartValue += matchingProduct.price * product.quantity;
  });
  if (cartValue > highestValue) {
    highestValue = cartValue;
    highestCart = cart;
  }
});

function findUser(id){
  let user = users.find(u => u.id === id)
  return `${user.name.firstname} ${user.name.lastname}`
}

users.forEach((u1, index) => {
  users.slice(index + 1).forEach(u2 => {
    let distance = Math.sqrt(Math.pow(u1.address.geolocation.lat - u2.address.geolocation.lat, 2) + Math.pow(u1.address.geolocation.long - u2.address.geolocation.long, 2));
    if (distance > maxDistance) {
      maxDistance = distance;
      user1 = u1;
      user2 = u2;
    }
  });
});

console.log(categoryValues);
console.log(`The value of the highest cart is: ${highestValue} owner of this cart is: ${findUser(highestCart.userId)}`);
console.log(`The two users living furthest away from each other are ${user1.name.firstname} ${user1.name.lastname} and ${user2.name.firstname} ${user2.name.lastname}.`);

