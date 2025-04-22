// here we will write the context provider

import combineContext from "@/utils/combineContext";
import { AuthContextProvider } from "./AuthContext";

export const AppContextProvider = combineContext(
     AuthContextProvider,
    
) 