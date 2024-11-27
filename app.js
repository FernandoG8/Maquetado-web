
document.addEventListener('DOMContentLoaded', function() {
  let pasoActual = 1;
  const totalPasos = 4;

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  // Las opciones de envio 
  const opcionesDeEnvio = [
      { transportista: 'DHL', precio: 250, tiempo: '1-2 días' },
      { transportista: 'Estafeta', precio: 200, tiempo: '2-3 días' },
      { transportista: 'RedPack', precio: 180, tiempo: '3-4 días' },
      { transportista: 'Fedex', precio: 280, tiempo: '1-2 días' }
  ];

  function actualizarBotones() {
    const botonesContainer = document.querySelector('.navigation-buttons');

    if (pasoActual === 4) {
        botonesContainer.classList.add('oculto');
        // Le hacemos como a  los avengers con el chasquido de Thanos
        setTimeout(() => {
            botonesContainer.style.display = 'none';
            // no me quiero ir señor stark
        }, 1000);
    } else {
        botonesContainer.style.display = 'flex';
        botonesContainer.classList.remove('oculto');
        prevBtn.style.display = pasoActual === 1 ? 'none' : 'block';
        nextBtn.textContent = pasoActual === 3 ? 'Finalizar' : 'Siguiente';
    }

  }

  function actualizarBarraDeProgreso() {
      const progreso = (pasoActual / totalPasos) * 100
      document.querySelector('.progress-bar').style.width = `${progreso}%`
  }

  function mostrarPaso(paso) {
      document.querySelectorAll('.form-step').
      forEach(
        el => 
          el.classList.add('d-none')
      )
      document.getElementById(`step${paso}`).classList.remove('d-none')
      actualizarBotones();
      actualizarBarraDeProgreso();
  }

  function llenarOpcionesDeEnvio() {
      const contenedor = document.querySelector('.shipping-options');
      contenedor.innerHTML = '';

      opcionesDeEnvio.forEach((opcion, index) => {
          const div = document.createElement('div');
          div.className = 'shipping-option';
          div.innerHTML = `
              <div class="form-check">
                  <input class="form-check-input" type="radio" name="shippingOption" 
                         id="option${index}" value="${index}" required>
                  <label class="form-check-label" for="option${index}">
                      <strong>${opcion.transportista}</strong><br>
                      Precio: ${opcion.precio} MXN<br>
                      Tiempo estimado: ${opcion.tiempo}
                  </label>
              </div>
          `;
          contenedor.appendChild(div);
      });
  }

  function validarPasoActual() {
      const pasoActualElemento = document.getElementById(`step${pasoActual}`);
      const inputs = pasoActualElemento.querySelectorAll('input[required], textarea[required]');

      let esValido = true;
      inputs.forEach(input => {
          if (!input.value) {
              esValido = false;
              input.classList.add('is-invalid');
          } else {
              input.classList.remove('is-invalid');
          }
      });

      if (pasoActual === 2) {
          const opcionSeleccionada = document.querySelector('input[name="shippingOption"]:checked');
          if (!opcionSeleccionada) esValido = false;
      }

      return esValido;
  }

  nextBtn.addEventListener('click', () => {
      if (!validarPasoActual()) {
          alert('Por favor complete todos los campos requeridos.');
          return;
      }

      if (pasoActual < totalPasos) {
          pasoActual++;
          mostrarPaso(pasoActual);

          if (pasoActual === 2) {
            llenarOpcionesDeEnvio();
          }
      }
  });

  prevBtn.addEventListener('click', () => {
      if (pasoActual > 1) {
          pasoActual--;
          mostrarPaso(pasoActual);
      }
  });

  //No lo olvides
  mostrarPaso(1);
});