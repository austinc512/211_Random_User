let addressBook = [];

const getUser = () => {
  fetch("https://randomuser.me/api/?results=5")
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data.results);
      addressBook = data.results;
      return addressBook;
    })
    .then((addressBook) =>
      addressBook.map((person, index, arr) => {
        // console.log(arr);
        let html = `
        <div>
          <img src="${person.picture.large}">
          <h3>${person.name.first} ${person.name.last}</h3>
          <button id="${index}" onclick="toggleFunction(${index})" >Show More Info</button>
          </div>`;
        // console.log(`${person.name.first} ${person.name.last}`);
        // console.log(`${person.picture.large}`)
        document
          .getElementById("userProfiles")
          .insertAdjacentHTML("beforeend", html);
      })
    );
};

const logPosts = () => {
  console.log(addressBook);
};

const toggleFunction = (id) => {
  console.log(document.getElementById(id));
  const currentElement = document.getElementById(id);
  // location, email, phone
  const html = `
  <p>Location: ${addressBook[id].location.city}, ${addressBook[id].location.state} <br>
  Age: ${addressBook[id].dob.age} <br>
  Email: ${addressBook[id].email} <br>
  Phone: ${addressBook[id].phone}
  </p>
  `;
  currentElement.insertAdjacentHTML("afterend", html);
};

// https://randomuser.me/api/?results=5000

// const getFiveUsers = () => {
//   fetch("https://randomuser.me/api/?results=5")
//     .then((res) => res.json())
//     .then((data) => addressBook.push(data.results));
// };

// window.onload = function () {
//   getUser();
// };

window.onload = function () {
  getUser();
};
