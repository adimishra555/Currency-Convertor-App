
const API_URL = "https://api.exchangerate-api.com/v4/latest/USD";

async function fetchCurrencies() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const currencies = Object.keys(data.rates);

    const fromSelect = document.getElementById("from");
    const toSelect = document.getElementById("to");

    currencies.forEach(currency => {
      const option1 = document.createElement("option");
      option1.value = currency;
      option1.textContent = currency;
      fromSelect.appendChild(option1);

      const option2 = document.createElement("option");
      option2.value = currency;
      option2.textContent = currency;
      toSelect.appendChild(option2);
    });

    
    fromSelect.value = "INR";
    toSelect.value = "USD";
  } catch (error) {
    console.error("Error fetching currencies:", error);
  }
}

async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;

  if (!amount || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const exchangeRate = data.rates[to] / data.rates[from];
    const result = (amount * exchangeRate).toFixed(2);

    document.getElementById("result-text").textContent = `After Convert: ${amount} ${from} = ${result} ${to}`;
  } catch (error) {
    console.error("Error converting currency:", error);
    alert("An error occurred while converting currency.");
  }
}

document.getElementById("convert-btn").addEventListener("click", convertCurrency);

fetchCurrencies();