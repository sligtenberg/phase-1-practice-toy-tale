let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetchToys();
  document.querySelector('form').addEventListener('submit', handleSubmit);
});

function handleSubmit (event) {
  event.preventDefault();
  const newToyObj = {
    name: event.target.children[1].value,
    image: event.target.children[3].value,
    likes: 0
  };
  addToys([newToyObj]);
  adoptNewToy(newToyObj);
}

function adoptNewToy(toyObj) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(toyObj)
  })
  .then(res => res.json())
}

function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then((response) => response.json())
  .then((json) => addToys(json))
}

function addToys(allTheToys) {
  for (let toy of allTheToys) {
    let newToy = document.createElement('div');
    newToy.setAttribute('class', 'card');

    let newToyH2 = document.createElement('h2');
    newToyH2.textContent = toy.name;
    newToy.appendChild(newToyH2);

    let newToyImg = document.createElement('img');
    newToyImg.setAttribute('src', toy.image);
    newToyImg.setAttribute('class', 'toy-avatar');
    newToy.appendChild(newToyImg);

    let newToyP = document.createElement('p');
    newToyP.textContent = `${toy.likes} likes`;
    newToy.appendChild(newToyP);

    let newToyBtn = document.createElement('button');
    newToyBtn.setAttribute('id', toy.id)
    newToyBtn.setAttribute('class', 'like-btn');
    newToyBtn.textContent = 'Like ❤️';
    newToyBtn.addEventListener('click', () => {
      toy.likes++;
      newToyP.textContent = `${toy.likes} likes`;
      updateLikes(toy);
    })
    newToy.appendChild(newToyBtn);

    document.getElementById('toy-collection').appendChild(newToy);
  }
}

function updateLikes(toyToUpdate) {
  fetch(`http://localhost:3000/toys/${toyToUpdate.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(toyToUpdate)
  })
  .then(res => res.json());
}