"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import api from "@/lib/axios";
import toast, { Toaster } from "react-hot-toast";

export default function EventsForm() {
  const initialFormState = {
    event_type: "",
    title: "",
    sub_title: "",
    event_date: "",
    from_time: "",
    to_time: "",
    location: "",
    description: "",
    image: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, event_type: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);

    try {
      const response = await api.post("/api/events/add", formData); // Note the leading "/"
      if (response.data?.statusCode === 200) {
        toast.success(response.data.message);
        setFormData(initialFormState); // Clear form after success
      } else {
        toast.error(response.data.message || "Failed to submit");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while submitting.");
    }
  };

  return (
    <Card className="mt-10 p-6">
      <Toaster  position="top-right"/>
      <CardContent>
        <form  className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          {/* Event Type */}
          <div className="mb-0">
            <Label htmlFor="event_type" className="mb-2 block">Event Type</Label>
            <Select value={formData.event_type} onValueChange={handleSelectChange}>
              <SelectTrigger className="w-full">
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

          {/* Title */}
          <div className="mb-0">
            <Label htmlFor="title" className="mb-2 block">Title</Label>
            <Input id="title" name="title" value={formData.title} onChange={handleChange} className="w-full" />
          </div>

          {/* Sub Title */}
          <div className="mb-0">
            <Label htmlFor="sub_title" className="mb-2 block">Sub Title</Label>
            <Input id="sub_title" name="sub_title" value={formData.sub_title} onChange={handleChange} className="w-full" />
          </div>

          {/* Event Date */}
          <div className="mb-0">
            <Label htmlFor="event_date" className="mb-2 block">Event Date</Label>
            <Input id="event_date" name="event_date" type="date" value={formData.event_date} onChange={handleChange} className="w-full" />
          </div>

          {/* From Time */}
          <div className="mb-0">
            <Label htmlFor="from_time" className="mb-2 block">From Time</Label>
            <Input id="from_time" name="from_time" type="time" value={formData.from_time} onChange={handleChange} className="w-full" />
          </div>

          {/* To Time */}
          <div className="mb-0">
            <Label htmlFor="to_time" className="mb-2 block">To Time</Label>
            <Input id="to_time" name="to_time" type="time" value={formData.to_time} onChange={handleChange} className="w-full" />
          </div>

          {/* Location */}
          <div className="mb-0">
            <Label htmlFor="location" className="mb-2 block">Location</Label>
            <Input id="location" name="location" value={formData.location} onChange={handleChange} className="w-full" />
          </div>

          {/* Description */}
          <div className="mb-0">
            <Label htmlFor="description" className="mb-2 block">Description</Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full border textarea h-14 rounded p-2"
            />
          </div>

          {/* Image Upload */}
          <div className="mb-0">
            <Label htmlFor="image" className="mb-2 block">Image Upload</Label>
            <Input type="file" id="image" accept="image/*" onChange={handleFileChange} className="w-full" />
            {formData.image && <img src={formData.image} alt="Preview" className="mt-2 max-h-48 rounded" />}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <Button onClick={(e:any)=>handleSubmit(e)} className="w-full mt-4">Submit</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
