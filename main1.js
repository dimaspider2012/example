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
