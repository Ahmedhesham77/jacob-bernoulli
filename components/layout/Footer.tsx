import Link from "next/link"

const footerLinks = {
    collections: [
        { label: "Timepieces", href: "/collections/timepieces" },
        { label: "Antiques", href: "/collections/antiques" },
        { label: "Limited Editions", href: "/collections/limited" },
        { label: "Archive", href: "/collections/archive" },
    ],
    services: [
        { label: "Authentication", href: "/services/authentication" },
        { label: "Restoration", href: "/services/restoration" },
        { label: "Consignment", href: "/services/consignment" },
        { label: "Appraisals", href: "/services/appraisals" },
    ],
    company: [
        { label: "Our Story", href: "/about" },
        { label: "Atelier", href: "/atelier" },
        { label: "Press", href: "/press" },
        { label: "Contact", href: "/contact" },
    ],
}

export default function Footer() {
    return (
        <footer className="bg-card border-t border-border">
            <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
                    <div className="lg:col-span-1">
                        <h3 className="text-2xl md:text-3xl font-serif font-light tracking-tight mb-4">
                            Maison du Temps
                        </h3>
                        <p className="text-sm font-sans font-light text-muted-foreground leading-relaxed max-w-xs">
                            Curating exceptional timepieces and rare antiques since 1892. Where heritage meets horological excellence.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xs font-sans uppercase tracking-[0.2em] text-gold-muted mb-6">
                            Collections
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.collections.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm font-sans font-light text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-sans uppercase tracking-[0.2em] text-gold-muted mb-6">
                            Services
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.services.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm font-sans font-light text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-sans uppercase tracking-[0.2em] text-gold-muted mb-6">
                            Company
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm font-sans font-light text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs font-sans text-muted-foreground">
                        {new Date().getFullYear()} Maison du Temps. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link
                            href="/privacy"
                            className="text-xs font-sans text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="text-xs font-sans text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
