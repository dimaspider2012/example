const login = document.getElementById("login");
const password = document.getElementById("password");
const btnlogin = document.querySelector(".btn-login");
btnlogin.addEventListener("click", () => {
  if (login.value === "admin" && password.value === "123") {
    window.location.href = "about.html";
  } else {
    console.log("error");
  }
});
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