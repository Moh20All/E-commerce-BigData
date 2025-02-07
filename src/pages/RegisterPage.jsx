import React, { useState } from 'react';
import { Mail, Lock, EyeOff, Eye, ArrowRight, AlertCircle } from 'lucide-react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db, googleLogin } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailRegistration = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user document in Firestore
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        firstName: '',
        lastName: '',
        photo: '',
      });

      navigate('/dashboard'); // Navigate to dashboard after successful registration
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      const user = await googleLogin();
      if (user) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      setError('Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Floating shapes */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000" />
        
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden relative z-10">
          {/* Header */}
          <div className="px-8 pt-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
            <p className="text-gray-600 mb-8">Join our community of creators and innovators</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mx-8 mb-6 flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Social Sign Up */}
          <div className="px-8">
            <button 
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-4 rounded-xl border border-gray-200 flex items-center justify-center space-x-2 transition-all duration-200 shadow-sm hover:shadow mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <FcGoogle/>
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center px-8 mb-6">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleEmailRegistration} className="px-8 pb-8">
            <div className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="text-slate-900 w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="text-slate-900 w-full pl-10 pr-12 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Create a password"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-500">Must be at least 6 characters long</p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl hover:opacity-90 transition-all duration-200 flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="px-8 py-4 bg-gray-50/50 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                Sign in
              </a>
            </p>
          </div>
        </div>

        {/* Terms */}
        <p className="text-center text-gray-500 text-sm mt-4">
          By creating an account, you agree to our{' '}
          <a href="#" className="text-purple-600 hover:text-purple-700">Terms</a>
          {' '}and{' '}
          <a href="/login" className="text-purple-600 hover:text-purple-700">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;