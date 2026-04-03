import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
});
test('loads the home page with correct title', async ({ page }) => {
    const title = await page.title();
    const bodyText = await page.locator('body').innerText();
    const hasContent = title.includes('Cade') || title.includes('ItsKDBB') || bodyText.includes('Cade Wilkinson');
    expect(hasContent).toBe(true);
});
test('hero section is visible with name', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Cade Wilkinson' });
    await expect(heading).toBeVisible();
});
test('navigation is visible', async ({ page }) => {
    const nav = page.getByRole('banner');
    await expect(nav).toBeVisible();
});
test('gallery section is present', async ({ page }) => {
    const gallery = page.locator('#gallery');
    await expect(gallery).toBeVisible();
});
test('contact section is present', async ({ page }) => {
    const contact = page.locator('#contact');
    await expect(contact).toBeVisible();
});
test('contact form has required fields', async ({ page }) => {
    const nameInput = page.locator('#contact-name');
    const emailInput = page.locator('#contact-email');
    const messageInput = page.locator('#contact-message');
    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(messageInput).toBeVisible();
});
test('social links are present', async ({ page }) => {
    const instagramLink = page.locator('a[href*="instagram.com"]').first();
    await expect(instagramLink).toBeVisible();
});
