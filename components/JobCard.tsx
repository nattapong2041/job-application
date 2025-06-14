'use client'

import {useDraggable} from "@dnd-kit/core";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography
} from "@mui/material";
import LinkIcon from '@mui/icons-material/Link';
import {ApplicationStatusText, JobApplication} from "@/types";
import {useState} from "react";


export default function JobCard({application}: { application: JobApplication }) {
    const [showJobDetail, setShowJobDetail] = useState(false);

    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: application.id,
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    function dateDiffInDays(updatedDate: Date) {
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate.getTime() - updatedDate.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
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
                <Chip label={dateDiffInDays(application.updatedAt) + " days ago"} size="small" color='info' variant='outlined'/>
                <Button
                    size="small"
                    onClick={() => {
                        setShowJobDetail(true)
                    }}
                    onPointerDown={(event) => event.stopPropagation()}
                >
                    เพิ่มเติม</Button>
                <Dialog open={showJobDetail} onClose={() => setShowJobDetail(false)}>
                    <DialogTitle sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        {application.job.company}
                        <Chip label={ApplicationStatusText[application.status]} size="small" color='info'/>
                    </DialogTitle>
                    <DialogContent dividers>
                        <Typography variant="h6">
                            {application.job.title}
                            <IconButton aria-label="link" color="primary" onClick={() => {
                                window.open(application.job.url, '_blank');
                            }} onPointerDown={(event) => event.stopPropagation()}>
                                <LinkIcon/>
                            </IconButton>
                        </Typography>
                        <Typography>
                            NOTE: {application.job.description}
                        </Typography>
                        <Typography sx={{
                            my: 2
                        }}>
                            สถานะ: {ApplicationStatusText[application.status]}
                        </Typography>
                        <Typography>
                            สร้างเมื่อ: {application.createdAt.toLocaleString()}
                        </Typography>
                        <Typography>
                            แก้ไขเมื่อ: {application.updatedAt.toLocaleString()}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                setShowJobDetail(false)
                            }}
                            onPointerDown={(event) => event.stopPropagation()}
                        >
                            ปิด
                        </Button>
                    </DialogActions>
                </Dialog>
            </CardActions>
        </Card>
    )
}