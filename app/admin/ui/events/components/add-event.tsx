"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, MapPin, Calendar, Clock, Tag, ImageIcon } from "lucide-react"
import api from "@/lib/axios"
import { toast } from "react-hot-toast"

type AddNewEventProps = {
  onSuccess?: () => void
}

export default function AddNewEvent({ onSuccess }: AddNewEventProps) {
  const initialFormState = {
    event_type: "",
    title: "",
    event_date: "",
    from_time: "",
    to_time: "",
    location: "",
    description: "",
    image: "",
  }

  const [formData, setFormData] = useState(initialFormState)
  const [fileName, setFileName] = useState<string>("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, event_type: value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    const reader = new FileReader()
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result as string })
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async () => {
    if (
      !formData.event_type ||
      !formData.title ||
      !formData.event_date ||
      !formData.from_time ||
      !formData.to_time ||
      !formData.location
    ) {
      toast.error("Please fill in all required fields")
      return
    }

    try {
      const response = await api.post("/api/events/add", formData)
      if (response.data?.statusCode === 200) {
        toast.success(response.data.message)
        setFormData(initialFormState)
        setFileName("")
        onSuccess?.()
      } else {
        toast.error(response.data.message || "Failed to create event")
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong while creating the event")
    }
  }

  return (
    <div className="w-full px-1">
      <div className="pb-4 mb-6 border-b">
        <h2 className="text-2xl font-semibold text-foreground">Create New Event</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Fill in the details below to add a new event to the calendar
        </p>
      </div>

      <div className="space-y-6 pb-4">
        {/* Event Type and Title Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="event_type" className="flex items-center gap-2 text-sm font-medium">
              <Tag className="h-4 w-4 text-muted-foreground" />
              Event Type
            </Label>
            <Select value={formData.event_type} onValueChange={handleSelectChange}>
              <SelectTrigger className="w-full h-10">
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Conference">Conference</SelectItem>
                <SelectItem value="Workshop">Workshop</SelectItem>
                <SelectItem value="Seminar">Seminar</SelectItem>
                <SelectItem value="Meetup">Meetup</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title" className="flex items-center gap-2 text-sm font-medium">
              <FileText className="h-4 w-4 text-muted-foreground" />
              Event Title
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter event title"
              className="h-10"
            />
          </div>
        </div>

        {/* Date and Time Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="event_date" className="flex items-center gap-2 text-sm font-medium">
              {/* <Calendar className="h-4 w-4 text-muted-foreground" /> */}
              Event Date
            </Label>
            <Input
              id="event_date"
              name="event_date"
              type="date"
              value={formData.event_date}
              onChange={handleChange}
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="from_time" className="flex items-center gap-2 text-sm font-medium">
              {/* <Clock className="h-4 w-4 text-muted-foreground" /> */}
              Start Time
            </Label>
            <Input
              id="from_time"
              name="from_time"
              type="time"
              value={formData.from_time}
              onChange={handleChange}
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="to_time" className="flex items-center gap-2 text-sm font-medium">
              {/* <Clock className="h-4 w-4 text-muted-foreground" /> */}
              End Time
            </Label>
            <Input
              id="to_time"
              name="to_time"
              type="time"
              value={formData.to_time}
              onChange={handleChange}
              className="h-10"
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center gap-2 text-sm font-medium">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            Location
          </Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter event location or venue"
            className="h-10"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="flex items-center gap-2 text-sm font-medium">
            <FileText className="h-4 w-4 text-muted-foreground" />
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide details about the event..."
            className="min-h-[150px] resize-y"
          />
          <p className="text-xs text-muted-foreground">{formData.description.length} characters</p>
        </div>

        {/* Image Upload Section */}
        <div className="space-y-2">
          <Label htmlFor="image" className="flex items-center gap-2 text-sm font-medium">
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
            Event Image
          </Label>
          <div className="relative">
            <Input id="image" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            <Label
              htmlFor="image"
              className="flex items-center justify-center gap-3 h-24 border-2 border-dashed border-muted-foreground/25 rounded-lg hover:border-muted-foreground/50 hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <Upload className="h-5 w-5 text-muted-foreground" />
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">
                  {fileName ? fileName : "Click to upload event image"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF up to 10MB</p>
              </div>
            </Label>
          </div>

          {formData.image && (
            <div className="mt-4 relative rounded-lg overflow-hidden border border-border">
              <img src={formData.image || "/placeholder.svg"} alt="Preview" className="w-full h-48 object-cover" />
              <div className="absolute top-2 right-2">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    setFormData({ ...formData, image: "" })
                    setFileName("")
                  }}
                >
                  Remove
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="pt-4 border-t flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setFormData(initialFormState)
              setFileName("")
            }}
          >
            Clear Form
          </Button>
          <Button onClick={handleSubmit} className="min-w-[120px]">
            Create Event
          </Button>
        </div>
      </div>
    </div>
  )
}
