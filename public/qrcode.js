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
    const qrCodeContainer = document.getElementById("qrCodeContainer");
    const img = document.getElementById("qr-img");
    img.src = data;
    qrCodeContainer.style.display = "block";
  } catch (error) {
    console.error;
  }
});
