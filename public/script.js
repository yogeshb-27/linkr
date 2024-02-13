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
