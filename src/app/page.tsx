"use client";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/features/auth/components/user-button";
import { useAuthActions } from "@convex-dev/auth/react";
import { useGetWorkSpaces } from "@/features/worksapces/api/use-get-workspaces";
import { useEffect, useMemo } from "react";
import { useCreateWorkspaceModal } from "@/features/worksapces/store/use-create-workspace-modal";
import { useRouter } from "next/navigation";

export default function Home() {
  const router =  useRouter()
  const [open, setOpen] = useCreateWorkspaceModal();
  const { data, isLoading } = useGetWorkSpaces();
  const workSpaceId = useMemo(() => {
    return data?.[0]?._id
  }, [data])

  useEffect(() => {

    if (isLoading) return;

    if (workSpaceId) {
        router.replace(`/workspace/${workSpaceId}`)
        setOpen(false)
    } else if(!open) {
        setOpen(true)
    }

  }, [workSpaceId, isLoading, open, setOpen, router])

  return (
    <>
      <UserButton />
    </>
  );
}
