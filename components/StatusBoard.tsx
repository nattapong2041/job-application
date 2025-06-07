import {useDroppable} from "@dnd-kit/core";
import {Box, Typography} from "@mui/material";
import JobCard from "@/components/JobCard";

export default function StatusBoard({status}: { status: number }) {
    const {isOver, setNodeRef} = useDroppable({
        id: status,
    });
    const style = {
        color: isOver ? 'green' : undefined,
    };


    return (
        <Box component="div" ref={setNodeRef}
             sx={{
                 mx: 2,
                 my: 1,
                 display: 'flex',
                 flexDirection: 'column',
                 justifyContent: 'center',
                 alignItems: 'center',
                 ...style
             }}>
            <Typography variant="h5">
                {status}
            </Typography>
            <JobCard status={status} id={1}/>
            <JobCard status={status} id={2}/>
        </Box>
    );
}