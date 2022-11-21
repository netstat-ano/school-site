import GradeElement from "../GradeElement/GradeElement";
import grades from "../../../models/grades";
const GradesList: React.FC<{
    grades: grades;
    selectedSubject: string;
}> = (props) => {
    return (
        <ol>
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
        </ol>
    );
};
export default GradesList;
