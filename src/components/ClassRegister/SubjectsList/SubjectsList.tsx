import { useEffect } from "react";
import StudentClass from "../../../models/StudentClass";
import SubjectListElement from "../SubjectListElement/SubjectListElement";
import styles from "./SubjectList.module.scss";
const SubjectsList: React.FC<{
    subjectsList: string[];
    setSubjectsList: React.Dispatch<React.SetStateAction<string[]>>;
    selectedClass: StudentClass | undefined;
}> = (props) => {
    const { selectedClass } = props;
    useEffect(() => {
        const fetchSubjects = async () => {
            if (selectedClass) {
                const studentClass = await StudentClass.getClassById(
                    props.selectedClass!.id
                );
                if (studentClass?.subjects) {
                    props.setSubjectsList([...studentClass!.subjects]);
                } else {
                    props.setSubjectsList([]);
                }
            }
        };
        fetchSubjects();
    }, [selectedClass]);
    return (
        <ul className={styles["subject-list"]}>
            {props.subjectsList &&
                props.subjectsList.map((subject) => (
                    <SubjectListElement>
                        <>{subject}</>
                    </SubjectListElement>
                ))}
        </ul>
    );
};
export default SubjectsList;
