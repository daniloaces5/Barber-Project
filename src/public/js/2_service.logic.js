// Seleccion de servicios
document.addEventListener("DOMContentLoaded", () => {
  const select = document.querySelector("select[name='servicio']");
  const inputIdService = document.getElementById("serviceId");
  const inputNameService = document.getElementById("serviceName");
  const inputPrice = document.getElementById("servicePrice");
  const inputDuration = document.getElementById("serviceDuration");

  const fechaInput = document.getElementById("date-input");
  const nextBtn = document.getElementById("next");

  function validarFormulario() {
    const servicioValido = select.value !== "" && select.value !== null;
    const fechaValida = fechaInput.value !== "" && fechaInput.value !== null;

    if (servicioValido && fechaValida) {
      nextBtn.disabled = false;
      nextBtn.classList.remove("bg-gray-400");
      nextBtn.classList.add("bg-emerald-500", "hover:bg-emerald-600");
    } else {
      nextBtn.disabled = true;
      nextBtn.classList.remove("bg-emerald-500");
      nextBtn.classList.add("bg-gray-400");
    }
  }

  select.addEventListener("change", () => {
    const option = select.options[select.selectedIndex];

    const id = option.dataset.id;
    const name = option.dataset.name;
    const price = option.dataset.price;
    const duration = option.dataset.duration;

    inputIdService.value = id;
    inputNameService.value = name;
    inputPrice.value = price;
    inputDuration.value = duration;

    validarFormulario();
  });

  fechaInput.addEventListener("change", validarFormulario);
});

const wrapper = document.getElementById("date-wrapper");
const input = document.getElementById("date-input");

wrapper.addEventListener("click", () => {
    if (input.showPicker) {
        input.showPicker();
    } else {
        input.click();
    }
});