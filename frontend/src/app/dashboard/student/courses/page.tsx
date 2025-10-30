"use client";

import React, { useState } from 'react';
import { 
  BookOpen, 
  Grid3X3, 
  List, 
  Filter, 
  Play, 
  Clock, 
  Users, 
  Star,
  CheckCircle,
  Lock,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react';

interface Course {
  id: number;
  title: string;
  category: string;
  level: string;
  duration: string;
  students: number;
  rating: number;
  progress: number;
  status: string;
  thumbnail: string;
  instructor: string;
  description: string;
  modules: number;
  xpReward: number;
}

const CoursesPage = () => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Courses', count: 24 },
    { id: 'solana', name: 'Solana Development', count: 8 },
    { id: 'defi', name: 'DeFi & Yield', count: 6 },
    { id: 'nft', name: 'NFTs & Gaming', count: 4 },
    { id: 'trading', name: 'Trading Strategies', count: 6 }
  ];

  const courses = [
    {
      id: 1,
      title: 'Anchor Framework Fundamentals',
      category: 'solana',
      level: 'Beginner',
      duration: '6 hours',
      students: 1247,
      rating: 4.8,
      progress: 75,
      status: 'in-progress',
      thumbnail: '🏗️',
      instructor: 'Sarah Chen',
      description: 'Master the fundamentals of Anchor framework for Solana development',
      modules: 12,
      xpReward: 250
    },
    {
      id: 2,
      title: 'DeFi Yield Strategies',
      category: 'defi',
      level: 'Intermediate',
      duration: '8 hours',
      students: 892,
      rating: 4.9,
      progress: 45,
      status: 'in-progress',
      thumbnail: '💰',
      instructor: 'Mike Rodriguez',
      description: 'Learn advanced yield farming and liquidity provision strategies',
      modules: 15,
      xpReward: 350
    },
    {
      id: 3,
      title: 'Solana Smart Contract Security',
      category: 'solana',
      level: 'Advanced',
      duration: '10 hours',
      students: 543,
      rating: 4.7,
      progress: 0,
      status: 'locked',
      thumbnail: '🔒',
      instructor: 'Emma Wilson',
      description: 'Advanced security patterns and best practices for Solana smart contracts',
      modules: 18,
      xpReward: 500
    },
    {
      id: 4,
      title: 'NFT Marketplace Development',
      category: 'nft',
      level: 'Intermediate',
      duration: '12 hours',
      students: 756,
      rating: 4.6,
      progress: 100,
      status: 'completed',
      thumbnail: '🎨',
      instructor: 'David Kim',
      description: 'Build a complete NFT marketplace from scratch',
      modules: 20,
      xpReward: 400
    },
    {
      id: 5,
      title: 'Automated Trading Bots',
      category: 'trading',
      level: 'Advanced',
      duration: '14 hours',
      students: 324,
      rating: 4.8,
      progress: 0,
      status: 'available',
      thumbnail: '🤖',
      instructor: 'Lisa Zhang',
      description: 'Create sophisticated trading bots with risk management',
      modules: 22,
      xpReward: 600
    },
    {
      id: 6,
      title: 'Web3 Game Development',
      category: 'nft',
      level: 'Intermediate',
      duration: '16 hours',
      students: 445,
      rating: 4.5,
      progress: 0,
      status: 'available',
      thumbnail: '🎮',
      instructor: 'Alex Johnson',
      description: 'Build blockchain-based games with NFT integration',
      modules: 25,
      xpReward: 450
    }
  ];

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-[#2E865F] bg-[#2E865F]/10';
      case 'in-progress': return 'text-[#FF6B35] bg-[#FF6B35]/20';
      case 'available': return 'text-[#FF6B35] bg-[#FF6B35]/20';
      case 'locked': return 'text-[#5A6C7D] bg-[#F9FAFB]';
      default: return 'text-[#5A6C7D] bg-[#F9FAFB]';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Play className="w-4 h-4" />;
      case 'available': return <BookOpen className="w-4 h-4" />;
      case 'locked': return <Lock className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'text-[#2E865F] bg-[#2E865F]/10';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-50';
      case 'Advanced': return 'text-red-500 bg-red-50';
      default: return 'text-[#5A6C7D] bg-[#F9FAFB]';
    }
  };

  const CourseCard = ({ course }: { course: Course }) => (
    <div className="relative group">
      <div className="absolute inset-0 bg-linear-to-r from-[#FF6B35]/5 to-[#E65A2D]/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:border-[#FF6B35]/30 transition-all group-hover:transform group-hover:scale-105 shadow-lg">
        {/* Course Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl">{course.thumbnail}</div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center space-x-1 ${getStatusColor(course.status)}`}>
              {getStatusIcon(course.status)}
              <span className="capitalize">{course.status.replace('-', ' ')}</span>
            </span>
          </div>
        </div>

        {/* Course Info */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-[#1F2937] group-hover:text-[#FF6B35] transition-colors">
            {course.title}
          </h3>
          
          <p className="text-sm text-[#5A6C7D] line-clamp-2">{course.description}</p>

          {/* Course Stats */}
          <div className="flex items-center space-x-4 text-xs text-[#5A6C7D]">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span>{course.students}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-500" />
              <span>{course.rating}</span>
            </div>
          </div>

          {/* Level and XP */}
          <div className="flex items-center justify-between">
            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getLevelColor(course.level)}`}>
              {course.level}
            </span>
            <div className="flex items-center space-x-1 text-[#FF6B35]">
              <Zap className="w-3 h-3" />
              <span className="text-xs font-medium">{course.xpReward} XP</span>
            </div>
          </div>

          {/* Progress Bar (if in progress) */}
          {course.status === 'in-progress' && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#5A6C7D]">Progress</span>
                <span className="text-[#FF6B35]">{course.progress}%</span>
              </div>
              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-full h-2">
                <div 
                  className="bg-linear-to-r from-[#FF6B35] to-[#E65A2D] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Action Button */}
          <button 
            className={`w-full py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center space-x-2 ${
              course.status === 'locked' 
                ? 'bg-[#F9FAFB] text-[#9CA3AF] cursor-not-allowed border border-[#E5E7EB]'
                : course.status === 'completed'
                ? 'bg-[#2E865F]/10 text-[#2E865F] hover:bg-[#2E865F]/20'
                : 'bg-[#FF6B35]/20 text-[#FF6B35] hover:bg-[#FF6B35]/30 border border-[#FF6B35]/30'
            }`}
            disabled={course.status === 'locked'}
          >
            {course.status === 'completed' && <CheckCircle className="w-4 h-4" />}
            {course.status === 'in-progress' && <Play className="w-4 h-4" />}
            {course.status === 'available' && <BookOpen className="w-4 h-4" />}
            {course.status === 'locked' && <Lock className="w-4 h-4" />}
            <span>
              {course.status === 'completed' ? 'Review' :
               course.status === 'in-progress' ? 'Continue' :
               course.status === 'available' ? 'Start Course' : 'Locked'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  const CourseListItem = ({ course }: { course: Course }) => (
    <div className="relative group">
      <div className="absolute inset-0 bg-linear-to-r from-[#FF6B35]/5 to-[#E65A2D]/5 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative bg-white border border-[#E5E7EB] rounded-xl p-4 hover:border-[#FF6B35]/30 transition-all shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="text-3xl">{course.thumbnail}</div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#1F2937] group-hover:text-[#FF6B35] transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-[#5A6C7D] mt-1">{course.description}</p>
                
                <div className="flex items-center space-x-6 mt-3 text-xs text-[#5A6C7D]">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{course.students} students</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>{course.rating}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-lg font-medium ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {course.status === 'in-progress' && (
                  <div className="text-right">
                    <p className="text-xs text-[#5A6C7D]">Progress</p>
                    <p className="text-sm font-medium text-[#FF6B35]">{course.progress}%</p>
                  </div>
                )}
                
                <div className="flex items-center space-x-1 text-[#FF6B35]">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-medium">{course.xpReward} XP</span>
                </div>

                <button 
                  className={`py-2 px-4 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                    course.status === 'locked' 
                      ? 'bg-[#F9FAFB] text-[#9CA3AF] cursor-not-allowed border border-[#E5E7EB]'
                      : course.status === 'completed'
                      ? 'bg-[#2E865F]/10 text-[#2E865F] hover:bg-[#2E865F]/20'
                      : 'bg-[#FF6B35]/20 text-[#FF6B35] hover:bg-[#FF6B35]/30 border border-[#FF6B35]/30'
                  }`}
                  disabled={course.status === 'locked'}
                >
                  {getStatusIcon(course.status)}
                  <span>
                    {course.status === 'completed' ? 'Review' :
                     course.status === 'in-progress' ? 'Continue' :
                     course.status === 'available' ? 'Start' : 'Locked'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[#1F2937] flex items-center">
            <BookOpen className="w-8 h-8 mr-3 text-[#FF6B35]" />
            Courses
          </h1>
          <p className="text-[#5A6C7D] text-lg">Expand your Web3 knowledge and skills</p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'grid' 
                  ? 'bg-[#FF6B35]/20 text-[#FF6B35]' 
                  : 'text-[#5A6C7D] hover:text-[#1F2937]'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'list' 
                  ? 'bg-[#FF6B35]/20 text-[#FF6B35]' 
                  : 'text-[#5A6C7D] hover:text-[#1F2937]'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-[#5A6C7D]" />
          <div className="flex items-center space-x-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-[#FF6B35]/20 text-[#FF6B35] border border-[#FF6B35]/30'
                    : 'bg-white text-[#5A6C7D] hover:text-[#1F2937] hover:bg-[#F9FAFB] border border-[#E5E7EB]'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Grid/List */}
      <div className={
        viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
      }>
        {filteredCourses.map((course) => 
          viewMode === 'grid' 
            ? <CourseCard key={course.id} course={course} />
            : <CourseListItem key={course.id} course={course} />
        )}
      </div>

      {/* Learning Path Suggestion */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#A855F7]/10 to-pink-500/10 rounded-2xl blur-xl" />
        <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:border-[#A855F7]/30 transition-all shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-[#1F2937] flex items-center">
              <Target className="w-5 h-5 mr-2 text-[#A855F7]" />
              Recommended Learning Path
            </h3>
            <TrendingUp className="w-5 h-5 text-[#A855F7]" />
          </div>
          
          <p className="text-[#5A6C7D] mb-4">
            Based on your progress, we recommend focusing on Solana development fundamentals before advancing to DeFi strategies.
          </p>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-[#A855F7]/10 text-[#A855F7] rounded-lg hover:bg-[#A855F7]/20 transition-colors border border-[#A855F7]/30">
              <BookOpen className="w-4 h-4" />
              <span>View Learning Path</span>
            </button>
            <span className="text-sm text-[#9CA3AF]">Estimated completion: 4-6 weeks</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
