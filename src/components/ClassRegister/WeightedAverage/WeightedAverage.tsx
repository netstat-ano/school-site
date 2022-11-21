import grades from "../../../models/grades";
import { useState, useEffect } from "react";
const WeightedAverage: React.FC<{
    grades: grades;
    subject: string;
}> = (props) => {
    const [average, setAverage] = useState("");
    useEffect(() => {
        const calculateWeightedAverage = () => {
            const parsedGrades = [];
            let sumGrades = 0;
            let sumWeight = 0;
            for (const element of props.grades[`${props.subject}`]) {
                parsedGrades.push(element);
            }
            for (const grade in parsedGrades) {
                sumGrades +=
                    Number(parsedGrades[grade].grade) *
                    Number(parsedGrades[grade].weight);
                sumWeight += Number(parsedGrades[grade].weight);
            }
            const roundedAverage = String(
                Math.round((sumGrades / sumWeight) * 100) / 100
            );
            setAverage(roundedAverage);
        };
        calculateWeightedAverage();
    }, [props.grades, props.subject]);
    return <li>{average}</li>;
};
export default WeightedAverage;
