let addressBook = [];
let counter = 0;

/*

make a counter in the global scope that controls where we should start in the map method. At the end of our .then method calls, we need to set the counter = addressBook.lenght

each subsequent getUser() call will add more users to the array.

then only map the users from the addressBook that are at a higher position than the counter.

This works for short arrays, but adds unnecessary time complexity by iterating over the objects it has already iterated over.

It would be most efficient to only visit the objects we haven't visited yet.

But for a frontend application, we wouldn't have 1,000,000 users on this page, so a slightly crappier implementation is okay I think.

*/

const getUser = () => {
  fetch("https://randomuser.me/api/?results=5")
    .then((res) => res.json())
    .then((data) => {
      //   addressBook = data.results;
      addressBook = addressBook.concat(data.results);
      return addressBook;
    })
    .then((addressBook) => {
      addressBook.map((person, index, arr) => {
        // if element is already in dom, continue
        if (index + 1 > counter) {
          let html = `
        <div class="data-unit">
          <img src="${person.picture.large}">
          <h3>${person.name.first} ${person.name.last}</h3>
          <button id="${index}" onclick="toggleFunction(${index})" >Show More Info</button>
          </div>`;
          document
            .getElementById("userProfiles")
            .insertAdjacentHTML("beforeend", html);
        }
      });
      return addressBook;
    })
    .then((addressBook) => (counter = addressBook.length));
};

const logPosts = () => {
  console.log(addressBook);
};

const toggleFunction = (id) => {
  const currentElement = document.getElementById(id);
  const html = `
  <p>Location: ${addressBook[id].location.city}, ${addressBook[id].location.state} <br>
  Age: ${addressBook[id].dob.age} <br>
  Email: ${addressBook[id].email} <br>
  Phone: ${addressBook[id].phone}
  </p>
  `;
  currentElement.insertAdjacentHTML("afterend", html);
  currentElement.disabled = true;
};

window.onload = function () {
  getUser();
};
