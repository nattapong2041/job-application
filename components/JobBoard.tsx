'use client'

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import {DndContext, DragEndEvent} from "@dnd-kit/core";
import StatusBoard from "@/components/StatusBoard";
import {ApplicationStatus, getApplicationStatusValues, Job, JobApplication} from "@/types";
import {FormEvent, useState} from "react";

export default function JobBoard() {
    const allStatuses = getApplicationStatusValues();
    const jobs: Job[] = [
        {
            title: "Software Engineer",
            description: "Develop and maintain web applications.",
            company: "Tech Innovations Inc.",
            url: "https://techinnovations.com/careers/se",
        },
        {
            title: "UX/UI Designer",
            description: "Design user-friendly interfaces.",
            company: "Creative Solutions Co.",
            url: "https://creativesolutions.com/jobs/designer",
        },
        {
            title: "Data Analyst",
            description: "Analyze large datasets and provide insights.",
            company: "Data Insights Ltd.",
            url: "https://datainsights.co/careers/data-analyst",
        },
        {
            title: "Product Manager",
            description: "Lead product development from conception to launch.",
            company: "Innovate Global",
            url: "https://innovateglobal.com/pm-role",
        },
    ];

    const [openCreate, setOpenCreate] = useState(false);
    const [applications, setApplications] = useState<JobApplication[]>
    ([
        {
            id: "app-001",
            job: jobs[0], // Software Engineer
            status: ApplicationStatus.PENDING,
            createdAt: new Date("2025-05-20T10:00:00Z"),
            updatedAt: new Date("2025-05-20T10:00:00Z"),
        },
        {
            id: "app-002",
            job: jobs[1], // UX/UI Designer
            status: ApplicationStatus.SCHEDULED_INTERVIEW,
            createdAt: new Date("2025-05-15T11:30:00Z"),
            updatedAt: new Date("2025-06-01T14:00:00Z"),
        },
        {
            id: "app-003",
            job: jobs[2], // Data Analyst
            status: ApplicationStatus.PENDING,
            createdAt: new Date("2025-06-05T09:15:00Z"),
            updatedAt: new Date("2025-06-05T09:15:00Z"),
        },
        {
            id: "app-004",
            job: jobs[0], // Software Engineer (อีกใบ)
            status: ApplicationStatus.INTERVIEWED,
            createdAt: new Date("2025-05-22T13:00:00Z"),
            updatedAt: new Date("2025-06-03T10:30:00Z"),
        },
        {
            id: "app-005",
            job: jobs[3], // Product Manager
            status: ApplicationStatus.PASSED,
            createdAt: new Date("2025-04-10T09:00:00Z"),
            updatedAt: new Date("2025-05-25T16:00:00Z"),
        },
        {
            id: "app-006",
            job: jobs[1], // UX/UI Designer (อีกใบ)
            status: ApplicationStatus.INTERVIEWED,
            createdAt: new Date("2025-05-01T10:00:00Z"),
            updatedAt: new Date("2025-05-10T11:00:00Z"),
        },
    ]);

    function handleDragEnd(event: DragEndEvent) {
        const {active, over} = event;

        if (!over) return;

        const jobId = active.id;
        const newStatus = over.id as ApplicationStatus;

        setApplications(prevApplications =>
            prevApplications.map(app =>
                app.id === jobId
                    ? {...app, status: newStatus}
                    : app
            )
        );
    }

    function handleCreateJob() {
        setOpenCreate(true);
    }

    function handleClose() {
        setOpenCreate(false);
    }

    return (
        <Box component="section" sx={{
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
        }}>
            <Button variant="contained" sx={{
                mx: 2
            }} onClick={handleCreateJob}>สร้างงาน</Button>
            <JobCreateDialog/>
            <Box component="section" sx={{
                maxWidth: '100%',
                mx: 'auto',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                overflowX: 'auto',
                gap: 2,
                p: 2,
            }}>
                <DndContext onDragEnd={handleDragEnd}>
                    {allStatuses.map((status) => (
                        <StatusBoard
                            key={status}
                            status={status}
                            application={applications.filter((app) =>
                                app.status === status)}/>

                    ))}
                </DndContext>
            </Box>
        </Box>
    );

    function JobCreateDialog() {
        return (
            <Dialog open={openCreate} onClose={handleClose} slotProps={{
                paper: {
                    component: 'form',
                    onSubmit: (event: FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());

                        const newApplication: JobApplication = {
                            id: `app-${Date.now()}`,
                            job: {
                                title: formJson.title,
                                description: formJson.description,
                                company: formJson.company,
                                url: formJson.url
                            },
                            status: ApplicationStatus.PENDING,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        };

                        setApplications(prev => [...prev, newApplication]);
                        handleClose();
                    },
                },
            }}>
                <DialogTitle>สร้างใบสมัครงานใหม่</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 2 }}>
                        กรุณากรอกรายละเอียดงานที่ต้องการสมัคร
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="title"
                        name="title"
                        label="ตำแหน่งงาน"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        required
                        margin="dense"
                        id="company"
                        name="company"
                        label="บริษัท"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        required
                        margin="dense"
                        id="description"
                        name="description"
                        label="รายละเอียดงาน"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                    />
                    <TextField
                        required
                        margin="dense"
                        id="url"
                        name="url"
                        label="URL ประกาศรับสมัคร"
                        type="url"
                        fullWidth
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>ยกเลิก</Button>
                    <Button type="submit" variant="contained">สร้างใบสมัคร</Button>
                </DialogActions>
            </Dialog>
        );
    }

}

