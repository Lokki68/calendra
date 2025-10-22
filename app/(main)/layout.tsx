import PrivateNavbar from "@/components/PrivateNavbar"
import PublicNavbar from "@/components/PublicNavbar"
import { currentUser } from "@clerk/nextjs/server"

export default async function MainLayout({ children }: { children: React.ReactNode }) {

  const user = await currentUser()

  return (
    <main className="relative" >
      {user ? <PrivateNavbar /> : <PublicNavbar />}
      <section className="pt-36">
        {children}
      </section>
    </main>
  )
}
