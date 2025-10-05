import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[url('/images/icons/pink-cloud.png')] bg-cover bg-top bg-no-repeat text-gray-700">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Column 1 */}
        <div>
          <div className="flex items-center text-heading-1 text-stroke">
            <p className="text-secondary">Giggle</p>
            <p className="text-primary">Gear</p>
          </div>
          <p className="text-sm text-gray-500">
            A minimal e-commerce template built with Next.js & Tailwind.  
            Perfect for modern online stores 🚀
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="font-semibold text-secondary text-stroke mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-500">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/products" className="hover:underline">Products</Link></li>
            <li><Link href="/about" className="hover:underline">About</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="font-semibold text-secondary text-stroke mb-4">Contact</h4>
          <p className="text-sm">Email: support@minishop.com</p>
          <p className="text-sm">Phone: +62 812 3456 7890</p>
          <p className="text-sm mt-2">Follow us:</p>
          <div className="flex gap-3 mt-2 text-gray-500">
            <Link href="#" className="hover:text-white">Facebook</Link>
            <Link href="#" className="hover:text-white">Twitter</Link>
            <Link href="#" className="hover:text-white">Instagram</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-500 text-center py-4 text-sm text-gray-500 text-stroke">
        © {new Date().getFullYear()} GiggleBear. All rights reserved.
      </div>
    </footer>
  )
}
