import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

interface AuthFormProps {
  onSuccess: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Flow State: login | otp | reset
  const [step, setStep] = useState<"login" | "otp" | "reset">("login");
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const { login, signup, forgotPassword, verifyOTP, resetPassword } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    age: '',
    gender: '',
    occupation: '',
    location: '',
  });

  // ===============================
  // 🔐 LOGIN / SIGNUP
  // ===============================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const result = await login(formData.email, formData.password);
        if (result.success) {
          toast.success("Welcome back to Ayusense!");
          onSuccess();
          navigate("/dashboard");
        } else {
          toast.error(result.error || "Invalid credentials");
        }
      } else {
        const result = await signup(
          formData.fullName, formData.email, formData.password,
          formData.age, formData.gender, formData.occupation, formData.location
        );
        if (result.success) {
          toast.success("Account created successfully!");
          setIsLogin(true);
          setFormData({ ...formData, password: '' });
        } else {
          toast.error(result.error || "Signup failed");
        }
      }
    } catch (err) {
      toast.error("Connection error. Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // 📩 OTP & RESET HANDLERS (Context Powered)
  // ===============================
  
  const handleForgotPassword = async () => {
    if (!formData.email) return toast.error("Enter your email first");
    setLoading(true);
    const res = await forgotPassword(formData.email);
    setLoading(false);
    if (res.success) {
      toast.success("OTP sent to your email 📩");
      setStep("otp");
    } else {
      toast.error(res.error || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return toast.error("Please enter the OTP");
    setLoading(true);
    const res = await verifyOTP(formData.email, otp);
    setLoading(false);
    if (res.success) {
      toast.success("OTP verified!");
      setStep("reset");
      setFormData({ ...formData, password: '' }); // Clear field for new password
    } else {
      toast.error(res.error || "Invalid OTP");
    }
  };

  const handleResetPassword = async () => {
    if (!formData.password) return toast.error("Enter a new password");
    setLoading(true);
    const res = await resetPassword(formData.email, formData.password);
    setLoading(false);
    if (res.success) {
      toast.success("Password updated! Please login");
      setStep("login");
      setIsLogin(true);
    } else {
      toast.error(res.error || "Reset failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">🌿</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Ayusense AI</h1>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl">
          {/* LOGIN / SIGNUP VIEW */}
          {step === "login" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="grid grid-cols-1 gap-4">
                  <input type="text" placeholder="Full Name" required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="w-full px-4 py-3 border rounded-xl" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="number" placeholder="Age" required value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} className="w-full px-4 py-3 border rounded-xl" />
                    <select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="w-full px-4 py-3 border rounded-xl bg-white">
                        <option value="">Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                  </div>
                </div>
              )}

              <input type="email" placeholder="Email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border rounded-xl" />
              
              <div className="relative">
                <input type={showPassword ? "text" : "password"} placeholder={isLogin ? "Password" : "Create Password"} required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full px-4 py-3 border rounded-xl pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400">
                  {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>

              {isLogin && (
                <div className="text-right">
                  <button type="button" onClick={handleForgotPassword} className="text-green-600 text-sm font-semibold hover:underline">
                    {loading ? "Processing..." : "Forgot Password?"}
                  </button>
                </div>
              )}

              <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg">
                {loading ? "Wait a moment..." : isLogin ? "Login" : "Create Account"}
              </button>

              <p className="text-center text-sm text-gray-500">
                {isLogin ? "New to Ayusense? " : "Already have an account? "}
                <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-green-600 font-bold">
                  {isLogin ? "Sign Up" : "Log In"}
                </button>
              </p>
            </form>
          )}

          {/* OTP VERIFICATION VIEW */}
          {step === "otp" && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-800">Verify OTP</h2>
                <p className="text-sm text-gray-500 mt-2">Enter the 6-digit code sent to your email.</p>
              </div>
              <input type="text" maxLength={6} placeholder="000000" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full px-4 py-3 border rounded-xl text-center text-2xl tracking-[0.5em] font-mono focus:ring-2 focus:ring-green-500 outline-none" />
              <button onClick={handleVerifyOtp} disabled={loading} className="w-full bg-green-600 text-white py-3 rounded-xl font-bold">
                {loading ? "Verifying..." : "Verify & Continue"}
              </button>
              <button onClick={() => setStep("login")} className="w-full flex items-center justify-center text-gray-400 text-sm">
                <ArrowLeftIcon className="w-4 h-4 mr-2" /> Back to Login
              </button>
            </div>
          )}

          {/* RESET PASSWORD VIEW */}
          {step === "reset" && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-800">New Password</h2>
                <p className="text-sm text-gray-500 mt-2">Choose a strong password you haven't used before.</p>
              </div>
              <input type="password" placeholder="Enter new password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full px-4 py-3 border rounded-xl" />
              <button onClick={handleResetPassword} disabled={loading} className="w-full bg-green-600 text-white py-3 rounded-xl font-bold">
                {loading ? "Updating..." : "Reset Password"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};