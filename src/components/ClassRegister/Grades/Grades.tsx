import { useEffect, useState } from "react";
import SelectClass from "../SelectClass/SelectClass";
import StudentClass from "../../../models/StudentClass";
const Grades: React.FC<{}> = () => {
    const [classesNames, setClassesNames] = useState<StudentClass[]>();
    const [selectedClass, setSelectedClass] = useState<StudentClass>();
    const onInitHandler = (classes: StudentClass[]) => {
        setClassesNames(classes);
        setSelectedClass(classes[0]);
    };
    const onSelectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedClassFromArr = classesNames?.find(
            (studentClass) => studentClass.id === e.target.value
        );
        setSelectedClass(selectedClassFromArr);
    };
    return (
        <div>
            <SelectClass
                onInit={onInitHandler}
                classesNames={classesNames}
                onSelect={onSelectChangeHandler}
            />
        </div>
    );
};
export default Grades;
