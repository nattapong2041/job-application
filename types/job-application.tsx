import {Job} from "@/types/job";

export enum ApplicationStatus {
    PENDING = 1,                  // รอยื่น
    SUBMITTED = 2,               // ส่งใบสมัครแล้ว
    SCHEDULED_INTERVIEW = 3,      // นัดสัมภาษณ์
    INTERVIEWED = 4,             // สัมภาษณ์แล้ว
    PASSED = 5,                  // ผ่าน
    FAILED = 6                   // ไม่ผ่าน
}

export const ApplicationStatusText: Record<ApplicationStatus, string> = {
    [ApplicationStatus.PENDING]: 'รอยื่น',
    [ApplicationStatus.SUBMITTED]: 'ส่งใบสมัครแล้ว',
    [ApplicationStatus.SCHEDULED_INTERVIEW]: 'นัดสัมภาษณ์',
    [ApplicationStatus.INTERVIEWED]: 'สัมภาษณ์แล้ว',
    [ApplicationStatus.PASSED]: 'ผ่าน',
    [ApplicationStatus.FAILED]: 'ไม่ผ่าน',
};

export function getApplicationStatusValues(): ApplicationStatus[] {
    return Object.values(ApplicationStatus).filter(
        (value) => typeof value === 'number'
    ) as ApplicationStatus[];
}

export function getJobApplicationStatusTitle(application: JobApplication): string {
    return ApplicationStatusText[application.status] || 'ไม่ทราบสถานะ';
}

export interface JobApplication {
    id: string,
    job: Job
    status: ApplicationStatus,
    createdAt: Date,
    updatedAt: Date,
}