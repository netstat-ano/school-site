import StudentClass from "../../../models/StudentClass";
import { useEffect } from "react";
const SelectClass: React.FC<{
    onInit: (classes: StudentClass[]) => void;
    onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    classes: StudentClass[] | undefined;
}> = (props) => {
    useEffect(() => {
        const fetchClassesNames = async () => {
            const classes = await StudentClass.getArrayStudentClasses();
            props.onInit(classes);
        };
        fetchClassesNames();
    }, []);
    const onSelectClassHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        props.onSelect(e);
    };
    return (
        <select onChange={onSelectClassHandler}>
            {props.classes?.map((studentClass) => {
                return (
                    <option value={`${studentClass.id}`}>
                        {studentClass.name}
                    </option>
                );
            })}
        </select>
    );
};
export default SelectClass;
