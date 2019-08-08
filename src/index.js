window.addEventListener("DOMContentLoaded", event => {
  console.log("%c HI", "color: firebrick");

  const dogPic = src => `<img src="${src}" >`;

  const dogBreed = name => `<ul class="breed-name" id="${name}">${name}</ul>`;

  //let dogContainer = document.getElementById("dog-image-container");

  document.body.addEventListener("click", function(e) {
    console.log(e);
    if (e.target.className === "breed-name") {
      e.target.style.color = "blue";
    }
  });

  document
    .getElementById("breed-dropdown")
    .addEventListener("change", function(e) {
      const allBreeds = document.querySelectorAll(".breed-name");
      const filterValue = e.target.value;
      allBreeds.forEach(breed =>
        breed.id[0] === filterValue
          ? (breed.style.display = null)
          : (breed.style.display = "none")
      );
    });

  function getDogs() {
    fetch("https://dog.ceo/api/breeds/image/random/4")
      .then(resp => resp.json())
      .then(json => renderDogs(json));
  }

  function renderDogs(json) {
    console.log(json);
    json.message.forEach(
      doggo =>
        (document.getElementById("dog-image-container").innerHTML += dogPic(
          doggo
        ))
    );
  }

  function getBreeds() {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then(resp => resp.json())
      .then(json => renderBreeds(json));
  }

  function renderBreeds(json) {
    for (const key in json.message) {
      document.getElementById("dog-breeds").innerHTML += dogBreed(key);
    }
  }

  getBreeds();
  getDogs();
});
