import { test, expect } from '@playwright/test';

test('usuario puede iniciar sesión correctamente', async ({ page }) => {

  // abrir app
  await page.goto('http://localhost:5173');

  // verificar pantalla login
  await expect(
    page.getByText('StudyFlow')
  ).toBeVisible();

  // completar email
  await page.getByPlaceholder('Email').fill('test@studyflow.com');

  // completar password
  await page.getByPlaceholder('Contraseña').fill('12345678');

  // click login
  await page.getByText('Login').click();

  // verificar que entró
  await expect(
    page.getByText('¡Bienvenido/a a tu admin de tareas!')
  ).toBeVisible();
});