import { expect, Page, type Browser } from '@playwright/test';
import { ITestDriver } from './ITestDriver';

export interface WebContext {
    page: Page;
}

export class PlaywrightWebDriver implements ITestDriver {
    constructor(private readonly browser: Browser) {}

    auth = {
        register: async (email: string, password: string): Promise<WebContext> => {
            const page = await this.browser.newPage();

            await page.goto('/');
            await page.getByRole('tab', { name: /register/i }).click();
            await page.getByLabel(/email/i).fill(email);
            await page.getByLabel(/password/i).fill(password);
            await page.getByRole('button', { name: /create account/i }).click();

            await expect(page).toHaveURL('/account');
            await expect(page.getByText(email)).toBeVisible();

            return { page };
        },

        signIn: async (email: string, password: string): Promise<WebContext> => {
            const page = await this.browser.newPage();

            await page.goto('/');
            await page.getByRole('tab', { name: /sign in/i }).click();
            await page.getByLabel(/email/i).fill(email);
            await page.getByLabel(/password/i).fill(password);
            await page.getByRole('button', { name: /sign in/i }).click();

            await expect(page).toHaveURL('/account');
            await expect(page.getByText(email)).toBeVisible();

            return { page };
        },

        signInIsUnauthorized: async (email: string, password: string): Promise<void> => {
            const page = await this.browser.newPage();

            await page.goto('/');
            await page.getByRole('tab', { name: /sign in/i }).click();
            await page.getByLabel(/email/i).fill(email);
            await page.getByLabel(/password/i).fill(password);
            await page.getByRole('button', { name: /sign in/i }).click();

            await expect(page.getByText(/invalid/i)).toBeVisible();
        },

        signOut: async (context: WebContext): Promise<void> => {
            const { page } = context;
            await page.getByRole('button', { name: /sign out/i }).click();
            await expect(page).toHaveURL('/');
        },

        resetPassword: async (context: WebContext, newPassword: string): Promise<void> => {
            const { page } = context;
            await page.goto('/account');
            await page.getByLabel(/new password/i).fill(newPassword);
            await page.getByLabel(/confirm password/i).fill(newPassword);
            await page.getByRole('button', { name: /reset password/i }).click();
        }
    };
} 