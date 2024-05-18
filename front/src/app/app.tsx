import { AuthProvider } from "./provider/auth_provider";
import { Routes } from "./routes";

function App() {
  // Redirect to not-mobile page if the user is on a desktop
  document.addEventListener("DOMContentLoaded", function() {
    if (window.innerWidth >= 768) {
      window.location.href = "/not-mobile.html";
    }
  });
  window.addEventListener("resize", function() {
    if (window.innerWidth >= 768) {
      window.location.href = "/not-mobile.html";
    }
  });
  return (
    <main>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </main>
  );
}

export default App;

