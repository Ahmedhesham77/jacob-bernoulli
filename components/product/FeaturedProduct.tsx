import Image from "next/image"
import { getFeatured } from "@/lib/images"

export default function FeaturedProducts() {
    const products = getFeatured().slice(0, 2)

    return (
        <section className="py-32 bg-muted">
            <h2 className="text-center text-4xl font-bold mb-16">
                Featured Pieces
            </h2>

            <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto px-6">
                {products.map(p => (
                    <div key={p.id} className="group">
                        <Image
                            src={p.image}
                            alt={p.alt}
                            width={500}
                            height={500}
                            className="rounded-xl transition-transform group-hover:scale-105"
                        />

                        <div className="mt-4 flex items-center justify-between">
                            <p className="text-lg font-medium">{p.badge}</p>
                            {p.cta && (
                                <span className="text-sm text-muted-foreground">
                                    {p.cta}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
