const inputName = document.getElementById("inputname");
const inputClass = document.getElementById("inputclass");
const addmission = document.getElementById("inputadd");
const submit = document.querySelector("#admission");
const showBtn = document.getElementById("show");
const table = document.querySelector("table");
const tablebody = document.querySelector("tbody");
const alert = document.getElementById("alert");
let index = 5;

//  Regex
const classTest = /[^a-z]{2}/;
const addTest = /^[0-9]{4}$/;
// localStorage
let userArray = [];
let users = localStorage.getItem("users");
if (users !== null) {
  userArray = JSON.parse(localStorage.getItem("users"));
  userArrar = userArray.sort((a, b) => (a.add - b.add ? 1 : -1));
  userArray.forEach((elem) => {
    tablebody.innerHTML += `<tr>
    <th scope="row">${index++}</th>
    <td>${elem.name}</td>
    <td>${elem.class}</td>
    <td>${elem.add}</td>
</tr>`;
  });
}
////////////////////////////////
submit.addEventListener("submit", addUser);

function addUser(event) {
  alert.classList.replace("text-success", "text-danger");
  let valClass = inputClass.value;
  let valAdd = addmission.value;
  let inpName = inputName.value.trim();
  let check = true;
  userArray.forEach((elem) =>
    elem.add == valAdd ? (check = false) : (check = true)
  );
  if (check) {
    //   converting class into good looking
    alert.style.display = "block";
    if (valClass.trim().length < 2) {
      valClass = 0 + valClass;
    }
    if (!classTest.test(valClass.trim())) {
      alert.innerText = `Class is Invalid! Either you typed alphabets or it is more than two digit`;
    } else if (!addTest.test(valAdd)) {
      alert.innerText = `Admission is Invalid! Either you typed alphabets or it is more or less than 4 digit `;
    } else {
      alert.innerText = `You are registered!
    Thank You for paying attention towards our school`;
      alert.classList.replace("text-danger", "text-success");
      tablebody.innerHTML += `
    <tr>
    <th scope="row">${index++}</th>
    <td>${inpName}</td>
    <td>${valClass}</td>
    <td>${valAdd}</td>
</tr>`;
      //  Adding user to localStorage.
      let user = {
        name: inpName,
        class: valClass,
        add: valAdd,
      };
      userArray.push(user);
      localStorage.setItem("users", JSON.stringify(userArray));
    }
  } else {
    alert.style.display = "block";
    alert.innerText = `User with same admission number has registered`;
  }
  setTimeout(() => {
    alert.style.display = "none";
  }, 3000);
}

/////////////////////////////////////////
showBtn.addEventListener("click", () => {
  let x = document.querySelector("table");
  x.classList.toggle("block");
  if (x.classList.contains("block")) {
    showBtn.innerText = "Show students";
  } else {
    showBtn.innerText = "Hide students";
  }
});
