const fullUrl = document.getElementById("fullUrl");
document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const qrCodeContainer = document.getElementById("qrCodeContainer");
  qrCodeContainer.style.display = "none";

  try {
    const response = await fetch("http://localhost:3001/api/qrcode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: fullUrl.value }),
    });
    const data = await response.json();
    if (response.ok) {
      const img = document.getElementById("qr-img");
      img.src = data;
      qrCodeContainer.style.display = "block";
      showToast(
        "<i class='bx bx-qr-scan text-success me-2'></i>",
        `qr code created !`,
        "text-success"
      );
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    showToast(
      "<i class='bx bx-error text-danger me-2' ></i>",
      `${error.message}`,
      "text-danger"
    );
  }
});

const deleteIcon = document.querySelector(".delete-icon");
function clearInputField() {
  fullUrl.value = "";
}
function showDeleteIcon() {
  deleteIcon.style.visibility = "visible";
}
function hideDeleteIcon() {
  deleteIcon.style.visibility = "hidden";
}
