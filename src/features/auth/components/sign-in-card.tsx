import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from "react-icons/fa"
import { authFlow } from "../types"
import { useForm, SubmitHandler } from 'react-hook-form'
import { signInSchema, signInSchemaType } from '@/features/auth/validation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuthActions } from "@convex-dev/auth/react";
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { TriangleAlert } from 'lucide-react'

interface SignInCardProps {
    setState: (state: authFlow) => void
}

const signInDefaultValue = {
    email: "",
    password: ""
}

const SignInCard = ({ setState }: SignInCardProps) => {

    const { signIn } = useAuthActions();
    const { toast } = useToast();
    const [error, setError] = useState("")

    const {
        register,
        handleSubmit,
        trigger,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<signInSchemaType>({
        defaultValues: signInDefaultValue,
        resolver: zodResolver(signInSchema),
    })

    const onSubmit: SubmitHandler<signInSchemaType> = async (data) => {
        try {
            await signIn("password",
                {
                    ...data,
                    flow: "signIn"
                })
            toast({
                title: "Welcome to QuantumChat",
                description: "Login Successfully",
            })
            reset()
        } catch (error) {
            setError("Invalid Email or Password")
        }
    }

    const onProviderSignIn = (value: "github" | "google"): void => {
        signIn(value)
    }

    return (
        <Card className="w-full h-full p-8">
            <CardHeader>
                <CardTitle>Login to continue</CardTitle>
                <CardDescription className="px-0 pt-0">
                    Use your email or another service
                </CardDescription>
            </CardHeader>
            {
                !!error && (
                    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                        <TriangleAlert className="size-4" />
                        <p>{error}</p>
                    </div>
                )
            }
            <CardContent className="space-y-5 px-0 pb-0">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
                    <Input
                        disabled={isSubmitting}
                        placeholder="Email"
                        {...register("email")}
                        onBlur={() => trigger("email")}
                    />
                    {errors.email && <span className="text-rose-500 font-medium pr-3 text-sm">{errors.email.message}</span>}
                    <Input
                        disabled={isSubmitting}
                        placeholder="Password"
                        {...register("password")}
                        onBlur={() => trigger("password")}
                    />
                    {errors.password && <span className="text-rose-500 font-medium pr-3 text-sm">{errors.password.message}</span>}
                    <Button
                        type="submit"
                        className="w-full"
                        size={'lg'}
                        disabled={isSubmitting}
                    >
                        {!isSubmitting ? "Continue" : "Loading..."}
                    </Button>
                </form>
                <Separator />
                <div className="flex flex-col gap-y-2.5">
                    <Button
                        variant={'outline'}
                        className="w-full relative"
                        size={'lg'}
                        disabled={isSubmitting}
                        onClick={() => onProviderSignIn("google")}
                    >
                        <FcGoogle className="size-5 absolute top-2.5 left-2.5" />
                        Sign in with Google
                    </Button>
                    <Button
                        variant={'outline'}
                        className="w-full relative"
                        size={'lg'}
                        disabled={isSubmitting}
                        onClick={() => onProviderSignIn("github")}
                    >
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