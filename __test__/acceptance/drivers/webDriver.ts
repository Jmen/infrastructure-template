import { expect, Page, type Browser } from '@playwright/test';
import { ITestDriver } from './ITestDriver';

export interface WebContext {
    page: Page;
}

export class PlaywrightWebDriver implements ITestDriver {
    constructor(private readonly browser: Browser) {
        this.browser = browser;
    }

    auth = {
        register: async (email: string, password: string) => {

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

        signIn: async (email: string, password: string) => {
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

        signOut: async (context: WebContext) => {
            const { page } = context;
            await page.getByRole('button', { name: /sign out/i }).click();

            await expect(page).toHaveURL('/');
        }
    };
} 