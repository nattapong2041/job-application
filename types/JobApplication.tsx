export enum ApplicationStatus {
    PENDING = 1,                  // รอยื่น
    SUBMITTED = 2,               // ส่งใบสมัครแล้ว
    SCHEDULED_INTERVIEW = 3,      // นัดสัมภาษณ์
    INTERVIEWED = 4,             // สัมภาษณ์แล้ว
    PASSED = 5,                  // ผ่าน
    FAILED = 6                   // ไม่ผ่าน
}