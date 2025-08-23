import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
// Removed logo import since we're using a text-based logo

interface NavItem {
  label: string;
  href: string;
  submenu?: { label: string; href: string }[];
}

const navigation: NavItem[] = [
  {
    label: "How it Works",
    href: "#how-it-works",
    submenu: [
      { label: "Process Overview", href: "#process" },
      { label: "Opportunity Sourcing", href: "#sourcing" },
      { label: "Quality Assurance", href: "#quality" },
    ],
  },
  {
    label: "Case Studies",
    href: "#case-studies",
    submenu: [
      { label: "B2B SaaS", href: "#saas-cases" },
      { label: "E-commerce", href: "#ecommerce-cases" },
      { label: "Professional Services", href: "#services-cases" },
    ],
  },
  {
    label: "Pricing",
    href: "#pricing",
    submenu: [
      { label: "Standard Plan", href: "#standard" },
      { label: "Enterprise", href: "#enterprise" },
      { label: "ROI Calculator", href: "#calculator" },
    ],
  },
  {
    label: "Resources",
    href: "#resources",
    submenu: [
      { label: "SEO Guide", href: "#seo-guide" },
      { label: "Blog", href: "#blog" },
      { label: "Templates", href: "#templates" },
      { label: "FAQ", href: "#faq" },
    ],
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="text-xl font-bold text-foreground">BoostMyRank</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <div
              key={item.label}
              className="relative group"
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <a
                href={item.href}
                className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                <span>{item.label}</span>
                {item.submenu && <ChevronDown className="h-4 w-4" />}
              </a>

              {/* Dropdown Menu */}
              {item.submenu && hoveredItem === item.label && (
                <div className="absolute left-0 top-full mt-2 w-56 rounded-md border bg-popover p-2 shadow-lg animate-in fade-in-0 zoom-in-95">
                  <div className="space-y-1">
                    {item.submenu.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={subItem.href}
                        className="block rounded-sm px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            Sign in
          </Button>
          <Button variant="cta" size="sm">
            Start free trial
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <div className="container space-y-4 p-4">
            {navigation.map((item) => (
              <div key={item.label} className="space-y-2">
                <a
                  href={item.href}
                  className="block text-sm font-medium text-foreground hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
                {item.submenu && (
                  <div className="ml-4 space-y-2">
                    {item.submenu.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={subItem.href}
                        className="block text-sm text-muted-foreground hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex flex-col space-y-2 pt-4 border-t">
              <Button variant="ghost" size="sm" className="justify-start">
                Sign in
              </Button>
              <Button variant="cta" size="sm">
                Start free trial
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}