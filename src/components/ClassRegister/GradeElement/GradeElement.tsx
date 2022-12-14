import styles from "./GradeElement.module.scss";
import grade from "../../../models/gradeold";
import { Link } from "react-router-dom";
const GradeElement: React.FC<{ children: string; gradeDetails: grade }> = (
    props
) => {
    return (
        <li>
            <Link to={`/class-register/grade-details/${props.gradeDetails.id}`}>
                {props.children}
            </Link>
        </li>
    );
};
export default GradeElement;
