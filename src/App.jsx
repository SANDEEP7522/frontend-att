import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { AppContextProvider } from "./context/AppContextProvider";
import { AppRoutes } from "./Routes";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <AppRoutes />    
      </AppContextProvider>
       <Toaster />
    </QueryClientProvider>
  );
}

export default App;
