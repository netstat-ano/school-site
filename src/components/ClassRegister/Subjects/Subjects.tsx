import React, { useState } from "react";
import SelectClass from "../SelectClass/SelectClass";
import StudentClass from "../../../models/StudentClass";
import SubjectsForm from "../SubjectsForm/SubjectsForm";
const Subjects: React.FC<{}> = () => {
    const [classesNames, setClassesNames] = useState<StudentClass[]>();
    const [selectedClass, setSelectedClass] = useState<StudentClass>();
    const onInitHandler = (classes: StudentClass[]) => {
        setClassesNames(classes);
        setSelectedClass(classes[0]);
    };
    const onSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedClassFromArr = classesNames?.find(
            (studentClass) => studentClass.id === e.target.value
        );
        setSelectedClass(selectedClassFromArr);
    };
    return (
        <div>
            <SelectClass
                onInit={onInitHandler}
                onSelect={onSelectHandler}
                classesNames={classesNames}
            />
            <SubjectsForm />
        </div>
    );
};
export default Subjects;
