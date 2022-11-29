import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { get, ref, update } from "firebase/database";
import { auth, database } from "../firebase";
import { updateProfile } from "firebase/auth";
class Teacher {
    email: string;
    name: string;
    password: string;
    subjects: string[];
    id: string;
    constructor(
        email: string,
        name: string,
        password: string,
        subjects: string[],
        id?: string
    ) {
        this.email = email;
        this.name = name;
        this.password = password;
        this.subjects = subjects;
        this.id = id || "";
    }
    async save() {
        await createUserWithEmailAndPassword(auth, this.email, this.password);
        this.id = auth.currentUser!.uid;
        signOut(auth);
        const updates: { [k: string]: {} } = {};
        updates[`/teachers/${this.id}`] = this;
        await update(ref(database), updates);
    }
    async saveData() {
        const updates: { [k: string]: {} } = {};
        updates[`/teachers/${this.id}`] = this;
        await update(ref(database), updates);
    }
    async getSubjects() {
        const snapshot = await get(
            ref(database, `/teachers/${this.id}/subjects`)
        );
        if (snapshot.exists()) {
            const subjects: string[] = snapshot.val();
            return subjects;
        }
        return [];
    }
    static async getAllTeachers() {
        const teachers = await get(ref(database, `/teachers`));
        const result = [];
        if (teachers.exists()) {
            const teachersVal = teachers.val();
            for (const id in teachersVal) {
                result.push(teachersVal[id]);
            }
        }
        return result;
    }
}
export default Teacher;
