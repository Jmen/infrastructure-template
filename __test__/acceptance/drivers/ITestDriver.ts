import { ApiContext } from "./apiDriver";
import { WebContext } from "./webDriver";

export type Context = ApiContext | WebContext;

export interface ITestDriver {
    auth: {
        register(email: string, password: string): Promise<Context>;
        signIn(email: string, password: string): Promise<Context>;
        signInIsUnauthorized(email: string, password: string): Promise<void>;
        signOut(context: Context): Promise<void>;
        resetPassword(context: Context, newPassword: string): Promise<void>;
    };
} 