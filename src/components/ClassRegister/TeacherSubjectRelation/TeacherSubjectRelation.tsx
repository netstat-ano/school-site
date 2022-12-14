import Teacher from "../../../models/Teacher";
import SuccessButton from "../../UI/SuccessButton/SuccessButton";
import styles from "./TeacherSubjectRelation.module.scss";
const TeacherSubjectRelation: React.FC<{
    teacher: Teacher;
    subjects: string[];
}> = (props) => {
    const { teacher, subjects } = props;
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked && teacher.subjects) {
            teacher.subjects = [...teacher.subjects, e.target.value];
            const updatedTeacher = new Teacher(
                teacher.email,
                teacher.name,
                teacher.password,
                teacher.subjects,
                teacher.id
            );
            updatedTeacher.saveData();
        } else if (e.target.checked) {
            teacher.subjects = [e.target.value];
            const updatedTeacher = new Teacher(
                teacher.email,
                teacher.name,
                teacher.password,
                teacher.subjects,
                teacher.id
            );
            updatedTeacher.saveData();
        } else if (!e.target.checked) {
            teacher.subjects = teacher.subjects.filter(
                (subject) => subject !== e.target.value
            );
            const updatedTeacher = new Teacher(
                teacher.email,
                teacher.name,
                teacher.password,
                teacher.subjects,
                teacher.id
            );
            updatedTeacher.saveData();
        }
    };
    return (
        <div>
            <div className={styles["teacher-subject-relation__name"]}>
                {teacher.name}
            </div>
            <ol>
                {subjects.map((subject) => (
                    <li key={subject}>
                        <label htmlFor={subject}>{subject}</label>
                        <input
                            defaultChecked={
                                teacher.subjects &&
                                teacher.subjects.find(
                                    (value) => value === subject
                                )
                                    ? true
                                    : false
                            }
                            value={subject}
                            onChange={onChangeHandler}
                            id={subject}
                            type="checkbox"
                        ></input>
                    </li>
                ))}
            </ol>
        </div>
    );
};
export default TeacherSubjectRelation;
