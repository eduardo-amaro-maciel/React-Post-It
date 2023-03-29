import RoutesApp from "./routes/RoutesApp";
import AuthProvider from "./context/AuthContext";

import "uikit/dist/css/uikit.min.css";
import "uikit/dist/css/uikit-core.min.css";
import "uikit/dist/js/uikit.min.js"; 

function App() {
    return (
        <AuthProvider>
            <RoutesApp />
        </AuthProvider>
    );
}

export default App;
 
