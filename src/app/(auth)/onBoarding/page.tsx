"use client";

import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Check, Github, Linkedin, Twitter, Eye, EyeOff, Sparkles } from 'lucide-react';

const OnboardingFlow = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    email: '',
    country: '',
    password: '',
    confirmPassword: '',
    isDeveloper: false,
    isInvestor: false,
    experience: '',
    fieldOfInterest: '',
    skillLevel: '',
    portfolio: '',
    linkedin: '',
    twitter: '',
    whyJoin: '',
    goals: '',
    cohortType: '',
    newsletter: true
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const saved = formData;
  }, [formData]);

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
      if (!formData.age || formData.age < 13) newErrors.age = 'Must be 13 or older';
      if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Invalid email';
      if (!formData.country.trim()) newErrors.country = 'Country is required';
      if (formData.password.length < 8) newErrors.password = 'Password must be 8+ characters';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (step === 2) {
      if (!formData.experience) newErrors.experience = 'Select experience level';
      if (!formData.fieldOfInterest) newErrors.fieldOfInterest = 'Select field of interest';
      if (!formData.skillLevel) newErrors.skillLevel = 'Select skill level';
    }
    
    if (step === 3) {
      if (!formData.whyJoin.trim()) newErrors.whyJoin = 'Please share why you want to join';
      if (!formData.goals.trim()) newErrors.goals = 'Please share your goals';
      if (!formData.cohortType) newErrors.cohortType = 'Select cohort type';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = () => {
    let role = 'student';
    if (formData.isDeveloper && formData.isInvestor) {
      role = formData.cohortType === 'Investor' ? 'investor' : 'developer';
    } else if (formData.isDeveloper) {
      role = 'developer';
    } else if (formData.isInvestor) {
      role = 'investor';
    }

    setShowSuccess(true);
    
    setTimeout(() => {
      const dashboardRoutes = {
        developer: '/dashboard/developer',
        investor: '/dashboard/investor',
        student: '/dashboard/student'
      };
      
      console.log('User Profile Created:', { ...formData, role });
      console.log('Redirecting to:', dashboardRoutes[role]);
      
      alert(`Success! Redirecting to ${role.toUpperCase()} Dashboard...`);
      setShowOnboarding(false);
      setShowSuccess(false);
      setCurrentStep(1);
    }, 2500);
  };

  const getPasswordStrength = (password) => {
    if (password.length < 8) return { strength: 'weak', color: 'bg-red-500', width: '33%' };
    if (password.length < 12) return { strength: 'medium', color: 'bg-yellow-500', width: '66%' };
    return { strength: 'strong', color: 'bg-green-500', width: '100%' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  if (!showOnboarding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 flex items-center justify-center p-4">
        <div className="text-center max-w-2xl">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-slate-900 mb-4">Learn 2 Launch</h1>
            <p className="text-xl text-slate-600 mb-2">Powered by Decensat DAO</p>
            <p className="text-lg text-slate-500">Build. Learn. Launch Your Web3 Future.</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <Sparkles className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Ready to Transform Your Career?</h2>
            <p className="text-slate-600 mb-6">Join our 8-week intensive program and launch your Web3 journey</p>
            
            <button
              onClick={() => setShowOnboarding(true)}
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Sign Up Now
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="bg-white rounded-lg p-4">
              <div className="font-semibold text-slate-900">Student</div>
              <div className="text-slate-500 text-xs">Learn & Grow</div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="font-semibold text-slate-900">Developer</div>
              <div className="text-slate-500 text-xs">Build Vaults</div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="font-semibold text-slate-900">Investor</div>
              <div className="text-slate-500 text-xs">Track Returns</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 flex items-center justify-center p-4">
      {showSuccess ? (
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md text-center animate-bounce">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Aboard!</h2>
          <p className="text-slate-600">Setting up your personalized dashboard...</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    currentStep >= step ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-400'
                  }`}>
                    {currentStep > step ? <Check className="w-5 h-5" /> : step}
                  </div>
                  {step < 4 && (
                    <div className={`flex-1 h-1 mx-2 rounded transition-all ${
                      currentStep > step ? 'bg-indigo-600' : 'bg-slate-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center text-sm text-slate-600">
              Step {currentStep} of 4
            </div>
          </div>

          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Let's Get to Know You</h2>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.fullName ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none`}
                  placeholder="John Doe"
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Age *</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.age ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none`}
                    placeholder="25"
                  />
                  {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Country *</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.country ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none`}
                    placeholder="United States"
                  />
                  {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none`}
                    placeholder="Min. 8 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600">Password Strength</span>
                      <span className={`font-medium ${passwordStrength.color.replace('bg-', 'text-')}`}>
                        {passwordStrength.strength}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full transition-all ${passwordStrength.color}`} style={{ width: passwordStrength.width }} />
                    </div>
                  </div>
                )}
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password *</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none`}
                    placeholder="Re-enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Professional Background</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-4 border border-slate-300 rounded-lg">
                  <input
                    type="checkbox"
                    name="isDeveloper"
                    checked={formData.isDeveloper}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                  />
                  <label className="font-medium text-slate-700">I'm a Developer</label>
                </div>

                <div className="flex items-center space-x-3 p-4 border border-slate-300 rounded-lg">
                  <input
                    type="checkbox"
                    name="isInvestor"
                    checked={formData.isInvestor}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                  />
                  <label className="font-medium text-slate-700">I'm an Investor</label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Years of Experience *</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.experience ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none`}
                >
                  <option value="">Select experience</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5+">5+ years</option>
                </select>
                {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Primary Field of Interest *</label>
                <select
                  name="fieldOfInterest"
                  value={formData.fieldOfInterest}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.fieldOfInterest ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none`}
                >
                  <option value="">Select field</option>
                  <option value="Web3">Web3</option>
                  <option value="AI">AI</option>
                  <option value="Finance">Finance</option>
                  <option value="Full-Stack">Full-Stack Development</option>
                  <option value="Design">Design</option>
                  <option value="Other">Other</option>
                </select>
                {errors.fieldOfInterest && <p className="text-red-500 text-xs mt-1">{errors.fieldOfInterest}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Skill Level *</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, skillLevel: level }))}
                      className={`py-3 px-4 rounded-lg font-medium transition-all ${
                        formData.skillLevel === level
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
                {errors.skillLevel && <p className="text-red-500 text-xs mt-1">{errors.skillLevel}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Portfolio / GitHub URL</label>
                <div className="relative">
                  <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    placeholder="https://github.com/username"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">LinkedIn</label>
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                      placeholder="linkedin.com/in/..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">X (Twitter)</label>
                  <div className="relative">
                    <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="url"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleInputChange}
                      className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                      placeholder="twitter.com/..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Goals & Aspirations</h2>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Why do you want to join Learn 2 Launch? *</label>
                <textarea
                  name="whyJoin"
                  value={formData.whyJoin}
                  onChange={handleInputChange}
                  rows="4"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.whyJoin ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none`}
                  placeholder="Share your motivation and what excites you about Web3..."
                />
                {errors.whyJoin && <p className="text-red-500 text-xs mt-1">{errors.whyJoin}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">What do you expect to achieve in the next 8 weeks? *</label>
                <textarea
                  name="goals"
                  value={formData.goals}
                  onChange={handleInputChange}
                  rows="4"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.goals ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none`}
                  placeholder="Describe your specific goals and learning objectives..."
                />
                {errors.goals && <p className="text-red-500 text-xs mt-1">{errors.goals}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Cohort Type *</label>
                <select
                  name="cohortType"
                  value={formData.cohortType}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.cohortType ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none`}
                >
                  <option value="">Select cohort type</option>
                  <option value="Developer">Developer Track</option>
                  <option value="Investor">Investor Track</option>
                  <option value="Student">Student/Beginner Track</option>
                </select>
                {errors.cohortType && <p className="text-red-500 text-xs mt-1">{errors.cohortType}</p>}
              </div>

              <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900">Weekly Newsletter & Updates</p>
                  <p className="text-sm text-slate-600">Stay informed about cohort progress and opportunities</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, newsletter: !prev.newsletter }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.newsletter ? 'bg-indigo-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.newsletter ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Review Your Information</h2>
              
              <div className="space-y-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-900 mb-3">Basic Information</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><span className="text-slate-600">Name:</span> <span className="font-medium">{formData.fullName}</span></div>
                    <div><span className="text-slate-600">Age:</span> <span className="font-medium">{formData.age}</span></div>
                    <div><span className="text-slate-600">Email:</span> <span className="font-medium">{formData.email}</span></div>
                    <div><span className="text-slate-600">Country:</span> <span className="font-medium">{formData.country}</span></div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-900 mb-3">Professional Background</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><span className="text-slate-600">Role:</span> <span className="font-medium">{formData.isDeveloper && 'Developer'} {formData.isInvestor && 'Investor'} {!formData.isDeveloper && !formData.isInvestor && 'Student'}</span></div>
                    <div><span className="text-slate-600">Experience:</span> <span className="font-medium">{formData.experience}</span></div>
                    <div><span className="text-slate-600">Field:</span> <span className="font-medium">{formData.fieldOfInterest}</span></div>
                    <div><span className="text-slate-600">Skill Level:</span> <span className="font-medium">{formData.skillLevel}</span></div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-900 mb-3">Goals & Preferences</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-slate-600">Cohort Type:</span> <span className="font-medium">{formData.cohortType}</span></div>
                    <div><span className="text-slate-600">Newsletter:</span> <span className="font-medium">{formData.newsletter ? 'Yes' : 'No'}</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                currentStep === 1
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all"
              >
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <div className="flex space-x-3">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-all"
                >
                  Edit Info
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all"
                >
                  <Check className="w-5 h-5" />
                  <span>Confirm & Continue</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OnboardingFlow;