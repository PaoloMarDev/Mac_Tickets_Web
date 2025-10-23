-- Sección 1: Configuración inicial de la base de datos
-- Este comando crea la base de datos si no existe.
-- Se usa la codificación utf8mb4 para soportar una amplia variedad de caracteres, incluyendo emojis.
CREATE DATABASE IF NOT EXISTS estdo_tickets
DEFAULT CHARACTER SET utf8mb4
DEFAULT COLLATE utf8mb4_0900_ai_ci;

-- Este comando le indica a MySQL Workbench que use la base de datos `estdo_tickets`
-- para todas las operaciones subsiguientes.
USE estdo_tickets;

---
-- Sección 2: Creación de la tabla `users`
-- Propósito: Almacena la información de todos los usuarios del sistema (Administradores, Mesa de Trabajo y Técnicos).
-- Es la tabla central para la autenticación y la gestión de permisos.
CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT, -- Identificador único para cada usuario.
  username VARCHAR(255) NOT NULL,
  email VARCHAR(191) NOT NULL UNIQUE,             -- Correo electrónico del usuario, se usa como nombre de usuario y debe ser único.
  password VARCHAR(255) NOT NULL,            -- Almacena el hash de la contraseña (nunca la contraseña en texto plano).
  role ENUM('ADMIN','MESA','TECNICO') NOT NULL,  -- El rol del usuario define sus permisos en el sistema.
  is_active BOOL DEFAULT TRUE, -- Bandera para habilitar/deshabilitar usuarios sin eliminarlos.
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP -- Fecha y hora de creación del registro de usuario.
) ENGINE=InnoDB;

-- Sección 3: Creación de la tabla `tickets`
-- Propósito: Almacena todos los tickets de servicio creados en el sistema.
-- Es el corazón de la aplicación, conteniendo toda la información sobre cada caso.
CREATE TABLE IF NOT EXISTS tickets (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,    -- Identificador único para cada ticket.
  title VARCHAR(150) NOT NULL,                      -- Título descriptivo del problema o solicitud (requerimiento HU-19).
  description TEXT NOT NULL,                        -- Descripción detallada del problema (requerimiento HU-19).
  category ENUM('SOFTWARE','HARDWARE','REDES','OTRO') NOT NULL,    -- **MODIFICADO:** Categoría del ticket. Se usa un `ENUM` para estandarizar las opciones (requerimiento HU-06).
  priority ENUM('ALTA','MEDIA','BAJA') NOT NULL DEFAULT 'MEDIA', -- Prioridad del ticket, útil para la gestión y filtrado (requerimiento HU-06).
  status  ENUM('ABIERTO','EN_PROCESO','CERRADO','RECHAZADO','REABIERTO') NOT NULL DEFAULT 'ABIERTO', -- **MODIFICADO:** Estado actual del ticket. Se agregaron estados para una mejor trazabilidad (requerimiento HU-12, HU-08, RF: 16).
  created_by BIGINT UNSIGNED NOT NULL,              -- ID del usuario de Mesa de Trabajo que creó el ticket (requerimiento HU-19).
  assigned_to BIGINT UNSIGNED NULL,                 -- ID del técnico al que se le asignó el ticket. Es `NULL` si aún no está asignado (requerimiento HU-23).
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- Fecha y hora de creación del ticket.
  is_active BOOL DEFAULT TRUE,
  acepted BOOL DEFAULT 0,
 
  CONSTRAINT fk_tickets_created_by
    FOREIGN KEY (created_by) REFERENCES users(id) -- Clave foránea que enlaza el creador con la tabla `users`.
    ON UPDATE CASCADE ON DELETE RESTRICT,         -- Si el ID del creador cambia, se actualiza. No se permite eliminar al usuario si tiene tickets creados.

  CONSTRAINT fk_tickets_assigned_to
    FOREIGN KEY (assigned_to) REFERENCES users(id) -- Clave foránea que enlaza el asignado con la tabla `users`.
    ON UPDATE CASCADE ON DELETE SET NULL,          -- Si el técnico se elimina, la asignación se pone en `NULL`.

  INDEX idx_tickets_status (status),               -- Índice para optimizar consultas por estado.
  INDEX idx_tickets_priority (priority),           -- Índice para optimizar consultas por prioridad.
  INDEX idx_tickets_assigned (assigned_to),        -- Índice para encontrar tickets asignados a un técnico rápidamente (requerimiento HU-13).
  INDEX idx_tickets_created_by (created_by)      -- Índice para encontrar tickets creados por un usuario de mesa.
) ENGINE=InnoDB;

