"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactInput } from "@/server/validators/contact.validator";
import { Container } from "@/components/shared/container";
import { Heading } from "@/components/shared/heading";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [submitting, setSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      companyName: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactInput) => {
    setSubmitting(true);
    try {
      const response = await axios.post("/api/contact", data);
      if (response.data.success) {
        toast.success("Lead registered successfully. Our engineers will follow up!");
        reset();
      } else {
        toast.error(response.data.error || "Failed to submit message");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Connection error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="py-12">
      <Heading
        level={1}
        subtitle="Let's discuss your automation challenges. Our engineers will review your telemetry or logic requests."
        className="mb-10"
      >
        Inquire Technical Services
      </Heading>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Details */}
        <div className="space-y-6">
          <Card className="bg-[#0b0e14]/40 border-border">
            <CardHeader>
              <CardTitle className="text-lg">Engineering Office</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-gray-400">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Kawasan Industri Surabaya, Blok C-12, Surabaya, Jawa Timur, Indonesia</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+62 31 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>info@tirtasuryacipta.com</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lead Capture Form */}
        <div className="lg:col-span-2">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-xl">Technical Inquiry Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-medium">Contact Name *</label>
                    <input {...register("fullName")} placeholder="John Doe" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                    {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-medium">Work Email *</label>
                    <input {...register("email")} type="email" placeholder="john@company.com" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-medium">Company Name</label>
                    <input {...register("companyName")} placeholder="PT Manufacturing Indonesia" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                    {errors.companyName && <p className="text-xs text-red-500">{errors.companyName.message}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-medium">Phone Number</label>
                    <input {...register("phone")} placeholder="+62..." className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                    {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-medium">Inquiry Subject</label>
                  <input {...register("subject")} placeholder="PLC Logic Retrofit / SCADA System Config" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                  {errors.subject && <p className="text-xs text-red-500">{errors.subject.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-medium">Automation Requirements *</label>
                  <textarea
                    {...register("message")}
                    placeholder="Describe your control systems, logic processors, panel design requirements, or specific downtime concerns..."
                    rows={5}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
                </div>

                <Button type="submit" disabled={submitting} className="w-full md:w-auto">
                  {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Submit Inquiry
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
}
