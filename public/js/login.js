/* eslint-disable */

document.querySelector(".form").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  loginUser(email, password);
});

async function loginUser(email, password) {
  try {
    const res = await axios.post("http://localhost:5000/api/v1/login", {
      email,
      password
    });
    if (res.data.success) {
      showAlert("success", "You are now logged in!");
      setTimeout(() => window.location.assign("/"), 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
}
