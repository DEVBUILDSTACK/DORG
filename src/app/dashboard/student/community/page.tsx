"use client";

import React, { useState } from 'react';
import { 
  Users, 
  MessageCircle, 
  Heart,
  Share,
  TrendingUp,
  Calendar,
  Hash,
  Pin,
  Award,
  Zap,
  BookOpen,
  Trophy,
  Plus,
  Search,
  Filter
} from 'lucide-react';

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts', count: 156 },
    { id: 'announcements', name: 'Announcements', count: 12 },
    { id: 'discussions', name: 'Discussions', count: 89 },
    { id: 'help', name: 'Help & Support', count: 34 },
    { id: 'showcase', name: 'Project Showcase', count: 21 }
  ];

  const posts = [
    {
      id: 1,
      type: 'announcement',
      author: {
        name: 'Learn2Launch Team',
        avatar: '🎯',
        role: 'Admin',
        level: 'Team'
      },
      title: 'New Solana Development Course Now Live! 🚀',
      content: 'We\'re excited to announce our latest course on advanced Solana smart contract development. This comprehensive program covers Anchor framework, security best practices, and real-world project building.',
      timestamp: '2 hours ago',
      likes: 47,
      comments: 12,
      shares: 8,
      isPinned: true,
      tags: ['announcement', 'solana', 'course'],
      engagement: 'high'
    },
    {
      id: 2,
      type: 'discussion',
      author: {
        name: 'Sarah Chen',
        avatar: '👩‍💻',
        role: 'Student',
        level: 'Expert'
      },
      title: 'Best practices for DeFi yield farming risk management?',
      content: 'I\'ve been exploring different yield farming strategies and want to understand how to better manage risks. What frameworks do you use to evaluate new protocols? Any red flags I should watch out for?',
      timestamp: '4 hours ago',
      likes: 23,
      comments: 18,
      shares: 5,
      isPinned: false,
      tags: ['defi', 'risk-management', 'discussion'],
      engagement: 'medium'
    },
    {
      id: 3,
      type: 'showcase',
      author: {
        name: 'Mike Rodriguez',
        avatar: '👨‍🚀',
        role: 'Student',
        level: 'Advanced'
      },
      title: 'Built my first NFT marketplace on Solana! 🎨',
      content: 'Just deployed my NFT marketplace using Anchor and Metaplex. Learned so much from the Web3 development course. The project includes minting, listing, and trading functionality. Would love feedback from the community!',
      timestamp: '6 hours ago',
      likes: 89,
      comments: 31,
      shares: 15,
      isPinned: false,
      tags: ['nft', 'solana', 'showcase', 'metaplex'],
      engagement: 'high',
      media: '🖼️ Project Demo'
    },
    {
      id: 4,
      type: 'help',
      author: {
        name: 'Emma Wilson',
        avatar: '👩‍🎓',
        role: 'Student',
        level: 'Beginner'
      },
      title: 'Help with Anchor program deployment error',
      content: 'Getting a "Program failed to complete" error when trying to deploy my first Anchor program. I\'ve checked the code multiple times but can\'t figure out what\'s wrong. Has anyone encountered this before?',
      timestamp: '8 hours ago',
      likes: 12,
      comments: 24,
      shares: 2,
      isPinned: false,
      tags: ['help', 'anchor', 'deployment'],
      engagement: 'medium'
    },
    {
      id: 5,
      type: 'discussion',
      author: {
        name: 'David Kim',
        avatar: '👨‍💼',
        role: 'Student',
        level: 'Intermediate'
      },
      title: 'Thoughts on the current DeFi landscape?',
      content: 'With all the recent developments in DeFi protocols and the regulatory discussions, what do you think the future holds? Are we heading towards more institutional adoption or will we see more innovation in retail DeFi?',
      timestamp: '12 hours ago',
      likes: 34,
      comments: 42,
      shares: 11,
      isPinned: false,
      tags: ['defi', 'discussion', 'future'],
      engagement: 'high'
    }
  ];

  const trendingTopics = [
    { tag: 'solana-development', posts: 23, growth: '+15%' },
    { tag: 'defi-strategies', posts: 18, growth: '+8%' },
    { tag: 'nft-marketplace', posts: 12, growth: '+22%' },
    { tag: 'yield-farming', posts: 15, growth: '+5%' },
    { tag: 'anchor-framework', posts: 9, growth: '+18%' }
  ];

  const topContributors = [
    { name: 'Sarah Chen', avatar: '👩‍💻', posts: 47, likes: 892, level: 'Expert' },
    { name: 'Mike Rodriguez', avatar: '👨‍🚀', posts: 34, likes: 654, level: 'Advanced' },
    { name: 'Emma Wilson', avatar: '👩‍🎓', posts: 28, likes: 445, level: 'Intermediate' },
    { name: 'David Kim', avatar: '👨‍💼', posts: 22, likes: 378, level: 'Intermediate' }
  ];

  const getEngagementColor = (engagement) => {
    switch (engagement) {
      case 'high': return 'border-l-green-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-gray-500';
      default: return 'border-l-gray-500';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'announcement': return <Pin className="w-4 h-4 text-blue-400" />;
      case 'discussion': return <MessageCircle className="w-4 h-4 text-green-400" />;
      case 'showcase': return <Award className="w-4 h-4 text-purple-400" />;
      case 'help': return <BookOpen className="w-4 h-4 text-orange-400" />;
      default: return <MessageCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Team': return 'text-blue-400 bg-blue-500/20';
      case 'Expert': return 'text-purple-400 bg-purple-500/20';
      case 'Advanced': return 'text-green-400 bg-green-500/20';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-500/20';
      case 'Beginner': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white flex items-center">
          <Users className="w-8 h-8 mr-3 text-[#00E0FF]" />
          Community
        </h1>
        <p className="text-gray-400 text-lg">Connect, learn, and grow with fellow Web3 builders</p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00E0FF]/10 to-[#06B6D4]/10 rounded-2xl blur-xl" />
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-[#00E0FF]/30 transition-all">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-400 text-sm">Active Members</p>
              <Users className="w-5 h-5 text-[#00E0FF]" />
            </div>
            <p className="text-3xl font-bold text-white">1,247</p>
            <p className="text-sm text-green-400 mt-1">+23 this week</p>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl blur-xl" />
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-green-500/30 transition-all">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-400 text-sm">Posts This Week</p>
              <MessageCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-white">156</p>
            <p className="text-sm text-green-400 mt-1">+18% from last week</p>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl" />
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/30 transition-all">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-400 text-sm">Total Engagement</p>
              <Heart className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-3xl font-bold text-white">3.2K</p>
            <p className="text-sm text-purple-400 mt-1">Likes & comments</p>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl blur-xl" />
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-yellow-500/30 transition-all">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-400 text-sm">Your Contributions</p>
              <Zap className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-3xl font-bold text-white">12</p>
            <p className="text-sm text-yellow-400 mt-1">Posts & comments</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-3 space-y-6">
          {/* Create Post */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00E0FF]/5 to-[#06B6D4]/5 rounded-2xl blur-xl" />
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-[#00E0FF] to-[#06B6D4] rounded-full flex items-center justify-center">
                  <span className="text-lg">👤</span>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Share your thoughts, ask questions, or showcase your projects..."
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00E0FF]/50 focus:border-[#00E0FF]/50 transition-all"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-3 bg-[#00E0FF]/20 text-[#00E0FF] rounded-xl hover:bg-[#00E0FF]/30 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Post</span>
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-400" />
              <div className="flex items-center space-x-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-2 rounded-lg font-medium transition-all text-sm ${
                      selectedCategory === category.id
                        ? 'bg-[#00E0FF]/20 text-[#00E0FF] border border-[#00E0FF]/30'
                        : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search posts..."
                className="pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00E0FF]/50 focus:border-[#00E0FF]/50 transition-all"
              />
            </div>
          </div>

          {/* Posts Feed */}
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className={`relative group border-l-4 ${getEngagementColor(post.engagement)}`}>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800/20 to-transparent rounded-r-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-r-2xl p-6 hover:border-gray-600/50 transition-all ml-0">
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{post.author.avatar}</div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-white">{post.author.name}</h4>
                          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getLevelColor(post.author.level)}`}>
                            {post.author.level}
                          </span>
                          {post.isPinned && <Pin className="w-4 h-4 text-blue-400" />}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          {getTypeIcon(post.type)}
                          <span>{post.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-white group-hover:text-[#00E0FF] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{post.content}</p>
                    
                    {post.media && (
                      <div className="p-4 bg-gray-900/30 rounded-xl border border-gray-700/30">
                        <p className="text-[#00E0FF] text-sm">{post.media}</p>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-lg hover:bg-gray-600/50 transition-colors cursor-pointer">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-700/30">
                    <div className="flex items-center space-x-6">
                      <button className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors">
                        <Share className="w-4 h-4" />
                        <span className="text-sm">{post.shares}</span>
                      </button>
                    </div>
                    
                    <button className="text-[#00E0FF] hover:text-[#06B6D4] transition-colors text-sm font-medium">
                      View Discussion →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Topics */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl" />
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/30 transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-purple-500" />
                  Trending Topics
                </h3>
              </div>

              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-900/30 rounded-xl hover:bg-gray-900/50 transition-colors cursor-pointer">
                    <div>
                      <p className="font-medium text-white">#{topic.tag}</p>
                      <p className="text-sm text-gray-400">{topic.posts} posts</p>
                    </div>
                    <span className="text-green-400 text-sm font-medium">{topic.growth}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Contributors */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl blur-xl" />
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-yellow-500/30 transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                  Top Contributors
                </h3>
              </div>

              <div className="space-y-3">
                {topContributors.map((contributor, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-900/30 rounded-xl hover:bg-gray-900/50 transition-colors cursor-pointer">
                    <div className="text-lg">{contributor.avatar}</div>
                    <div className="flex-1">
                      <p className="font-medium text-white text-sm">{contributor.name}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-400">
                        <span>{contributor.posts} posts</span>
                        <span>•</span>
                        <span>{contributor.likes} likes</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getLevelColor(contributor.level)}`}>
                      {contributor.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Community Guidelines */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-2xl blur-xl" />
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-indigo-500/30 transition-all">
              <h3 className="text-lg font-semibold text-white mb-4">Community Guidelines</h3>
              <div className="space-y-3 text-sm text-gray-400">
                <p>• Be respectful and constructive in discussions</p>
                <p>• Share knowledge and help fellow learners</p>
                <p>• Use appropriate tags for better discoverability</p>
                <p>• No spam or promotional content</p>
              </div>
              <button className="mt-4 text-indigo-400 hover:text-indigo-300 transition-colors text-sm font-medium">
                Read Full Guidelines →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
