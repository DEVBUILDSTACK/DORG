"use client";

// import React, { useState, useEffect } from 'react';
// import { ChevronRight, ChevronLeft, Check, Github, Linkedin, Twitter, Eye, EyeOff, Sparkles } from 'lucide-react';

// const OnboardingFlow = () => {
//   const [showOnboarding, setShowOnboarding] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
  
//   const [formData, setFormData] = useState({
//     fullName: '',
//     age: '',
//     email: '',
//     country: '',
//     password: '',
//     confirmPassword: '',
//     isDeveloper: false,
//     isInvestor: false,
//     experience: '',
//     fieldOfInterest: '',
//     skillLevel: '',
//     portfolio: '',
//     linkedin: '',
//     twitter: '',
//     whyJoin: '',
//     goals: '',
//     cohortType: '',
//     newsletter: true
//   });

//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     const saved = formData;
//   }, [formData]);

//   const validateStep = (step) => {
//     const newErrors = {};
    
//     if (step === 1) {
//       if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
//       if (!formData.age || formData.age < 12) newErrors.age = 'Must be 12 or older';
//       if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Invalid email';
//       if (!formData.country.trim()) newErrors.country = 'Country is required';
//       if (formData.password.length < 8) newErrors.password = 'Password must be 8+ characters';
//       if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
//     }
    
//     if (step === 2) {
//       if (!formData.experience) newErrors.experience = 'Select experience level';
//       if (!formData.fieldOfInterest) newErrors.fieldOfInterest = 'Select field of interest';
//       if (!formData.skillLevel) newErrors.skillLevel = 'Select skill level';
//     }
    
//     if (step === 3) {
//       if (!formData.whyJoin.trim()) newErrors.whyJoin = 'Please share why you want to join';
//       if (!formData.goals.trim()) newErrors.goals = 'Please share your goals';
//       if (!formData.cohortType) newErrors.cohortType = 'Select cohort type';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const nextStep = () => {
//     if (validateStep(currentStep)) {
//       setCurrentStep(prev => Math.min(prev + 1, 4));
//     }
//   };

