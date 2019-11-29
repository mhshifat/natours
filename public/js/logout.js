/* eslint-disable */

const logoutBtn = document.querySelector(".nav__el--logout");

if (logoutBtn) logoutBtn.addEventListener("click", logout);

async function logout() {
  try {
    const res = await axios.get("http://localhost:5000/api/v1/logout");
    if (res.data.success) {
      showAlert("success", "You are now logged out!");
      setTimeout(() => window.location.reload(), 1500);
    }
  } catch (err) {
    showAlert("error", "Error logging out! Tyr again.");
  }
}
