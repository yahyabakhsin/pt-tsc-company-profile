import { Container } from "@/components/shared/container";
import { Heading } from "@/components/shared/heading";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/empty-state";
import { contactService } from "@/server/services/contact.service";
import { Mail, Briefcase, FileText, CheckCircle2 } from "lucide-react";
import { ContactMessage } from "@prisma/client";

export const revalidate = 0; // Disable caching for fresh data

export default async function AdminDashboardPage() {
  let messages: ContactMessage[] = [];
  try {
    messages = await contactService.getInquiries();
  } catch (error) {
    console.error("Failed to retrieve inquiries:", error);
  }

  // Dashboard Stats Mock
  const stats = [
    {
      title: "Total Inquiries",
      value: messages.length,
      icon: <Mail className="h-5 w-5 text-primary" />,
    },
    {
      title: "Active Leads",
      value: messages.filter((m) => m.status === "UNREAD" || m.status === "IN_PROGRESS").length,
      icon: <Briefcase className="h-5 w-5 text-amber-500" />,
    },
    {
      title: "Resolved Issues",
      value: messages.filter((m) => m.status === "RESOLVED").length,
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
    },
  ];

  return (
    <Container className="py-12">
      <Heading
        level={1}
        subtitle="Manage PT TSC digital company profile details, projects, and leads generated through the site."
        className="mb-8"
      >
        Operations Control Center
      </Heading>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <span className="text-sm font-medium text-gray-400">{stat.title}</span>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Leads List Section */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <span>Industrial Inquiries & Leads Log</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {messages.length === 0 ? (
            <EmptyState
              title="No Inquiries Captured"
              description="New inquiries from factory managers and procurement agents will show up here."
            />
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-4 rounded-md bg-[#0b0e14]/40 border border-border flex flex-col md:flex-row md:items-start justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-white font-semibold text-sm">{msg.name}</span>
                      {msg.company && (
                        <span className="text-xs text-gray-500 font-mono">({msg.company})</span>
                      )}
                      <Badge
                        variant={
                          msg.status === "UNREAD"
                            ? "warning"
                            : msg.status === "RESOLVED"
                            ? "success"
                            : "primary"
                        }
                      >
                        {msg.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-400">
                      Email: <span className="text-gray-300">{msg.email}</span>{" "}
                      {msg.phone && (
                        <>
                          | Phone: <span className="text-gray-300">{msg.phone}</span>
                        </>
                      )}
                    </p>
                    <p className="text-xs text-gray-500 font-semibold">Subject: {msg.subject}</p>
                    <p className="text-sm text-gray-300 bg-[#080a0f] p-3 rounded-md font-sans border border-border/20 leading-relaxed max-w-3xl whitespace-pre-wrap">
                      {msg.message}
                    </p>
                  </div>
                  <div className="text-xs text-gray-600 shrink-0">
                    {new Date(msg.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
