import { test, type Page } from '@playwright/test';
import { User } from '../dsl/user';
import { PlaywrightWebDriver } from '../drivers/webDriver';
import { ApiDriver } from '../drivers/apiDriver';
import { ITestDriver } from '../drivers/ITestDriver';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.use({
    baseURL: BASE_URL,
});

const createDriver = (page: Page): ITestDriver => {
    switch (process.env.DRIVER?.toLowerCase()) {
        case 'api':
            return new ApiDriver(BASE_URL);
        case 'web':
        default:
            return new PlaywrightWebDriver(page);
    }
};

test.describe('Authentication', () => {
    test('can register, sign out, and sign in', async ({ page }) => {
        const user = await User.register(createDriver(page));

        await user.signOut();
        
        await user.signIn();
    });
}); 