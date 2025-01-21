// State to store cart items
let cart = [];

// Function to render the cart
function renderCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalContainer = document.getElementById('cart-total');

  // Clear the current cart display
  cartItemsContainer.innerHTML = '';

  let total = 0;

  // Render each item in the cart
  cart.forEach((item) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <span>${item.name}</span> 
      <span>$${item.price.toFixed(2)} x ${item.quantity}</span>
      <button class="remove-item" data-id="${item.id}">Remove</button>
    `;
    cartItemsContainer.appendChild(cartItem);

    total += item.price * item.quantity;
  });

  // Update the total price
  cartTotalContainer.textContent = total.toFixed(2);

  // Attach remove event listeners
  document.querySelectorAll('.remove-item').forEach((button) => {
    button.addEventListener('click', (event) => {
      const productId = parseInt(event.target.dataset.id, 10);
      removeFromCart(productId);
    });
  });
}

// Function to add an item to the cart
function addToCart(productId, productName, productPrice) {
  const existingProduct = cart.find((item) => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: productPrice,
      quantity: 1,
    });
  }

  renderCart();
}

// Function to remove an item from the cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  renderCart();
}

// Attach event listeners to the "Purchase" buttons
document.querySelectorAll('.buy-box').forEach((button) => {
  button.addEventListener('click', (event) => {
    const productElement = event.target.closest('.products-display');
    const productId = parseInt(productElement.dataset.id, 10);
    const productName = productElement.dataset.name;
    const productPrice = parseFloat(productElement.dataset.price);

    addToCart(productId, productName, productPrice);
  });
});

document.getElementById('checkout-button').addEventListener('click', () => {
  fetch('save_cart.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cart), // Send the cart array
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 'success') {
        // Redirect to the payment page after saving the cart
        window.location.href = 'payment.php';
      } else {
        alert('Failed to proceed to payment. Please try again.');
      }
    })
    .catch((error) => {
      console.error('Error saving cart:', error);
    });
});


// Save cart to session
function saveCartToSession() {
  fetch('save_cart.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cart),
  }).then((response) => {
    if (response.ok) {
      window.location.href = 'payment.php'; // Redirect to payment page
    }
  });
}