---

-- Sección 4: Creación de la tabla `ticket_messages`
-- Propósito: Almacena los comentarios y la comunicación entre la Mesa de Trabajo y los Técnicos.
-- Funciona como un chat interno para cada ticket (requerimiento HU-20).
CREATE TABLE IF NOT EXISTS ticket_messages (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,    -- Identificador único para cada mensaje.
  ticket_id BIGINT UNSIGNED NOT NULL,               -- ID del ticket al que pertenece este mensaje.
  sender_user_id BIGINT UNSIGNED NOT NULL,          -- ID del usuario que envió el mensaje.
  body TEXT NOT NULL,                               -- Contenido del mensaje.
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- Fecha y hora del envío del mensaje.

  CONSTRAINT fk_msgs_ticket
    FOREIGN KEY (ticket_id) REFERENCES tickets(id)      -- Enlaza el mensaje al ticket.
    ON UPDATE CASCADE ON DELETE CASCADE,                -- Si el ticket se elimina, todos sus mensajes también.

  CONSTRAINT fk_msgs_sender
    FOREIGN KEY (sender_user_id) REFERENCES users(id) -- Enlaza el remitente con la tabla `users`.
    ON UPDATE CASCADE ON DELETE RESTRICT,               -- No se puede eliminar a un usuario que ha enviado mensajes.

  INDEX idx_msgs_ticket (ticket_id),                -- Índice para buscar rápidamente los mensajes de un ticket.
  INDEX idx_msgs_sender (sender_user_id)            -- Índice para encontrar mensajes enviados por un usuario.
) ENGINE=InnoDB;

-- Sección 5: Creación de la tabla `notifications`
-- Propósito: Almacena las notificaciones para los usuarios.
-- Esto permite que los usuarios sean alertados sobre cambios relevantes en los tickets en los que están involucrados (requerimiento HU-02).
CREATE TABLE IF NOT EXISTS notifications (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,    -- Identificador único para cada notificación.
  user_id BIGINT UNSIGNED NOT NULL,               -- ID del usuario que recibe la notificación.
  type ENUM('TICKET_CREATED','TICKET_UPDATED','NEW_MESSAGE','TICKET_REJECTED','TICKET_REASSIGNED') NOT NULL, -- **MODIFICADO:** Tipo de notificación. Se agregaron tipos para un manejo más específico (requerimiento RF: 2, RF: 7, RF: 16).
  data JSON NULL,                                   -- Campo JSON opcional para almacenar datos adicionales de la notificación.
  is_read TINYINT(1) NOT NULL DEFAULT 0,            -- Bandera para saber si la notificación ha sido leída.
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Fecha y hora de creación de la notificación.

  CONSTRAINT fk_notifications_user
    FOREIGN KEY (user_id) REFERENCES users(id)      -- Enlaza la notificación con el usuario que la recibe.
    ON UPDATE CASCADE ON DELETE CASCADE,            -- Si el usuario se elimina, todas sus notificaciones también.

  INDEX idx_notifications_user (user_id, is_read), -- Índice compuesto para consultar rápidamente las notificaciones no leídas de un usuario.
  INDEX idx_notifications_type (type)               -- Índice para consultar notificaciones por tipo.
) ENGINE=InnoDB;

---

