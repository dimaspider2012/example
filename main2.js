const welcome = document.querySelector(".welcome");
const btnauthor = document.querySelector(".btn-author");
const login = document.querySelector(".login");
const password = document.querySelector(".password");
const btnlogin = document.querySelector(".btn-login");
const text = document.querySelector(".text");
document.addEventListener("DOMContentLoaded", () => {
  btnlogin.addEventListener("click", () => {
    console.log(btnlogin);
    if (login.value === "guest" && password.value === "123") {
      window.location.href = "about.html";
    } else {
      if (
        login.value === "dima.kamikaze@gmail.com" &&
        password.value === "admin123"
      ) {
        window.location.href = "about.html";
        sessionStorage.setItem("isAdmin", "Yes");
        //  window.admin = "Yes";
      } else {
      }
      text.textContent = "Неправильний пароль або логін. Спробуй ще раз";
      text.style.color = "red";
    }
  });
});

// btnauthor.addEventListener("click", () => {
//   window.location.href = "index3.html";
// });

const bg = {
  spring:
    "https://i.pinimg.com/736x/01/1d/c4/011dc4dd931d658d9fc69e7747f3aff0.jpg",
  summer:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7mvY1EEAbcnTHdJZOxQVJysNkbaOyVFU06g&s",
  autumn: "https://tsystem.com.ua/wp-content/uploads/2024/09/autumn.jpg",
  winter:
    "https://facts.cx.ua/uploads/facts-2/mini/cikavi-fakti-pro-zimu-800-450.jpg",
};

function getSeasonByData(date = new Date()) {
  const month = date.getMonth();
  if (month >= 2 && month <= 4) return "spring";
  if (month >= 5 && month <= 7) return "summer";
  if (month >= 8 && month <= 10) return "autumn";
  return "winter";
}
const currentSeason = getSeasonByData();
const currentBg = bg[currentSeason];
console.log(currentSeason);
console.log(currentBg);
document.body.style.backgroundImage = `url(${currentBg})`;
// body.style.background = `background-repeat: no-repeat;  background-size: cover;`;
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
  5: [],
};
const btnlinkdz = document.querySelector(".btn-link-dz");
const btnlinkmark = document.querySelector(".btn-link-mark");
const btnlink = document.querySelector(".btn-link");
const comments = document.querySelector("#comments");
const btnback = document.querySelector(".btn-back");
btnlink.addEventListener("click", () => {
  btnlinkdz.style.display = "inline";
  btnlinkmark.style.display = "inline";
});
let selectedClass = null;
let selectDay = 1;
let selectedDayButton = null;
const content = document.querySelector("#content");
const loader = document.querySelector("#loader");
const tablecontainer = document.querySelector(".table-contener");
const daybuttons = document.querySelectorAll(".btns-table .btn");
tablecontainer.style.display = "none";
content.style.display = "none";
async function fetchData() {
  try {
    const response = await fetch(scriptUrl);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    console.log(data);
    fetchedDataPeople = data.slice(37, 58);
    fetchedDataSchedule[1] = data.slice(1, 8);
    fetchedDataSchedule[2] = data.slice(8, 15);
    fetchedDataSchedule[3] = data.slice(15, 22);
    fetchedDataSchedule[4] = data.slice(22, 29);
    fetchedDataSchedule[5] = data.slice(29, 36);
    setTimeout(() => {
      loader.style.display = "none";
      content.style.display = "block";
      comments.style.display = "flex";
    }, 1000);
  } catch (error) {
    console.error("Error", error);
  }
}
function showColumn(columnIndex) {
  selectedClass = columnIndex;
  selectDay = 1;
  tablecontainer.style.display = "grid";
  welcome.style.display = "none";
  tablecontainer.style.margintop = "20px";
  const tableBody = document.querySelector("#data-table tbody"); // Оновлено
  tableBody.innerHTML = "";
  const nameheader = document.querySelector("#name-header");
  nameheader.style.display = "table-cell";

  fetchedDataPeople.forEach((row) => {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.textContent = row[columnIndex] || "—"; // Додаємо перевірку, якщо даних нема
    tr.appendChild(td);
    tableBody.appendChild(tr);
  });
  activeDayButton(1);
  showColumnSchedule(1);
}

function showColumnSchedule(dayIndex) {
  selectDay = dayIndex;
  const tableBody = document.querySelector("#data-table1 tbody"); // Оновлено
  tableBody.innerHTML = "";
  const nameheader = document.querySelector("#name-header1");
  nameheader.style.display = "table-cell";
  if (!selectedClass) return;

  fetchedDataSchedule[dayIndex].forEach((row) => {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.textContent = row[selectedClass] || "—"; // Додаємо перевірку, якщо даних нема
    tr.appendChild(td);
    tableBody.appendChild(tr);
  });
  activeDayButton(dayIndex);
}
function activeDayButton(dayIndex) {
  if (selectedDayButton) {
    selectedDayButton.style.background = "#ace1af";
    selectedDayButton.style.color = "black";
  }
  const daybutton = document.querySelectorAll(".btns-table .btn")[dayIndex - 1];
  daybutton.style.background = "#4caf50";
  daybutton.style.color = "#fff";
  selectedDayButton = daybutton;
}
fetchData();
