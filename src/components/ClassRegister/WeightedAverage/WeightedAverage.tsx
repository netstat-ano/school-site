import grades from "../../../models/grades";
import grade from "../../../models/gradeold";
import { useState, useEffect } from "react";
const WeightedAverage: React.FC<{
    parsedGrades?: grade[];
    grades?: grades;
    subject?: string;
}> = (props) => {
    const [average, setAverage] = useState("");
    useEffect(() => {
        const calculateWeightedAverage = () => {
            let parsedGrades: grade[] = [];
            let sumGrades = 0;
            let sumWeight = 0;
            if (!props.parsedGrades && props.grades) {
                for (const element of props.grades[`${props.subject}`]) {
                    parsedGrades.push(element);
                }
            } else if (props.parsedGrades) {
                parsedGrades = [...props.parsedGrades];
            }
            if (parsedGrades) {
                for (const grade in parsedGrades) {
                    console.log(parsedGrades[grade]);

                    sumGrades +=
                        Number(parsedGrades[grade].grade) *
                        Number(parsedGrades[grade].weight);
                    sumWeight += Number(parsedGrades[grade].weight);
                }
            }
            const roundedAverage = String(
                Math.round((sumGrades / sumWeight) * 100) / 100
            );
            setAverage(roundedAverage);
        };
        calculateWeightedAverage();
    }, [props.grades, props.subject, props.parsedGrades]);
    return <li>{average}</li>;
};
export default WeightedAverage;
