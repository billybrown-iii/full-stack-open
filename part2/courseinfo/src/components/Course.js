import Header from "./Header";
import Part from "./Part";
import Sum from "./Sum";

const Course = ({ course }) => {
  return (
    <>
      <Header title={course.name} />
      {course.parts.map((part) => (
        <div key={part.id}>
          <Part part={part} />
        </div>
      ))}
      <Sum parts={course.parts} />
    </>
  );
};

export default Course;
