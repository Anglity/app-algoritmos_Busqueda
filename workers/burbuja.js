self.onmessage = function(e) {
    const arreglo = e.data.arreglo;
    let n = arreglo.length;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arreglo[j] > arreglo[j + 1]) {
          [arreglo[j], arreglo[j + 1]] = [arreglo[j + 1], arreglo[j]];
        }
      }
    }
    self.postMessage('terminado');
  };
  