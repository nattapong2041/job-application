import {useDroppable} from "@dnd-kit/core";
import {Paper, Typography} from "@mui/material";
import JobCard from "@/components/JobCard";
import {ApplicationStatus, ApplicationStatusText, JobApplication} from "@/types";

type StatusBoardProps = {
    status: ApplicationStatus,
    application: JobApplication[]
}
export default function StatusBoard({status, application}: StatusBoardProps) {
    const {isOver, setNodeRef} = useDroppable({
        id: status,
    });
    const style = {
        color: isOver ? 'green' : undefined,
    };


    return (
        <Paper component="div" elevation={1} ref={setNodeRef}
               sx={{
                   px: 2,
                   py: 1,
                   display: 'flex',
                   flexDirection: 'column',
                   justifyContent: 'start',
                   alignItems: 'center',
                   minHeight: 500,
                   minWidth: 250,
                   ...style
               }}>

            <Typography variant="h6" sx={{
                color: 'text.primary',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',

            }}>
                {ApplicationStatusText[status]}
            </Typography>
            {application.map((app) =>
                (<JobCard key={app.id} application={app}/>
                ))}
        </Paper>
    );
}