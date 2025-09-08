import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Twitter, Linkedin, Youtube, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logoImage from "@/assets/logo.png"; // Update this path to your logo file

const footerLinks = {
  product: [
    { label: "How it Works", href: "/#how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Free SEO Guide", href: "/free-seo-guide" },
  ],
  resources: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Book a Demo", href: "https://calendar.app.google/xWgL9AeYruybGjgv5" },
    { label: "Contact Us", href: "/contact" },
  ],
};

const socialLinks = [
  // { icon: Twitter, href: "#twitter", label: "Twitter" },
  // { icon: Linkedin, href: "#linkedin", label: "LinkedIn" },
  // { icon: Youtube, href: "#youtube", label: "YouTube" },
  { icon: Mail, href: "#email", label: "Email" },
];

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container px-4 py-16">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4 max-w-md">
            <div className="flex items-center space-x-2">
              <img 
                src={logoImage} 
                alt="BoostMyRank Logo" 
                className="h-8 w-8 object-contain"
              />
              <span className="text-xl font-bold text-foreground">BoostMyRank</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Triple your SEO traffic with automated backlink outreach. 
              Get 3+ high-authority links monthly from Forbes, Newsweek, and CNN.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 rounded-lg bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links - Right Aligned */}
          <div className="grid grid-cols-2 gap-8 md:gap-12">
            {/* Product Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Product</h4>
              <ul className="space-y-2">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Resources</h4>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <Link
                        to={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <span
                        className="text-muted-foreground cursor-default"
                        aria-disabled="true"
                      >
                        {link.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>


        <Separator className="mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2025 BoostMyRank. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <span>Made with ❤️ for growing businesses</span>
          </div>
        </div>
      </div>
    </footer>
  );
}