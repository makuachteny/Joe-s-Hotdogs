// Constants for prices
const HOTDOG_PRICE = 4.99;
const FRIES_PRICE = 3.99;
const DRINK_PRICE = 1.79;
const TAX_RATE = 0.0625;
const DISCOUNT_THRESHOLD = 30.00;
const DISCOUNT_RATE = 0.10;

// Function to format money to 2 decimal places
function showMoney(amount) {
    let cents = Math.round(amount * 100);
    let dollars = Math.floor(cents / 100);
    let remainingCents = cents % 100;
    
    let centsStr = remainingCents.toString();
    if (remainingCents < 10) {
        centsStr = "0" + centsStr;
    }
    
    return dollars + "." + centsStr;
}

function processOrder() {
    // Get values from inputs
    let numDogs = parseInt(document.getElementById('numDogs').value) || 0;
    let numFries = parseInt(document.getElementById('numFries').value) || 0;
    let numSoda = parseInt(document.getElementById('numSoda').value) || 0;

    // Validate that at least one item is ordered
    if (numDogs === 0 && numFries === 0 && numSoda === 0) {
        alert('Please select an order first!');
        return;
    }

    // Calculate item totals
    let dogTotal = numDogs * HOTDOG_PRICE;
    let friesTotal = numFries * FRIES_PRICE;
    let sodaTotal = numSoda * DRINK_PRICE;

    // Calculate subtotal before discount
    let subtotal = dogTotal + friesTotal + sodaTotal;

    // Calculate discount if applicable
    let discount = 0;
    if (subtotal >= DISCOUNT_THRESHOLD) {
        discount = subtotal * DISCOUNT_RATE;
    }

    // Calculate subtotal after discount
    let subtotalAfterDiscount = subtotal - discount;

    // Calculate tax
    let tax = subtotalAfterDiscount * TAX_RATE;

    // Calculate final total
    let finalTotal = subtotalAfterDiscount + tax;

    // Display order details
    let outputHTML = "<h2>YOUR ORDER</h2>";
    
    let delay = 0;
    
    outputHTML += '<div class="order-line" style="animation-delay: ' + delay + 's">';
    outputHTML += '<span>HOTDOGS (' + numDogs + ' @ $' + showMoney(HOTDOG_PRICE) + ')</span>';
    outputHTML += '<span>$' + showMoney(dogTotal) + '</span>';
    outputHTML += '</div>';
    delay += 0.1;
    
    outputHTML += '<div class="order-line" style="animation-delay: ' + delay + 's">';
    outputHTML += '<span>FRENCH FRIES (' + numFries + ' @ $' + showMoney(FRIES_PRICE) + ')</span>';
    outputHTML += '<span>$' + showMoney(friesTotal) + '</span>';
    outputHTML += '</div>';
    delay += 0.1;
    
    outputHTML += '<div class="order-line" style="animation-delay: ' + delay + 's">';
    outputHTML += '<span>DRINKS (' + numSoda + ' @ $' + showMoney(DRINK_PRICE) + ')</span>';
    outputHTML += '<span>$' + showMoney(sodaTotal) + '</span>';
    outputHTML += '</div>';
    delay += 0.1;

    outputHTML += "<h2>ORDER SUMMARY</h2>";
    
    outputHTML += '<div class="order-line" style="animation-delay: ' + delay + 's">';
    outputHTML += '<span>SUBTOTAL (BEFORE DISCOUNT)</span>';
    outputHTML += '<span>$' + showMoney(subtotal) + '</span>';
    outputHTML += '</div>';
    delay += 0.1;

    if (discount > 0) {
        outputHTML += '<div class="order-line discount" style="animation-delay: ' + delay + 's">';
        outputHTML += '<span>⚡ DISCOUNT (10% OFF ORDERS $30+) ⚡</span>';
        outputHTML += '<span>-$' + showMoney(discount) + '</span>';
        outputHTML += '</div>';
        delay += 0.1;
        
        outputHTML += '<div class="order-line" style="animation-delay: ' + delay + 's">';
        outputHTML += '<span>SUBTOTAL (AFTER DISCOUNT)</span>';
        outputHTML += '<span>$' + showMoney(subtotalAfterDiscount) + '</span>';
        outputHTML += '</div>';
        delay += 0.1;
    }

    outputHTML += '<div class="order-line" style="animation-delay: ' + delay + 's">';
    outputHTML += '<span>TAX (6.25%)</span>';
    outputHTML += '<span>$' + showMoney(tax) + '</span>';
    outputHTML += '</div>';
    delay += 0.1;

    outputHTML += '<div class="order-line total" style="animation-delay: ' + delay + 's">';
    outputHTML += '<span>TOTAL AMOUNT</span>';
    outputHTML += '<span>$' + showMoney(finalTotal) + '</span>';
    outputHTML += '</div>';

    outputHTML += '<button class="new-order-btn" onclick="newOrder()"><span>🌭 NEW ORDER</span></button>';

    // Hide input section and show order details with smooth transition
    document.getElementById('inputSection').classList.add('hidden');
    document.getElementById('orderDetails').innerHTML = outputHTML;
    
    setTimeout(() => {
        document.getElementById('orderDetails').classList.add('visible');
    }, 100);
}

function newOrder() {
    // Reset input values
    document.getElementById('numDogs').value = '0';
    document.getElementById('numFries').value = '0';
    document.getElementById('numSoda').value = '0';

    // Hide order details and show input section
    document.getElementById('orderDetails').classList.remove('visible');
    
    setTimeout(() => {
        document.getElementById('inputSection').classList.remove('hidden');
        document.getElementById('orderDetails').innerHTML = '';
    }, 500);
}