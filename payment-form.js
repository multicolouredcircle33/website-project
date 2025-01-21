// Get the Checkout Button and the Payment Form Section
const checkoutButton = document.getElementById("checkout-button");
const paymentFormSection = document.getElementById("payment-form-section");

// Function to show the payment form when clicking "Checkout"
checkoutButton.addEventListener("click", function() {
    // Show the payment form section
    paymentFormSection.style.display = "block";
    // Optionally hide the cart section if needed
    document.getElementById("cart").style.display = "none";
});

// Add form submission logic (optional)
const paymentForm = document.getElementById("payment-form");

paymentForm.addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent form submission to test the functionality

    // Example of getting the values from the payment form
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const creditCard = document.getElementById("credit-card").value;
    const expiry = document.getElementById("expiry").value;
    const cvv = document.getElementById("cvv").value;

    // Output form values (for testing purposes)
    console.log(`Name: ${name}, Address: ${address}, Credit Card: ${creditCard}, Expiry: ${expiry}, CVV: ${cvv}`);

    // Here, you would send the form data to a backend for processing payment
    // You can also show a success message or redirect to another page.
    alert("Congratulations, Payment Successful!");
});
