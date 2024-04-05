interface Role {
  [key: string]: string;
}

export const roles: Role = {
  ROOT_ADMIN: 'Sistem Yöneticisi',
  FACULTY_ADMIN: 'Fakülte Yöneticisi',
  DEPARTMENT_ADMIN: 'Bölüm Yöneticisi',
  COURSE_ADMIN: 'Ders Yöneticisi',
  COURSE_SUPERVISOR: 'Ders Sorumlusu',
};

export interface User {
  id: string;
  role: [
    | 'ROOT_ADMIN'
    | 'FACULTY_ADMIN'
    | 'DEPARTMENT_ADMIN'
    | 'COURSE_ADMIN'
    | 'COURSE_SUPERVISOR'
  ];
  firstName: string;
  lastName: string;
  username: string;
}

export interface Faculty {
  id: string;
  name: string;
}

export interface Department {
  id: string;
  Faculty: Faculty;
  name: string;
}

export interface Course {
  id: string;
  Department: Department;
  name: string;
  credit: number;
  ects: number;
  compulsory: boolean;
}

export interface FacultyAdmin {
  id: string;
  User: User;
  Faculty: Faculty;
}

export interface DepartmentAdmin {
  id: string;
  User: User;
  Department: Department;
}

export interface CourseAdmin {
  id: string;
  User: User;
  Course: Course;
}

export interface CourseSupervisor {
  id: string;
  User: User;
  Course: Course;
}

export interface LearningMaterial {
  id: string;
  Course: Course;
  number: number;
  content: string;
  contributionLevel: number;
  impactSum?: number;
  impactTotal?: number;
  succesRate?: number;
  succesPoint?: number;
}

export interface MeasuringTool {
  id: string;
  Course: Course;
  name: string;
  impactRate: number;
}
