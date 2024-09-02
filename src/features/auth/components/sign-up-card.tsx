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

interface SignUpCardProps {
    setState: (state: authFlow) => void
}

const signUpDefaultValue = {
    email: "",
    password: "",
    confirmPassword: "",
}

const SignUpCard = ({ setState }: SignUpCardProps) => {
    const {
        register,
        handleSubmit,
        watch,
        trigger,
        formState: { errors }
    } = useForm<signUpSchemaType>({
        defaultValues: signUpDefaultValue,
        resolver: zodResolver(signUpSchema),
    })
    const onSubmit: SubmitHandler<signUpSchemaType> = (data) => {
        console.log("submitted")
        console.log(data)
    }
    return (
        <Card className="w-full h-full p-8">
            <CardHeader>
                <CardTitle>SignUp to continue</CardTitle>
                <CardDescription className="px-0 pt-0">
                    Use your email or another service
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 px-0 pb-0">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
                    <Input
                        disabled={false}
                        placeholder="Email"
                        {...register("email")}
                        onBlur={() => trigger("email")}
                    />
                    {errors.email && <span className="text-rose-500 font-medium pr-3 text-sm">{errors.email.message}</span>}
                    <Input
                        disabled={false}
                        placeholder="Password"
                        {...register("password")}
                        onBlur={() => trigger("password")}
                    />
                    {errors.password && <span className="text-rose-500 font-medium pr-3 text-sm">{errors.password.message}</span>}
                    <Input
                        disabled={false}
                        placeholder="Confirm  Password"
                        {...register("confirmPassword")}
                        onBlur={() => trigger("confirmPassword")}
                    />
                    {errors.confirmPassword && <span className="text-rose-500 font-medium pr-3 text-sm">{errors.confirmPassword.message}</span>}
                    <Button type="submit" className="w-full" size={'lg'} disabled={false}>
                        Continue
                    </Button>
                </form>
                <Separator />
                <div className="flex flex-col gap-y-2.5">
                    <Button variant={'outline'} className="w-full relative" size={'lg'} disabled={false}>
                        <FcGoogle className="size-5 absolute top-2.5 left-2.5" />
                        Sign Up with Google
                    </Button>
                    <Button variant={'outline'} className="w-full relative" size={'lg'} disabled={false}>
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