let isSorted = false;

let allBanks = [];

function back() {
  window.location.href = "banks.html";
}

function loadBanksFromLocalStorage() {
  const storedBanks = localStorage.getItem("banks");
  if (storedBanks) {
    allBanks = JSON.parse(storedBanks);
  }
}

function saveBanksToLocalStorage() {
  localStorage.setItem("banks", JSON.stringify(allBanks));
}

function reloadDiv(banks) {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";
  if (banks?.length !== 0) {
    banks.forEach(function (bank, index) {
      const bankDiv = document.createElement("div");
      bankDiv.classList.add("bankBlock");
      bankDiv.innerHTML = `
              <h3>${bank.title}</h3>
              <p>clients: ${bank.countOfClients}</p>
              <p>credits: ${bank.countOfCredits}<p>
              <button class="delete_button" onclick="deleteBank(${index})">Delete</button>
              <button class="edit_button" onclick="editBank(${index})">Edit</button>
              `;
      contentDiv.appendChild(bankDiv);
    });
  } else {
    contentDiv.innerHTML = "<p>No matching banks found.</p>";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadBanksFromLocalStorage();
  reloadDiv(allBanks);
});

function deleteBank(index) {
  allBanks.splice(index, 1);
  saveBanksToLocalStorage();
  reloadDiv(allBanks);
}

let edit_index = 0;

function editBank(index) {
  window.location.href = "edit_page.html";
  edit_index = index;
}

function updateBank(index) {
  const countOfClients = document.getElementById("clients_input").value;
  const countOfCredits = document.getElementById("credits_input").value;
  const name = document.getElementById("name_input").value;

  const newBank = {
    title: name,
    countOfClients: countOfClients,
    countOfCredits: countOfCredits,
  };

  allBanks.splice(index, 1);
  allBanks.push(newBank);

  saveBanksToLocalStorage();
  window.location.href = "banks.html";
  reloadDiv(allBanks);
}

function createBank() {
  const countOfClients = document.getElementById("clients_input2").value;
  const countOfCredits = document.getElementById("credits_input2").value;
  const name = document.getElementById("name_input2").value;
  const newBank = {
    title: name,
    countOfClients: countOfClients,
    countOfCredits: countOfCredits,
  };

  allBanks.push(newBank);
  saveBanksToLocalStorage();
  window.location.href = "banks.html";
  reloadDiv(allBanks);
}

function sortBanksByName() {
  if (!isSorted) {
    const sortedBanks = allBanks.slice();
    reloadDiv(sortedBanks.sort((a, b) => (a.title > b.title ? 1 : -1)));
    isSorted = true;
  } else {
    reloadDiv(allBanks);
    isSorted = false;
  }
}

function allClientsCount() {
  let countOfAllClients = 0;
  allBanks.forEach(function (bank) {
    countOfAllClients += bank.countOfClients;
  });
  const countContainer = document.getElementById("counter");
  countContainer.innerHTML = `
    <p>Count of all clients: ${countOfAllClients}</p>
  `;
}

function searchBanks() {
  const inputContainer = document.getElementById("inputId").value.toLowerCase();

  const filteredBanks = allBanks.filter(function (bank) {
    return bank.title.toLowerCase().includes(inputContainer);
  });
  reloadDiv(filteredBanks);
}
