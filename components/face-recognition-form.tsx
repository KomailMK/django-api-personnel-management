"use client"

import type React from "react"

import { useState } from "react"
import { ScanFace, Upload, CheckCircle2, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function FaceRecognitionForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [faceEncoding, setFaceEncoding] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    department: "",
  })

  const handleScanFace = () => {
    setIsScanning(true)
    // Simulate face scanning/encoding generation
    setTimeout(() => {
      // Generate a mock vector (128-d float array as string)
      const mockVector = Array.from({ length: 128 }, () => Math.random().toFixed(4))
      setFaceEncoding(JSON.stringify(mockVector))
      setIsScanning(false)
      toast({
        title: "Face Scanned Successfully",
        description: "Biometric data has been generated and attached.",
        variant: "default",
      })
    }, 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!faceEncoding) {
      toast({
        title: "Missing Face Data",
        description: "Please scan or upload face data before submitting.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // In a real app, this would be:
      // const response = await fetch('http://127.0.0.1:8000/api/persons/', { ... })

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("Submitting to Django Backend:", {
        ...formData,
        face_encoding: JSON.parse(faceEncoding),
      })

      toast({
        title: "Person Registered",
        description: `${formData.name} has been added to the ${formData.department} department.`,
        className: "bg-green-900 border-green-800 text-white",
      })

      // Reset form
      setFormData({ name: "", department: "" })
      setFaceEncoding(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to the server.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-slate-300">
              Full Name
            </label>
            <input
              id="name"
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Jane Doe"
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="department" className="text-sm font-medium text-slate-300">
              Department
            </label>
            <select
              id="department"
              required
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select Department
              </option>
              <option value="Engineering">Engineering</option>
              <option value="HR">HR</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Biometric Data</label>
          <div
            className={`relative flex h-48 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${faceEncoding ? "border-green-500/50 bg-green-500/5" : "border-slate-700 bg-slate-950 hover:bg-slate-900"}`}
          >
            {faceEncoding ? (
              <div className="flex flex-col items-center text-green-500">
                <CheckCircle2 className="h-12 w-12 mb-2" />
                <span className="font-medium">Face Encoding Generated</span>
                <span className="text-xs text-slate-500 mt-1">Vector data ready for submission</span>
                <button
                  type="button"
                  onClick={() => setFaceEncoding(null)}
                  className="mt-4 text-xs text-slate-400 hover:text-white underline"
                >
                  Reset Data
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                {isScanning ? (
                  <div className="flex flex-col items-center text-blue-500">
                    <Loader2 className="h-10 w-10 animate-spin mb-2" />
                    <span className="text-sm">Processing facial features...</span>
                  </div>
                ) : (
                  <>
                    <ScanFace className="h-10 w-10 text-slate-500 mb-2" />
                    <button
                      type="button"
                      onClick={handleScanFace}
                      className="rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 transition-colors"
                    >
                      Simulate Face Scan
                    </button>
                    <p className="mt-2 text-xs text-slate-500">Click to generate mock vector data</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isLoading || !faceEncoding}
            className="flex items-center rounded-md bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Register Person
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
