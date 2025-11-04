/**
 * Schemas de Swagger para el modelo Song
 */

export const songSchemas = {
  Song: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID único de la canción',
        example: 1,
      },
      fontImageUrl: {
        type: 'string',
        description: 'URL de la imagen de la canción',
        maxLength: 500,
        example: '/uploads/songs/cancion-123.jpg',
      },
      videoUrl: {
        type: 'string',
        description: 'URL del video de la canción (opcional)',
        maxLength: 500,
        example: 'https://youtube.com/watch?v=abc123',
        nullable: true,
      },
      titulo: {
        type: 'string',
        description: 'Título de la canción',
        maxLength: 200,
        example: 'Cómo Te Voy a Olvidar',
      },
      duracion: {
        type: 'integer',
        description: 'Duración de la canción en segundos',
        example: 245,
        minimum: 1,
        maximum: 7200,
      },
      albumId: {
        type: 'integer',
        description: 'ID del álbum al que pertenece la canción',
        example: 1,
      },
    },
  },

  SongCreate: {
    type: 'object',
    required: ['fontImageUrl', 'titulo', 'duracion', 'albumId'],
    properties: {
      fontImageUrl: {
        type: 'string',
        minLength: 1,
        maxLength: 500,
        description: 'URL de la imagen de la canción',
        example: '/uploads/songs/cancion-123.jpg',
      },
      videoUrl: {
        type: 'string',
        maxLength: 500,
        description: 'URL del video de la canción (opcional)',
        example: 'https://youtube.com/watch?v=abc123',
      },
      titulo: {
        type: 'string',
        minLength: 1,
        maxLength: 200,
        description: 'Título de la canción',
        example: 'Cómo Te Voy a Olvidar',
      },
      duracion: {
        type: 'integer',
        minimum: 1,
        maximum: 7200,
        description: 'Duración de la canción en segundos',
        example: 245,
      },
      albumId: {
        type: 'integer',
        minimum: 1,
        description: 'ID del álbum al que pertenece la canción',
        example: 1,
      },
    },
  },

  SongUpdate: {
    type: 'object',
    properties: {
      fontImageUrl: {
        type: 'string',
        minLength: 1,
        maxLength: 500,
        description: 'URL de la imagen de la canción',
        example: '/uploads/songs/nueva-imagen-123.jpg',
      },
      videoUrl: {
        type: 'string',
        maxLength: 500,
        description: 'URL del video de la canción (null para eliminar)',
        example: 'https://youtube.com/watch?v=xyz789',
        nullable: true,
      },
      titulo: {
        type: 'string',
        minLength: 1,
        maxLength: 200,
        description: 'Título de la canción',
        example: 'Cómo Te Voy a Olvidar (Remix)',
      },
      duracion: {
        type: 'integer',
        minimum: 1,
        maximum: 7200,
        description: 'Duración de la canción en segundos',
        example: 280,
      },
      albumId: {
        type: 'integer',
        minimum: 1,
        description: 'ID del álbum al que pertenece la canción',
        example: 2,
      },
    },
  },
};
