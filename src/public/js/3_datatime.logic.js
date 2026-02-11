// Seleccion de horarios
document.addEventListener("DOMContentLoaded", () => {
  const slotButtons = document.querySelectorAll(".slot-button");
  const inputHora = document.getElementById("selectedHora");
  const nextBtn = document.getElementById("next")

  slotButtons.forEach((button) => {
    button.addEventListener("click", () => {
      
      nextBtn.classList.remove("bg-gray-400")
      nextBtn.classList.add("bg-emerald-500", "hover:bg-emerald-600")
      nextBtn.disabled = false

      slotButtons.forEach((b) =>
        b.classList.remove(
          "bg-teal-500",
          "text-white",
          "border-teal-700",
          "shadow-md"
        )
      );
      slotButtons.forEach((b) =>
        b.classList.add("bg-gray-100", "text-gray-800", "border-gray-300")
      );

      button.classList.remove(
        "bg-gray-100",
        "text-gray-800",
        "border-gray-300"
      );
      button.classList.add(
        "bg-teal-500",
        "text-white",
        "border-teal-700",
        "shadow-md"
      );

      inputHora.value = button.textContent.trim();
    });
  });
});