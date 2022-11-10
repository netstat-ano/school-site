import StudentClass from "../../../models/StudentClass";
import styles from "./ClassRow.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
const ClassRow: React.FC<{ classData: StudentClass }> = (props) => {
    const [areStudentsShowed, setAreStudentsShowed] = useState(false);
    const { classData } = props;
    const onArrowClickHandler = () => {
        setAreStudentsShowed((prevState) => !prevState);
    };
    return (
        <div className={styles["class-row"]}>
            <div className={styles["class-row__header"]}>
                <div className={styles["class-row__header-name"]}>
                    {classData.name}
                </div>
                <div className={styles["class-row__header-teacher"]}>
                    {classData.mainTeacher}
                    <span className={styles["class-row__header-teacher__icon"]}>
                        <FontAwesomeIcon
                            onClick={onArrowClickHandler}
                            icon={faArrowDown}
                        />
                    </span>
                </div>
            </div>
            <div className={styles["class-row__students"]}>
                <ul>
                    {areStudentsShowed &&
                        classData.students.map((student) => {
                            return (
                                <li>
                                    <div
                                        className={styles["class-row__student"]}
                                    >
                                        <Link
                                            className={
                                                styles[
                                                    "class-row__student__link"
                                                ]
                                            }
                                            to={`/class-register/student/${student.id}`}
                                        >
                                            {student.name} {student.surname}
                                        </Link>
                                    </div>
                                </li>
                            );
                        })}
                </ul>
            </div>
        </div>
    );
};
export default ClassRow;
