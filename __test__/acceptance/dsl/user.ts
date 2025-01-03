import { ITestDriver } from '../drivers/ITestDriver';

export class User {
    private constructor(
        private readonly driver: ITestDriver,
        public readonly email: string = `test-${Date.now()}@example.com`,
        public readonly password: string = 'password123',
    ) {}

    static async register(driver: ITestDriver): Promise<User> {
        const user = new User(driver);

        await driver.auth.register(user.email, user.password);
        
        return user;
    }

    async signIn() {
        await this.driver.auth.signIn(this.email, this.password);
    }

    async signOut() {
        await this.driver.auth.signOut();
    }
} 