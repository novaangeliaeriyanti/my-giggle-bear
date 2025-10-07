import Link from "next/link";

export default function FooterV2() {
  return (
    <footer
      className="w-full h-[2px] bg-[length:16px_2px] bg-repeat-x bg-gradient-to-r from-pink-50 to-pink-50"
      style={{
        backgroundImage: "repeating-linear-gradient(to right, #fff6f9 0 8px, transparent 8px 16px)",
      }}
    >
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1 */}
        <div>
          <div className="flex items-center text-heading-1 text-stroke">
            <p className="text-secondary">Giggle</p>
            <p className="text-primary">Gear</p>
          </div>
          <p className="text-sm text-gray-500">
            A minimal e-commerce template built with Next.js & Tailwind. Perfect for modern online
            stores 🚀
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="font-semibold text-secondary text-stroke mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-500">
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
        <div>
          <h4 className="font-semibold text-secondary text-stroke mb-4">Contact</h4>
          <p className="text-sm text-gray-500">Email: support@minishop.com</p>
          <p className="text-sm text-gray-500">Phone: +62 812 3456 7890</p>
          <p className="text-sm mt-2 text-gray-500">Follow us:</p>
          <div className="flex gap-3 mt-2 text-gray-500">
            <Link href="#">Facebook</Link>
            <Link href="#">Twitter</Link>
            <Link href="#">Instagram</Link>
          </div>
        </div>
      </div>

      <div className="bg-[url('/images/icons/pink-cloud.png')] bg-cover bg-top bg-no-repeat text-center py-4 text-sm text-gray-500 text-stroke">
        © {new Date().getFullYear()} GiggleBear. All rights reserved.
      </div>
    </footer>
  );
}
