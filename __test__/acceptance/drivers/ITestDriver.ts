import { ApiContext } from "./apiDriver";
import { WebContext } from "./webDriver";

export type Context = ApiContext | WebContext;

export interface ITestDriver {
    auth: {
        register(email: string, password: string): Promise<Context>;
        signIn(email: string, password: string): Promise<Context>;
        signOut(context: Context): Promise<void>;
    };
} 