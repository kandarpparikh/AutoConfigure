import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import BrowseCourses from './components/BrowseCourses';
import CourseReview from './components/CourseReview';
import Review from './components/Review';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<SignIn />}  />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/courses" element={<BrowseCourses />} />
          <Route exact path="/course-reviews" element={<CourseReview />} />
          <Route path="/course-reviews/:courseName" element={<Review />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
