self.onmessage = function(e) {
  const { arreglo, elementosBuscados } = e.data;

  // Tamaño inicial de los datos
  const sizeInicial = estimarTamanoObjeto(arreglo) + estimarTamanoObjeto(elementosBuscados);
  
  // Variables temporales para la búsqueda secuencial
  let memoriaTemporal = 16; // i, elemento (2 variables * 8 bytes)
  
  elementosBuscados.forEach(elemento => {
    // Búsqueda secuencial optimizada
    for (let i = 0; i < arreglo.length; i++) {
      if (arreglo[i] === elemento) {
        break; // Elemento encontrado, salir del bucle
      }
    }
  });

  self.postMessage({
    mensaje: 'terminado',
    memoria: sizeInicial + memoriaTemporal
  });
};

// Función para estimar el tamaño en bytes de un objeto JavaScript
function estimarTamanoObjeto(objeto) {
  // Para un array de números, cada número ocupa aproximadamente 8 bytes
  if (Array.isArray(objeto)) {
    return objeto.length * 8;
  }
  
  // Para un número individual
  if (typeof objeto === 'number') {
    return 8;
  }
  
  return 0;
}