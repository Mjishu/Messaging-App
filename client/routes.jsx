import App from "./src/App"
import SignIn from "./src/components/userComponents/SignIn"
import Error from "./src/components/generalComponents/Error"
import SignUp from "./src/components/userComponents/SignUp"

const routes = [
    {
        path: "/",
        element: <App/>,
        errorElement:<Error/>
    },
    {
        path:"/sign-in",
        element: <SignIn/>
    },
    {
        path:"/sign-up",
        element:<SignUp/>
    }
]

export default routes