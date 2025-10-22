import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function PackagesPage() {
  const packages = [
    {
      slug: "basic",
      title: "Basic",
      description: "Standard decorations",
      balloons: [{ color: "bg-yellow-400" }, { color: "bg-pink-400" }],
    },
    {
      slug: "premium",
      title: "Premium",
      description: "Premium decorations",
      balloons: [
        { color: "bg-yellow-400" },
        { color: "bg-blue-400" },
        { color: "bg-pink-400" },
        { color: "bg-orange-400" },
      ],
    },
    {
      slug: "eco-friendly",
      title: "Eco-Friendly",
      description: "Sustainable decorations",
      balloons: [{ color: "bg-green-400" }, { color: "bg-yellow-400" }],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Global Navbar is rendered in Root Layout */}

      {/* Main Content */}
      <main className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">Our Packages</h1>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Choose from our carefully curated party packages, each designed to create unforgettable celebrations
            tailored to your needs and budget.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <Card
                key={pkg.slug}
                className="border-2 border-gray-200 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="flex justify-center mb-6">
                    <div className="flex gap-2">
                      {pkg.balloons.map((balloon, index) => (
                        <div key={index} className={`w-8 h-8 ${balloon.color} rounded-full`}></div>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{pkg.title}</h3>
                  <p className="text-gray-600 mb-8">{pkg.description}</p>
                  <Link href={`/packages/${pkg.slug}`}>
                    <Button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full font-semibold w-full">
                      VIEW DETAILS
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
