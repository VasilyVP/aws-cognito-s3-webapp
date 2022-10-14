import { Auth, CognitoUser } from '@aws-amplify/auth';


type SignUpProps = {
    username: string;
    password: string;
    email: string;
    phone_number?: string;
}

export default class UserManagement {

    static async signUp({ username, password, email, phone_number }: SignUpProps) {
        try {
            const result = await Auth.signUp({
                username,
                password,
                attributes: {
                    email,          // optional
                    phone_number,   // optional - E.164 number convention
                    // other custom attributes 
                },
                autoSignIn: { // optional - enables auto sign in after user is confirmed
                    enabled: true,
                }
            });

            const { user } = result;

            console.log('auth result: ', result);

            return user;
        } catch (error) {
            console.log('error signing up:', error);
            return null;
        }
    }

    static async confirmSignUp({ username, code }: { username: string; code: string }) {
        try {
            return await Auth.confirmSignUp(username, code);
        } catch (error) {
            console.log('error confirming sign up', error);
            return null;
        }
    }

    static async signIn({ username, password }: { username: string; password: string }): Promise<CognitoUser | null> {
        try {
            const user = await Auth.signIn(username, password);
            return user;
        } catch (error) {
            console.log('error signing in', error);
            return null;
        }
    }

    static async getCurrentUser(): Promise<CognitoUser | null> {
        try {
            return await Auth.currentAuthenticatedUser({
                bypassCache: true,  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
            });
        } catch (err) {
            console.error(err);

            return null;
        }
    }

    static getCurrentSession() {
        return Auth.currentSession();
    }
}
