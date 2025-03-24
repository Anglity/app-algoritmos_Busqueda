self.onmessage = function(e) {
  const arreglo = e.data.arreglo;
  
  // Tamaño inicial de los datos
  const sizeInicial = estimarTamanoObjeto(arreglo);
  
  // Para QuickSort, implementamos una versión in-place para mejor rendimiento
  let memoriaMaxima = sizeInicial;
  
  function quickSort(arr, inicio, fin) {
    if (inicio < fin) {
      // Particionar y obtener el índice del pivote
      const pivotIndex = particionar(arr, inicio, fin);
      
      // Memoria para variables temporales: pivote, indices, etc.
      const memoriaTemporal = 40; // ~40 bytes para variables temporales
      memoriaMaxima = Math.max(memoriaMaxima, sizeInicial + memoriaTemporal);
      
      // Ordenar las dos partes
      quickSort(arr, inicio, pivotIndex - 1);
      quickSort(arr, pivotIndex + 1, fin);
    }
  }
  
  function particionar(arr, inicio, fin) {
    // Usar el último elemento como pivote
    const pivote = arr[fin];
    let i = inicio - 1;
    
    for (let j = inicio; j < fin; j++) {
      if (arr[j] <= pivote) {
        i++;
        // Intercambio
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    
    // Colocar el pivote en su posición correcta
    [arr[i + 1], arr[fin]] = [arr[fin], arr[i + 1]];
    return i + 1;
  }

  // Ejecutamos el quicksort optimizado
  quickSort(arreglo, 0, arreglo.length - 1);
  
  // Memoria adicional estimada para la pila de llamadas a funciones
  const factorRecursion = Math.log2(arreglo.length) * 32; // Mucho menor con implementación in-place
  
  self.postMessage({
    mensaje: 'terminado',
    memoria: memoriaMaxima + factorRecursion
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