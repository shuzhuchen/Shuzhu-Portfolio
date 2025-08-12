// sections/Courses.jsx
const courseData = {
    graduate: ["Artificial Intelligence and Data Engineering", "Database System Principles", "Deep Learning", "Advanced Data Mining"],
    undergrad: ["Computer Programming (C++)", "Data-Driven Business Problem Modeling", "Econometrics"],
    extra: ["NVIDIA", "Coursera", "AWS"],
  };
  
  export default function Courses() {
    return (
      <section id="courses" className="py-16 px-6 bg-[#4292c6] dark:bg-gray-900 text-white">
        <h2 className="text-3xl font-semibold mb-6">Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(courseData).map(([category, courses]) => (
            <div key={category}>
              <h3 className="text-xl font-bold capitalize mb-2">{category}</h3>
              <ul className="text-sm list-disc list-inside">
                {courses.map((course, i) => <li key={i}>{course}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
    );
  }
  