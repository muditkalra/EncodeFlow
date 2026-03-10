import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
            <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
                {/* Need to add Logo here at the top left corner */}
                <SignIn />
                <div className="text-center text-muted-foreground text-xs">
                    By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                    and <a href="#">Privacy Policy</a>.
                </div>
            </div>
    )
}