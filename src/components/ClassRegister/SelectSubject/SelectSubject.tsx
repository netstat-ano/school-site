import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../../hooks/use-app-selector";
import StudentClass from "../../../models/StudentClass";
const SelectSubject: React.FC<{
    onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    subjects: string[] | undefined;
}> = (props) => {
    const user = useAppSelector((state) => state.authentication);
    console.log(user);

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
