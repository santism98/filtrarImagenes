const fotos = [
    {
      foto: 'viajes-1.jpg',
      info: 'foto 1',
      palabras: ['fiesta', 'ciudad']
    },
    {
      foto: 'viajes-2.jpg',
      info: 'foto 2',
      palabras: ['ciudad', 'salidas']
    },
    {
      foto: 'viajes-3.jpg',
      info: 'foto 3',
      palabras: ['fiesta', 'viajes', 'avion']
    },
    {
      foto: 'viajes-4.jpg',
      info: 'foto 4',
      palabras: ['parejas', 'salidas']
    },
    {
      foto: 'viajes-5.jpg',
      info: 'foto 5',
      palabras: ['familia', 'fiesta']
    },
    {
      foto: 'viajes-6.jpg',
      info: 'foto 6',
      palabras: ['parejas', 'ciudad', 'salidas']
    },
    {
      foto: 'viajes-7.jpg',
      info: 'foto 7',
      palabras: ['familia', 'viajes', 'avion']
    }
  ];
  
  const botonera = document.getElementById('botonera');
const contenedorFotos = document.getElementById('contenedor-fotos');
const contenedorInfo = document.getElementById('contenedor-info');

// Función para mostrar las fotos coincidentes
const mostrarFotosCoincidentes = async (palabra) => {
  // Filtramos las fotos que contengan la palabra reservada
  const fotosCoincidentes = fotos.filter(f => f.palabras.includes(palabra));

  // Borramos las fotos previas del contenedor
  contenedorFotos.innerHTML = '';
  contenedorInfo.innerHTML = ''; // Borramos la imagen grande


  // Mostramos las fotos coincidentes
  const promises = [];
  fotosCoincidentes.forEach(f => {
    const img = document.createElement('img');
    img.src = f.foto;
    contenedorFotos.appendChild(img);

    // Agregamos el event listener para mostrar la información de la foto seleccionada
    const promise = new Promise(resolve => {
      img.addEventListener('click', () => {
        mostrarInfo(f);
        mostrarImagenGrande(f);
        resolve();
      });
    });
    promises.push(promise);
  });

  // Esperamos a que todas las imágenes hayan sido procesadas antes de continuar
  await Promise.all(promises);
};

// Función para mostrar la información de la foto seleccionada
const mostrarInfo = (foto) => {
  const info = document.createElement('p');
  info.innerText = foto.info;
  contenedorInfo.innerHTML = '';
  contenedorInfo.appendChild(info);
};

// Función para mostrar la imagen seleccionada en tamaño completo
const mostrarImagenGrande = (foto) => {
  const imgGrande = document.createElement('img');
  imgGrande.src = foto.foto;
  contenedorInfo.appendChild(imgGrande);

  // Agregamos el event listener para borrar la imagen grande al hacer click en ella
  imgGrande.addEventListener('click', () => {
    contenedorInfo.removeChild(imgGrande);
  });
};

// Creamos un objeto para almacenar las palabras reservadas
const palabrasReservadas = {};

// Recorremos todas las fotos para obtener las palabras reservadas y crear los botones
fotos.forEach(foto => {
  foto.palabras.forEach(palabra => {
    // Si la palabra no se ha agregado antes, la agregamos al objeto y creamos un botón
    if (!palabrasReservadas[palabra]) {
      palabrasReservadas[palabra] = true;
      const boton = document.createElement('button');
      boton.innerText = palabra;
      botonera.appendChild(boton);

      // Agregamos el event listener para mostrar las fotos coincidentes
      boton.addEventListener('click', async () => {
        await mostrarFotosCoincidentes(palabra);
      });
    }
  });
});
