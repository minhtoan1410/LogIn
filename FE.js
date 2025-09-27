const modal = document.querySelector(".modal");
const otp = document.querySelector(".otp");
const modalContainer = document.querySelector(".modal-container");
modalContainer.addEventListener("click", function (event) {
  event.stopPropagation();
});
function openObject(tmp) {
  tmp.classList.add("open");
}
function closeObject(tmp) {
  tmp.classList.remove("open");
}

async function register() {
  let us = document.querySelector("#new-user").value;
  let pa = document.querySelector("#new-pass").value;
  let gm = document.querySelector("#new-gmail").value;
  const res = await fetch("http://localhost:8080/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: us, password: pa, gmail: gm }),
  });
  const data = await res.json();
  let msg = data.msg;
  if (data.succes) {
    openObject(otp);
  } else {
    alert(msg);
  }
}
