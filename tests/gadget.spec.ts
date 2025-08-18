import { test, expect } from '@playwright/test';

test('landing page has title', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await expect(page).toHaveTitle('Choose a Credential | The Gadget');
});

test('opens login page when not logged in', async ({ page }) => {
  // go to landing page
  await page.goto('http://localhost:3000');
  // Click the Summit Presenter link
  await page.getByRole('link', { name: '' }).click();
  // not yet logged in, so takes us to login page
  await expect(page.getByText('Please log in to issue some credentials.')).toBeVisible();
});

test('logs in', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByLabel('Email').fill('chartraj@mit.edu');
  await page.getByLabel('Password').fill('thelake');
  await page.getByRole('button', { name: 'Log in' }).click();
  // now we should be taken to the landing page
 await expect(page).toHaveTitle('Choose a Credential | The Gadget');
 await expect(page.getByText('Choose a credential to issue')).toBeVisible();
 await expect(page.getByRole('link', { name: 'DCC Summit Presenter' })).toBeVisible();
});

test.describe('issue credential', () => {
  test.beforeEach(async ({ page }) => {
  // login
  await page.goto('http://localhost:3000/login');
  await page.getByLabel('Email').fill('chartraj@mit.edu');
  await page.getByLabel('Password').fill('thelake');
  await page.getByRole('button', { name: 'Log in' }).click();
  });

  test('opens summit form', async ({ page }) => {
    await page.getByTestId('summit-presenter-btn').click()
    await expect(page).toHaveURL('http://localhost:3000/summit-presenter');
  });

  test('issues summit badge', async ({ page }) => {
    await page.getByTestId('summit-presenter-btn').click()
    await page.getByTestId('recipientName').fill('James Chartrand')
    await page.getByTestId('email').fill('jchartrand@mailinator.com')
    await page.getByTestId('submitButton').click()
    await expect(page.getByText('The email has been sent!')).toBeVisible();
  });

});








/* make a test that creates a cred
  - add email and person name, and click Button.
  - should then be able to make the collection url with getDeepLink, by hand, and submit to get taken
  to the collection page and then from there pull out the deeplink, hand build the didAuth and submit
  to confirm that the VC is returned. */