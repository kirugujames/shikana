"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/axios";
import toast, { Toaster } from "react-hot-toast";

export default function CategoryForm() {
    const [category, setCategory] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post("api/blog/add/create/blogCategory", { category })
            if (response.data?.statusCode == 200) {
                toast.success(response.data?.message);
                setCategory("");
            }
            else {
                toast.error(response.data?.message);

            }
        } catch (error) {
            toast.error("something wrong happened");

        }
    };

    return (
        <Card className="mt-10 p-6">
            <Toaster position="top-right" />
            <CardHeader>
                <CardTitle>Add Category</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-col">
                    <div className="mb-4 w-full md:w-1/2">
                        <Label htmlFor="category" className="mb-2 block">
                            Category
                        </Label>
                        <Input
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="Enter category"
                            required
                            className="w-full"
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit" className="w-full md:w-1/3 md:mt-4">
                            Submit
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
