import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Sesuaikan jika authOptions dibuat terpisah

export default async function AdminDashboardPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md border">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to Admin Dashboard, {session.user?.name || "Admin"}
        </h1>
        <p className="text-gray-600">
          Anda berhasil masuk ke halaman yang diproteksi.
        </p>
      </div>
    </div>
  );
}