"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Global Navbar is rendered in Root Layout */}

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/hero-background.jpg" alt="About Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-36 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">A Father-Daughter Dream Turned Reality</h1>
          <p className="text-white/90 text-lg md:text-xl mt-4 max-w-3xl mx-auto">
            What began as a father's love for making birthdays magical turned into a full-blown passion project with his daughter by his side.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link href="/#packages">
              <Button className="bg-gradient-to-r from-fuchsia-500 to-amber-500 hover:from-fuchsia-600 hover:to-amber-600 text-white px-8 py-6 rounded-full text-base font-semibold">Explore Packages</Button>
            </Link>
            <Link href="/#contact">
              <Button variant="outline" className="border-white text-black hover:bg-white hover:text-purple-700 rounded-full px-8 py-6">Get a Quote</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="px-6 py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-8">About BookMyBirthdayParty</h2>
          <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed">
            <p>
              Daniel always went the extra mile to make birthdays special for his kids. That love for celebrations sparked something bigger when his daughter Allegra, now a Communication Design graduate, brought her creative vision to the table.
            </p>
            <p>
              Together, this father–daughter duo founded Book My Birthday Party, a seamless, joy-filled party planning experience. With Daniel's 27 years of entrepreneurial insight and Allegra's fresh ideas, they're turning chaos into celebration, one magical birthday at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Parties Planned", value: "500+" },
            { label: "Avg. Rating", value: "4.9/5" },
            { label: "Cities Served", value: "6" },
            { label: "Years Experience", value: "27+" },
          ].map((s, i) => (
            <Card key={i} className="p-6 text-center border-gray-200">
              <div className="text-3xl font-extrabold text-purple-700">{s.value}</div>
              <div className="text-gray-600 mt-1">{s.label}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Our Values */}
      <section className="px-6 py-16 bg-rose-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Joy First",
                desc: "Everything we do centers on creating joyful experiences for kids and families.",
                icon: (
                  <svg className="w-8 h-8 text-pink-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 1022 12 10.011 10.011 0 0012 2zm0 18a8 8 0 118-8 8.009 8.009 0 01-8 8zm-3-7a1 1 0 10-1-1 1 1 0 001 1zm8 0a1 1 0 10-1-1 1 1 0 001 1zM7 14a5 5 0 0010 0z"/></svg>
                ),
              },
              {
                title: "Trusted & Safe",
                desc: "Background-verified staff, child-safe materials, and hygiene-first processes.",
                icon: (
                  <svg className="w-8 h-8 text-emerald-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l7 4v6c0 5-3.8 9.7-7 10-3.2-.3-7-5-7-10V6l7-4z"/></svg>
                ),
              },
              {
                title: "Sustainable",
                desc: "Eco-friendly options that reduce waste without reducing the fun.",
                icon: (
                  <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-8.94 13.68 1 1 0 00.69.6A7 7 0 0012 22a7 7 0 007-7 7.08 7.08 0 00-.08-1 1 1 0 00.6-.69A10 10 0 0012 2z"/></svg>
                ),
              },
            ].map((v, i) => (
              <Card key={i} className="p-6 border-gray-200">
                <div className="w-12 h-12 rounded-2xl bg-white shadow flex items-center justify-center mb-4">
                  {v.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-600">{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Founders */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">Meet the Founders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Daniel */}
            <Card className="p-8 text-center border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden mb-6 shadow-md">
                <img src="/daniel.png" alt="Daniel - Co-Founder" className="w-full h-full object-contain hover:scale-115 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Daniel</h3>
              <p className="text-purple-600 font-semibold mb-4">Co-Founder & CEO</p>
              <p className="text-gray-600 leading-relaxed">
                With 27 years of entrepreneurial experience, Daniel brings a father's heart and business acumen to every celebration. His passion for making birthdays magical started with his own children and has grown into a mission to help families create unforgettable memories.
              </p>
            </Card>

            {/* Allegra */}
            <Card className="p-8 text-center border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden mb-6 shadow-md">
                <img src="/allegra.png" alt="Allegra - Co-Founder" className="w-full h-full object-contain hover:scale-115 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Allegra</h3>
              <p className="text-purple-600 font-semibold mb-4">Co-Founder & Creative Director</p>
              <p className="text-gray-600 leading-relaxed">
                A Communication Design graduate with fresh perspectives and creative vision. Allegra brings modern design thinking and innovative ideas to transform traditional party planning into seamless, joy-filled experiences.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <Card className="p-6 text-center border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-36 h-36 mx-auto rounded-2xl overflow-hidden mb-4 shadow-md">
                <img src="/mavis.png" alt="Sarah Johnson - Event Coordinator" className="w-full h-full object-contain hover:scale-120 transition-transform duration-300" />
              </div>
              <div className="text-lg font-semibold text-gray-900">Mavis</div>
              <div className="text-sm text-purple-600 font-medium mb-2">Chief Aesthetic Officer</div>
              <div className="text-xs text-gray-600">Specializes in themed parties and logistics</div>
            </Card>

            {/* Team Member 2 */}
            <Card className="p-6 text-center border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-36 h-36 mx-auto rounded-2xl overflow-hidden mb-4 shadow-md">
                <img src="/jyotsna.png" alt="Emily Chen - Creative Designer" className="w-full h-full object-contain hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="text-lg font-semibold text-gray-900">Jyotsna</div>
              <div className="text-sm text-purple-600 font-medium mb-2">Chief Surprise Officer</div>
              <div className="text-xs text-gray-600">Creates custom decorations and themes</div>
            </Card>

            {/* Team Member 3 */}
            <Card className="p-6 text-center border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-36 h-36 mx-auto rounded-2xl overflow-hidden mb-4 shadow-md">
                <img src="/sudhanshu.png" alt="Marcus Rodriguez - Catering Manager" className="w-full h-full object-fit hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="text-lg font-semibold text-gray-900">Sudhanshu</div>
              <div className="text-sm text-purple-600 font-medium mb-2">Chief Story-telling Officer</div>
              <div className="text-xs text-gray-600">Ensures delicious and safe party treats</div>
            </Card>
          </div>
          <div className="text-center mt-10">
            <Link href="/#contact">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-6 text-base font-semibold">Plan With Us</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section id="contact" className="px-6 py-20 bg-gradient-to-r from-fuchsia-500 to-amber-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h3 className="text-3xl md:text-4xl font-extrabold mb-3">Ready to start planning?</h3>
          <p className="text-white/90 mb-8">Share your date and city, and we'll craft a custom proposal.</p>
          <Link href="/#contact">
            <Button className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-8 py-6 text-base font-semibold">Get a Free Quote</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}