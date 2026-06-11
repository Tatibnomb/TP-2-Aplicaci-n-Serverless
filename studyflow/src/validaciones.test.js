import { describe, test, expect } from 'vitest';
import { validarTituloTarea } from './validaciones';

describe('Pruebas unitarias de validación para Tareas', () => {

  // TEST UNITARIO 1: Si funciona
  test('Debería aceptar un título de tarea válido y normal', () => {
    const resultado = validarTituloTarea('Estudiar para el parcial de DevOps');
    expect(resultado).toBe(true);
  });

  // TEST UNITARIO 2: Si NO funciona
  test('Debería rechazar un título vacío o que solo contenga espacios', () => {
    const resultadoFalso = validarTituloTarea('     ');
    expect(resultadoFalso).toBe(false);
  });

  // TEST EXTRA: Límite de caracteres
  test('Debería rechazar un título exageradamente largo (mayor a 100 caracteres)', () => {
    const textoLargo = 'a'.repeat(101);
    const resultadoFalso = validarTituloTarea(textoLargo);
    expect(resultadoFalso).toBe(false);
  });

});