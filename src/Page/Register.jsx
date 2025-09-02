import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff, Mail, Lock, User, Briefcase, Chrome, Check, X } from 'lucide-react';
import Lottie from "lottie-react";
import CreatAcount from "../Loti-animesun/Creat-account.json"

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: 'jobseeker', // jobseeker or employer
        agreeToTerms: false
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({
        hasLength: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSpecial: false
    });
    
    const { signup, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const strength = {
            hasLength: password.length >= 8,
            hasUppercase: /[A-Z]/.test(password),
            hasLowercase: /[a-z]/.test(password),
            hasNumber: /\d/.test(password),
            hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };
        setPasswordStrength(strength);
        return Object.values(strength).every(Boolean);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        
        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));

        if (name === 'password') {
            validatePassword(value);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setError('');
            setLoading(true);
            await loginWithGoogle();
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Failed to sign up with Google');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Reset error
        setError('');

        // Validation
        const { firstName, lastName, email, password, confirmPassword, agreeToTerms } = formData;
        
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            setError('Please fill in all required fields');
            return;
        }

        if (!email.includes('@')) {
            setError('Please enter a valid email address');
            return;
        }

        if (!validatePassword(password)) {
            setError('Password must meet all requirements');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!agreeToTerms) {
            setError('Please agree to the terms and conditions');
            return;
        }

        try {
            setLoading(true);
            await signup(email, password, {
                firstName,
                lastName,
                userType: formData.userType
            });
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Failed to create account. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const PasswordStrengthIndicator = ({ strength }) => (
        <div className="mt-2 space-y-1">
            <div className="flex items-center gap-1 text-xs">
                {strength.hasLength ? 
                    <Check className="w-3 h-3 text-green-500" /> : 
                    <X className="w-3 h-3 text-red-500" />
                }
                <span className={strength.hasLength ? 'text-green-600' : 'text-red-600'}>
                    At least 8 characters
                </span>
            </div>
            <div className="flex items-center gap-1 text-xs">
                {strength.hasUppercase && strength.hasLowercase ? 
                    <Check className="w-3 h-3 text-green-500" /> : 
                    <X className="w-3 h-3 text-red-500" />
                }
                <span className={strength.hasUppercase && strength.hasLowercase ? 'text-green-600' : 'text-red-600'}>
                    Upper and lowercase letters
                </span>
            </div>
            <div className="flex items-center gap-1 text-xs">
                {strength.hasNumber ? 
                    <Check className="w-3 h-3 text-green-500" /> : 
                    <X className="w-3 h-3 text-red-500" />
                }
                <span className={strength.hasNumber ? 'text-green-600' : 'text-red-600'}>
                    At least one number
                </span>
            </div>
            <div className="flex items-center gap-1 text-xs">
                {strength.hasSpecial ? 
                    <Check className="w-3 h-3 text-green-500" /> : 
                    <X className="w-3 h-3 text-red-500" />
                }
                <span className={strength.hasSpecial ? 'text-green-600' : 'text-red-600'}>
                    Special character
                </span>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }}></div>
            
            {/* Main Container */}
            <div className="w-full  lg:w-[80%] lg:flex lg:flex-row-reverse relative z-10">
                {/* Logo/Header */}
                <div className="text-center lg:w-[40%] mb-8">
                    {/* <div className="mx-auto w-16 h-16 bg-gradient-to-r  rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                        <Briefcase className="w-8 h-8 text-white" />
                    </div> */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Join CAREER-CODE</h1>
                    <p className="text-gray-600">Create your account and start your journey</p>

                    <div>
                        <Lottie animationData={CreatAcount} loop={true}>

                        </Lottie>
                    </div>
                </div>

                {/* Register Card */}
                <div className="bg-gray-400 lg:w-[40%] bg-opacity-80  backdrop-blur-sm rounded-3xl shadow-xl p-8 border  border-opacity-20">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* User Type Selection */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Account Type</label>
                            <div className="flex gap-4">
                                <label className="flex-1 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="userType"
                                        value="jobseeker"
                                        checked={formData.userType === 'jobseeker'}
                                        onChange={handleInputChange}
                                        className="sr-only"
                                    />
                                    <div className={`p-4 border-2 rounded-xl text-center transition-all ${
                                        formData.userType === 'jobseeker' 
                                            ? 'border-blue-500 bg-blue-50 text-blue-700' 
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}>
                                        <User className="w-6 h-6 mx-auto mb-2" />
                                        <span className="text-sm font-medium">Job Seeker</span>
                                    </div>
                                </label>
                                <label className="flex-1 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="userType"
                                        value="employer"
                                        checked={formData.userType === 'employer'}
                                        onChange={handleInputChange}
                                        className="sr-only"
                                    />
                                    <div className={`p-4 border-2 rounded-xl text-center transition-all ${
                                        formData.userType === 'employer' 
                                            ? 'border-purple-500 bg-purple-50 text-purple-700' 
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}>
                                        <Briefcase className="w-6 h-6 mx-auto mb-2" />
                                        <span className="text-sm text-gray-900 font-medium">Employer</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Name Fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First name"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200  bg-opacity-70"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    disabled={loading}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last name"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200  bg-opacity-70"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="your@email.com"
                                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200  bg-opacity-70"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Create a strong password"
                                    className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200  bg-opacity-70"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {formData.password && <PasswordStrengthIndicator strength={passwordStrength} />}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200  bg-opacity-70"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div className="space-y-2">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="agreeToTerms"
                                    checked={formData.agreeToTerms}
                                    onChange={handleInputChange}
                                    className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                    disabled={loading}
                                />
                                <span className="text-sm text-gray-600">
                                    I agree to the{' '}
                                    <Link to="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
                                        Terms of Service
                                    </Link>
                                    {' '}and{' '}
                                    <Link to="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
                                        Privacy Policy
                                    </Link>
                                </span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r  text-white py-3 px-4 rounded-xl font-medium  focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg bg-gray-950 hover:shadow-xl"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Creating Account...
                                </div>
                            ) : (
                                'Create Account'
                            )}
                        </button>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        {/* Social Login */}
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 bg-white bg-opacity-70"
                            disabled={loading}
                        >
                            <Chrome className="w-5 h-5 text-red-500" />
                            <span className="text-gray-700 font-medium">Continue with Google</span>
                        </button>

                        {/* Login Link */}
                        <div className="text-center">
                            <span className="text-gray-600">Already have an account? </span>
                            <Link
                                to="/login"
                                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                            >
                                Sign in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;