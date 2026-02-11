export function generarHorariosDisponibles(
  reservas = [],
  duracionServicio,
  inicio = "09:00",
  fin = "17:00"
) {
  const horarios = [];
  const [hInicio, mInicio] = inicio.split(":").map(Number);
  const [hFin, mFin] = fin.split(":").map(Number);
  const totalInicio = hInicio * 60 + mInicio;
  const totalFin = hFin * 60 + mFin;

  for (let t = totalInicio; t + duracionServicio <= totalFin; t += 30) {
    const hora = Math.floor(t / 60)
      .toString()
      .padStart(2, "0");
    const min = (t % 60).toString().padStart(2, "0");
    horarios.push(`${hora}:${min}`);
  }

  if (!reservas || reservas.length === 0) return horarios;

  const bloqueados = reservas.map((r) => {
    const [h, m] = r.hora.split(":").map(Number);
    const inicio = h * 60 + m;
    const fin = inicio + r.duracion;
    return { inicio, fin };
  });

  return horarios.filter((slot) => {
    const [h, m] = slot.split(":").map(Number);
    const inicioSlot = h * 60 + m;
    const finSlot = inicioSlot + duracionServicio;
    return !bloqueados.some(
      (b) =>
        (inicioSlot >= b.inicio && inicioSlot < b.fin) ||
        (finSlot > b.inicio && finSlot <= b.fin)
    );
  });
}
