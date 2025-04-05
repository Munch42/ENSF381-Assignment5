import CourseCatalog from "./CourseCatalog";
import EnrollmentList from "./EnrollmentList";
import Footer from "./Footer";
import Header from "./Header";

function CoursesPage() {
  return (
    <div className="courses-page">
        <Header />
        <div className="content">
          <CourseCatalog />
          <EnrollmentList />
        </div>
        <Footer />
    </div>
  );
}

export default CoursesPage;
