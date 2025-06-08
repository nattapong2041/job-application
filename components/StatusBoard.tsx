import {useDroppable} from "@dnd-kit/core";
import {Box, Paper, Typography} from "@mui/material";
import JobCard from "@/components/JobCard";

export default function StatusBoard({status}: { status: string }) {
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
                {status}
            </Typography>
            <JobCard status={1} id={1}/>
            <JobCard status={2} id={2}/>
        </Paper>
    );
}