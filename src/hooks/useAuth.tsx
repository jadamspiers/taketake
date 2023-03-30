import { Amplify, Auth } from "aws-amplify";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AwsConfigAuth } from "../config/auth";

Amplify.configure({
    Auth: {

        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        identityPoolId: 'arn:aws:cognito-idp:us-east-2:107762387091:userpool/us-east-2_b9RJN7YgC',
        
        // REQUIRED - Amazon Cognito Region
        region: 'us-east-2',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-east-2_b9RJN7YgC',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '2pqf9q8f0ro4neh7km04llfg6r',


         // OPTIONAL - Hosted UI configuration
        // oauth: {
        //     domain: 'your_cognito_domain',
        //     scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
        //     redirectSignIn: 'http://localhost:3000/',
        //     redirectSignOut: 'http://localhost:3000/',
        //     responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
        // }
    }
});

interface UseAuth {
    isLoading: boolean;
    isAuthenticated: boolean;
    username: string;
    token: string;
    signUp: (username: string, password: string) => Promise<Result>;
    confirmSignUp: (username: string, code: string) => Promise<Result>;
    signIn: (username: string, password: string) => Promise<Result>;
    signOut: () => void;
    forgotPassword: (username: string) => Promise<Result>;
    forgotPasswordSubmit: (username: string, code: string, new_password: string) => Promise<Result>;
}

interface Result {
    success: boolean;
    message: string;
}

type Props = {
    children?: React.ReactNode;
};

const authContext = createContext({} as UseAuth);

export const ProvideAuth: React.FC<Props> = ({ children }) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
    return useContext(authContext);
};

const useProvideAuth = (): UseAuth => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [token, setToken] = useState("");

    useEffect(() => {
        Auth.currentAuthenticatedUser()
            .then((result) => {
                setUsername(result.username);
                setIsAuthenticated(true);
                setIsLoading(false);
                // setToken(result.signInUserSession.accessToken.jwtToken)
                setToken(result.signInUserSession.idToken.jwtToken);
            })
            .catch(() => {
                setUsername("");
                setIsAuthenticated(false);
                setIsLoading(false);
            });
    }, []);

    const signIn = async (username: string, password: string) => {
        try {
            const result = await Auth.signIn(username, password);
            console.log("result: " + JSON.stringify(result));
            return { success: true, message: "" };
        } catch (error) {
            return {
                success: false,
                message: "LOGIN FAIL: " + error,
            };
        }
    };

    const signUp = async (username: string, password: string) => {
        try {
            const { user } = await Auth.signUp({
                username,
                password,
            });
            console.log("invoking auth.SignUp(): user => " + JSON.stringify(user));
            return { success: true, message: ""};
        } catch (error) {
            console.log("error signing up:", error);
            return {
                success: false,
                message: "SIGN UP FAIL",
            }
        }
    }

    const confirmSignUp = async (username: string, code: string) => {
        try {
            const result = await Auth.confirmSignUp(username, code);
            setUsername(username);
            setIsAuthenticated(true);
            return { success: true, message: "" }
        } catch (error) {
            console.log("error confirming sign up: ", error);
            return {
                success: false,
                message: "CONFIRM SIGN UP FAILED"
            }
        }
    }

    const forgotPassword = async (username: string) => {
        Auth.forgotPassword(username)
            .then((data) => {
                console.log(data)
            })
            .then((err) => {
                console.log(err)
                return {
                    success: false,
                    message: "FORGOT PASSWORD ATTEMPT FAILED"
                }
            })
        
        return {
            success: true,
            message: ""
        }
    }

    const forgotPasswordSubmit = async (username: string, code: string, new_password: string) => {
        Auth.forgotPasswordSubmit(username, code, new_password)
            .then((data) => {
                console.log(data)
                return { 
                    success: true,
                    message: ""
                }
            })
            .then((err) => {
                console.log(err)
                return {
                    success: false,
                    message: "FORGOT PASSWORD SUBMISSION FAILED"
                }
            })

        return {
            success: true,
            message: ""
        }
    }

    const signOut = async () => {
        try {
            await Auth.signOut();
            setUsername("");
            setIsAuthenticated(false);
            setToken("");
            return { success: true, message: "" };
        } catch (error) {
            return {
                success: false,
                message: "LOGOUT FAIL",
            };
        }
    };

    return {
        isLoading,
        isAuthenticated,
        username,
        token,
        signUp,
        confirmSignUp,
        signIn,
        signOut,
        forgotPassword,
        forgotPasswordSubmit,
    };
};