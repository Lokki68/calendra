'use client'

import { PrivateNavLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PrivateNavbar() {
  const pathname = usePathname()

  return (
    <nav className="flex justify-between items-center fixed z-50 w-full h-28 bg-gray-200 px-10 gap-4 shadow-2xl rounded-2xl" >
      <Link href='/events' className="flex items-center gap-1 p-4 hover:bg-blue-100 hover:rounded-3xl duration-500" >
        <Image src='/assets/logo.svg' width={60} height={60} alt="logo" />
      </Link>
      <section className="sticky top-0 flex justify-between text-black" >
        <div className="flex flex-1 max-sm:gap-0 sm:gap-6" >
          {
            PrivateNavLinks.map((item) => {
              const isActive = pathname === item.route || pathname.startsWith(`${item.route}`)

              return (
                <Link
                  href={item.route}
                  key={item.label}
                  className={
                    cn(
                      'flex gap-4 items-center p-4 rounded-lg justify-start hover:bg-blue-100 hover:rounded-3xl duration-500',
                      isActive && 'bg-blue-100 rounded-3xl'
                    )
                  }
                >
                  <Image
                    src={item.imgUrl}
                    alt={item.label}
                    width={30}
                    height={30}
                  />
                  <p
                    className="tex-lg font-semibold max-lg:hidden"
                  >
                    {item.label}
                  </p>
                </Link>
              )
            })
          }
        </div>
      </section>
      <div className="hover:scale-150 duration-500">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  )
}
