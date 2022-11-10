import StudentClass from "../../../models/StudentClass";
import { useEffect, useState } from "react";
import ClassRow from "../ClassRow/ClassRow";
import styles from "./Students.module.scss";
const Students: React.FC<{}> = () => {
    const [studentClasses, setStudentClasses] = useState<StudentClass[]>([]);
    useEffect(() => {
        const fetchStudentClasses = async () => {
            const studentClasses = await StudentClass.getStudentClasses();
            if (studentClasses.exists()) {
                const studentClassesVal = studentClasses.val();
                for (const id in studentClassesVal) {
                    setStudentClasses((prevState) => {
                        prevState.push(studentClassesVal[id]);
                        return [...prevState];
                    });
                }
            }
        };
        fetchStudentClasses();
    }, []);
    return (
        <div className={styles.students}>
            {studentClasses.map((classData) => (
                <ClassRow classData={classData} />
            ))}
        </div>
    );
};
export default Students;
