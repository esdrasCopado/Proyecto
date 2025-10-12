-- First, let's see what values currently exist
SELECT DISTINCT rol FROM artista_evento;

-- Update any invalid values to match the enum
-- Assuming the current value might be something like 'invitado', 'headliner', etc.
-- Map them to the correct ENUM values

UPDATE artista_evento
SET rol = 'INVITADO'
WHERE rol NOT IN ('HEADLINER', 'TELONERO', 'INVITADO', 'COLABORADOR')
   OR rol IS NULL;
