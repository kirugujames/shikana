"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Upload,
  FileText,
  MapPin,
  Tag,
  ImageIcon,
} from "lucide-react"
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
    isMainEvent: false,
    isPaid: false,
    amount: "",
  }

  const [formData, setFormData] = useState(initialFormState)
  const [fileName, setFileName] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const isFormValid =
  Boolean(
    formData.event_type &&
    formData.title &&
    formData.event_date &&
    formData.from_time &&
    formData.to_time &&
    formData.location
  ) &&
  (!formData.isPaid || Boolean(formData.amount))


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

    if (formData.isPaid && !formData.amount) {
      toast.error("Please enter the amount for a paid event")
      return
    }

    const payload = {
      ...formData,
      paid: formData.isPaid,
      amount: formData.isPaid ? Number(formData.amount) : 0,
    }

    try {
      setSubmitting(true)

      const response = await api.post("/api/events/add", payload)

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
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="w-full px-1">
      <div className="pb-4 mb-6 border-b">
        <h2 className="text-2xl font-semibold">Create New Event</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Fill in the details below to add a new event to the calendar
        </p>
      </div>

      <div className="space-y-6 pb-4">
        {/* Event Type & Title */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Event Type
            </Label>
            <Select value={formData.event_type} onValueChange={handleSelectChange}>
              <SelectTrigger>
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
            <Label className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Event Title
            </Label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input type="date" name="event_date" value={formData.event_date} onChange={handleChange} />
          <Input type="time" name="from_time" value={formData.from_time} onChange={handleChange} />
          <Input type="time" name="to_time" value={formData.to_time} onChange={handleChange} />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Location
          </Label>
          <Input name="location" value={formData.location} onChange={handleChange} />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="min-h-[150px]"
          />

          {/* ✅ CHECKBOXES (AFTER DESCRIPTION) */}
          <div className="flex flex-wrap gap-6 pt-2">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={formData.isMainEvent}
                onCheckedChange={(checked: any) =>
                  setFormData({ ...formData, isMainEvent: !!checked })
                }
              />
              <Label>Main Event</Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                checked={formData.isPaid}
                onCheckedChange={(checked: any) =>
                  setFormData({
                    ...formData,
                    isPaid: !!checked,
                    amount: "",
                  })
                }
              />
              <Label>Paid Event</Label>
            </div>
          </div>

          {/* 💰 Amount (only if paid) */}
          {formData.isPaid && (
            <div className="max-w-xs pt-2">
              <Label>Amount</Label>
              <Input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
              />
            </div>
          )}
        </div>

        {/* Image Upload (unchanged) */}
        {/* <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Event Image
          </Label>

          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="image"
          />

          <Label
            htmlFor="image"
            className="flex items-center justify-center h-24 border-2 border-dashed rounded-lg cursor-pointer"
          >
            {fileName || "Click to upload event image"}
          </Label>
        </div> */}

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

        {/* Actions */}
        <div className="pt-4 border-t flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setFormData(initialFormState)
              setFileName("")
            }}
            disabled={submitting}
          >
            Clear Form
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={!isFormValid || submitting}
          >
            {submitting ? "Creating..." : "Create Event"}
          </Button>
        </div>
      </div>
    </div>
  )
}
