let isSorted = false;

const allBanks = [
  {
    title: "bpolybank",
    countOfClients: 12,
    countOfCredits: 7,
  },
  {
    title: "cpolybank2",
    countOfClients: 112,
    countOfCredits: 73,
  },
  {
    title: "apolybank3",
    countOfClients: 1245,
    countOfCredits: 714,
  },
  {
    title: "apolybank4",
    countOfClients: 1245,
    countOfCredits: 714,
  },
  {
    title: "apolybank6",
    countOfClients: 1245,
    countOfCredits: 714,
  },
  {
    title: "apolybank5",
    countOfClients: 1245,
    countOfCredits: 714,
  },
];

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
              <button class="edit_button" onclick="editButton(${index})">Edit</button>
              `;
      contentDiv.appendChild(bankDiv);
    });
  } else {
    contentDiv.innerHTML = "<p>No matching banks found.</p>";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  reloadDiv(allBanks);
});

function deleteBank(index) {
  allBanks.splice(index, 1);
  reloadDiv(allBanks);
}

function editBank(index) {}

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

  const filteredBanks = allBanks.filter(function (book) {
    return book.title.toLocaleLowerCase().includes(inputContainer);
  });
  reloadDiv(filteredBanks);
}
