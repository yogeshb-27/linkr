const shortUrl = document.querySelector("#shortUrl");
const fullUrl = document.querySelector("#fullUrl");
const deleteIcon = document.querySelector(".delete-icon");
const copyIcon = document.querySelector(".copy-icon");
document
  .querySelector("form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    try {
      const response = await fetch("/api/custom", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          fullUrl: fullUrl.value,
          shortUrl: shortUrl.value,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // console.log("Custom Url Created");
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

function copyShortUrl() {
  if (shortUrl.value.trim() !== "") {
    shortUrl.select();
    document.execCommand("copy");
    showToast(
      "<i class='bx bx-check text-success me-2'></i>",
      `copied to clipboard !`,
      "text-success"
    );
  }
}
function clearInputFields() {
  fullUrl.value = "";
  shortUrl.value = "";
}
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
