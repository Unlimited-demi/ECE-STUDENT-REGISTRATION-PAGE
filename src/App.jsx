import { useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";
import RegForm from "./pages/student_reg_page";
import "./App.css";

function App() {
  useEffect(() => {
    document.title = "ECE Student Registration";
  }, []);

  return <RegForm />;
}

export default App;
