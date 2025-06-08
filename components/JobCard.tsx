'use client'

import {useDraggable} from "@dnd-kit/core";
import {Button, Card, CardActions, CardContent, Chip, Typography} from "@mui/material";
import {JobApplication} from "@/types";


export default function JobCard({application}: { application: JobApplication }) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: application.id,
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;
    return (
        <Card variant="elevation" ref={setNodeRef} component="div" {...listeners} {...attributes} sx={{
            mx: 2,
            my: 1,
            width: '100%',
            ...style
        }}>
            <CardContent>
                <Typography gutterBottom variant="subtitle1" component="div">
                    {application.job.company}
                </Typography>
                <Typography variant="body1" sx={{color: 'text.secondary'}}>
                    {application.job.title}
                </Typography>
            </CardContent>
            <CardActions sx={{justifyContent: 'space-between',}}>
                <Chip label="2 days ago" size="small" color='info' />
                <Button size="small">เพิ่มเติม</Button>
            </CardActions>
        </Card>
    )
}