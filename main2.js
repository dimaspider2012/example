const btnauthor = document.querySelector(".btn-author");

btnauthor.addEventListener("click", () => {
  window.location.href = "3.html";
});
/* Весна: https://i.pinimg.com/736x/01/1d/c4/011dc4dd931d658d9fc69e7747f3aff0.jpg
Осінь: https://tsystem.com.ua/wp-content/uploads/2024/09/autumn.jpg
Літо: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7mvY1EEAbcnTHdJZOxQVJysNkbaOyVFU06g&s
Зима: https://facts.cx.ua/uploads/facts-2/mini/cikavi-fakti-pro-zimu-800-450.jpg */
const scriptUrl =
  "https://script.google.com/macros/s/AKfycbyvPYQgKwEqaL1qeKelNyqffgKXEhuqbh-TvFtlQADALVoyAfhaO9viKghX2DrjZZggaQ/exec";
let fetchedDataPeople = [];
let fetchedDataSchedule = {
  1: [],
  2: [],
  3: [],
  4: [], 
  5: []
}
let selectedClass = null 
let selectedDayButton = null
const tablecontainer = document.querySelector(".table-contener");
const daybuttons = document.querySelectorAll(".btns-table .btn");
tablecontainer.style.display = "none"
async function fetchData() {
  try {
    const response = await fetch(scriptUrl);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    console.log(data);
    fetchedDataPeople = data.slice(1, 21);
    fetchedDataSchedule[1] = data.slice(22, 29)
    fetchedDataSchedule[2] = data.slice(29, 36);
    fetchedDataSchedule[3] = data.slice(36, 43)
    fetchedDataSchedule[4] = data.slice(43, 50)
    fetchedDataSchedule[5] = data.slice(50, 57)
  } catch (error) {
    console.error("Error", error);
  }
}

function showColumn(columnIndex) {
  selectedClass=columnIndex
  tablecontainer.style.display = "flex"
  const tableBody = document.querySelector("#data-table tbody"); // Оновлено
  const nameheader = document.querySelector("#name-header");
  nameheader.style.display = "table-cell";
  if (!tableBody) {
    console.error("Table body not found!");
    return;
  }

  tableBody.innerHTML = "";
  fetchedDataPeople.forEach((row) => {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.textContent = row[columnIndex] || "—"; // Додаємо перевірку, якщо даних нема
    tr.appendChild(td);
    tableBody.appendChild(tr);
  });
  activeDayButton(daybuttons[0])
  showColumnSchedule(1)
}

function showColumnSchedule(dayIndex) {
  if (selectedClass===null) {
    alert("Select class")
    return
  }
  const tableBody = document.querySelector("#data-table1 tbody"); // Оновлено
  const nameheader = document.querySelector("#name-header1");
  nameheader.style.display = "table-cell";
  if (!tableBody) {
    console.error("Table body not found!");
    return;
  }

  tableBody.innerHTML = "";
  fetchedDataSchedule[dayIndex].forEach((row) => {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.textContent = row[selectedClass] || "—"; // Додаємо перевірку, якщо даних нема
    tr.appendChild(td);
    tableBody.appendChild(tr);
  });
  activeDayButton(daybuttons[dayIndex-1 ])
}
function activeDayButton(button){
  if (selectedDayButton) {
    selectedDayButton.style.background=""
    selectedDayButton.style.color=""
  }
  button.style.background="#4caf50"
   button.style.color="#fff"
   selectedDayButton=button
}
fetchData();
