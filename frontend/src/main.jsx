import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SnackbarProvider
      maxSnack={2}
      autoHideDuration={1500}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <App />
    </SnackbarProvider>
  </BrowserRouter>
);
