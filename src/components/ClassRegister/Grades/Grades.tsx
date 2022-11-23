import { useEffect, useState } from "react";
import SelectClass from "../SelectClass/SelectClass";
import StudentClass from "../../../models/StudentClass";
import SelectSubject from "../SelectSubject/SelectSubject";
import StudentsList from "../StudentsList/StudentsList";
const STUDENT_CLASS_TEMPLATE = new StudentClass([], "", "", "", []);
const Grades: React.FC<{}> = () => {
    const [classes, setClasses] = useState<StudentClass[]>();
    const [selectedClass, setSelectedClass] = useState<StudentClass>(
        STUDENT_CLASS_TEMPLATE
    );
    const [selectedSubject, setSelectedSubject] = useState<string>("");
    useEffect(() => {
        if (selectedClass) {
            if (selectedClass.subjects) {
                setSelectedSubject(selectedClass!.subjects[0]);
            }
        }
    }, [selectedClass.name]);
    const onInitHandler = (classes: StudentClass[]) => {
        setClasses(classes);
        setSelectedClass(classes[0]);
    };
    const onSelectClassChangeHandler = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedClassFromArr = classes!.find(
            (studentClass) => studentClass.id === e.target.value
        );
        if (selectedClassFromArr) {
            setSelectedClass(selectedClassFromArr);
        }
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
                classes={classes}
                onSelect={onSelectClassChangeHandler}
            />
            {selectedClass && (
                <>
                    <SelectSubject
                        subjects={selectedClass.subjects}
                        onSelect={onSelectSubjectChangeHandler}
                    />
                    <StudentsList
                        classes={classes}
                        setClasses={setClasses}
                        setSelectedClass={setSelectedClass}
                        selectedClass={selectedClass}
                        selectedSubject={selectedSubject}
                        students={selectedClass.students}
                    />
                </>
            )}
        </div>
    );
};
export default Grades;
