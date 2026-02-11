document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const submitBtn = document.getElementById("submit-btn");

  // Validación dinámica
  emailInput.addEventListener("input", () => {
    const valido = emailInput.validity.valid;

    submitBtn.disabled = !valido;

    if (valido) {
      submitBtn.classList.remove("bg-gray-400");
      submitBtn.classList.add("bg-emerald-600");
    } else {
      submitBtn.classList.remove("bg-emerald-600");
      submitBtn.classList.add("bg-gray-400");
    }
  });
});
