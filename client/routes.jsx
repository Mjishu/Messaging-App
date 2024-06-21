import App from "./src/App"
import SignIn from "./src/components/userComponents/SignIn"
import Error from "./src/components/generalComponents/Error"
import SignUp from "./src/components/userComponents/SignUp"
import Profile from "./src/components/userComponents/Profile"
import Messages from "./src/components/messageComponents/Messages"

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
    },
    {
        path:"/user/:id",
        element:<Profile/>
    },
    {
        path: "/message",
        element: <Messages />
    }
]

export default routes
