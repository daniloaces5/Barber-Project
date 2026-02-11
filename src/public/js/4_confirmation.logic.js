document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.getElementById("next4");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");

  function validarFormulario() {
    const valido =
      nameInput.value.trim() !== "" &&
      emailInput.validity.valid &&
      phoneInput.validity.valid;

    nextBtn.disabled = !valido;

    if (valido) {
      nextBtn.classList.remove("bg-gray-400");
      nextBtn.classList.add("bg-emerald-500");
    } else {
      nextBtn.classList.remove("bg-emerald-500");
      nextBtn.classList.add("bg-gray-400");
    }
  }

  nameInput.addEventListener("input", validarFormulario);
  emailInput.addEventListener("input", validarFormulario);
  phoneInput.addEventListener("input", validarFormulario);
});
