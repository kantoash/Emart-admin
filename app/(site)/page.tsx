
import { ShoppingCart } from 'lucide-react'
import { AuthForm } from '@/components/input/auth-form'
export default function Home() {
  return (
   <>
    <main className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 space-y-5 bg-gray-100 h-full ">
      <div className="sm:mx-auto w-full sm:max-w-md">
        <ShoppingCart className="w-20 h-20 mx-auto" />
        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <AuthForm/>      
    </main>
   </>
  )
}