-- Sección 6: Creación de la tabla `ticket_attachments`
-- Propósito: Almacena las referencias a los archivos adjuntos a los tickets (imágenes, PDFs, etc.).
-- Se requiere una tabla separada porque un ticket puede tener muchos archivos (relación uno a muchos).
CREATE TABLE IF NOT EXISTS ticket_attachments (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT, -- Identificador único para cada archivo.
  ticket_id BIGINT UNSIGNED NOT NULL,            -- ID del ticket al que pertenece el archivo (requerimiento HU-14, RF: 15).
  file_path VARCHAR(255) NOT NULL,               -- La ruta en el servidor donde está guardado el archivo.
  file_type VARCHAR(50) NULL,                    -- Tipo de archivo (ej. `image/png`, `application/pdf`).
  uploaded_by BIGINT UNSIGNED NOT NULL,          -- ID del usuario que subió el archivo.
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Fecha y hora de la subida.

  CONSTRAINT fk_attachments_ticket
    FOREIGN KEY (ticket_id) REFERENCES tickets(id) -- Enlaza el archivo al ticket.
    ON UPDATE CASCADE ON DELETE CASCADE,           -- Si el ticket se elimina, sus archivos adjuntos también.

  CONSTRAINT fk_attachments_user
    FOREIGN KEY (uploaded_by) REFERENCES users(id) -- Enlaza el que subió el archivo con la tabla `users`.
    ON UPDATE CASCADE ON DELETE RESTRICT             -- No se permite eliminar al usuario si ha subido archivos.
) ENGINE=InnoDB;

CREATE TABLE file(
	id INT AUTO_INCREMENT,
    name VARCHAR(100),
    size DOUBLE,
    mimetype VARCHAR(100),
    data MEDIUMBLOB,
    PRIMARY KEY(id)
);


-- Aqui es para ingresar valores y veas que guarda si quieres modificar cosas adelante 
-- Usar la base de datos correcta
USE estdo_tickets;

-- Sección 1: Inserción de Usuarios
-- Propósito: Crear un usuario para cada rol definido en el sistema.
-- Nota: En una aplicación real, el 'password_hash' sería generado
-- por un algoritmo seguro (como bcrypt), aquí es solo un texto de ejemplo.
-- Asumimos que los IDs serán 1 (admin), 2 (mesa) y 3 (tecnico).
INSERT INTO `users` (`username`, `email`, `password`, `role`) VALUES
('Admin1', 'admin@sistem.com', SHA2('contrasena_123', 224), 'ADMIN'),
('Mesa1', 'mesa@sistema.com', SHA2('contrasena_0000', 224), 'MESA'),
('Tecnico1', 'tecnico@sistema.com', SHA2('contrasena_80082', 224), 'TECNICO');

INSERT INTO `users` (`username`, `email`, `password`, `role`) VALUES
('tecnico2', 'tecnico2@sistema.com', SHA2('contrasena', 224), 'TECNICO');
-- Sección 2: Inserción de Tickets
-- Propósito: Crear tickets que simulen diferentes escenarios.
-- - Un ticket EN PROCESO asignado al técnico.
-- - Un ticket CERRADO y resuelto por el técnico.
-- - Un ticket ABIERTO esperando asignación.
-- Los tickets son creados por el usuario de Mesa de Trabajo (ID: 2)
-- y asignados al Técnico (ID: 3), cumpliendo con la historia de usuario HU-19.

INSERT INTO `tickets` (`title`, `description`, `category`, `priority`, `status`, `created_by`, `assigned_to`) VALUES
('Falla en impresora de contabilidad', 'La impresora HP LaserJet Pro M404dn no enciende y marca un error de atasco, pero no hay papel visiblemente atascado.', 'HARDWARE', 'ALTA', 'EN_PROCESO', 2, 3),
('Instalación de software de diseño', 'Se necesita instalar la suite de Adobe Creative Cloud en el equipo nuevo del área de marketing. La licencia ya está disponible.', 'SOFTWARE', 'MEDIA', 'CERRADO', 2, 3),
('Problema de conexión a la red WiFi', 'Varios usuarios del área de ventas reportan intermitencia en la conexión WiFi. La señal aparece y desaparece constantemente.', 'REDES', 'MEDIA', 'ABIERTO', 2, 1);

