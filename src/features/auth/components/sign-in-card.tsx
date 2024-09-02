import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from "react-icons/fa"
import { authFlow } from "../types"

interface SignInCardProps {
    setState: (state: authFlow) => void
}

const SignInCard = ({ setState }: SignInCardProps) => {
    return (
        <Card className="w-full h-full p-8">
            <CardHeader>
                <CardTitle>Login to continue</CardTitle>
                <CardDescription className="px-0 pt-0">
                    Use your email or another service
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 px-0 pb-0">
                <form className="space-y-2.5">
                    <Input
                        disabled={false}
                        value={""}
                        onChange={() => { }}
                        placeholder="Email"
                        type="email"
                        required
                    />
                    <Input
                        disabled={false}
                        value={""}
                        onChange={() => { }}
                        placeholder="Password"
                        type="password"
                        required
                    />
                    <Button type="submit" className="w-full" size={'lg'} disabled={false}>
                        Continue
                    </Button>
                </form>
                <Separator />
                <div className="flex flex-col gap-y-2.5">
                    <Button variant={'outline'} className="w-full relative" size={'lg'} disabled={false}>
                        <FcGoogle className="size-5 absolute top-2.5 left-2.5" />
                        Sign in with Google
                    </Button>
                    <Button variant={'outline'} className="w-full relative" size={'lg'} disabled={false}>
                        <FaGithub className="size-5 absolute top-2.5 left-2.5" />
                        Sign in with Github
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                    Don&apos;t have an account? {" "} <span className="text-sky-700 hover:underline cursor-pointer" onClick={() => setState("signUp")}>SignUp</span>
                </p>
            </CardContent>
        </Card>
    )
}

export default SignInCard