import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {

await page.goto('http://localhost:3000')
await expect(page).toHaveTitle('Choose a Credential | The Gadget');
});

test('opens login page when not logged in', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Click the Summit Presenter link
  await page.getByRole('link', { name: '' }).click();

  await expect(page.getByText('Please log in to issue some credentials.')).toBeVisible();


});

test('logs in', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  //const username = page.getByTestId

  await page.getByLabel('Email').fill('chartraj@mit.edu');
  await page.getByLabel('Password').fill('thelake');

  await page.getByRole('button', { name: 'Log in' }).click();

 await expect(page).toHaveTitle('Choose a Credential | The Gadget');
 await expect(page.getByText('Choose a credential to issue')).toBeVisible();
 await expect(page.getByRole('link', { name: 'DCC Summit Presenter' })).toBeVisible();
});

//  await expect(page.getByRole('heading', { name: 'DCC Summit Presenter Badge' })).toBeVisible();


/* make a test that creates a cred
  - add email and person name, and click Button.
  - should then be able to make the collection url with getDeepLink, by hand, and submit to get taken
  to the collection page and then from there pull out the deeplink, hand build the didAuth and submit
  to confirm that the VC is returned. */