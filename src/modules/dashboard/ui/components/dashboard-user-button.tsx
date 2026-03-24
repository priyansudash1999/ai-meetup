import { GeneratedAvatar } from "@/components/generated_avatatar";
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import { ChevronDownIcon, CreditCardIcon, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const DashboardUserButton = () => {
  const { data, isPending } = authClient.useSession();
  const router = useRouter()
  const onLogout = () => {
     authClient.signOut({
      fetchOptions:{
        onSuccess: () => {
          router.push("/signIn")
        }
      }
    })
  }
  if (isPending || !data?.user) {
    return null;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden">
        {data?.user.image ? (
          <Avatar>
            <AvatarImage src={data?.user.image} />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={data?.user.name}
            variant="initials"
            className="size-9 mr-9"
          />
        )}
        <div className="flex flex-col gap-0.5 text-left ml-1 overflow-hidden flex-1 min-w-0">
          <p className="text-sm truncate w-full">{data?.user.name}</p>
          <p className="text-xs truncate w-full">{data?.user.email}</p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0"/>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium truncate">{data?.user.name}</span>
            <span className="text-sm font-normal text-muted-foreground truncate">{data?.user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
          Billing
          <CreditCardIcon />
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between" onClick={onLogout}>
          Logout
          <LogOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
