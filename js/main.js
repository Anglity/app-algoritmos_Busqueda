document.getElementById('start').addEventListener('click', () => {
    const size = 100000; // ahora genera números entre 0 y 10,000,000
    const cantidadNumerosBuscar = 5; // Cantidad de números que quieres buscar
    const arreglo = Array.from({ length: size }, () => Math.floor(Math.random() * size));
  
    // Seleccionar múltiples números aleatorios a buscar
    const elementosBuscados = Array.from({ length: cantidadNumerosBuscar }, () => arreglo[Math.floor(Math.random() * size)]);
  
    // Mostrar claramente en pantalla los números buscados
    document.getElementById('numero-buscado').textContent = elementosBuscados.join(', ');
  
    ejecutarWorker('workers/busquedaSecuencial.js', { arreglo, elementosBuscados }, 'secuencial', size);
  
    const arregloOrdenado = [...arreglo].sort((a,b)=>a-b);
    ejecutarWorker('workers/busquedaBinaria.js', { arreglo: arregloOrdenado, elementosBuscados }, 'binaria', size);
  
    ejecutarWorker('workers/burbuja.js', { arreglo: [...arreglo] }, 'burbuja', size);
    ejecutarWorker('workers/quickSort.js', { arreglo: [...arreglo] }, 'quick', size);
    ejecutarWorker('workers/insercion.js', { arreglo: [...arreglo] }, 'insercion', size);
  });
  
  function ejecutarWorker(path, datos, id, size) {
    const worker = new Worker(path);
    const inicio = performance.now();
    const barra = document.getElementById(`bar-${id}`);
    const texto = document.querySelector(`#${id} .time`);
  
    barra.style.width = "0%";
    texto.textContent = "⏳ Procesando...";
  
    worker.postMessage(datos);
  
    const interval = setInterval(() => {
      let width = parseFloat(barra.style.width);
      barra.style.width = (width < 95 ? width + (Math.random() * 0.5) : width) + "%";
    }, 200);
  
    worker.onmessage = () => {
      clearInterval(interval);
      barra.style.width = "100%";
      const fin = performance.now();
      texto.textContent = `✅ Terminado en ${((fin - inicio)/1000).toFixed(2)} seg`;
      worker.terminate();
    };
  }
  