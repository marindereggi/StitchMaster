"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Calendar, Clock, BarChart4, FileText, ArrowUpRight } from "lucide-react"

// Sample data for progress history
const pastAssessments = [
  {
    id: 1,
    date: "2023-04-10",
    time: "14:30",
    score: 72,
    parallelism: true,
    spacing: false,
    sutureCount: 6,
    notes: "First attempt with the practice pad. Need to work on maintaining equal spacing between sutures.",
    imageSrc: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    date: "2023-04-12",
    time: "10:15",
    score: 78,
    parallelism: true,
    spacing: false,
    sutureCount: 7,
    notes: "Improved on parallelism, but still struggling with consistent spacing.",
    imageSrc: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    date: "2023-04-15",
    time: "16:45",
    score: 85,
    parallelism: true,
    spacing: true,
    sutureCount: 8,
    notes: "Much better today! Focused on marking equal distances before suturing.",
    imageSrc: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 4,
    date: "2023-04-18",
    time: "09:30",
    score: 82,
    parallelism: true,
    spacing: true,
    sutureCount: 6,
    notes: "Tried a different technique for needle insertion. Good results but slightly slower.",
    imageSrc: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 5,
    date: "2023-04-22",
    time: "11:20",
    score: 91,
    parallelism: true,
    spacing: true,
    sutureCount: 7,
    notes: "Best session yet! Focused on maintaining consistent hand position throughout.",
    imageSrc: "/placeholder.svg?height=300&width=400",
  },
]

// Data for charts
const scoreData = pastAssessments.map((assessment) => ({
  date: assessment.date.split("-").slice(1).join("/"), // Format as MM/DD
  score: assessment.score,
}))

const attributeData = pastAssessments.map((assessment) => ({
  date: assessment.date.split("-").slice(1).join("/"),
  parallelism: assessment.parallelism ? 100 : 0,
  spacing: assessment.spacing ? 100 : 0,
}))

export default function ProgressHistory() {
  const [selectedAssessment, setSelectedAssessment] = useState(pastAssessments[pastAssessments.length - 1])

  return (
    <div className="space-y-6">
      {/* Progress Charts */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6 text-teal-800 flex items-center gap-2">
          <BarChart4 className="h-5 w-5 text-teal-600" />
          Progress Overview
        </h2>

        <Tabs defaultValue="score" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="score">Score Progression</TabsTrigger>
            <TabsTrigger value="attributes">Technique Attributes</TabsTrigger>
          </TabsList>

          <TabsContent value="score" className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scoreData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#0d9488" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="attributes" className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attributeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="parallelism" name="Parallelism" fill="#0d9488" />
                <Bar dataKey="spacing" name="Equal Spacing" fill="#14b8a6" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>

        <div className="mt-4 pt-4 border-t">
          <h3 className="font-medium text-gray-700 mb-2">Key Insights</h3>
          <ul className="space-y-1 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-teal-100 p-1 mt-0.5">
                <ArrowUpRight className="h-3 w-3 text-teal-600" />
              </div>
              Your overall score has improved by 19 points since your first assessment.
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-teal-100 p-1 mt-0.5">
                <ArrowUpRight className="h-3 w-3 text-teal-600" />
              </div>
              You've consistently maintained good parallelism in your sutures.
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-teal-100 p-1 mt-0.5">
                <ArrowUpRight className="h-3 w-3 text-teal-600" />
              </div>
              Your spacing technique has shown significant improvement after your second session.
            </li>
          </ul>
        </div>
      </Card>

      {/* Past Assessments */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6 text-teal-800">Past Assessments</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Assessment List */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-700 mb-2">Select an Assessment</h3>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {pastAssessments.map((assessment) => (
                <div
                  key={assessment.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedAssessment.id === assessment.id
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-200 hover:border-teal-300 hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedAssessment(assessment)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{assessment.date}</span>
                        <Clock className="h-4 w-4 text-gray-500 ml-2" />
                        <span className="text-sm text-gray-600">{assessment.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={`${assessment.score >= 80 ? "bg-green-500" : assessment.score >= 70 ? "bg-yellow-500" : "bg-red-500"}`}
                        >
                          Score: {assessment.score}
                        </Badge>
                        <Badge variant="outline" className="border-gray-300 text-gray-600">
                          {assessment.sutureCount} sutures
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Badge
                        variant="outline"
                        className={`${
                          assessment.parallelism
                            ? "border-green-300 text-green-600 bg-green-50"
                            : "border-red-300 text-red-600 bg-red-50"
                        }`}
                      >
                        {assessment.parallelism ? "Parallel" : "Non-parallel"}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`${
                          assessment.spacing
                            ? "border-green-300 text-green-600 bg-green-50"
                            : "border-red-300 text-red-600 bg-red-50"
                        }`}
                      >
                        {assessment.spacing ? "Even spacing" : "Uneven spacing"}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Assessment Details */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-700 mb-4">Assessment Details</h3>

            <div className="relative h-48 mb-4 rounded overflow-hidden">
              <Image
                src={selectedAssessment.imageSrc || "/placeholder.svg"}
                alt={`Suture assessment from ${selectedAssessment.date}`}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BarChart4 className="h-4 w-4 text-teal-600" />
                  <h4 className="font-medium text-gray-700">Score Breakdown</h4>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-gray-50 p-2 rounded">
                    <span className="text-gray-600">Overall Score:</span>{" "}
                    <span className="font-medium">{selectedAssessment.score}/100</span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <span className="text-gray-600">Suture Count:</span>{" "}
                    <span className="font-medium">{selectedAssessment.sutureCount}</span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <span className="text-gray-600">Parallelism:</span>{" "}
                    <span
                      className={`font-medium ${selectedAssessment.parallelism ? "text-green-600" : "text-red-600"}`}
                    >
                      {selectedAssessment.parallelism ? "Passed" : "Failed"}
                    </span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <span className="text-gray-600">Equal Spacing:</span>{" "}
                    <span className={`font-medium ${selectedAssessment.spacing ? "text-green-600" : "text-red-600"}`}>
                      {selectedAssessment.spacing ? "Passed" : "Failed"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-teal-600" />
                  <h4 className="font-medium text-gray-700">Notes</h4>
                </div>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{selectedAssessment.notes}</p>
              </div>

              <Button variant="outline" className="w-full">
                View Full Report
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
