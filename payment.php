<?php
session_start();

// Retrieve the cart data from the session (if available)
$cart = isset($_SESSION['cart']) ? $_SESSION['cart'] : [];
$total = 0;
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 8px;
        }
        h1 {
            text-align: center;
        }
        .cart-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        }
        .cart-total {
            text-align: right;
            font-weight: bold;
            margin-top: 20px;
        }
        .checkout-button {
            display: block;
            width: 100%;
            padding: 10px;
            background-color: #007BFF;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            text-align: center;
            font-size: 16px;
        }
        .checkout-button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Confirm Your Purchase</h1>
        <?php if (!empty($cart)): ?>
            <div class="cart-items">
                <?php foreach ($cart as $item): ?>
                    <?php $total += $item['price'] * $item['quantity']; ?>
                    <div class="cart-item">
                        <span><?php echo htmlspecialchars($item['name']); ?> (x<?php echo $item['quantity']; ?>)</span>
                        <span>$<?php echo number_format($item['price'] * $item['quantity'], 2); ?></span>
                    </div>
                <?php endforeach; ?>
            </div>
            <div class="cart-total">
                Total: $<?php echo number_format($total, 2); ?>
            </div>
            <form action="process_payment.php" method="POST">
                <button type="submit" class="checkout-button">Pay Now</button>
            </form>
        <?php else: ?>
            <p>Your cart is empty. <a href="shop.html">Go back to shop</a>.</p>
        <?php endif; ?>
    </div>
</body>
</html>
