'use client'

import {Box} from "@mui/material";
import {DndContext, DragEndEvent} from "@dnd-kit/core";
import StatusBoard from "@/components/StatusBoard";
import {ApplicationStatus, getApplicationStatusValues, Job, JobApplication} from "@/types";
import {useState} from "react";

export default function JobBoard() {
    const allStatuses = getApplicationStatusValues();
    // Mock Job Data
    const jobs: Job[] = [
        {
            id: "job-101",
            title: "Software Engineer",
            description: "Develop and maintain web applications.",
            company: "Tech Innovations Inc.",
            url: "https://techinnovations.com/careers/se",
        },
        {
            id: "job-102",
            title: "UX/UI Designer",
            description: "Design user-friendly interfaces.",
            company: "Creative Solutions Co.",
            url: "https://creativesolutions.com/jobs/designer",
        },
        {
            id: "job-103",
            title: "Data Analyst",
            description: "Analyze large datasets and provide insights.",
            company: "Data Insights Ltd.",
            url: "https://datainsights.co/careers/data-analyst",
        },
        {
            id: "job-104",
            title: "Product Manager",
            description: "Lead product development from conception to launch.",
            company: "Innovate Global",
            url: "https://innovateglobal.com/pm-role",
        },
    ];

// Mock Job Application Data
    const [applications, setApplications] = useState<JobApplication[]>
    ([
        {
            id: "app-001",
            job: jobs[0], // Software Engineer
            status: ApplicationStatus.PENDING,
            index: 0,
            createdAt: new Date("2025-05-20T10:00:00Z"),
            updatedAt: new Date("2025-05-20T10:00:00Z"),
        },
        {
            id: "app-002",
            job: jobs[1], // UX/UI Designer
            status: ApplicationStatus.SCHEDULED_INTERVIEW,
            index: 0,
            createdAt: new Date("2025-05-15T11:30:00Z"),
            updatedAt: new Date("2025-06-01T14:00:00Z"),
        },
        {
            id: "app-003",
            job: jobs[2], // Data Analyst
            status: ApplicationStatus.PENDING,
            index: 0,
            createdAt: new Date("2025-06-05T09:15:00Z"),
            updatedAt: new Date("2025-06-05T09:15:00Z"),
        },
        {
            id: "app-004",
            job: jobs[0], // Software Engineer (อีกใบ)
            status: ApplicationStatus.INTERVIEWED,
            index: 0,
            createdAt: new Date("2025-05-22T13:00:00Z"),
            updatedAt: new Date("2025-06-03T10:30:00Z"),
        },
        {
            id: "app-005",
            job: jobs[3], // Product Manager
            status: ApplicationStatus.PASSED,
            index: 0,
            createdAt: new Date("2025-04-10T09:00:00Z"),
            updatedAt: new Date("2025-05-25T16:00:00Z"),
        },
        {
            id: "app-006",
            job: jobs[1], // UX/UI Designer (อีกใบ)
            status: ApplicationStatus.INTERVIEWED,
            index: 0,
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

    return (
        <Box component="section" sx={{
            my: 4,
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
    );
}

