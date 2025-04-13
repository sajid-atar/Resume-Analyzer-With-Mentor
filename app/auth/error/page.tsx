"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const getErrorMessage = (error: string | null) => {
  switch (error) {
    case "Configuration":
      return "There is a problem with the server configuration."
    case "AccessDenied":
      return "You do not have permission to access this resource."
    case "Verification":
      return "The verification failed. Please try again."
    case "OAuthSignin":
      return "Error occurred during sign in. Please try again."
    case "OAuthCallback":
      return "Error occurred during callback. Please try again."
    case "OAuthCreateAccount":
      return "Could not create user account. Please try again."
    case "EmailCreateAccount":
      return "Could not create user account. Please try again."
    case "Callback":
      return "Error occurred during callback. Please try again."
    case "OAuthAccountNotLinked":
      return "Email already exists with different credentials."
    case "EmailSignin":
      return "Check your email address."
    case "CredentialsSignin":
      return "Invalid credentials. Please check your email and password."
    case "SessionRequired":
      return "Please sign in to access this page."
    default:
      return "An error occurred. Please try again."
  }
}

function ErrorContent() {
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const err = searchParams.get("error")
    setError(err ?? null)
  }, [searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Authentication Error</h2>
        <p className="text-gray-600 mb-8">{getErrorMessage(error)}</p>
        <div className="space-y-4">
          <Link href="/auth/login">
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              Try Again
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full">
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading...</h2>
          <p className="text-gray-600">Please wait while we process your request.</p>
        </div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  )
}
