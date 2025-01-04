import { ITestDriver } from './ITestDriver';

export interface ApiContext {
    accessToken?: string;
    refreshToken?: string;
}

export class ApiDriver implements ITestDriver {
    constructor(private readonly baseUrl: string) {}

    checkResponse(request: any, response: Response, data: any) {
        if (!response.ok || data.error) {
            console.log(`request: ${JSON.stringify(request)}`);
            console.error(`response status: ${response.status}`);
            console.error(`response data: ${JSON.stringify(data)}`);
            throw new Error(data.error);
        }
    }

    auth = {
        register: async (email: string, password: string): Promise<ApiContext> => {
            const response = await fetch(`${this.baseUrl}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            
            this.checkResponse({ email, password }, response, data);

            return { accessToken: data.accessToken, refreshToken: data.refreshToken };
        },

        signIn: async (email: string, password: string): Promise<ApiContext> => {
            const response = await fetch(`${this.baseUrl}/api/auth/sign-in`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            
            this.checkResponse({ email, password }, response, data);

            return { accessToken: data.accessToken, refreshToken: data.refreshToken };
        },

        signInIsUnauthorized: async (email: string, password: string): Promise<void> => {
            const response = await fetch(`${this.baseUrl}/api/auth/sign-in`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (response.status !== 400) {
                throw new Error(`Expected 400 status, got ${response.status}`);
            }
        },

        signOut: async (context: ApiContext): Promise<void> => {
            const response = await fetch(`${this.baseUrl}/api/auth/sign-out`, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${context.accessToken}`
                }
            });

            const data = await response.json();
            
            this.checkResponse({ accessToken: context.accessToken }, response, data);
        },

        resetPassword: async (context: ApiContext, newPassword: string): Promise<void> => {
            const response = await fetch(`${this.baseUrl}/api/auth/reset-password`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${context.accessToken}`,
                    'Content-Type': 'application/json',
                    'X-Refresh-Token': context.refreshToken || ''
                },
                body: JSON.stringify({ password: newPassword })
            });

            const data = await response.json();
            
            this.checkResponse({ accessToken: context.accessToken, password: newPassword }, response, data);
        }
    };
} 