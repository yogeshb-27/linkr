document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const fullUrl = document.getElementById("fullUrl").value;
  try {
    const response = await fetch("http://localhost:3001/api/qrcode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: fullUrl }),
    });
    const data = await response.json();
    if (response.ok) {
      const qrCodeContainer = document.getElementById("qrCodeContainer");
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
    console.error;
    showToast(
      "<i class='bx bx-error text-danger me-2' ></i>",
      `${error.message}`,
      "text-danger"
    );
  }
});
