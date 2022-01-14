import {
    QueryClient,
    QueryClientProvider,
} from 'react-query'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home/home';
const App = () => {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                </Routes>
            </Router>
        </QueryClientProvider>
    )
}

export default App;