import { ITestDriver, Context } from '../drivers/ITestDriver';

export class User {
    private constructor(
        private readonly driver: ITestDriver,
        private context: Context,
        private readonly email: string,
        private readonly password: string,
    ) {}

    static async register(driver: ITestDriver): Promise<User> {
        const email = `test-${Date.now()}@example.com`;
        const password = 'password123';

        const context = await driver.auth.register(email, password);

        return new User(driver, context, email, password);
    }

    async signIn() {
        this.context = await this.driver.auth.signIn(this.email, this.password);
    }

    async signOut() {
        await this.driver.auth.signOut(this.context);
    }
} 