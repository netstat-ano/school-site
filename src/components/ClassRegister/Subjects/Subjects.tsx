import React, { useState } from "react";
import SelectClass from "../SelectClass/SelectClass";
import StudentClass from "../../../models/StudentClass";
import SubjectsForm from "../SubjectsForm/SubjectsForm";
import SubjectsList from "../SubjectsList/SubjectsList";
const Subjects: React.FC<{}> = () => {
    const [classesNames, setClassesNames] = useState<StudentClass[]>();
    const [selectedClass, setSelectedClass] = useState<StudentClass>();
    const [subjectsList, setSubjectsList] = useState<string[]>([]);
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
            <SubjectsList
                selectedClass={selectedClass}
                subjectsList={subjectsList}
                setSubjectsList={setSubjectsList}
            />
            <SubjectsForm
                setSubjectsList={setSubjectsList}
                subjectsList={subjectsList}
                selectedClass={selectedClass}
            />
        </div>
    );
};
export default Subjects;
