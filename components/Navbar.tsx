"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const navItems = [
  { label: "Home", href: "/" },
  { label: "Create Resume", href: "/create" },
  { label: "Analyze", href: "/analyze" },
  { label: "Mentors", href: "/mentors" },
]

export function Navbar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false })
      toast.success("Logged out successfully")
      router.push("/auth/login")
      router.refresh()
    } catch (error) {
      console.error("Logout error:", error)
      toast.error("Failed to logout")
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* App Logo/Name */}
        <Link href="/" className="mr-8 flex items-center space-x-2">
          <span className="text-xl font-bold text-purple-600">Resume Analyzer</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex flex-1 items-center justify-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-purple-600",
                pathname === item.href
                  ? "text-purple-600"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="ml-auto flex items-center space-x-4">
          {session ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Hello, {session.user?.name || session.user?.email}
              </span>
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-purple-600 text-white hover:bg-purple-700">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
} 