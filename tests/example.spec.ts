import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
//  await page.goto('https://playwright.dev/');
await page.goto('http://localhost:3000')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Choose a Credential | The Gadget');
});

test('opens login page when not logged in', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Click the Summit Presenter link
  await page.getByRole('link', { name: '' }).click();

   await expect(page.getByText('Please log in to issue some credentials.')).toBeVisible();

  // Expects page to have a heading with the name of Installation.
  //await expect(page.getByRole('heading', { name: 'DCC Summit Presenter Badge' })).toBeVisible();
});
