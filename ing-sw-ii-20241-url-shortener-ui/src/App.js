import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import Form from "./Form";
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from "react-router-dom";

function App() {
  useEffect(() => {
    if (document) {
      const stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = "https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css";
      document.head.appendChild(stylesheet);
    }
  }, []);
  
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-tiny-logo" alt="logo" />
          <div className="py-6">
            <Routes>
              <Route path="/" element={<Form />} />
              <Route path="/:shortUrl" element={<RedirectToOriginalUrl />} />
              <Route path="/Error_404" element={<ErrorPage />} />
            </Routes>
          </div>
        </header>
      </div>
    </Router>
  );
}

const RedirectToOriginalUrl = () => {
  const navigate = useNavigate();
  const { shortUrl } = useParams();

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const response = await fetch(`http://localhost:5000/redirect/shortened?url=${shortUrl}`);
        const data = await response.json();
        if (response.ok && data.result) {
          window.location.href = data.result;
        } else {
          navigate("/Error_404");
        }
      } catch (error) {
        console.error("Error fetching the original URL:", error);
        navigate("/Error_404");
      }
    };

    fetchUrl();
  }, [shortUrl, navigate]);

  return (
    <div className="text-2xl">Redirecting...</div>
  );
};

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="text-2xl">
      <div>A ocurrido un error, la URL no se encuentra en la base de datos.</div>
      <button
        className="mt-4 px-6 py-2 text-white bg-blue-500 rounded shadow hover:bg-blue-600"
        onClick={() => navigate('/')}
      >
        Volver al inicio y acortar URL
      </button>
    </div>
  );
};

export default App;
