// Seleccion de barberos
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".barber-card");
  const inputId = document.getElementById("selectedBarberId");
  const inputName = document.getElementById("selectedBarberName");
  const button = document.getElementById("next")

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      
      cards.forEach((c) => {
        c.classList.remove("border-emerald-500", "bg-emerald-50");
        c.classList.add("border-gray-300");
      });
      button.disabled = false;
      button.classList.remove("bg-gray-400")
      button.classList.add("bg-emerald-500", "hover:bg-emerald-600")

      card.classList.remove("border-gray-300");
      card.classList.add("border-emerald-500", "bg-emerald-50");

      inputId.value = card.dataset.id;
      inputName.value = card.dataset.name;
    });
  });
});