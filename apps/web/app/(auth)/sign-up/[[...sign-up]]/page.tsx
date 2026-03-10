import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
    return (
        <div className="flex flex-col gap-4 min-h-screen items-center justify-center">
            {/* Add logo here at the top left corner */}
            <SignUp />
            <div className="text-center text-muted-foreground text-xs">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}