"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import api from "@/lib/axios";
import { toast, Toaster } from "react-hot-toast";

export default function AddNewBlog() {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState<string | null>(null); // store Base64 string
    const [isMain, setIsMain] = useState(false);
    const [categoryData, setCategoryData] = useState<any[]>([])

    useEffect(() => {
        async function getCategory() {
            try {
                const response = await api.get("/api/blog/get/all/blogCategory");
                setCategoryData(response.data?.data);
            } catch (error) {

            }
        }
        getCategory();
    }, [])
    // Convert file to Base64
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result as string); // set Base64 string
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async () => {
        const blogData = {
            title,
            category,
            content,
            image, // Base64 string
            isMain: isMain ? "Y" : "N",
        };

        try {
            const response = await api.post("/api/blog/add", blogData);
            if (response.data?.statusCode === 201) {
                toast.success(response.data?.message);
            } else {
                toast.error(response.data?.message);
            }
        } catch (error) {
            toast.error("Somethin wrong.");
        }
    };

    return (
        <Card className="w-full mt-10">
            <Toaster position="top-right" />
            <CardHeader>
                <CardTitle>Add New Blog</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                {/* Title */}
                <div>
                    <Label className="mb-1" htmlFor="title">Title</Label>
                    <Input
                        required
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter blog title"
                    />
                </div>

                {/* Category */}
                <div>
                    <Label className="mb-1" htmlFor="category">Category</Label>
                    <Select
                        value={category}
                        onValueChange={(value) => setCategory(value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            {Array.isArray(categoryData) && categoryData.length !== 0 ? (
                                categoryData.map((data, index) => (
                                    <SelectItem value={data?.category} key={index}>
                                        {data?.category}
                                    </SelectItem>
                                ))
                            ) : (
                                <>no category configured</>
                            )}
                        </SelectContent>

                    </Select>
                </div>

                {/* Content */}
                <div>
                    <Label className="mb-1" htmlFor="content">Content</Label>
                    <Textarea
                        id="content"
                        value={content}
                        className="textarea h-14"
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your blog content"
                    />
                </div>

                {/* Image */}
                <div>
                    <Label className="mb-1" htmlFor="image">Image</Label>
                    <Input
                        required
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>

                {/* isMain */}
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="isMain"
                        checked={isMain}
                        onCheckedChange={(checked) => setIsMain(checked === true)}
                    />
                    <Label className="mb-1" htmlFor="isMain">Main Blog</Label>
                </div>

                <Button className="mt-4" onClick={handleSubmit}>Submit</Button>
            </CardContent>
        </Card>
    );
}
