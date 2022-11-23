import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Student from "../../../models/Student";
import GradesList from "../GradesList/GradesList";
import styles from "./StudentDetails.module.scss";
import grade from "../../../models/gradeold";
import WeightedAverage from "../WeightedAverage/WeightedAverage";
const StudentDetails: React.FC<{}> = () => {
    const [student, setStudent] = useState<Student>();
    const [subjects, setSubjects] = useState<string[]>([]);
    const [grades, setGrades] = useState<grade[]>();
    const params = useParams();
    useEffect(() => {
        const fetchStudent = async () => {
            const fetchedStudent = await Student.getStudentById(
                params.studentId!
            );
            if (fetchedStudent) {
                const student = new Student(
                    fetchedStudent.name,
                    fetchedStudent.surname,
                    fetchedStudent.grades,
                    fetchedStudent.id
                );
                setStudent(student);

                const allGrades = await student.getAllGrades();
                setGrades(allGrades);
                let subjectsList = [];
                for (const key in student.grades) {
                    subjectsList.push(key);
                }
                setSubjects(subjectsList);
            }
        };
        fetchStudent();
    }, []);
    return (
        <div className={styles["student-details"]}>
            <div className={styles[`student-details__name`]}>
                {student?.name} {student?.surname}
            </div>
            <div className={styles["student-details__grid"]}>
                <div>
                    {student?.grades &&
                        subjects.map((subject) => (
                            <>
                                <div
                                    className={
                                        styles["student-details__subject"]
                                    }
                                >
                                    {subject}
                                </div>
                                <GradesList
                                    className={styles["grades-list"]}
                                    grades={student.grades}
                                    selectedSubject={subject}
                                />
                            </>
                        ))}
                </div>
                <div>
                    <ul className={styles["weighted-average"]}>
                        <WeightedAverage parsedGrades={grades} />
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default StudentDetails;
