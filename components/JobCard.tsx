'use client'

import {useDraggable} from "@dnd-kit/core";
import {
    Button,
    Card,
    CardActions,
    CardHeader,
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
import {MoreVert} from "@mui/icons-material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

type JobCardProps = {
    application: JobApplication,
    onEdit: (application: JobApplication) => void,
    onDelete: (applicationId: string) => void,
}

export default function JobCard({application, onEdit, onDelete}: JobCardProps) {
    const [showJobDetail, setShowJobDetail] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);

    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: application.id,
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    // Helper to prevent drag on button click
    const stopDrag = (event: React.PointerEvent | React.MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = (event: object) => {
        if (event && typeof (event as React.MouseEvent).stopPropagation === 'function') {
            (event as React.MouseEvent).stopPropagation();
        }
        setAnchorEl(null);
    };

    function dateDiffInDays(updatedDate: Date) {
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate.getTime() - updatedDate.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays > 0) {
            return diffDays + " วันที่แล้ว"
        }

        return "วันนี้"
    }

    return (
        <Card variant="elevation" ref={setNodeRef} component="div" {...attributes} sx={{
            mx: 2,
            my: 1,
            width: '100%',
            ...style
        }}>
            <CardHeader
                {...listeners}
                action={
                    <>
                        <IconButton aria-label="settings" onClick={handleMenuClick} onPointerDown={stopDrag}>
                            <MoreVert/>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={menuOpen}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={(e) => { handleMenuClose(e); onEdit(application); }} onPointerDown={stopDrag}>แก้ไขตรงนี้น้า</MenuItem>
                            <MenuItem onClick={(e) => { handleMenuClose(e); onDelete(application.id); }} onPointerDown={stopDrag}>ลบ</MenuItem>
                        </Menu>
                    </>
                }
                title={application.job.company}
                subheader={application.job.title}
                slotProps={{
                    title: {
                        variant: 'h6',
                    },
                    subheader: {}
                }
                }
            />
            <CardActions sx={{justifyContent: 'space-between',}}>
                <Chip label={dateDiffInDays(application.updatedAt)} size="small" color='info' variant='outlined'/>
                <Button
                    size="small"
                    onClick={(event) => { stopDrag(event); setShowJobDetail(true); }}
                    onPointerDown={stopDrag}
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
                            <IconButton aria-label="link" color="primary" onClick={(event) => { stopDrag(event); window.open(application.job.url, '_blank'); }} onPointerDown={stopDrag}>
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
                            สร้างเมื่อ: {application.createdAt.toLocaleString('th-TH')}
                        </Typography>
                        <Typography>
                            แก้ไขเมื่อ: {application.updatedAt.toLocaleString('th-TH')}
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