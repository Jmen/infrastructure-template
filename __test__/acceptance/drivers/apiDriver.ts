import { ITestDriver } from './ITestDriver';

export interface ApiContext {
    token?: string;
}

export class ApiDriver implements ITestDriver {
    constructor(private readonly baseUrl: string) {}

    auth = {
        register: async (email: string, password: string): Promise<ApiContext> => {
            const response = await fetch(`${this.baseUrl}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error(`Registration failed: ${response.statusText}`);
            }

            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }

            return { token: data.accessToken }
        },

        signIn: async (email: string, password: string): Promise<ApiContext> => {
            const response = await fetch(`${this.baseUrl}/api/auth/sign-in`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error(`Sign in failed: ${response.statusText}`);
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            return { token: data.accessToken }
        },

        signOut: async (context: ApiContext): Promise<void> => {
            const response = await fetch(`${this.baseUrl}/api/auth/sign-out`, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${context.token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Sign out failed: ${response.statusText}`);
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            context.token = undefined;
        }
    };
} 