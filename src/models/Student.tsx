import { update, ref, get } from "firebase/database";
import { database } from "../firebase";
class Student {
    name: string;
    surname: string;
    grades: {};
    id: string;
    constructor(name: string, surname: string, grades: {}, id: string) {
        this.name = name;
        this.surname = surname;
        this.grades = grades;
        this.id = id;
    }
    async save() {
        const updates: { [k: string]: {} } = {};
        updates[`/students/${this.id}`] = this;
        await update(ref(database), updates);
    }
    static async getStudents() {
        const students = await get(ref(database, `/students`));
        return students;
    }
}
export default Student;
