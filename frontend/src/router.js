import { createBrowserRouter } from "react-router-dom";
import LobbyPage from "./pages/LobbyPage";
import IngamePage from './pages/IngamePage'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <LobbyPage />
    },
    {
        path: '/game',
        element: <IngamePage />
    },
    {
        path: '/game/:id',
        element : <IngamePage/>
    }
]);