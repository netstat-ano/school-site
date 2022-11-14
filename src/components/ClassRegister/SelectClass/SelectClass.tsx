import StudentClass from "../../../models/StudentClass";
import { useEffect } from "react";
const SelectClass: React.FC<{
    onInit: (classes: StudentClass[]) => void;
    onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    classesNames: StudentClass[] | undefined;
}> = (props) => {
    useEffect(() => {
        const fetchClassesNames = async () => {
            const classes = await StudentClass.getArrayStudentClasses();
            props.onInit(classes);
        };
        fetchClassesNames();
    }, []);
    return (
        <select onChange={props.onSelect}>
            {props.classesNames?.map((studentClass) => {
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
