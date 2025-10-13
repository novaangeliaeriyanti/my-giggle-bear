export const menus: {
  title: string;
  href?: string;
  items?: { label: string; href: string; icon?: string }[];
}[] = [
  {
    title: "Home",
    items: [
      { label: "Home Layout 1", href: "/", icon: "/images/icons/smile.png" },
      { label: "Home Layout 2", href: "/", icon: "/images/icons/smile.png" },
    ],
  },
  {
    title: "Pages",
    items: [
      { label: "Login", href: "/login", icon: "/images/icons/smile.png" },
      { label: "Register", href: "/register", icon: "/images/icons/smile.png" },
      { label: "Cart", href: "/order", icon: "/images/icons/smile.png" },
      { label: "My Orders", href: "/orders-list", icon: "/images/icons/smile.png" },
      { label: "My Reviews", href: "/my-reviews", icon: "/images/icons/smile.png" },
      { label: "Product Detail", href: "/products/2", icon: "/images/icons/smile.png" },
      {
        label: "Product Review",
        href: "/products/prod-001/reviews",
        icon: "/images/icons/smile.png",
      },
      { label: "Order Detail", href: "/order/ORD-20251007-001", icon: "/images/icons/smile.png" },
      {
        label: "Order Tracking",
        href: "/order/tracking/ORD-20251007-001",
        icon: "/images/icons/smile.png",
      },
      {
        label: "Add Review",
        href: "/order/ORD-20251007-001/add-review",
        icon: "/images/icons/smile.png",
      },
      { label: "404 Not Found", href: "/not-found", icon: "/images/icons/smile.png" },
    ],
  },
  {
    title: "Categories",
    items: [
      { label: "T-Shirts", href: "/tshirts", icon: "/images/icons/smile.png" },
      { label: "Pants", href: "/pants", icon: "/images/icons/smile.png" },
      { label: "Shoes", href: "/shoes", icon: "/images/icons/smile.png" },
    ],
  },
];

export const userMenuItems = [
  { label: "Login", href: "/login", icon: "/images/icons/smile.png" },
  { label: "Register", href: "/register", icon: "/images/icons/smile.png" },
  { label: "My Orders", href: "/orders-list", icon: "/images/icons/smile.png" },
  { label: "My Reviews", href: "/my-reviews", icon: "/images/icons/smile.png" },
];
