self.onmessage = function(e) {
    const arreglo = e.data.arreglo;
    for (let i = 1; i < arreglo.length; i++) {
      let actual = arreglo[i];
      let j = i - 1;
      while (j >= 0 && arreglo[j] > actual) {
        arreglo[j + 1] = arreglo[j];
        j--;
      }
      arreglo[j + 1] = actual;
    }
    self.postMessage('terminado');
  };
  