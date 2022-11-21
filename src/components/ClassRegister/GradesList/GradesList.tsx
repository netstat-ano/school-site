import GradeElement from "../GradeElement/GradeElement";
import grades from "../../../models/grades";
import WeightedAverage from "../WeightedAverage/WeightedAverage";
import styles from "./GradesList.module.scss";
const GradesList: React.FC<{
    grades: grades;
    selectedSubject: string;
}> = (props) => {
    return (
        <ul className={styles["grades-list"]}>
            {props.grades[`${props.selectedSubject}`] && (
                <WeightedAverage
                    subject={props.selectedSubject}
                    grades={props.grades}
                />
            )}
            {props.grades[`${props.selectedSubject}`] &&
                props.grades[`${props.selectedSubject}`].map((gradeDetails) => {
                    return (
                        <GradeElement
                            key={gradeDetails.id}
                            gradeDetails={gradeDetails}
                        >
                            {gradeDetails.grade}
                        </GradeElement>
                    );
                })}
        </ul>
    );
};
export default GradesList;
