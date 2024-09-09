"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useCreateWorkspace } from "../api/use-create-workspace"

export const CreateWorkspaceModal = () => {
    const router = useRouter()
    const [open, setOpen] = useCreateWorkspaceModal()
    const [name, setName] = useState<string>("")

    const { mutate, isPending, isSuccess, isError, isSettled } = useCreateWorkspace()

    const handleClose = () => {
        setOpen(false)
        setName("")
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutate({ name }, {
            onSuccess: (data) => {
                handleClose()
                router.push(`/workspace/${data}`)
            }
        })
    }

    return (
        <>
            <Dialog open={open} onOpenChange={handleClose}>
                <DialogContent className="outline-none border-none">
                    <DialogHeader>
                        <DialogTitle>Add a workspace</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <Input
                            value={name}
                            disabled={false}
                            required
                            autoFocus
                            minLength={3}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Workspace name e.g. 'Work', 'Personal', 'Home'"
                        />
                        <div className="flex justify-end">
                            <Button type="submit" disabled={false}>
                                {isPending ? "Creating..." : "Create"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}