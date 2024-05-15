import { MainPage } from "./pages/main_page/main_page";

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
      <MainPage />
    </main>
  );
}

export default App;

