export interface ITestDriver {
    auth: {
        register(email: string, password: string): Promise<void>;
        signIn(email: string, password: string): Promise<void>;
        signOut(): Promise<void>;
    };
} 