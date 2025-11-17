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

// 👇 CODIGO DE LA LIVE REVIEW EMPIEZA DESDE AQUÍ 👇

// const listaUsuarios = document.getElementById("listaUsuarios")

// function getUsers() {
//   fetch("https://jsonplaceholder.typicode.com/users")
//     .then(response => response.json())
//     .then(data => {
//       const users = data.map(user => {
//         const { id, address } = user
//         return {
//           ...user,
//           age: randomAge(18, 65),
//           img: `../assets/img/${id}.jpeg`,
//           address: `${address.street}, ${address.suite}, ${address.city}`,
//         }
//       }).map(user => {
//         const { name, age, username, img, phone, email, company: { name: companyName }, address } = user
//         const template = `
//       <li>
//         <div class="user-content">
//           <div class="user-info">
//             <h2><strong>Nombre:</strong> ${name}</h2>
//             <p><strong>Edad:</strong> ${age}</p>
//             <p><strong>Usuario:</strong> ${username}</p>
//             <p><strong>Teléfono:</strong> ${phone}</p>
//             <p><strong>Email:</strong> ${email}</p>
//           </div>
//           <div class="user-image">
//             <img src="${img}" alt="${name}" /> 
//           </div>
//         </div>
//         <div class="user-company">
//           <p><strong>Compañía:</strong> ${companyName}</p>
//           <p><strong>Dirección:</strong> ${address}</p>
//         </div>
//       </li>
//       `
//         return template
//       }).join("")
//       listaUsuarios.innerHTML = users

//     })
// }

// function randomAge(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min
// }

// getUsers()

// console.log(randomAge(18, 65))
// Math.floor(Math.random() * (65 - 18 + 1)) + 18 => El +1 es para que salga el número máximo, que en este ejemplo es 65.