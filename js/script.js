const usersList = document.getElementById('listaUsuarios');

fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    //console.log(data);
    const users = data.map(user => (
      {
        ...user,
        age: Math.floor(Math.random() * (60 - 18) + 18),
        img: `./assets/img/${user.id}.jpeg`,
        address: {
          street: user.address.street,
          suite: user.address.suite,
          city: user.address.city
        }
      }
    ));
    console.log('Este es el Users:', users);
    const cardUsers = users.map(cardUser => {
      const template = `
        <li>
          <div class="container">
            <div class="mainInfo">
              <p><span class="fieldTitle">Nombre:</span> ${cardUser.name}</p>
              <p><span class="fieldTitle">Edad: </span> ${cardUser.age}</p>
              <p><span class="fieldTitle">Username: </span> ${cardUser.username}</p>
              <p><span class="fieldTitle">Teléfono: </span> ${cardUser.phone}</p>
              <p><span class="fieldTitle">Email: </span> ${cardUser.email}</p>
            </div>
            <img src="${cardUser.img}" alt="${cardUser.name}" />
          </div
          <div class="otherInfo">
            <p><span class="fieldTitle">Compañía:</span> ${cardUser.company.name}</p>
            <p><span class="fieldTitle">Dirección: </span> ${cardUser.address.street}, ${cardUser.address.suite}, ${cardUser.address.city}</p>
          </div>
        </li>
      `
      return template;
    }).join("")
    usersList.innerHTML = cardUsers;
  })
  .catch((error) => {
    usersList.innerHTML = `<li class="error">Hubo un error y no se pudo obtener los datos de los usuarios</li>`;
  });