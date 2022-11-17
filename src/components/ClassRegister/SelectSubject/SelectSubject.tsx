import { useEffect } from "react";
import StudentClass from "../../../models/StudentClass";
const SelectSubject: React.FC<{
    onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    subjects: string[] | undefined;
}> = (props) => {
    useEffect(() => {}, []);
    return (
        <select onChange={props.onSelect}>
            {props.subjects?.map((subject) => (
                <option value={subject} key={subject}>
                    {subject}
                </option>
            ))}
        </select>
    );
};
export default SelectSubject;
