import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from "react-icons/fa"
import { authFlow } from "../types"
import { useForm, SubmitHandler } from 'react-hook-form'
import { signUpSchema, signUpSchemaType } from '@/features/auth/validation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuthActions } from "@convex-dev/auth/react";
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { TriangleAlert } from 'lucide-react'

interface SignUpCardProps {
    setState: (state: authFlow) => void
}

const signUpDefaultValue = {
    email: "",
    password: "",
    confirmPassword: "",
}

const SignUpCard = ({ setState }: SignUpCardProps) => {
    const [error, setError] = useState("")
    const { signIn } = useAuthActions();
    const { toast } = useToast();
    const {
        register,
        handleSubmit,
        reset,
        trigger,
        formState: { errors, isSubmitting }
    } = useForm<signUpSchemaType>({
        defaultValues: signUpDefaultValue,
        resolver: zodResolver(signUpSchema),
    })
    const onSubmit: SubmitHandler<signUpSchemaType> = async (data) => {
        try {
            await signIn("password",
                {
                    ...data,
                    flow: "signUp"
                })
            toast({
                title: "Welcome to QuantumChat",
                description: "SignUp Successfully",
            })
            reset()
            setState("signIn")
        } catch (error) {
            setError("Something went wrong")
        }
    }

    const onProviderSignUp = (value: "github" | "google"): void => {
        signIn(value)
    }


    return (
        <Card className="w-full h-full p-8">
            <CardHeader>
                <CardTitle>SignUp to continue</CardTitle>
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
                    <Input
                        disabled={isSubmitting}
                        placeholder="Confirm  Password"
                        {...register("confirmPassword")}
                        onBlur={() => trigger("confirmPassword")}
                    />
                    {errors.confirmPassword && <span className="text-rose-500 font-medium pr-3 text-sm">{errors.confirmPassword.message}</span>}
                    <Button type="submit" className="w-full" size={'lg'} disabled={isSubmitting}>
                        Continue
                    </Button>
                </form>
                <Separator />
                <div className="flex flex-col gap-y-2.5">
                    <Button
                        variant={'outline'}
                        className="w-full relative"
                        size={'lg'}
                        disabled={isSubmitting}
                        onClick={() => onProviderSignUp("google")}
                    >
                        <FcGoogle className="size-5 absolute top-2.5 left-2.5" />
                        Sign Up with Google
                    </Button>
                    <Button
                        variant={'outline'}
                        className="w-full relative"
                        size={'lg'}
                        disabled={isSubmitting}
                        onClick={() => onProviderSignUp("github")}
                    >
                        <FaGithub className="size-5 absolute top-2.5 left-2.5" />
                        Sign Up with Github
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                    Already have an account? {" "} <span className="text-sky-700 hover:underline cursor-pointer" onClick={() => setState("signIn")}>SignIn</span>
                </p>
            </CardContent>
        </Card>
    )
}

export default SignUpCard