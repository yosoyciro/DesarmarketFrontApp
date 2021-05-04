let librosArray = [];
let key = 0;

export const agregarLibro = (libro) => {
    let libroJson = libro;
    key++;
    libroJson.key = key;
    librosArray.push(libroJson);

    console.log("Libros array", librosArray);
}

export const listarLibros = () => {
    return librosArray;
}

export const obtenerLibroKey = (key) => {
    const objLibroKey = librosArray.find(libro => { return libro.key === key })

    return objLibroKey;
}

export const editarLibro = (dataLibro) => {
    librosArray.forEach(libroObj => {
        console.log("libro ", libroObj)
        if(dataLibro.key === libroObj.key) {
            libroObj.categoria = dataLibro.categoriaE;
            libroObj.titulo = dataLibro.tituloE;
            libroObj.autor = dataLibro.autorE;
        }
    })

    return librosArray; 
}

export const eliminarLibro = (dataLibro) => {
    librosArray = librosArray.filter(objLibro => { return objLibro.key !== dataLibro.key });
    const nuevaDataLibros = listarLibros();

    return nuevaDataLibros;
}