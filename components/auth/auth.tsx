import React from "react";
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { SignInForm } from "@/components/auth/signInForm";
import { RegisterForm } from "@/components/auth/registerForm";

export function Auth() {
    return (
        <Tabs defaultValue="sign-in" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="sign-in">Sign In</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="sign-in">
                <Card>
                    <CardContent className="pt-6">
                        <SignInForm/>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="register">
                <Card>
                    <CardContent className="pt-6">
                        <RegisterForm/>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
