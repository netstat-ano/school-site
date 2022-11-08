import { get, ref, update } from "firebase/database";
import { database } from "../firebase";

class StudentClass {
    students: {}[];
    name: string;
    mainTeacher: string;
    id: string;
    constructor(students: {}[], name: string, mainTeacher: string, id: string) {
        this.students = students;
        this.name = name;
        this.mainTeacher = mainTeacher;
        this.id = id;
    }
    async save() {
        const updates: { [k: string]: {} } = {};
        updates[`/studentClasses/${this.id}`] = this;
        await update(ref(database), updates);
    }
    static async getStudentClasses() {
        const classes = await get(ref(database, `/studentClasses`));
        return classes;
    }
}
export default StudentClass;
