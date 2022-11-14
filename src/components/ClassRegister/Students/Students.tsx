import StudentClass from "../../../models/StudentClass";
import { useEffect, useState } from "react";
import ClassRow from "../ClassRow/ClassRow";
import styles from "./Students.module.scss";
import getDataFromSnapshot from "../../../helpers/getDataFromSnapshot";
const Students: React.FC<{}> = () => {
    const [studentClasses, setStudentClasses] = useState<StudentClass[]>([]);
    useEffect(() => {
        const fetchStudentClasses = async () => {
            const classes = await StudentClass.getArrayStudentClasses();
            setStudentClasses(classes);
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
