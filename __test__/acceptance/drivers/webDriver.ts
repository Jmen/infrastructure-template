import { expect, type Page } from '@playwright/test';

export interface ITestDriver {
    auth: {
        register(email: string, password: string): Promise<void>;
        signIn(email: string, password: string): Promise<void>;
        signOut(): Promise<void>;
    };
}

export class PlaywrightWebDriver implements ITestDriver {
    constructor(private page: Page) {}

    auth = {
        register: async (email: string, password: string) => {
            await this.page.goto('/');
            await this.page.getByRole('tab', { name: /register/i }).click();
            await this.page.getByLabel(/email/i).fill(email);
            await this.page.getByLabel(/password/i).fill(password);
            await this.page.getByRole('button', { name: /create account/i }).click();
            await expect(this.page).toHaveURL('/account');
            await expect(this.page.getByText(email)).toBeVisible();
        },

        signIn: async (email: string, password: string) => {
            await this.page.goto('/');
            await this.page.getByRole('tab', { name: /sign in/i }).click();
            await this.page.getByLabel(/email/i).fill(email);
            await this.page.getByLabel(/password/i).fill(password);
            await this.page.getByRole('button', { name: /sign in/i }).click();
            await expect(this.page).toHaveURL('/account');
            await expect(this.page.getByText(email)).toBeVisible();
        },

        signOut: async () => {
            await this.page.getByRole('button', { name: /sign out/i }).click();
            await expect(this.page).toHaveURL('/');
        }
    };
} 