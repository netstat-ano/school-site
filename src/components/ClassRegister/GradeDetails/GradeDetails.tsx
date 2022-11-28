import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Grade from "../../../models/Grade";
import styles from "./GradeDetails.module.scss";
const GradeDetails: React.FC<{}> = () => {
    const params = useParams();
    const [grade, setGrade] = useState<Grade | null>();
    useEffect(() => {
        const fetchGrades = async () => {
            const grade = await Grade.getGradeById(params.gradeId!);
            if (grade) {
                setGrade(grade);
            }
        };
        fetchGrades();
    }, []);
    if (grade) {
        return (
            <div className={styles["grades-details"]}>
                <div className={styles[`grades-details__grade`]}>
                    Ocena: {grade.grade}
                </div>
                <div>Waga: {grade.weight}</div>
                <div>Przedmiot: {grade.subject}</div>
                <div>Za co: {grade.from}</div>
                <div>Nauczyciel: {grade.teacher}</div>
            </div>
        );
    } else {
        return <div></div>;
    }
};
export default GradeDetails;
