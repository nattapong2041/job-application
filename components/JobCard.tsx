'use client'

import {useDraggable} from "@dnd-kit/core";
import {Card, CardContent, Typography} from "@mui/material";

export default function JobCard({status, id}: { status: number, id: number }) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: id,
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;
    return (
        <Card variant="outlined" ref={setNodeRef} component="div" {...listeners} {...attributes} sx={{
            mx: 2,
            my: 1,
            minWidth: 275,
            ...style
        }}>
            <CardContent>
                <Typography variant="body1" sx={{color: 'text.secondary'}}>
                    Lineman Wongnai id{id}
                </Typography>
                <Typography variant="body1" sx={{color: 'text.secondary'}}>
                    สถานะ {status}
                </Typography>
            </CardContent>
        </Card>
    )
}