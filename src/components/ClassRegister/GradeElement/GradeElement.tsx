import styles from "./GradeElement.module.scss";
import grade from "../../../models/gradeold";
import { Link } from "react-router-dom";
const GradeElement: React.FC<{ children: string; gradeDetails: grade }> = (
    props
) => {
    return (
        <span className={styles["grade-element"]}>
            <Link to={`/grade-details/${props.gradeDetails.id}`}>
                {props.children}
            </Link>
        </span>
    );
};
export default GradeElement;
