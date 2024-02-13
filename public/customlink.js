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
        showToast(
          "<i class='bx bx-link-alt me-2 text-success'></i>",
          "Custom Link Created",
          "text-success"
        );
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      showToast(
        "<i class='bx bx-error text-danger me-2'></i>",
        `${error.message}`,
        "text-danger"
      );
    }
  });
