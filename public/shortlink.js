const shortUrlInput = document.querySelector("#shortUrl");
const fullUrlInput = document.querySelector("#fullUrl");
document
  .querySelector("form")
  .addEventListener("submit", async function (event) {
    shortUrlInput.value = "";
    event.preventDefault();
    const fullUrl = fullUrlInput.value;
    try {
      const response = await fetch("/api/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ fullUrl }),
      });
      const data = await response.json();
      if (response.ok) {
        shortUrlInput.value = data.shortUrl;
        showToast(
          "<i class='bx bx-link-alt text-success me-2'></i>",
          `Short link created !`,
          "text-success"
        );
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      // console.error(error);
      showToast(
        "<i class='bx bx-error text-danger me-2'></i>",
        `${error}`,
        "text-danger"
      );
    }
  });
