import {React,useState} from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in:", userCredential.user);
      navigate("/");
    } catch (error) {
      handleAuthError(error);
    } finally {
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    
    try {
      setError("");
      
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if new user
      if (result._tokenResponse.isNewUser) {
        await setDoc(doc(db, "Users", user.uid), {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          createdAt: new Date().toISOString(),
          role: "user"
        });
      }

window.location.href="/"
    } catch (error) {
      handleAuthError(error);
    } finally {
    }
  };

  const handleAuthError = (error) => {
    switch (error.code) {
      case "auth/user-not-found":
        setError("No account found with this email.");
        break;
      case "auth/wrong-password":
        setError("Incorrect password.");
        break;
      case "auth/popup-closed-by-user":
        setError("Google sign-in popup was closed.");
        break;
      default:
        setError("Failed to sign in. Check cridentials.");
    }
    console.error("Authentication error:", error.message);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col">


      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-sm p-8">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Sign in to your account
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore.
          </p>

          <form >
            <div className="space-y-6">
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white text-black w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Email address"
                />
              </div>

              <div>
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white text-black w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Password"
                />
              </div>

              <button
                type="submit"
                onClick={handleEmailSignIn}
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Log in
              </button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-purple-600 hover:text-purple-700">
              Forgot your password?
            </a>
          </div>

          <div className="mt-6 text-center text-gray-500">
            or
          </div>

          <div className="mt-6 space-y-4">
            <button
            onClick={handleGoogleSignIn} className="text-slate-900 w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FcGoogle/>
              Log in with Google
            </button>

            <div className="px-8 py-4 bg-gray-50/50 text-center">
            <p className="text-gray-600">
                Not having account?{' '}
              <a href="/Register" className="text-purple-600 hover:text-purple-700 font-medium">
                Register
              </a>
            </p>
          </div>
          </div>
        </div>
      </div>

      {/* Footer */}
     
    </div>
  )
}

export default Login
