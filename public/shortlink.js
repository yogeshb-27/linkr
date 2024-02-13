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

const deleteIcon = document.querySelector(".delete-icon");
const copyIcon = document.querySelector(".copy-icon");
function showDeleteIcon() {
  deleteIcon.style.visibility = "visible";
}
function hideDeleteIcon() {
  deleteIcon.style.visibility = "hidden";
}
function showCopyIcon() {
  copyIcon.style.visibility = "visible";
}
function hideCopyIcon() {
  copyIcon.style.visibility = "hidden";
}
function clearInputFields() {
  fullUrlInput.value = "";
  shortUrlInput.value = "";
}
function copyShortUrl() {
  const shortUrlInput = document.getElementById("shortUrl");
  if (shortUrlInput.value.trim() !== "") {
    shortUrlInput.select();
    document.execCommand("copy");
    showToast(
      "<i class='bx bx-check text-success me-2'></i>",
      `copied to clipboard !`,
      "text-success"
    );
  }
}
