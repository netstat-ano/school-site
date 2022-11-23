import GradeElement from "../GradeElement/GradeElement";
import grades from "../../../models/grades";
import WeightedAverage from "../WeightedAverage/WeightedAverage";
const GradesList: React.FC<{
    grades: grades;
    selectedSubject: string;
    className: string;
}> = (props) => {
    return (
        <ul className={props.className}>
            <WeightedAverage
                subject={props.selectedSubject}
                grades={props.grades}
            />

            {props.grades[`${props.selectedSubject}`].map((gradeDetails) => {
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
