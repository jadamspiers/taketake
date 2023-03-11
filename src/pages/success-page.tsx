import PrivateRoute from "../components/PrivateRoute";
import { useAuth } from "../hooks/useAuth";

export function SuccessPage() {
    const auth = useAuth();

    if (auth.isLoading) {
        return <div>Loading</div>
    }

    return (
        <PrivateRoute>
            <div>SUCCESS</div>
            <div>Welcome {auth.username}</div>
            <button onClick={() => auth.signOut()}>
                Log out
            </button>
        </PrivateRoute>
    )
}