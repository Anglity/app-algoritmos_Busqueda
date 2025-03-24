self.onmessage = function(e) {
  const { arreglo, elementosBuscados } = e.data;

  // Tamaño inicial de los datos
  const sizeInicial = estimarTamanoObjeto(arreglo) + estimarTamanoObjeto(elementosBuscados);
  
  // Variables temporales para la búsqueda binaria
  let memoriaTemporal = 24; // inicio, fin, mitad (3 variables * 8 bytes)
  
  elementosBuscados.forEach(elemento => {
    let inicio = 0, fin = arreglo.length - 1;
    
    // Búsqueda binaria optimizada
    while (inicio <= fin) {
      const mitad = Math.floor((inicio + fin) / 2);
      
      // Verificar si encontramos el elemento
      if (arreglo[mitad] === elemento) {
        break;
      }
      
      // Decidir qué mitad explorar
      if (arreglo[mitad] < elemento) {
        inicio = mitad + 1;
      } else {
        fin = mitad - 1;
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