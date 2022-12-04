let form = document.querySelector(".form");
let login = document.querySelector(".login-input");
let password = document.querySelector(".password-input");

let url = "https://reqres.in/api/login";
let errorUI = document.createElement("h1");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  errorUI.textContent = null;

  let options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email: login.value,
      password: password.value,
    }),
  };

  async function loginFunc() {
    let response = await fetch(url, options);
    let data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.replace("../home.html");
    } else {
      errorUI.classList = "error-ui";
      errorUI.textContent = "User Not Found! Please try again";
      form.append(errorUI);
      
    }
  }
  loginFunc();
});
