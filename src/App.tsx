import { Route, Routes } from "react-router-dom";
import Todo from "./components/Todo/Todo";
import { Register } from "./components/Signup/Signup";
import { Login } from "./components/Login/Login";
import { ErrorPage } from "./components/ErrorPage/ErrorPage";
import Layout from "./Layout/Layout";
import RequireAuth from "./utils/RequireAuth";

function App() {

  return (
    <Routes>
			<Route path="/" element={<Layout />}>
				{/* public routes */}
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />

				{/* we want to protect these routes */}
					<Route element={<RequireAuth />} >
						<Route path="/" element={<Todo />}/>
						<Route path="/todo" element={<Todo />} />
					</Route>
				
				{/* catch all */}
				<Route path="/*" element={<ErrorPage />} />
			</Route>
    </Routes>
  );
}

export default App;