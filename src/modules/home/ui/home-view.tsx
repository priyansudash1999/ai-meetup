"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const HomeView = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  if (!session) {
    return <p>loading...</p>;
  }

  if (session) {
    return (
      <div className="flex flex-col p-4 gap-y-5">
        <p>Hello {session.user.name}</p>
        <Button
          onClick={() =>
            authClient.signOut({
              fetchOptions: { onSuccess: () => router.push("/signIn") },
            })
          }
        >
          Sign Out
        </Button>
      </div>
    );
  }
};
