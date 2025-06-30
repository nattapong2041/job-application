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
import {FormEvent, useEffect, useState} from "react";
import {createJob, getApplications, updateApplication, deleteApplication} from "@/firebase/firestore-service";
import {onAuthStateChanged, User} from "firebase/auth";
import {auth} from "@/firebase/firebase";

interface JobFormData {
    title: string;
    description: string;
    company: string;
    url: string;
}


export default function JobBoard() {
    const allStatuses = getApplicationStatusValues();
    const [openCreate, setOpenCreate] = useState(false);
    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [editJob, setEditJob] = useState<JobApplication | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!user) return;
        getApplications(user.uid).then(applications => {
            setApplications(applications);
        })
    }, [user]);

    const refreshApplications = async () => {
        if (user) {
            try {
                const fetchedApplications = await getApplications(user.uid);
                setApplications(fetchedApplications);
            } catch (err) {
                console.error("Error refreshing applications:", err);
            }
        }
    };

    async function handleDragEnd(event: DragEndEvent) {
        const {active, over} = event;

        if (!over) return;

        const jobId = active.id;
        const newStatus = over.id as ApplicationStatus;

        applications.map(async (app) => {
            if (app.id === jobId) {
                if (user) {
                    try {
                        await updateApplication(user.uid, app.id, newStatus);
                        refreshApplications().then(() => {
                            }
                        )
                    } catch (err) {
                        console.error("Error refreshing applications:", err);
                    }
                }

            }
        })
    }

    function handleCreateJob() {
        setOpenCreate(true);
        setEditJob(null);
    }

    function handleClose() {
        setOpenCreate(false);
        setEditJob(null);
    }

    async function handleDeleteJob(applicationId: string) {
        if (!user) return;
        await deleteApplication(user.uid, applicationId);
        await refreshApplications();
    }

    function handleEditJob(application: JobApplication) {
        setEditJob(application);
        setOpenCreate(true);
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
                                app.status === status)}
                            onEdit={handleEditJob}
                            onDelete={handleDeleteJob}
                        />

                    ))}
                </DndContext>
            </Box>
        </Box>
    );

    function JobCreateDialog() {
        const isEdit = Boolean(editJob);
        return (
            <Dialog
                open={openCreate}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick') {
                        handleClose();
                    }
                }}
            >
                <form
                    onSubmit={async (event: FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formEntries = Object.fromEntries(formData.entries()) as Record<keyof JobFormData, string>;

                        const newJob: Job = {
                            title: formEntries.title,
                            description: formEntries.description,
                            company: formEntries.company,
                            url: formEntries.url,
                        };
                        if (isEdit && editJob) {
                            // update job
                            await updateApplication(user!.uid, editJob.id, editJob.status, newJob);
                        } else {
                            await createJob(user!.uid, newJob);
                        }
                        await refreshApplications();
                        handleClose();
                    }}
                >
                    <DialogTitle>{isEdit ? 'แก้ไขใบสมัครงาน' : 'สร้างใบสมัครงานใหม่'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText sx={{mb: 2}}>
                            {isEdit ? 'แก้ไขรายละเอียดงานที่ต้องการสมัคร' : 'กรุณากรอกรายละเอียดงานที่ต้องการสมัคร'}
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
                            defaultValue={isEdit ? editJob?.job.title : ''}
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
                            defaultValue={isEdit ? editJob?.job.company : ''}
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
                            defaultValue={isEdit ? editJob?.job.description : ''}
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
                            defaultValue={isEdit ? editJob?.job.url : ''}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>ยกเลิก</Button>
                        <Button type="submit" variant="contained">{isEdit ? 'แก้ไข' : 'สร้าง'}</Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }

}