//   const prevStep = () => {
//     setCurrentStep(prev => Math.max(prev - 1, 1));
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleSubmit = () => {
//     let role = 'student';
//     if (formData.isDeveloper && formData.isInvestor) {
//       role = formData.cohortType === 'Investor' ? 'investor' : 'developer';
//     } else if (formData.isDeveloper) {
//       role = 'developer';
//     } else if (formData.isInvestor) {
//       role = 'investor';
//     }

//     setShowSuccess(true);
    
//     setTimeout(() => {
//       const dashboardRoutes = {
//         developer: '/dashboard/developer',
//         investor: '/dashboard/investor',
//         student: '/dashboard/student'
//       };
      
//       console.log('User Profile Created:', { ...formData, role });
//       console.log('Redirecting to:', dashboardRoutes[role]);
      
//       alert(`Success! Redirecting to ${role.toUpperCase()} Dashboard...`);
//       setShowOnboarding(false);
//       setShowSuccess(false);
//       setCurrentStep(1);
//     }, 2500);
//   };

//   const getPasswordStrength = (password) => {
//     if (password.length < 8) return { strength: 'weak', color: 'bg-red-500', width: '33%' };
//     if (password.length < 12) return { strength: 'medium', color: 'bg-yellow-500', width: '66%' };
//     return { strength: 'strong', color: 'bg-green-500', width: '100%' };
//   };

//   const passwordStrength = getPasswordStrength(formData.password);

//   if (!showOnboarding) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 flex items-center justify-center p-4">
//         <div className="text-center max-w-2xl">
//           <div className="mb-8">
//             <h1 className="text-5xl font-bold text-slate-900 mb-4">Learn 2 Launch</h1>
//             <p className="text-xl text-slate-600 mb-2">Powered by Decensat DAO</p>
//             <p className="text-lg text-slate-500">Build. Learn. Launch Your Web3 Future.</p>
//           </div>
          
//           <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
//             <Sparkles className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
//             <h2 className="text-2xl font-semibold text-slate-900 mb-4">Ready to Transform Your Career?</h2>
//             <p className="text-slate-600 mb-6">Join our 8-week intensive program and launch your Web3 journey</p>
            
//             <button
//               onClick={() => setShowOnboarding(true)}
//               className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg"
//             >
//               Sign Up Now
//             </button>
//           </div>

//           <div className="grid grid-cols-3 gap-4 text-sm">
//             <div className="bg-white rounded-lg p-4">
//               <div className="font-semibold text-slate-900">Student</div>
//               <div className="text-slate-500 text-xs">Learn & Grow</div>
//             </div>
//             <div className="bg-white rounded-lg p-4">
//               <div className="font-semibold text-slate-900">Developer</div>
//               <div className="text-slate-500 text-xs">Build Vaults</div>
//             </div>
//             <div className="bg-white rounded-lg p-4">
//               <div className="font-semibold text-slate-900">Investor</div>
//               <div className="text-slate-500 text-xs">Track Returns</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 flex items-center justify-center p-4">
//       {showSuccess ? (
//         <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md text-center animate-bounce">
//           <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
//             <Check className="w-10 h-10 text-white" />
//           </div>
//           <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Aboard!</h2>
//           <p className="text-slate-600">Setting up your personalized dashboard...</p>
//         </div>
//       ) : (
//         <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full">
//           <div className="mb-8">
//             <div className="flex justify-between items-center mb-4">
//               {[1, 2, 3, 4].map((step) => (
//                 <div key={step} className="flex items-center flex-1">
//                   <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
//                     currentStep >= step ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-400'
//                   }`}>
//                     {currentStep > step ? <Check className="w-5 h-5" /> : step}
//                   </div>
//                   {step < 4 && (
//                     <div className={`flex-1 h-1 mx-2 rounded transition-all ${
//                       currentStep > step ? 'bg-indigo-600' : 'bg-slate-200'
//                     }`} />
//                   )}
//                 </div>
//               ))}
//             </div>
//             <div className="text-center text-sm text-slate-600">
//               Step {currentStep} of 4
//             </div>
//           </div>

//           {currentStep === 1 && (
//             <div className="space-y-4">
//               <h2 className="text-2xl font-bold text-slate-900 mb-6">Let's Get to Know You</h2>
              
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
//                 <input
//                   type="text"
//                   name="fullName"
//                   value={formData.fullName}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-3 rounded-lg border ${errors.fullName ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none`}
//                   placeholder="John Doe"
//                 />
//                 {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 mb-1">Age *</label>
//                   <input
//                     type="number"
//                     name="age"
//                     value={formData.age}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-3 rounded-lg border ${errors.age ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none`}
//                     placeholder="25"
//                   />
//                   {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 mb-1">Country *</label>
//                   <input
//                     type="text"
//                     name="country"
//                     value={formData.country}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-3 rounded-lg border ${errors.country ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none`}
//                     placeholder="United States"
//                   />
//                   {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none`}
//                   placeholder="john@example.com"
//                 />
//                 {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-1">Password *</label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none`}
//                     placeholder="Min. 8 characters"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
//                   >
//                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//                 {formData.password && (
//                   <div className="mt-2">
//                     <div className="flex justify-between text-xs mb-1">
//                       <span className="text-slate-600">Password Strength</span>
//                       <span className={`font-medium ${passwordStrength.color.replace('bg-', 'text-')}`}>
//                         {passwordStrength.strength}
//                       </span>
//                     </div>
//                     <div className="w-full bg-slate-200 rounded-full h-1.5">
//                       <div className={`h-1.5 rounded-full transition-all ${passwordStrength.color}`} style={{ width: passwordStrength.width }} />
//                     </div>
//                   </div>
//                 )}
//                 {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password *</label>
//                 <div className="relative">
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-3 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none`}
//                     placeholder="Re-enter password"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
//                   >
//                     {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//                 {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
//               </div>
//             </div>
//           )}

//           {currentStep === 2 && (
//             <div className="space-y-4">
//               <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Professional Background</h2>
              
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="flex items-center space-x-3 p-4 border border-slate-300 rounded-lg">
//                   <input
//                     type="checkbox"
//                     name="isDeveloper"
//                     checked={formData.isDeveloper}
//                     onChange={handleInputChange}
//                     className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
//                   />
//                   <label className="font-medium text-slate-700">I'm a Developer</label>
//                 </div>

//                 <div className="flex items-center space-x-3 p-4 border border-slate-300 rounded-lg">
//                   <input
//                     type="checkbox"
//                     name="isInvestor"
//                     checked={formData.isInvestor}
//                     onChange={handleInputChange}
//                     className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
//                   />
//                   <label className="font-medium text-slate-700">I'm an Investor</label>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-1">Years of Experience *</label>
//                 <select
//                   name="experience"
//                   value={formData.experience}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-3 rounded-lg border ${errors.experience ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none`}
//                 >
//                   <option value="">Select experience</option>
//                   <option value="0-1">0-1 years</option>
//                   <option value="1-3">1-3 years</option>
//                   <option value="3-5">3-5 years</option>
//                   <option value="5+">5+ years</option>
//                 </select>
//                 {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-1">Primary Field of Interest *</label>
//                 <select
//                   name="fieldOfInterest"
//                   value={formData.fieldOfInterest}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-3 rounded-lg border ${errors.fieldOfInterest ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none`}
//                 >
//                   <option value="">Select field</option>
//                   <option value="Web3">Web3</option>
//                   <option value="AI">AI</option>
//                   <option value="Finance">Finance</option>
//                   <option value="Full-Stack">Full-Stack Development</option>
//                   <option value="Design">Design</option>
//                   <option value="Other">Other</option>
//                 </select>
//                 {errors.fieldOfInterest && <p className="text-red-500 text-xs mt-1">{errors.fieldOfInterest}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-1">Skill Level *</label>
//                 <div className="grid grid-cols-3 gap-3">
//                   {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
//                     <button
//                       key={level}
//                       type="button"
//                       onClick={() => setFormData(prev => ({ ...prev, skillLevel: level }))}
//                       className={`py-3 px-4 rounded-lg font-medium transition-all ${
//                         formData.skillLevel === level
//                           ? 'bg-indigo-600 text-white'
//                           : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
//                       }`}
//                     >
//                       {level}
//                     </button>
//                   ))}
//                 </div>
//                 {errors.skillLevel && <p className="text-red-500 text-xs mt-1">{errors.skillLevel}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-1">Portfolio / GitHub URL</label>
//                 <div className="relative">
//                   <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
//                   <input
//                     type="url"
//                     name="portfolio"
//                     value={formData.portfolio}
//                     onChange={handleInputChange}
//                     className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
//                     placeholder="https://github.com/username"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 mb-1">LinkedIn</label>
//                   <div className="relative">
//                     <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
//                     <input
//                       type="url"
//                       name="linkedin"
//                       value={formData.linkedin}
//                       onChange={handleInputChange}
//                       className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
//                       placeholder="linkedin.com/in/..."
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 mb-1">X (Twitter)</label>
//                   <div className="relative">
//                     <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
//                     <input
//                       type="url"
//                       name="twitter"
//                       value={formData.twitter}
//                       onChange={handleInputChange}
//                       className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
//                       placeholder="twitter.com/..."
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {currentStep === 3 && (
//             <div className="space-y-4">
//               <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Goals & Aspirations</h2>
              
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-1">Why do you want to join Learn 2 Launch? *</label>
//                 <textarea
//                   name="whyJoin"
//                   value={formData.whyJoin}
//                   onChange={handleInputChange}
//                   rows="4"
//                   className={`w-full px-4 py-3 rounded-lg border ${errors.whyJoin ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none`}
//                   placeholder="Share your motivation and what excites you about Web3..."
//                 />
//                 {errors.whyJoin && <p className="text-red-500 text-xs mt-1">{errors.whyJoin}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-1">What do you expect to achieve in the next 8 weeks? *</label>
//                 <textarea
//                   name="goals"
//                   value={formData.goals}
//                   onChange={handleInputChange}
//                   rows="4"
//                   className={`w-full px-4 py-3 rounded-lg border ${errors.goals ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none`}
//                   placeholder="Describe your specific goals and learning objectives..."
//                 />
//                 {errors.goals && <p className="text-red-500 text-xs mt-1">{errors.goals}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Cohort Type *</label>
//                 <select
//                   name="cohortType"
//                   value={formData.cohortType}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-3 rounded-lg border ${errors.cohortType ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none`}
//                 >
//                   <option value="">Select cohort type</option>
//                   <option value="Developer">Developer Track</option>
//                   <option value="Investor">Investor Track</option>
//                   <option value="Student">Student/Beginner Track</option>
//                 </select>
//                 {errors.cohortType && <p className="text-red-500 text-xs mt-1">{errors.cohortType}</p>}
//               </div>

//               <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg">
//                 <div>
//                   <p className="font-medium text-slate-900">Weekly Newsletter & Updates</p>
//                   <p className="text-sm text-slate-600">Stay informed about cohort progress and opportunities</p>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => setFormData(prev => ({ ...prev, newsletter: !prev.newsletter }))}
//                   className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//                     formData.newsletter ? 'bg-indigo-600' : 'bg-slate-300'
//                   }`}
//                 >
//                   <span
//                     className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                       formData.newsletter ? 'translate-x-6' : 'translate-x-1'
//                     }`}
//                   />
//                 </button>
//               </div>
//             </div>
//           )}

//           {currentStep === 4 && (
//             <div className="space-y-4">
//               <h2 className="text-2xl font-bold text-slate-900 mb-6">Review Your Information</h2>
              
//               <div className="space-y-4">
//                 <div className="bg-slate-50 rounded-lg p-4">
//                   <h3 className="font-semibold text-slate-900 mb-3">Basic Information</h3>
//                   <div className="grid grid-cols-2 gap-3 text-sm">
//                     <div><span className="text-slate-600">Name:</span> <span className="font-medium">{formData.fullName}</span></div>
//                     <div><span className="text-slate-600">Age:</span> <span className="font-medium">{formData.age}</span></div>
//                     <div><span className="text-slate-600">Email:</span> <span className="font-medium">{formData.email}</span></div>
//                     <div><span className="text-slate-600">Country:</span> <span className="font-medium">{formData.country}</span></div>
//                   </div>
//                 </div>

//                 <div className="bg-slate-50 rounded-lg p-4">
//                   <h3 className="font-semibold text-slate-900 mb-3">Professional Background</h3>
//                   <div className="grid grid-cols-2 gap-3 text-sm">
//                     <div><span className="text-slate-600">Role:</span> <span className="font-medium">{formData.isDeveloper && 'Developer'} {formData.isInvestor && 'Investor'} {!formData.isDeveloper && !formData.isInvestor && 'Student'}</span></div>
//                     <div><span className="text-slate-600">Experience:</span> <span className="font-medium">{formData.experience}</span></div>
//                     <div><span className="text-slate-600">Field:</span> <span className="font-medium">{formData.fieldOfInterest}</span></div>
//                     <div><span className="text-slate-600">Skill Level:</span> <span className="font-medium">{formData.skillLevel}</span></div>
//                   </div>
//                 </div>

//                 <div className="bg-slate-50 rounded-lg p-4">
//                   <h3 className="font-semibold text-slate-900 mb-3">Goals & Preferences</h3>
//                   <div className="space-y-2 text-sm">
//                     <div><span className="text-slate-600">Cohort Type:</span> <span className="font-medium">{formData.cohortType}</span></div>
//                     <div><span className="text-slate-600">Newsletter:</span> <span className="font-medium">{formData.newsletter ? 'Yes' : 'No'}</span></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="flex justify-between mt-8">
//             <button
//               onClick={prevStep}
//               disabled={currentStep === 1}
//               className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
//                 currentStep === 1
//                   ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
//                   : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
//               }`}
//             >
//               <ChevronLeft className="w-5 h-5" />
//               <span>Previous</span>
//             </button>

//             {currentStep < 4 ? (
//               <button
//                 onClick={nextStep}
//                 className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all"
//               >
//                 <span>Next</span>
//                 <ChevronRight className="w-5 h-5" />
//               </button>
//             ) : (
//               <div className="flex space-x-3">
//                 <button
//                   onClick={() => setCurrentStep(1)}
//                   className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-all"
//                 >
//                   Edit Info
//                 </button>
//                 <button
//                   onClick={handleSubmit}
//                   className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all"
//                 >
//                   <Check className="w-5 h-5" />
//                   <span>Confirm & Continue</span>
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OnboardingFlow;

import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, BookOpen, TrendingUp, Code2, Sparkles, Check, User, Share2, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

const countries = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
];

const roles = [
  {
    id: 'student',
    title: 'Student',
    icon: BookOpen,
    description: 'Learn financial literacy and coding through real-world simulations.',
    gradient: 'from-blue-500 to-teal-400',
    glow: 'shadow-blue-500/50',
  },
  {
    id: 'investor',
    title: 'Investor',
    icon: TrendingUp,
    description: 'Access live vault analytics and diversify your digital portfolio.',
    gradient: 'from-amber-500 to-orange-400',
    glow: 'shadow-amber-500/50',
  },
  {
    id: 'developer',
    title: 'Developer',
    icon: Code2,
    description: 'Build and audit smart contracts, APIs, and financial models.',
    gradient: 'from-violet-500 to-pink-400',
    glow: 'shadow-violet-500/50',
    badge: '18+',
  },
];

const OnboardingFlow = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    country: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    codedBefore: '',
    favoriteSubject: '',
    whyJoin: '',
    investmentExp: '',
    investmentGoal: '',
    portfolioSize: '',
    devYears: 3,
    devStack: [],
    devInterests: [],
  });

  useEffect(() => {
    setIsVisible(true);
    const saved = localStorage.getItem('learn2launch_onboarding');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('learn2launch_onboarding', JSON.stringify(formData));
  }, [formData]);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    if (step === 1) return formData.fullName && formData.age && formData.country && formData.email;
    if (step === 2) return formData.role;
    if (step === 3) {
      if (formData.role === 'student') return formData.codedBefore && formData.favoriteSubject && formData.whyJoin;
      if (formData.role === 'investor') return formData.investmentExp && formData.investmentGoal && formData.portfolioSize;
      if (formData.role === 'developer') return formData.devStack.length > 0;
    }
    return true;
  };

  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );

  const ProgressBar = () => {
    const steps = [
      { id: 1, title: 'Get Started', icon: User, subtitle: 'Personal' },
      { id: 2, title: 'Choose Role', icon: Share2, subtitle: 'Socials' },
      { id: 3, title: 'Experience', icon: FileText, subtitle: 'Concept Development' },
      { id: 4, title: 'Complete', icon: Check, subtitle: 'Stage' }
    ];

    return (
      <div className="mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent mb-2">
            Learn 2 Launch
          </h1>
          <p className="text-gray-400">Complete your onboarding journey</p>
        </div>
        
        <div className="flex justify-between items-center max-w-4xl mx-auto px-4">
          {steps.map((stepItem, index) => {
            const Icon = stepItem.icon;
            const isActive = step === stepItem.id;
            const isCompleted = step > stepItem.id;
            
            return (
              <div key={stepItem.id} className="flex flex-col items-center relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-6 left-12 w-24 h-0.5 bg-gray-700">
                    <div 
                      className={`h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 ${
                        isCompleted ? 'w-full' : 'w-0'
                      }`}
                    />
                  </div>
                )}
                
                {/* Step Circle */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isActive 
                    ? 'border-purple-500 bg-purple-500 shadow-lg shadow-purple-500/50' 
                    : isCompleted
                    ? 'border-purple-500 bg-purple-500'
                    : 'border-gray-600 bg-gray-800'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    isActive || isCompleted ? 'text-white' : 'text-gray-400'
                  }`} />
                </div>
                
                {/* Step Info */}
                <div className="mt-3 text-center">
                  <div className={`text-sm font-semibold ${
                    isActive ? 'text-white' : isCompleted ? 'text-purple-400' : 'text-gray-500'
                  }`}>
                    {stepItem.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {stepItem.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const StepBasicInfo = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Let's get to know you 🚀</h2>
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-2">Full Name</label>
        <input
          type="text"
          value={formData.fullName}
          onChange={e => updateField('fullName', e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
          placeholder="Enter your full name"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-300 mb-2">Age</label>
          <input
            type="number"
            value={formData.age}
            onChange={e => updateField('age', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
            placeholder="18"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-2">Country</label>
          <select
            value={formData.country}
            onChange={e => updateField('country', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all appearance-none"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: 'white'
            }}
          >
            <option value="" style={{ backgroundColor: '#1f2937', color: 'white' }}>Select</option>
            {countries.map(c => (
              <option key={c.code} value={c.code} style={{ backgroundColor: '#1f2937', color: 'white' }}>
                {c.flag} {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-2">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={e => updateField('email', e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
          placeholder="your@email.com"
        />

        <label className="block text-sm text-gray-300 mt-4 mb-2">Password</label>
        <input
          type="password"
          value={formData.password}
          onChange={e => updateField('password', e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
          placeholder="Enter your password"
        />
      </div>

      <button className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
        Already have a profile? Go back
      </button>
    </div>
  );

  const StepRoleSelect = () => (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Choose your path</h2>
        <p className="text-gray-400">Select the role that best describes you. We'll customize your experience accordingly.</p>
      </div>

      <div className="grid gap-4">
        {roles.map(role => {
          const Icon = role.icon;
          const isSelected = formData.role === role.id;
          return (
            <button
              key={role.id}
              onClick={() => updateField('role', role.id)}
              className={`relative p-6 rounded-xl border-2 transition-all duration-300 text-left group ${
                isSelected
                  ? `border-transparent bg-gradient-to-br ${role.gradient} shadow-lg ${role.glow} scale-105`
                  : 'border-white/10 bg-white/5 hover:border-white/20 hover:scale-102'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${isSelected ? 'bg-white/20' : 'bg-white/10'}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white">{role.title}</h3>
                    {role.badge && (
                      <span className="px-2 py-0.5 text-xs bg-white/20 rounded-full text-white">{role.badge}</span>
                    )}
                  </div>
                  <p className={`text-sm ${isSelected ? 'text-white/90' : 'text-gray-400'}`}>
                    {role.description}
                  </p>
                </div>
                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const StepExperience = () => {
    if (formData.role === 'student') {
      return (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Tell us about yourself</h2>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-3">Have you coded before?</label>
            <div className="flex gap-3">
              {['Yes', 'No'].map(opt => (
                <button
                  key={opt}
                  onClick={() => updateField('codedBefore', opt)}
                  className={`flex-1 py-3 rounded-lg border-2 transition-all ${
                    formData.codedBefore === opt
                      ? 'border-cyan-400 bg-cyan-400/10 text-cyan-400'
                      : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-3">What's your favorite subject?</label>
            <div className="grid grid-cols-2 gap-3">
              {['Math', 'Science', 'Art', 'Other'].map(subj => (
                <button
                  key={subj}
                  onClick={() => updateField('favoriteSubject', subj)}
                  className={`py-3 rounded-lg border-2 transition-all ${
                    formData.favoriteSubject === subj
                      ? 'border-cyan-400 bg-cyan-400/10 text-cyan-400'
                      : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
                  }`}
                >
                  {subj}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Why do you want to join Learn2Launch?</label>
            <textarea
              value={formData.whyJoin}
              onChange={e => updateField('whyJoin', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none"
              rows="4"
              placeholder="Share your goals and aspirations..."
            />
          </div>
        </div>
      );
    }

    if (formData.role === 'investor') {
      return (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Investment Profile</h2>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-3">Investment Experience</label>
            <div className="grid gap-3">
              {['Beginner', 'Intermediate', 'Expert'].map(exp => (
                <button
                  key={exp}
                  onClick={() => updateField('investmentExp', exp)}
                  className={`py-3 rounded-lg border-2 transition-all text-left px-4 ${
                    formData.investmentExp === exp
                      ? 'border-amber-400 bg-amber-400/10 text-amber-400'
                      : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
                  }`}
                >
                  {exp}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-3">Investment Goal</label>
            <div className="grid grid-cols-2 gap-3">
              {['Long-term', 'Yield', 'Balanced', 'Exploration'].map(goal => (
                <button
                  key={goal}
                  onClick={() => updateField('investmentGoal', goal)}
                  className={`py-3 rounded-lg border-2 transition-all ${
                    formData.investmentGoal === goal
                      ? 'border-amber-400 bg-amber-400/10 text-amber-400'
                      : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Portfolio Size</label>
            <select
              value={formData.portfolioSize}
              onChange={e => updateField('portfolioSize', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all appearance-none"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'white'
              }}
            >
              <option value="" style={{ backgroundColor: '#1f2937', color: 'white' }}>Select range</option>
              <option value="<10k" style={{ backgroundColor: '#1f2937', color: 'white' }}>&lt; $10,000</option>
              <option value="10k-50k" style={{ backgroundColor: '#1f2937', color: 'white' }}>$10,000 - $50,000</option>
              <option value="50k-100k" style={{ backgroundColor: '#1f2937', color: 'white' }}>$50,000 - $100,000</option>
              <option value="100k+" style={{ backgroundColor: '#1f2937', color: 'white' }}>$100,000+</option>
            </select>
          </div>
        </div>
      );
    }

    if (formData.role === 'developer') {
      return (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Developer Profile</h2>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-3">
              Years of Experience: <span className="text-violet-400 font-bold">{formData.devYears}+</span>
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={formData.devYears}
              onChange={e => updateField('devYears', parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-3">Favorite Stack</label>
            <div className="flex flex-wrap gap-2">
              {['Rust', 'JavaScript', 'Solidity', 'Python', 'Go'].map(tech => {
                const isSelected = formData.devStack.includes(tech);
                return (
                  <button
                    key={tech}
                    onClick={() => {
                      if (isSelected) {
                        updateField('devStack', formData.devStack.filter(t => t !== tech));
                      } else {
                        updateField('devStack', [...formData.devStack, tech]);
                      }
                    }}
                    className={`px-4 py-2 rounded-full border-2 transition-all ${
                      isSelected
                        ? 'border-violet-400 bg-violet-400/10 text-violet-400'
                        : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    {tech}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-3">Interested in</label>
            <div className="space-y-2">
              {['Smart Contracts', 'Vault APIs', 'Analytics', 'DAO Tools'].map(interest => {
                const isSelected = formData.devInterests.includes(interest);
                return (
                  <label
                    key={interest}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-violet-400 bg-violet-400/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {
                        if (isSelected) {
                          updateField('devInterests', formData.devInterests.filter(i => i !== interest));
                        } else {
                          updateField('devInterests', [...formData.devInterests, interest]);
                        }
                      }}
                      className="w-5 h-5 rounded border-white/20 bg-white/5 text-violet-400 focus:ring-violet-400 focus:ring-offset-0"
                    />
                    <span className={isSelected ? 'text-violet-400' : 'text-gray-400'}>{interest}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
  };

  const StepSummary = () => {
    const roleInfo = roles.find(r => r.id === formData.role);
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome aboard, {formData.fullName.split(' ')[0]} 🎉</h2>
          <p className="text-gray-400">You're all set. We've personalized your dashboard experience.</p>
        </div>

        <div className={`p-6 rounded-xl bg-gradient-to-br ${roleInfo?.gradient} shadow-lg relative overflow-hidden`}>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              {roleInfo && <roleInfo.icon className="w-8 h-8 text-white" />}
              <h3 className="text-2xl font-bold text-white">{roleInfo?.title}</h3>
            </div>
            
            <div className="space-y-2 text-white/90">
              <p><span className="font-semibold">Name:</span> {formData.fullName}</p>
              <p><span className="font-semibold">Age:</span> {formData.age}</p>
              <p><span className="font-semibold">Country:</span> {countries.find(c => c.code === formData.country)?.flag} {countries.find(c => c.code === formData.country)?.name}</p>
              
              {formData.role === 'student' && (
                <>
                  <p><span className="font-semibold">Coding Experience:</span> {formData.codedBefore}</p>
                  <p><span className="font-semibold">Favorite Subject:</span> {formData.favoriteSubject}</p>
                </>
              )}
              
              {formData.role === 'investor' && (
                <>
                  <p><span className="font-semibold">Experience:</span> {formData.investmentExp}</p>
                  <p><span className="font-semibold">Goal:</span> {formData.investmentGoal}</p>
                </>
              )}
              
              {formData.role === 'developer' && (
                <>
                  <p><span className="font-semibold">Experience:</span> {formData.devYears}+ years</p>
                  <p><span className="font-semibold">Stack:</span> {formData.devStack.join(', ')}</p>
                </>
              )}
            </div>
          </div>
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <button
          onClick={() => {
            setStep(3);
          }}
          className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
        >
          ← Edit information
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">Your dashboard will adapt as you grow.</p>
      </div>
    );
  };

  const SuccessScreen = () => {
    const roleInfo = roles.find(r => r.id === formData.role);
    
    useEffect(() => {
      const timer = setTimeout(() => {
        const dashboardRoutes: Record<string, string> = {
          student: '/dashboard/student',
          investor: '/dashboard/investor', 
          developer: '/dashboard/developer'
        };
        
        router.push(dashboardRoutes[formData.role] || '/dashboard/student');
      }, 3000);

      return () => clearTimeout(timer);
    }, []);

    return (
      <div className="text-center space-y-8 animate-in fade-in duration-1000">
        <div className="relative">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50 animate-bounce">
            <Check className="w-12 h-12 text-white" />
          </div>
          <div className="absolute inset-0 w-24 h-24 mx-auto bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-ping opacity-20" />
        </div>

        <div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Welcome Aboard! 🎉
          </h2>
          <p className="text-xl text-gray-300 mb-2">
            Hey {formData.fullName.split(' ')[0]}, you're all set!
          </p>
          <p className="text-gray-400">
            Redirecting to your personalized {roleInfo?.title} dashboard...
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-gray-400">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse delay-200" />
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-400" />
        </div>

        <div className={`p-6 rounded-xl bg-gradient-to-br ${roleInfo?.gradient} shadow-lg relative overflow-hidden max-w-md mx-auto`}>
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              {roleInfo && <roleInfo.icon className="w-6 h-6 text-white" />}
              <h3 className="text-lg font-bold text-white">{roleInfo?.title} Dashboard</h3>
            </div>
            <p className="text-white/80 text-sm">
              Your personalized experience awaits
            </p>
          </div>
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>
    );
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-radial from-[#0B0C14] via-[#101120] to-[#0B0C14] flex items-center justify-center p-4 relative overflow-hidden">
        <FloatingParticles />
        
        {/* Animated background glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 w-full max-w-2xl">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/20 via-emerald-500/20 to-green-400/20 opacity-50 animate-pulse" />
            
            <div className="relative z-10">
              <SuccessScreen />
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          .bg-gradient-radial {
            background: radial-gradient(circle at center, #0B0C14 0%, #101120 50%, #0B0C14 100%);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-radial from-[#0B0C14] via-[#101120] to-[#0B0C14] flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingParticles />
      
      {/* Animated background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Modal overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Modal */}
      <div
        className={`relative z-10 w-full max-w-2xl transition-all duration-500 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-8 relative overflow-hidden">
          {/* Animated border glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 via-violet-500/20 to-pink-400/20 opacity-50 animate-pulse" />
          
          <div className="relative z-10">
            <ProgressBar />

            <div className="transition-all duration-300">
              {step === 1 && <StepBasicInfo />}
              {step === 2 && <StepRoleSelect />}
              {step === 3 && <StepExperience />}
              {step === 4 && <StepSummary />}
            </div>

            {/* Navigation */}
            <div className="flex gap-3 mt-8">
              {step > 1 && step < 4 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
              )}
              
              {step < 4 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                    canProceed()
                      ? 'bg-gradient-to-r from-cyan-400 to-violet-500 hover:shadow-lg hover:shadow-cyan-400/50 text-white'
                      : 'bg-white/5 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setShowSuccess(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-400 to-violet-500 hover:shadow-lg hover:shadow-cyan-400/50 rounded-lg text-white font-semibold transition-all"
                >
                  Complete Setup
                  <Sparkles className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle at center, #0B0C14 0%, #101120 50%, #0B0C14 100%);
        }
        
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #00E0FF, #8B5CF6);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(0, 224, 255, 0.5);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #00E0FF, #8B5CF6);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(0, 224, 255, 0.5);
          border: none;
        }
      `}</style>
    </div>
  );
};

export default OnboardingFlow;