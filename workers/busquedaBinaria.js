self.onmessage = function(e) {
    const { arreglo, elementosBuscados } = e.data;
  
    elementosBuscados.forEach(elemento => {
      let inicio = 0, fin = arreglo.length - 1;
      while (inicio <= fin) {
        const mitad = Math.floor((inicio + fin) / 2);
        if (arreglo[mitad] === elemento) break;
        else if (arreglo[mitad] < elemento) inicio = mitad + 1;
        else fin = mitad - 1;
      }
    });
  
    self.postMessage('terminado');
  };
  