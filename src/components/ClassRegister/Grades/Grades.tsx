import { useEffect, useState } from "react";
import SelectClass from "../SelectClass/SelectClass";
import StudentClass from "../../../models/StudentClass";
import SelectSubject from "../SelectSubject/SelectSubject";
import StudentsList from "../StudentsList/StudentsList";
import GradesForm from "../GradesForm/GradesForm";
const Grades: React.FC<{}> = () => {
    const [classesNames, setClassesNames] = useState<StudentClass[]>();
    const [selectedClass, setSelectedClass] = useState<StudentClass>();
    const [selectedSubject, setSelectedSubject] = useState<string>("");
    useEffect(() => {
        if (selectedClass) {
            if (selectedClass.subjects) {
                setSelectedSubject(selectedClass!.subjects[0]);
            }
        }
    }, [selectedClass]);
    const onInitHandler = (classes: StudentClass[]) => {
        setClassesNames(classes);
        setSelectedClass(classes[0]);
    };
    const onSelectClassChangeHandler = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedClassFromArr = classesNames?.find(
            (studentClass) => studentClass.id === e.target.value
        );
        setSelectedClass(selectedClassFromArr);
    };
    const onSelectSubjectChangeHandler = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedSubject(e.target.value);
    };

    return (
        <div>
            <SelectClass
                onInit={onInitHandler}
                classesNames={classesNames}
                onSelect={onSelectClassChangeHandler}
            />
            {selectedClass && (
                <>
                    <SelectSubject
                        subjects={selectedClass.subjects}
                        onSelect={onSelectSubjectChangeHandler}
                    />
                    <StudentsList
                        selectedSubject={selectedSubject}
                        students={selectedClass!.students}
                    />
                    <GradesForm selectedClass={selectedClass} />
                </>
            )}
        </div>
    );
};
export default Grades;
