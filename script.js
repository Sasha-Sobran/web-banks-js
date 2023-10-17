let isSorted = false;
let allBanks = [];

document.addEventListener("DOMContentLoaded", () => {
  fetchDataAndReload();
});

function fetchDataAndReload() {
  fetch("http://127.0.0.1:5000/get")
    .then((response) => response.json())
    .then((data) => {
      allBanks = data;
      reloadDiv(data);
    })
    .catch((error) => console.error("Error loading data:", error));
}

function deleteBank(index) {
  fetch(`http://127.0.0.1:5000/delete/${allBanks[index].id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error("Error deleting bank");
    })
    .then(() => fetchDataAndReload())
    .catch((error) => console.error(error));
}

function editBank(index) {
  const modal = document.getElementById("myModal");
  const bank = allBanks[index];
  document.getElementById("clients_input").value = bank.count_of_clients;
  document.getElementById("credits_input").value = bank.count_of_credits;
  document.getElementById("name_input").value = bank.bank_name;
  modal.style.display = "block";
  edit_index = index;
}

function updateBank() {
  const countOfClients = document.getElementById("clients_input").value;
  const countOfCredits = document.getElementById("credits_input").value;
  const title = document.getElementById("name_input").value;

  if (
    countOfClients === "" ||
    countOfCredits === "" ||
    (title === "" && countOfClients >= 0 && countOfCredits >= 0)
  ) {
    window.alert("Input is wrong");
    return;
  }

  const newBank = {
    bank_name: title,
    count_of_clients: countOfClients,
    count_of_credits: countOfCredits,
  };

  fetch(`http://127.0.0.1:5000/change/${allBanks[edit_index].id}`, {
    method: "PUT",
    body: JSON.stringify(newBank),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then(() => {
      window.location.href = "banks.html";
      fetchDataAndReload();
    })
    .catch((error) => console.error("Error editing bank:", error));
}

function createBank() {
  const countOfClients = document.getElementById("clients_input2").value;
  const countOfCredits = document.getElementById("credits_input2").value;
  const title = document.getElementById("name_input2").value;

  if (
    countOfClients === "" ||
    countOfCredits === "" ||
    (title === "" && countOfClients >= 0 && countOfCredits >= 0)
  ) {
    window.alert("Input is wrong");
    return;
  }

  const newBank = {
    bank_name: title,
    count_of_clients: countOfClients,
    count_of_credits: countOfCredits,
  };

  fetch("http://127.0.0.1:5000/insert", {
    method: "POST",
    body: JSON.stringify(newBank),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then(() => {
      window.location.href = "banks.html";
      fetchDataAndReload();
    })
    .catch((error) => console.error("Error adding bank:", error));
}

function sortBanksByName() {
  isSorted = !isSorted;
  const sortedBanks = allBanks
    .slice()
    .sort((a, b) =>
      isSorted
        ? a.bank_name.localeCompare(b.bank_name)
        : b.bank_name.localeCompare(a.bank_name)
    );
  reloadDiv(sortedBanks);
}

function allClientsCount() {
  const countOfAllClients = allBanks.reduce(
    (total, bank) => total + parseInt(bank.count_of_clients),
    0
  );
  const countContainer = document.getElementById("counter");
  countContainer.innerHTML = `<p>Count of all clients: ${countOfAllClients}</p>`;
}

function searchBanks() {
  const inputContainer = document.getElementById("inputId").value.toLowerCase();
  const filteredBanks = allBanks.filter((bank) =>
    bank.bank_name.toLowerCase().includes(inputContainer)
  );
  reloadDiv(filteredBanks);
}

function reloadDiv(banks) {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML =
    banks.length > 0
      ? banks.map(
          (bank, index) => `
      <div class="bankBlock">
        <h3>Name: ${bank.bank_name}</h3>
        <p>clients: ${bank.count_of_clients}</p>
        <p>credits: ${bank.count_of_credits}</p>
        <button class="delete_button" onclick="deleteBank(${index})">Delete</button>
        <button class="edit_button" onclick="editBank(${index})">Edit</button>
      </div>
    `
        )
      : "<p>No matching banks found.</p>";
}

function back() {
  window.location.href = "banks.html";
}

function close_modal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

function clear_filter() {
  document.getElementById("inputId").value = "";
  fetchDataAndReload();
}
