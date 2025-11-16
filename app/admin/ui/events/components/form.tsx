import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { useForm, Controller } from "react-hook-form"
type EventFormData = {
    event_type: string;
    title: string;
    sub_title: string;
    event_date: string;
    from_time: string;
    to_time: string;
    location: string;
    description: string;
    image: FileList;
};
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import api from "@/lib/axios";
import { Spinner } from "@/components/ui/spinner";
interface EventsFormProps {
    onRefreshMyPage?: (data: boolean) => void
}
export default function EventsForm({ onRefreshMyPage }: EventsFormProps) {
    const { register, handleSubmit, control, reset } = useForm<EventFormData>();
    const [date, setDate] = useState<Date | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const onSubmit = async (data: EventFormData) => {
        setIsLoading(true);
        try {
            if (!date) {
                toast.error("Event date is required");
                setIsLoading(false);
                return;
            }

            if (data.image && data.image.length > 0) {
                const file = data.image[0];

                const base64Image = await new Promise<string | ArrayBuffer | null>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.onerror = () => reject(new Error("Failed to read file"));
                    reader.readAsDataURL(file);
                });

                const finalData = { ...data, image: base64Image, event_date: date };
                if (finalData) {
                    setIsLoading(false);
                    console.log("my data", finalData)
                    const response = await api.post("/api/events/add", finalData, {
                        validateStatus: () => true
                    });
                    console.log(response);
                    if (response.data.statusCode != 200) {
                        toast.error(response.data?.message)
                    }
                    onRefreshMyPage?.(true);
                    toast.success(response.data?.message)
                }
            } else {
                setIsLoading(false);
                toast.error("No image provided");
            }
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <Toaster position="top-right" />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4  p-4 bg-white rounded-lg shadow">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/2">
                        <Label className="mb-2">Event Type</Label>
                        <Input className="" {...register("event_type", { required: true })} placeholder="Event Type" />
                    </div>

                    <div className="md:w-1/2">
                        <Label className="mb-2">Title</Label>
                        <Input className="" {...register("title", { required: true })} placeholder="Event Title" />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/2">
                        <Label className="mb-2">Sub Title</Label>
                        <Input className="" {...register("sub_title")} placeholder="Event Subtitle" />
                    </div>
                    <div className="md:w-1/2 flex flex-col gap-3">
                        <Label htmlFor="date" className="px-1">
                            Event Date
                        </Label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    id="date"
                                    className="w-full justify-between font-normal"
                                >
                                    {date ? date.toLocaleDateString() : "Select date"}
                                    <ChevronDownIcon />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                        setDate(date);
                                        setOpen(false);
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div className="flex md:flex-row flex-col gap-4">
                    <div className="md:w-1/2">
                        <Label className="mb-2">From Time</Label>
                        <Input className="" type="time" {...register("from_time", { required: true })} />
                    </div>
                    <div className="md:w-1/2">
                        <Label className="mb-2">To Time</Label>
                        <Input className="" type="time" {...register("to_time", { required: true })} />
                    </div>
                </div>
                <div className="flex md:flex-row flex-col gap-4">
                    <div className="md:w-1/2">
                        <Label className="mb-2">Location</Label>
                        <Input className="" {...register("location")} placeholder="Event Location" />
                    </div>
                    <div className="md:w-1/2">
                        <Label className="mb-2">Image</Label>
                        <Input className="" type="file" {...register("image")} accept="image/*" />
                    </div>
                </div>
                <div className="md:w-1/2">
                    <Label className="mb-2">Description</Label>
                    <Textarea {...register("description")} placeholder="Event Description" rows={4} />
                </div>
                <Button className="md:w-[200px] w-1/2">{isLoading ? <Spinner /> : "Submit"}</Button>
            </form>
        </>
    )
};