INSERT INTO `tickets` (`title`, `description`, `category`, `priority`, `status`, `created_by`, `assigned_to`) VALUES
('Instalación de software de diseño', 'Se necesita instalar la suite de Adobe Creative Cloud en el equipo nuevo del área de marketing. La licencia ya está disponible.', 'SOFTWARE', 'MEDIA', 'CERRADO', 2, 3);


-- Sección 3: Inserción de Mensajes en Tickets
-- Propósito: Simular la comunicación entre Mesa de Trabajo y el Técnico.
-- Esto cumple con la historia de usuario HU-20.
INSERT INTO `ticket_messages` (`ticket_id`, `sender_user_id`, `body`) VALUES
(1, 2, 'Hola, te asigné este ticket. Es urgente, por favor revisa la impresora de contabilidad lo antes posible.'),
(1, 3, 'Recibido. Estoy terminando una tarea y voy para allá en 15 minutos. Saludos.'),
(2, 2, 'Te asigno este ticket para la instalación de Adobe. No es urgente, puedes programarlo para hoy o mañana.');

-- Sección 4: Inserción de Notificaciones
-- Propósito: Simular las notificaciones que recibirían los usuarios
-- ante cambios en los tickets, como lo pide la HU-02.
INSERT INTO `notifications` (`user_id`, `type`, `data`, `is_read`) VALUES
(3, 'TICKET_CREATED', '{ "ticket_id": 1, "title": "Falla en impresora de contabilidad" }', 0), -- Notificación al técnico de nuevo ticket
(2, 'TICKET_UPDATED', '{ "ticket_id": 2, "new_status": "CERRADO" }', 1); -- Notificación a Mesa de que el ticket fue cerrado

-- Sección 5: Inserción de Archivos Adjuntos
-- Propósito: Simular la subida de evidencia por parte del técnico.
-- Esto cumple con las historias de usuario HU-14 y HU-17.
-- Nota: 'file_path' es una ruta simulada a donde se guardaría el archivo en el servidor.
INSERT INTO `ticket_attachments` (`ticket_id`, `file_path`, `file_type`, `uploaded_by`) VALUES
(2, '/uploads/tickets/evidencia_adobe_install_1695494400.jpg', 'image/jpeg', 3); -- El técnico (ID 3) sube una foto como evidencia para el ticket cerrado (ID 2).

-- Coso trigger para las notificaciones

DELIMITER $$

CREATE TRIGGER trg_after_ticket_insert
AFTER INSERT ON tickets
FOR EACH ROW
BEGIN
    DECLARE recipient_id BIGINT UNSIGNED;

    -- Si el ticket fue asignado, la notificación será para el técnico asignado
    IF NEW.assigned_to IS NOT NULL THEN
        SET recipient_id = NEW.assigned_to;
    ELSE
        -- Si no hay técnico asignado, la notificación será para el creador
        SET recipient_id = NEW.created_by;
    END IF;

    -- Inserta una notificación del tipo TICKET_CREATED
    INSERT INTO notifications (user_id, type, data, is_read, created_at)
    VALUES (
        recipient_id,
        'TICKET_CREATED',
        JSON_OBJECT(
            'ticket_id', NEW.id,
            'title', NEW.title,
            'priority', NEW.priority,
            'status', NEW.status,
            'created_by', NEW.created_by,
            'assigned_to', NEW.assigned_to
        ),
        0,
        NOW()
    );
END$$

DELIMITER ;





DELIMITER $$

