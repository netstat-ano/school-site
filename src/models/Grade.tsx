import Student from "./Student";
import grades from "./grades";
import StudentClass from "./StudentClass";
import grade from "./gradeold";
import { get, ref, update } from "firebase/database";
import { database } from "../firebase";
class Grade {
    grade: string;
    weight: string;
    id: string;
    from: string;
    teacher: string;
    subject: string;
    constructor(
        grade: string,
        weight: string,
        id: string,
        from: string,
        teacher: string,
        subject: string
    ) {
        this.grade = grade;
        this.weight = weight;
        this.id = id;
        this.from = from;
        this.teacher = teacher;
        this.subject = subject;
    }
    async save(config: {
        studentDetails: Student;
        selectedSubject: string;
        selectedClass: StudentClass;
    }) {
        const { studentDetails, selectedSubject, selectedClass } = config;
        const grades: grades = {};
        if (
            studentDetails.grades &&
            studentDetails.grades[`${selectedSubject}`]
        ) {
            for (const key in studentDetails.grades) {
                grades[`${key}`] = studentDetails.grades[`${key}`];
            }
            grades[`${selectedSubject}`] = [
                ...studentDetails.grades[`${selectedSubject}`],
                this,
            ];
        } else {
            for (const key in studentDetails.grades) {
                grades[`${key}`] = studentDetails.grades[`${key}`];
            }
            grades[`${selectedSubject}`] = [this];
        }
        const updatedStudent = new Student(
            studentDetails.name,
            studentDetails.surname,
            grades,
            studentDetails.id
        );
        const indexOfUpdatedStudent = selectedClass!.students.findIndex(
            (student) => student.id === studentDetails.id
        );
        const updatedStudents = [...selectedClass!.students];
        updatedStudents[indexOfUpdatedStudent] = updatedStudent;
        await updatedStudent.save(selectedClass!.id, updatedStudents);
        return updatedStudent;
    }

    static async getAllGrades() {
        const studentClassesSnapshot = await get(
            ref(database, `/studentClasses`)
        );
        const studentClasses = studentClassesSnapshot.val();
        const grades: grade[] = [];
        for (const scid in studentClasses) {
            for (const student in studentClasses[scid].students) {
                for (const subject in studentClasses[scid].students[student]
                    .grades) {
                    grades.push(
                        ...studentClasses[scid].students[student].grades[
                            subject
                        ]
                    );
                }
            }
        }
        return grades;
    }
    static async getGradeById(id: string) {
        const allGrades = await Grade.getAllGrades();
        const searchedGrade = allGrades.find((grade) => grade.id === id);
        if (searchedGrade) {
            return new Grade(
                searchedGrade.grade,
                searchedGrade.weight,
                searchedGrade.id,
                searchedGrade.from,
                searchedGrade.teacher,
                searchedGrade.subject
            );
        }
    }
}
export default Grade;
