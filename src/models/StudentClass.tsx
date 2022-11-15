import { get, ref, update } from "firebase/database";
import { database } from "../firebase";
import Student from "./Student";
class StudentClass {
    students: Student[];
    name: string;
    mainTeacher: string;
    id: string;
    subjects: string[];
    constructor(
        students: Student[],
        name: string,
        mainTeacher: string,
        id: string,
        subjects: string[]
    ) {
        this.students = students;
        this.name = name;
        this.mainTeacher = mainTeacher;
        this.id = id;
        this.subjects = subjects;
    }
    async save() {
        const updates: { [k: string]: {} } = {};
        updates[`/studentClasses/${this.id}`] = this;
        await update(ref(database), updates);
    }
    static async getArrayStudentClasses() {
        const studentClasses = await StudentClass.getStudentClasses();
        const result: StudentClass[] = [];
        if (studentClasses.exists()) {
            const studentClassesVal = studentClasses.val();
            for (const id in studentClassesVal) {
                result.push(studentClassesVal[id]);
            }
        }
        return result;
    }
    static async getClassesNames() {
        const studentClasses = await this.getArrayStudentClasses();
        const names: string[] = [];
        studentClasses.forEach((studentClass) => {
            names.push(studentClass.name);
        });
        return names;
    }
    static async getClassById(id: string) {
        const studentClasses = await this.getArrayStudentClasses();
        const studentClass: StudentClass | undefined = studentClasses.find(
            (studentClass) => studentClass.id === id
        );
        return studentClass;
    }
    static async getStudentClasses() {
        const classes = await get(ref(database, `/studentClasses`));
        return classes;
    }
}
export default StudentClass;
