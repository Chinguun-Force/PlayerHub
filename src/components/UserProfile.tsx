"use client"
import React, {useState} from 'react'
import {Avatar, AvatarFallback, AvatarImage} from './ui/avatar'
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem} from '@radix-ui/react-dropdown-menu'
import {Button} from './ui/button'
import {
    BarChart3,
    ChevronDown,
    ChevronUp,
    LogOut,
    Settings,
    Trophy,
    User
} from 'lucide-react'
import {useAuthStore} from '@/store/authStore'
import {useProfileStore} from '@/store/useProfileStore'
import {useRouter} from 'next/navigation'
import Link from 'next/link'

const UserProfile = () => {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const handleLogout = () => {
        useAuthStore
            .getState()
            .logout()
        useProfileStore
            .getState()
            .clearProfile()
        router.push('/auth/login')
    }

    return (
        <div className="flex items-center gap-2">
            <Avatar className='bg-contain bg-center'>
                <AvatarImage
                    src={useProfileStore
                        .getState()
                        .profile
                            ?.profilePicture || 'github.com/PlayerHubs/player-hubs/assets/placeholder.png'}
                    alt="User"
                    className='bg-contain bg-center'
                    />
                <AvatarFallback>US</AvatarFallback>
            </Avatar>
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                        {
                            open
                                ? <ChevronUp className="h-4 w-4"/>
                                : <ChevronDown className="h-4 w-4"/>
                        }
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    className="w-56 bg-gray-50 dark:bg-gray-800 shadow-lg rounded-md p-2">
                    <Link href="/players/myprofile">
                        <DropdownMenuItem
                            className="flex items-center gap-2 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 duration-300 rounded-xl cursor-pointer">
                            <User className="h-4 w-4"/>
                            <span>My Account</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/players/myprofile">
                        <DropdownMenuItem
                            className="flex items-center gap-2 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 duration-300 rounded-xl cursor-pointer">
                            <Trophy className="mr-2 h-4 w-4"/>
                            <span>My Teams</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/players/myprofile">
                        <DropdownMenuItem
                            className="flex items-center gap-2 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 duration-300 rounded-xl cursor-pointer">
                            <BarChart3 className="mr-2 h-4 w-4"/>
                            <span>Statistics</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/players/myprofile">
                        <DropdownMenuItem
                            className="flex items-center gap-2 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 duration-300 rounded-xl cursor-pointer">
                            <Settings className="mr-2 h-4 w-4"/>
                            <span>Settings</span>
                        </DropdownMenuItem>
                    </Link>
                    <Button
                        variant="ghost"
                        className="hover:bg-gray-200 dark:hover:bg-gray-700 duration-300 rounded-xl cursor-pointer text-red-600 w-full flex justify-start m-0 p-0"
                        onClick={handleLogout}>
                        <DropdownMenuItem
                            className="flex items-center py-2 hover:bg-gray-200 dark:hover:bg-gray-700 duration-300 rounded-xl cursor-pointer text-red-600">
                            <LogOut className="mr-2 h-4 w-4"/>
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </Button>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

    )
}

export default UserProfile