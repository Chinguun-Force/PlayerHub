"use client"
import React from 'react'
import { Menus } from './MainMenu'
import Link from 'next/link'
import { Button } from './ui/button'
import { useAuthStore } from '@/store/authStore'
import UserProfile from './UserProfile'
import { useThemeStore } from '@/store/themeStore'
import DarkModeToggle from './DarkToggle'

const Nav = () => {
  const user = useAuthStore();
  const darkMode = useThemeStore((state) => state.darkMode);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);

  return (
    <div>
      <header className='sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-screen flex justify-center dark:bg-dark-800'>
        <div className='container w-full flex h-16 items-center justify-between py-4'>
            <Menus/>
            <DarkModeToggle />
            <div className='flex items-center gap-4'>
              {user.isAuthenticated ? (
            <>
              <UserProfile/>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button size="sm">Log in</Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Sign up</Button>
              </Link>
            </>
          )}
            </div>
        </div>
      </header>
    </div>
  )
}

export default Nav
