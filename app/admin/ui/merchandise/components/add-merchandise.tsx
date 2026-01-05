"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, DollarSign, Tag, ImagePlus, Shirt, Box, X } from "lucide-react"
import api from "@/lib/axios"
import toast from "react-hot-toast"

interface AddNewMerchandiseProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export function AddNewMerchandise({ onSuccess, onCancel }: AddNewMerchandiseProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    size: "",
    status: "ACTIVE",
  })
  const [imagePreview, setImagePreview] = useState<string>("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImagePreview("")
    setImageFile(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
        size: formData.size,
        status: formData.status,
        image: imagePreview || "",
      }

      await api.post("/api/merchandise/create", payload)
      toast.success("Merchandise added successfully!")

      // Reset form
      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
        stock: "",
        size: "",
        status: "ACTIVE",
      })
      setImagePreview("")
      setImageFile(null)

      onSuccess?.()
    } catch (error) {
      console.error("[v0] Error creating merchandise:", error)
      toast.error("Failed to add merchandise. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClear = () => {
    setFormData({
      name: "",
      description: "",
      category: "",
      price: "",
      stock: "",
      size: "",
      status: "ACTIVE",
    })
    setImagePreview("")
    setImageFile(null)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Add New Merchandise</h2>
        <p className="text-sm text-muted-foreground">Create a new product listing for customers to purchase</p>
      </div>

      {/* Basic Information */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Package className="h-4 w-4 text-muted-foreground" />
          <span>Product Information</span>
        </div>

        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              placeholder="e.g., SFU Party Official T-Shirt"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your product..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="resize-none"
              required
            />
            <p className="text-xs text-muted-foreground">{formData.description.length} characters</p>
          </div>
        </div>
      </div>

      {/* Category & Pricing */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Tag className="h-4 w-4 text-muted-foreground" />
          <span>Category & Pricing</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              placeholder="e.g., Apparel, Accessories"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price (KES)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="price"
                type="number"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="pl-9"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Size & Inventory */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Box className="h-4 w-4 text-muted-foreground" />
          <span>Size & Inventory</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="size">Size</Label>
            <Select value={formData.size} onValueChange={(value: string) => setFormData({ ...formData, size: value })}>
              <SelectTrigger id="size">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="XS">XS</SelectItem>
                <SelectItem value="S">S</SelectItem>
                <SelectItem value="M">M</SelectItem>
                <SelectItem value="L">L</SelectItem>
                <SelectItem value="XL">XL</SelectItem>
                <SelectItem value="XXL">XXL</SelectItem>
                <SelectItem value="One Size">One Size</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stock">Stock Quantity</Label>
            <Input
              id="stock"
              type="number"
              placeholder="0"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              min="0"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value: string) => setFormData({ ...formData, status: value })}>
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Image Upload */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <ImagePlus className="h-4 w-4 text-muted-foreground" />
          <span>Product Image</span>
        </div>

        <div className="space-y-4">
          {!imagePreview ? (
            <label
              htmlFor="image-upload"
              className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/20 p-12 transition-colors hover:border-muted-foreground/50 hover:bg-muted/30"
            >
              <Shirt className="h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-sm font-medium">Click to upload product image</p>
              <p className="mt-1 text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
              <Input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          ) : (
            <div className="relative overflow-hidden rounded-lg border bg-muted/20">
              <img
                src={imagePreview || "/placeholder.svg"}
                alt="Product preview"
                className="h-64 w-full object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2 h-8 w-8"
                onClick={removeImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel || handleClear} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="button" variant="ghost" onClick={handleClear} disabled={isSubmitting}>
          Clear Form
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Merchandise"}
        </Button>
      </div>
    </form>
  )
}
