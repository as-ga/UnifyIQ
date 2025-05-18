"use client";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Profile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>You are not authenticated</div>;
  }

  return (
    <div className="bg-[#BCDDFC] container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="mb-4">
        <strong>Name:</strong> {session?.user.name}
      </div>
      <div className="mb-4">
        <strong>Email:</strong> {session?.user.email}
      </div>
      <Button
        onClick={() => {
          signOut({ callbackUrl: "/" })
            .then(() => toast.success("You have successfully signed out!"))
            .catch((error) => toast.error(`Sign out failed: ${error.message}`));
        }}
        className="mt-4 cursor-pointer"
      >
        Sign Out
      </Button>
      <div className="mt-4">
        <strong>Session Data:</strong>
        <pre className="bg-gray-100 p-2 rounded">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </div>
  );
}
