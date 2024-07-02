const exchangeRates = {
    'INR': {
        'USD': 0.013,
        'EUR': 0.012
    },
    'USD': {
        'INR': 76.5,
        'EUR': 0.92
    },
    'EUR': {
        'INR': 83.0,
        'USD': 1.09
    }
};

document.querySelectorAll('.dropdown-custom').forEach(dropdown => {
    const toggle = dropdown.querySelector('.toggle');
    const options = dropdown.querySelector('.options');
    const optionList = dropdown.querySelectorAll('.option');

    toggle.addEventListener('click', () => {
        options.classList.toggle('hidden');
    });

    optionList.forEach(option => {
        option.addEventListener('click', () => {
            toggle.innerHTML = option.innerHTML;
            options.classList.add('hidden');
            calculateConversion();
        });
    });
});

document.getElementById('amount-input').addEventListener('input', calculateConversion);
document.getElementById('converted-amount').addEventListener('input', calculateInverseConversion);

function calculateConversion() {
    const fromCurrency = document.getElementById('from-currency-toggle').querySelector('.country-tag').textContent;
    const toCurrency = document.getElementById('to-currency-toggle').querySelector('.country-tag').textContent;
    const amount = parseFloat(document.getElementById('amount-input').value);
    let convertedAmount = 0;

    if (fromCurrency === toCurrency) {
        convertedAmount = amount;
    } else if (exchangeRates[fromCurrency] && exchangeRates[fromCurrency][toCurrency]) {
        convertedAmount = amount * exchangeRates[fromCurrency][toCurrency];
    }

    document.getElementById('converted-amount').value = convertedAmount.toFixed(2);
}

function calculateInverseConversion() {
    const fromCurrency = document.getElementById('from-currency-toggle').querySelector('.country-tag').textContent;
    const toCurrency = document.getElementById('to-currency-toggle').querySelector('.country-tag').textContent;
    const convertedAmount = parseFloat(document.getElementById('converted-amount').value);
    let amount = 0;

    if (fromCurrency === toCurrency) {
        amount = convertedAmount;
    } else if (exchangeRates[toCurrency] && exchangeRates[toCurrency][fromCurrency]) {
        amount = convertedAmount * exchangeRates[toCurrency][fromCurrency];
    }

    document.getElementById('amount-input').value = amount.toFixed(2);
}

// Add event listener to refresh button
document.getElementById('refresh-button').addEventListener('click', () => {
    // Reset input fields
    document.getElementById('amount-input').value = '';
    document.getElementById('converted-amount').value = '';
});
