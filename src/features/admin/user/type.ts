export interface User {
    id: string
    email: string
    password: string
    role: UserRole
    username: string
    isActive: boolean
    createdAt: string
    updatedAt: string
}

export interface UserCreate {
    email: string
    password: string
    role: UserRole
    username: string
}

export interface UserUpdate {
    id: string
    email: string
    password: string
    role: UserRole
    username: string
}

export interface Shift {
    id: string
    startTime: string
    endTime: string
    graceMinutes: string
    shiftName: string
    isActive: boolean
    createdAt: string
    updatedAt: string
}

export interface ShiftCreate {
    startTime: string
    endTime: string
    graceMinutes: string
    shiftName: string
}

export interface ShiftUpdate {
    id: string
    startTime: string
    endTime: string
    graceMinutes: string
    shiftName: string
}

export interface Attendance {
    id: string
    attendanceDate: string
    clockIn: string
    clockOut: string
    notes: string
    status: AttendanceStatus
    shiftId: string
    shiftName: string
    userId: string
    username: string
    isActive: boolean
    createdAt: string
    updatedAt: string
}

export interface AttendanceCreate {
    attendanceDate: string
    clockIn: string
    clockOut: string
    notes: string
    status: AttendanceStatus
    shiftId: string
    userId: string
}

export interface AttendanceUpdate {
    id: string
    attendanceDate: string
    clockIn: string
    clockOut: string
    notes: string
    status: AttendanceStatus
    shiftId: string
    userId: string
}

export type UserRole =
    | "SUPER_ADMIN"
    | "CASHIER"
    | "CHEF"
    | "WAREHOUSE_MANAGER"
    | "WAITER"
    | "CUSTOMER"


export type AttendanceStatus =
    | "IN_TIME"
    | "LATE"
    | "EARLY_LEAVE"
    | "ABSENT"
    | "ON_LEAVE"
    | "OFF_DAY"