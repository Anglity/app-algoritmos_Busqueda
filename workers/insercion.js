self.onmessage = function(e) {
  const arreglo = e.data.arreglo;
  
  // Tamaño inicial de los datos
  const sizeInicial = estimarTamanoObjeto(arreglo);
  
  // Variables temporales para el algoritmo de inserción
  let memoriaTemporal = 24; // actual, j, i (3 variables * 8 bytes)
  
  // Medimos el tiempo para análisis de rendimiento
  const tiempoInicio = performance.now();
  
  // Algoritmo de inserción
  for (let i = 1; i < arreglo.length; i++) {
    let actual = arreglo[i];
    let j = i - 1;
    
    // Optimización: comprobamos primero si necesitamos mover elementos
    if (j >= 0 && arreglo[j] > actual) {
      while (j >= 0 && arreglo[j] > actual) {
        arreglo[j + 1] = arreglo[j];
        j--;
      }
      arreglo[j + 1] = actual;
    }
  }
  
  // Tamaño final después del algoritmo (igual al inicial para ordenamiento in-place)
  const sizeFinal = estimarTamanoObjeto(arreglo);
  
  self.postMessage({
    mensaje: 'terminado',
    memoria: sizeFinal + memoriaTemporal
  });
};

// Función para estimar el tamaño en bytes de un objeto JavaScript
function estimarTamanoObjeto(objeto) {
  // Para un array de números, cada número ocupa aproximadamente 8 bytes
  if (Array.isArray(objeto)) {
    return objeto.length * 8;
  }
  
  return 0;
}