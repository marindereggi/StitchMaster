import type { Metadata } from "next"
import SutureAssessment from "@/components/suture-assessment"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Surgical Suture Assessment",
  description: "Upload and analyze sutured tissue images for training and assessment",
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 text-teal-800">Surgical Suture Assessment</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload images of your practice sutures for instant analysis and feedback to improve your technique.
          </p>
        </section>

        <SutureAssessment />
      </main>
      <Footer />
    </div>
  )
}
