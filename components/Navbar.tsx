"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { Menu, X } from "lucide-react"
import { useState } from "react"

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
      <div className="container flex h-16 items-center justify-between">
        {/* App Logo/Name */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-purple-600">Resume Analyzer</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-center md:space-x-6">
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

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex md:items-center md:space-x-4">
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute left-0 top-16 w-full bg-background md:hidden">
            <div className="container py-4">
              <div className="flex flex-col space-y-4">
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
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                {session ? (
                  <div className="flex flex-col space-y-2">
                    <span className="text-sm text-muted-foreground">
                      Hello, {session.user?.name || session.user?.email}
                    </span>
                    <Button 
                      variant="ghost" 
                      onClick={() => {
                        handleLogout()
                        setIsMobileMenuOpen(false)
                      }}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full">Sign In</Button>
                    </Link>
                    <Link href="/auth/register" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 
