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
async function fetchData() {
  try {
    const response = await fetch(scriptUrl);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    console.log(data);
    const fetchedData = data.slice(1, -1);
    displayData(fetchedData);
  } catch (error) {
    console.error("Error", error);
  }
}

function displayData(data) {
  const tableBody = document.getElementById("data-table");
  tableBody.innerHTML = "";
  data.forEach((row) => {
    const tr = document.createElement("tr");
    row.forEach((cell) => {
      const td = document.createElement("td");
      td.textContent = cell;
      tr.appendChild(td);
    });
    tableBody.appendChild(tr);
  });
}

// fetchData();
