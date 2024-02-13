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
