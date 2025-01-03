import { test, type Page } from '@playwright/test';
import { User } from '../dsl/user';
import { PlaywrightWebDriver } from '../drivers/webDriver';

test.use({
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
});

const createDriver = (page: Page) => new PlaywrightWebDriver(page);

test.describe('Authentication', () => {
    test('can register, sign out, and sign in', async ({ page }) => {
        const user = await User.register(createDriver(page));

        await user.signOut();
        
        await user.signIn();
    });
}); 