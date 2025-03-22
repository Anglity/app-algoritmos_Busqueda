self.onmessage = function(e) {
    const { arreglo, elementosBuscados } = e.data;
  
    elementosBuscados.forEach(elemento => {
      for (let i = 0; i < arreglo.length; i++) {
        if (arreglo[i] === elemento) break;
      }
    });
  
    self.postMessage('terminado');
  };
  