self.onmessage = function(e) {
  const arreglo = e.data.arreglo;
  
  // Tamaño inicial de los datos
  const sizeInicial = estimarTamanoObjeto(arreglo);
  
  // Optimización: agregar una bandera para detectar si ya está ordenado
  let n = arreglo.length;
  let memoriaTemporal = 24; // n, i, j (3 variables * 8 bytes)
  
  for (let i = 0; i < n; i++) {
    let ordenado = true; // Bandera para detectar si ya está ordenado
    memoriaTemporal += 8; // 1 variable booleana adicional
    
    for (let j = 0; j < n - i - 1; j++) {
      if (arreglo[j] > arreglo[j + 1]) {
        // Intercambio
        [arreglo[j], arreglo[j + 1]] = [arreglo[j + 1], arreglo[j]];
        ordenado = false; // Se realizó un intercambio, aún no está ordenado
      }
    }
    
    // Si no hubo intercambios en esta pasada, el array ya está ordenado
    if (ordenado) {
      break;
    }
  }
  
  // Tamaño final (igual al inicial para ordenamiento in-place)
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