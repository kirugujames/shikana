"use client"

import { ShoppingBag, MessageCircle } from "lucide-react"

export default function ProductsGrid() {
  const products = [
    {
      id: 1,
      name: "Party Official T-Shirt",
      category: "Apparel",
      price: "KES 1,500",
      size: "S, M, L, XL, XXL",
      image: "/party-tshirt-official.jpg",
      description:
        "High-quality cotton t-shirt featuring the official party logo and colors. Perfect for rallies and campaign events.",
    },
    {
      id: 2,
      name: "Campaign Cap",
      category: "Accessories",
      price: "KES 800",
      size: "One Size",
      image: "/campaign-cap-merchandise.jpg",
      description:
        "Stylish campaign cap with embroidered party emblem. Adjustable strap fits all sizes comfortably.",
    },
    {
      id: 3,
      name: "Party Polo Shirt",
      category: "Apparel",
      price: "KES 2,200",
      size: "S, M, L, XL, XXL",
      image: "/polo-shirt-party.jpg",
      description:
        "Premium polo shirt with party branding. Ideal for formal party events and meetings.",
    },
    {
      id: 4,
      name: "Rally Banner",
      category: "Promotional",
      price: "KES 3,500",
      size: "3ft x 6ft",
      image: "/rally-banner-flag.jpg",
      description:
        "Large vinyl banner perfect for rallies and outdoor events. Weather-resistant and durable material.",
    },
    {
      id: 5,
      name: "Wristband Set",
      category: "Accessories",
      price: "KES 300",
      size: "Universal",
      image: "/wristband-set-party.jpg",
      description:
        "Pack of 5 silicone wristbands in party colors. Great for showing support at events.",
    },
    {
      id: 6,
      name: "Party Hoodie",
      category: "Apparel",
      price: "KES 3,000",
      size: "S, M, L, XL, XXL",
      image: "/hoodie-party-merchandise.jpg",
      description:
        "Warm and comfortable hoodie with bold party logo. Perfect for cool weather campaigns.",
    },
  ]

  const categories = ["All", "Apparel", "Accessories", "Promotional"]

  const handleWhatsAppOrder = (product: typeof products[0]) => {
    const message = `Hi! I'm interested in ordering: ${product.name} - ${product.price}`
    const whatsappNumber = "254712345678" // Replace with actual WhatsApp number
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <section className="w-full py-8 md:py-12 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 text-balance">
            Party Merchandise
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
            >
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-6 flex flex-col flex-1">
                {/* Category & Price */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold bg-secondary text-white px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                  <span className="text-lg font-bold text-secondary">
                    {product.price}
                  </span>
                </div>

                {/* Product Name */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-foreground/70 mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Size */}
                <div className="mb-6 text-sm text-foreground/70">
                  <div className="flex items-center gap-2">
                    <ShoppingBag size={16} className="text-secondary" />
                    <span>Available Sizes: {product.size}</span>
                  </div>
                </div>

                {/* Order Button */}
                <div className="mt-auto">
                  <button
                    onClick={() => handleWhatsAppOrder(product)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold
                             bg-secondary text-white rounded-md
                             hover:bg-secondary/90 transition-colors"
                  >
                    <MessageCircle size={18} />
                    Order via WhatsApp
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}