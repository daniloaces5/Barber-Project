-- Crear tabla barberos
CREATE TABLE
    barberos (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        specialty VARCHAR(150) NOT NULL,
        rating DECIMAL(2, 1) NOT NULL,
        img TEXT NOT NULL
    );

-- Crear tabla servicios
CREATE TABLE
    servicios (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        duration INTEGER NOT NULL, -- duración en minutos
        price DECIMAL(6, 2) NOT NULL -- precio con dos decimales
    );

-- Crear tabla barbero_servicio
CREATE TABLE
    barbero_servicio (
        id SERIAL PRIMARY KEY,
        barbero_id INTEGER NOT NULL REFERENCES barberos (id) ON DELETE CASCADE,
        servicio_id INTEGER NOT NULL REFERENCES servicios (id) ON DELETE CASCADE
    );

-- Crear tabla reservas
CREATE TABLE
    reservas (
        id SERIAL PRIMARY KEY, -- Identificador único de la reserva
        barbero_id INT NOT NULL, -- A quién se reserva
        servicio_id INT NOT NULL, -- Qué servicio se reserva
        fecha DATE NOT NULL, -- Cuándo se hará
        hora TIME, -- (opcional) hora exacta
        cliente_nombre VARCHAR(100), -- (opcional) nombre del cliente
        email VARCHAR(150), -- Email del cliente
        phone VARCHAR(20), -- Teléfono del cliente
        creado_en TIMESTAMP DEFAULT NOW (), -- Cuándo se creó la reserva
        -- Relaciones
        FOREIGN KEY (barbero_id) REFERENCES barberos (id) ON DELETE CASCADE,
        FOREIGN KEY (servicio_id) REFERENCES servicios (id) ON DELETE CASCADE
    );

-- Ver qué servicios ofrece cada barbero
SELECT
    *
FROM
    servicios s
    JOIN barbero_servicio b ON s.id = b.servicio_id
WHERE
    b.barbero_id = 1;

-- Comando para reiniciar la tabla
TRUNCATE TABLE nombredelatabla RESTART IDENTITY;