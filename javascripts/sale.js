const priceElement = document.getElementById("product");
const numberElement = document.getElementById("number");
let purchases = [];

function add() {
    const price = parseInt(priceElement.value);
    const number = parseInt(numberElement.value);
    const option = priceElement.options[priceElement.selectedIndex];
    const text = option.innerText;
    let purchase = {
        text: text,
        price: price,
        number: number,
    };
    const newPurchase = purchases.findIndex((item) => item.price === purchase.price);
    if (purchases.length < 1 || newPurchase === -1) {
        purchases.push(purchase);
    } else {
        purchases[newPurchase].number += purchase.number;
        priceElement.value = "";
        numberElement.value = "";
    }
    window.alert(`${display()}\nSubtotal: ${subtotal()}`);
    priceElement.value = "";
    numberElement.value = "";
}

function display() {
    let string = "";
    for (let i = 0; i < purchases.length; i++) {
        string += `${purchases[i].text} Cantidad: ${purchases[i].number}\n`;
    }
    return string;
}

function subtotal() {
    let sum = 0;
    for (let i = 0; i < purchases.length; i++) {
        sum += purchases[i].price * purchases[i].number;
    }
    return sum;
}

function calc() {
    let sum = subtotal();
    let delivery = calcDeliveryFromPurchases(sum);
    
    window.alert(`${display()}\nSubtotal: ${sum} Delivery: ${delivery} TOTAL: ${sum+delivery}`);
    // Una vez realizado la venta se varia el array y los valores
    purchases = [];
    priceElement.value = "";
    numberElement.value = "";

}

function calcDeliveryFromPurchases(sum) {
    if (sum == 0 || sum >= 3000) {
        return 0;
    } else if (sum < 2000) {
        return 500;
    } else {
        return 250;
    }
}