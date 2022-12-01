import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/use-app-selector";
const SelectSubject: React.FC<{
    onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    subjects: string[] | undefined;
}> = (props) => {
    const user = useAppSelector((state) => state.authentication);
    const [subjects, setSubjects] = useState<string[]>([]);
    useEffect(() => {
        if (props.subjects && user.type === "teacher" && user.subjects) {
            const allowedSubjects: string[] = [];
            for (const subject of props.subjects) {
                const findedSubject = user.subjects.find(
                    (userSubject) => userSubject === subject
                );
                if (findedSubject) {
                    allowedSubjects.push(findedSubject);
                }
            }
            setSubjects(allowedSubjects);
        } else if (
            props.subjects &&
            user.type === "teacher" &&
            !user.subjects
        ) {
            return;
        } else if (props.subjects && user.type === "Admin") {
            setSubjects(props.subjects);
        }
    }, [props.subjects]);
    return (
        <select onChange={props.onSelect}>
            {subjects?.map((subject) => (
                <option value={subject} key={subject}>
                    {subject}
                </option>
            ))}
        </select>
    );
};
export default SelectSubject;
