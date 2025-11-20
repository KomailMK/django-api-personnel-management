"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Person {
  id: number
  name: string
  department: string
  face_encoding: number[]
  created_at: string
  updated_at: string
}

export function DatabaseView() {
  const [data, setData] = useState<Person[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      // In a real environment, this would point to your Django API
      // For demo purposes, we'll try to fetch, but fallback to empty if it fails
      const response = await fetch("http://localhost:8000/api/personnel/")

      if (!response.ok) {
        throw new Error("Failed to fetch data from backend")
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      console.error("Error fetching data:", err)
      setError("Could not connect to the database. Ensure the Django backend is running.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Personnel Database</CardTitle>
          <CardDescription>View and manage all registered biometric data records.</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Connection Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="rounded-md border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading records...
                    </div>
                  </TableCell>
                </TableRow>
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    No records found in the database.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((person) => (
                  <TableRow key={person.id}>
                    <TableCell className="font-medium">{person.id}</TableCell>
                    <TableCell>{person.name}</TableCell>
                    <TableCell>{person.department}</TableCell>
                    <TableCell>{new Date(person.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                        Active
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
