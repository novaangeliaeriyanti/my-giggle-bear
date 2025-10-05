export const menus: {
  title: string
  href?: string
  items?: { label: string; href: string; icon?: string }[]
}[] = [
  {
    title: "Home",
    items: [
      { label: "Home Layout 1", href: "/", icon: "/images/icons/smile.png" },
      { label: "Home Layout 2", href: "/", icon: "/images/icons/smile.png" },
      { label: "Home Layout 3", href: "/", icon: "/images/icons/smile.png" },
      { label: "Home Layout 3", href: "/", icon: "/images/icons/smile.png" },
      { label: "Home Layout 3", href: "/", icon: "/images/icons/smile.png" },
      { label: "Home Layout 3", href: "/", icon: "/images/icons/smile.png" },
    ],
  },
  {
    title: "Pages",
    items: [
      { label: "Login", href: "/login", icon: "/images/icons/smile.png" },
      { label: "Register", href: "/register", icon: "/images/icons/smile.png" },
      { label: "Blog", href: "/blog", icon: "/images/icons/smile.png" },
      { label: "Blog Details", href: "/blog-details", icon: "/images/icons/smile.png" },
      { label: "Empty Shop", href: "/empty-shop", icon: "/images/icons/smile.png" },
      { label: "404 Not Found", href: "/not-found", icon: "/images/icons/smile.png" },

    ],
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Categories",
    items: [
      { label: "T-Shirts", href: "/tshirts", icon: "/images/icons/smile.png" },
      { label: "Pants", href: "/pants", icon: "/images/icons/smile.png" },
      { label: "Shoes", href: "/shoes", icon: "/images/icons/smile.png" },
    ],
  },
  {
    title: "Blog",
    items: [
      { label: "Latest Posts", href: "/blog/latest", icon: "/images/icons/smile.png" },
      { label: "News", href: "/blog/news", icon: "/images/icons/smile.png" },
      { label: "Tips", href: "/blog/tips", icon: "/images/icons/smile.png" },
    ],
  },
  {
    title: "Contact",
    href: "/contact",
  },
]