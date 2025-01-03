import { ITestDriver } from './ITestDriver';

export class ApiDriver implements ITestDriver {
    private readonly baseUrl: string;
    private accessToken?: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    auth = {
        register: async (email: string, password: string) => {
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

            this.accessToken = data.accessToken;
        },

        signIn: async (email: string, password: string) => {
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

            this.accessToken = data.accessToken;
        },

        signOut: async () => {
            if (!this.accessToken) {
                throw new Error('Not signed in');
            }

            const response = await fetch(`${this.baseUrl}/api/auth/sign-out`, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${this.accessToken}`
                }
            });

            if (!response.ok) {
                throw new Error(`Sign out failed: ${response.statusText}`);
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            this.accessToken = undefined;
        }
    };
} 