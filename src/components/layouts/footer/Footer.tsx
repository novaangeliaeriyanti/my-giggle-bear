import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[url('/images/icons/pink-cloud.png')] bg-cover bg-top bg-no-repeat text-gray-700">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1 */}
        <div>
          <div className="flex items-center">
            <h2 className="text-secondary">Giggle</h2>
            <h2 className="text-primary">Gear</h2>
          </div>
          <span className="text-small">
            A minimal e-commerce template built with Next.js & Tailwind. Perfect for modern online
            stores 🚀
          </span>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-secondary text-stroke mb-4">Quick Links</h3>
          <ul className="space-y-2 text-small">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:underline">
                Products
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-secondary text-stroke mb-4">Contact</h3>
          <span className="text-small">Email: support@minishop.com</span>
          <span className="text-small">Phone: +62 812 3456 7890</span>
          <span className="text-small">Follow us:</span>
          <div className="flex gap-3 text-small">
            <Link href="#" className="hover:text-white">
              Facebook
            </Link>
            <Link href="#" className="hover:text-white">
              Twitter
            </Link>
            <Link href="#" className="hover:text-white">
              Instagram
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-outlined border-dashed text-center py-4 text-sm text-gray-500 text-stroke">
        © {new Date().getFullYear()} GiggleBear. All rights reserved.
      </div>
    </footer>
  );
}
