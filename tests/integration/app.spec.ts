import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000');
});

test('loads the home page', async ({ page }) => {
  const title = await page.title();
  const bodyText = await page.locator('body').innerText();
  const hasItsKDBB = title.includes('ItsKDBB') || bodyText.includes('ItsKDBB');
  expect(hasItsKDBB).toBe(true);
});

test('hero section is visible', async ({ page }) => {
  const heading = page.getByRole('heading', { name: 'Model. Creator. Aesthetic obsessive.' });
  await expect(heading).toBeVisible();
});

test('tabs are visible', async ({ page }) => {
  const nav = page.getByRole('navigation');
  await expect(nav.getByRole('button', { name: 'Home' })).toBeVisible();
  await expect(nav.getByRole('button', { name: 'Links' })).toBeVisible();
  await expect(nav.getByRole('button', { name: 'Portfolio' })).toBeVisible();
  await expect(nav.getByRole('button', { name: 'Posts & Users' })).toBeVisible();
});

test('links tab shows links hub', async ({ page }) => {
  await page.getByRole('button', { name: 'Links' }).click();
  await expect(page.getByRole('heading', { name: 'Find me everywhere' })).toBeVisible();
  // At least one link item should be rendered
  const linkItems = page.locator('a[href]');
  await expect(linkItems.first()).toBeVisible();
});

test('portfolio tab shows portfolio grid', async ({ page }) => {
  await page.getByRole('button', { name: 'Portfolio' }).click();
  await expect(page.getByText('Luxury Lingerie Campaign')).toBeVisible();
});

test('posts tab shows API data', async ({ page }) => {
  await page.getByRole('button', { name: 'Posts & Users' }).click();
  // Wait for API data to load and check for the seed user handle
  await expect(page.getByText('@itskdbb')).toBeVisible({ timeout: 10000 });
});