CREATE TRIGGER trg_after_message_insert
AFTER INSERT ON ticket_messages
FOR EACH ROW
BEGIN
    DECLARE recipient_id BIGINT UNSIGNED;

    -- Buscar los datos del ticket relacionado
    DECLARE ticket_creator BIGINT UNSIGNED;
    DECLARE ticket_assigned BIGINT UNSIGNED;

    SELECT created_by, assigned_to
    INTO ticket_creator, ticket_assigned
    FROM tickets
    WHERE id = NEW.ticket_id;

    -- Determinar quién debe recibir la notificación:
    -- Si el mensaje lo envió el creador, se notifica al técnico asignado
    -- Si lo envió el técnico, se notifica al creador
    IF NEW.sender_user_id = ticket_creator THEN
        SET recipient_id = ticket_assigned;
    ELSE
        SET recipient_id = ticket_creator;
    END IF;

    -- Solo insertar si hay destinatario válido (por ejemplo, el ticket aún asignado)
    IF recipient_id IS NOT NULL THEN
        INSERT INTO notifications (user_id, type, data, is_read, created_at)
        VALUES (
            recipient_id,
            'NEW_MESSAGE',
            JSON_OBJECT(
                'ticket_id', NEW.ticket_id,
                'message_id', NEW.id,
                'sender_user_id', NEW.sender_user_id,
                'message', 'Se agregó un nuevo mensaje en tu ticket'
            ),
            0,
            NOW()
        );
    END IF;
END$$

DELIMITER ;

ALTER TABLE ticket_messages
ADD COLUMN file_id INT NULL,
ADD CONSTRAINT fk_msgs_file
  FOREIGN KEY (file_id)
  REFERENCES file(id)
  ON UPDATE CASCADE
  ON DELETE SET NULL;

ALTER TABLE file
ADD COLUMN ticket_id BIGINT UNSIGNED NULL,
ADD COLUMN sender_user_id BIGINT UNSIGNED NULL,
ADD CONSTRAINT fk_file_ticket
  FOREIGN KEY (ticket_id) REFERENCES tickets(id)
  ON UPDATE CASCADE ON DELETE SET NULL,
ADD CONSTRAINT fk_file_sender
  FOREIGN KEY (sender_user_id) REFERENCES users(id)
  ON UPDATE CASCADE ON DELETE SET NULL;
  
  DELIMITER $$

CREATE TRIGGER after_file_insert
AFTER INSERT ON file
FOR EACH ROW
BEGIN
  -- Solo crear mensaje si el archivo tiene ticket_id y sender_user_id
  IF NEW.ticket_id IS NOT NULL AND NEW.sender_user_id IS NOT NULL THEN
    INSERT INTO ticket_messages (ticket_id, sender_user_id, body, file_id)
    VALUES (
      NEW.ticket_id,
      NEW.sender_user_id,
      CONCAT('Se adjuntó el archivo: ', NEW.name),
      NEW.id
    );
  END IF;
END$$

DELIMITER ;



--SELECT t.id as Ticket_ID, title, description, category, priority, status, acepted, t.created_at FROM tickets t JOIN users u ON t.assigned_to = u.id WHERE u.id = 3 and acepted = 1;
--SELECT t.id as Ticket_ID, title, description, category, priority, status, acepted, t.created_at FROM tickets t JOIN users u ON t.assigned_to = u.id WHERE u.id = 3 and acepted = 0;
--SELECT t.id as Ticket_ID, title, description, category, priority, status, acepted, t.created_at FROM tickets t JOIN users u ON t.assigned_to = u.id WHERE u.id = 3;
--
--UPDATE users SET is_active = 1 WHERE id = 4;
--
--SELECT * FROM users;
--SELECT * FROM tickets;
--SELECT * FROM notifications;
--SELECT * FROM files;
--
--SELECT id, role, is_active, created_at FROM users WHERE is_active = 1 AND role = "TECNICO";
--
--UPDATE tickets SET category = "REDES" WHERE id = 4;
--SELECT * FROM tickets;
--SELECT * FROM tickets WHERE status = "CERRADO";
--
--SELECT * FROM ticket_messages;