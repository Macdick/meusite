const countElement = document.getElementById('count');
const balanceElement = document.getElementById('balance');
const gifElement = document.getElementById('gif');
const cashoutBtn = document.getElementById('cashoutBtn');
const depositBtn = document.getElementById('depositBtn');

let count = parseFloat(countElement.textContent); // Valor inicial do contador (pode ser 0 ou qualquer outro valor)
let balance = parseFloat(balanceElement.textContent); // Valor inicial do balance
let elapsedTime = 0; // Tempo decorrido em segundos

function increaseCountByPercentage(percentage) {
  count = count + (count * percentage / 100);
  countElement.textContent = count.toFixed(10); // Exibe o contador com 10 casas decimais
}

function updateGif() {
  if (count >= 0 && count <= 100) {
    gifElement.src = 'img/robots/r1.gif';
  } else if (count >= 101 && count <= 500) {
    gifElement.src = 'img/robots/r2.gif';
  } else if (count >= 501 && count <= 750) {
    gifElement.src = 'img/robots/r3.gif';
  } else if (count >= 751 && count <= 1000) {
    gifElement.src = 'img/robots/r4.gif';
  } else if (count >= 1001 && count <= 1500) {
    gifElement.src = 'img/robots/r5.gif';
  }
}

// Função para atualizar o contador, o balanço e o gif
function updateCounterBalanceAndGif() {
    increaseCountByPercentage(1);
  updateGif();
  balanceElement.textContent = balance.toFixed(10);
}

// Atualizar o contador, o balanço e o gif automaticamente a cada 1 segundo (1000 ms)
setInterval(updateCounterBalanceAndGif, 1000);

// Event listener para o botão Cashout!
cashoutBtn.addEventListener('click', () => {
  balance += count;
  alert(`Cashout de ${count.toFixed(10)} realizado! Seu saldo é agora ${balance.toFixed(10)}.`);
  count = 0;
  countElement.textContent = count.toFixed(10);
  updateGif();
});

// Event listener para o botão Deposit
depositBtn.addEventListener('click', () => {
  const depositAmount = parseFloat(prompt('Digite o valor do depósito:'));
  if (!isNaN(depositAmount) && depositAmount > 0 && balance >= depositAmount) {
    balance -= depositAmount;
    count += depositAmount;
    balanceElement.textContent = balance.toFixed(10);
    countElement.textContent = count.toFixed(10);
    updateGif();
  } else if (isNaN(depositAmount)) {
    alert('Valor inválido de depósito.');
  } else if (depositAmount <= 0) {
    alert('O valor do depósito deve ser maior que zero.');
  } else {
    alert('Saldo insuficiente para realizar o depósito.');
  }
});
