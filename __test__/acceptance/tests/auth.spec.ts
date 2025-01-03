import { test, expect } from '@playwright/test';

test.use({
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
});

test.describe('Authentication', () => {
    test('can register, sign out, and sign in', async ({ page }) => {
        const uniqueId = Date.now();
        const testEmail = `test-${uniqueId}@example.com`;
        const testPassword = 'password123';

        // Register new account
        await page.goto('/');
        await page.getByRole('tab', { name: /register/i }).click();
        await page.getByLabel(/email/i).fill(testEmail);
        await page.getByLabel(/password/i).fill(testPassword);
        await page.getByRole('button', { name: /create account/i }).click();
        await expect(page).toHaveURL('/account');
        await expect(page.getByText(testEmail)).toBeVisible();

        // Sign out
        await page.getByRole('button', { name: /sign out/i }).click();
        await expect(page).toHaveURL('/');

        // Sign in with same account
        await page.getByRole('tab', { name: /sign in/i }).click();
        await page.getByLabel(/email/i).fill(testEmail);
        await page.getByLabel(/password/i).fill(testPassword);
        await page.getByRole('button', { name: /sign in/i }).click();
        await expect(page).toHaveURL('/account');
        await expect(page.getByText(testEmail)).toBeVisible();
    });
}); 