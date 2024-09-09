interface WorkSpaceIdPageProps {
    params: {
        workspaceId: string
    }
}

const WorkSpaceId = ({ params } : WorkSpaceIdPageProps) => {
    return (
        <>
            ID: {params.workspaceId}
        </>
    )
}

export default WorkSpaceId