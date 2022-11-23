import { update, ref, get } from "firebase/database";
import { database } from "../firebase";
import grade from "./gradeold";
import grades from "./grades";
import StudentClass from "./StudentClass";
class Student {
    name: string;
    surname: string;
    grades: grades;
    id: string;
    constructor(name: string, surname: string, grades: grades, id: string) {
        this.name = name;
        this.surname = surname;
        this.grades = grades;
        this.id = id;
    }
    // async save() {
    //     const updates: { [k: string]: {} } = {};
    //     updates[`/students/${this.id}`] = this;
    //     await update(ref(database), updates);
    // }
    // static async getStudents() {
    //     const students = await get(ref(database, `/students`));
    //     return students;
    // }
    async save(classId: string, students: Student[]) {
        const updates: { [k: string]: {} } = {};
        updates[`/studentClasses/${classId}/students`] = [...students];
        await update(ref(database), updates);
    }
    static async getStudentById(id: string) {
        const classes = await StudentClass.getArrayStudentClasses();
        let student;
        for (const studentClass of classes) {
            student = studentClass.students.find(
                (student) => student.id === id
            );
            if (student) {
                break;
            }
        }
        return student;
    }
    async getAllGrades() {
        const grades: grade[] = [];
        for (const key in this.grades) {
            for (const grade of this.grades[`${key}`]) {
                grades.push(grade);
            }
        }
        return grades;
    }
}
export default Student;
