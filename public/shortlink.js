const shortUrlInput = document.querySelector("#shortUrl");
const fullUrlInput = document.querySelector("#fullUrl");
shortUrlInput.value = "";
document
  .querySelector("form")
  .addEventListener("submit", async function (event) {
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
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  });
