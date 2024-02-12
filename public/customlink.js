document
  .querySelector("form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const fullUrl = document.querySelector("#fullUrl").value;
    const shortUrl = document.querySelector("#shortUrl").value;

    try {
      const response = await fetch("/api/custom", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ fullUrl, shortUrl }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Custom Url Created");
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  });
