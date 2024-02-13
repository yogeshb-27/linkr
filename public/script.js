const toast = document.getElementById("toast");
const showToast = (icon, message, color) => {
  toast.innerHTML = `${icon} ${message}`;
  toast.className = `shadow-lg bg-light ${color}`;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
    toast.innerHTML = "";
  }, 3000);
};
window.addEventListener("online", () =>
  showToast(
    "<i class='bx bx-wifi text-success me-2'></i>",
    "You Are Online",
    "text-success "
  )
);
window.addEventListener("offline", () =>
  showToast(
    "<i class='bx bx-wifi-off text-danger me-2'></i>",
    "You Are Offline",
    "text-danger"
  )
);
const logOut = document.querySelector("#log-out");
logOut.addEventListener("click", async () => {
  try {
    const response = await fetch("/user/logout", {
      method: "POST",
    });
    if (response.ok) {
      window.location.href = "/";
    } else {
      console.error("Logout failed ");
    }
  } catch (error) {
    console.error("Error during logout :", error);
  }
});
