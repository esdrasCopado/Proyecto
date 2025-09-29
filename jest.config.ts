module.exports = {
  // Usar ts-jest para TypeScript
  preset: 'ts-jest',
  
  // Entorno Node.js
  testEnvironment: 'node',
  
  // Directorios donde buscar tests
  roots: ['<rootDir>/src', '<rootDir>/test'],
  
  // Patrones para encontrar archivos de test
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/?(*.)+(spec|test).ts'
  ],
  
  // Transformar archivos TypeScript
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  
  // Archivos a incluir en coverage
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/*.interface.ts',
  ],
  
  // Alias de paths (igual que en tsconfig.json)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  
  // Timeout para tests (útil para BD)
  testTimeout: 10000,
  
  // Mostrar información detallada
  verbose: true,
  
  // Setup antes de ejecutar tests
  setupFilesAfterEnv: ['<rootDir>/test/setups.ts'],
};