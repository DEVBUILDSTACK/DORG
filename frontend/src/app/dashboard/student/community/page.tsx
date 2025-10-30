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

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case 'high': return 'border-l-[#2E865F]';
      case 'medium': return 'border-l-[#F59E0B]';
      case 'low': return 'border-l-[#9CA3AF]';
      default: return 'border-l-[#9CA3AF]';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'announcement': return <Pin className="w-4 h-4 text-[#FF6B35]" />;
      case 'discussion': return <MessageCircle className="w-4 h-4 text-[#2E865F]" />;
      case 'showcase': return <Award className="w-4 h-4 text-[#A855F7]" />;
      case 'help': return <BookOpen className="w-4 h-4 text-[#F59E0B]" />;
      default: return <MessageCircle className="w-4 h-4 text-[#5A6C7D]" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Team': return 'text-[#FF6B35] bg-[#FFE8E0] border border-[#FF6B35]/30';
      case 'Expert': return 'text-[#A855F7] bg-[#A855F7]/10 border border-[#A855F7]/20';
      case 'Advanced': return 'text-[#2E865F] bg-[#2E865F]/10 border border-[#2E865F]/20';
      case 'Intermediate': return 'text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/20';
      case 'Beginner': return 'text-[#5A6C7D] bg-[#F3F4F6] border border-[#E5E7EB]';
      default: return 'text-[#5A6C7D] bg-[#F3F4F6] border border-[#E5E7EB]';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-[#1F2937] flex items-center">
          <Users className="w-8 h-8 mr-3 text-[#FF6B35]" />
          Community
        </h1>
        <p className="text-[#5A6C7D] text-lg">Connect, learn, and grow with fellow Web3 builders</p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="relative group">
          <div className="absolute inset-0 bg-[#FF6B35]/5 rounded-2xl blur-xl" />
          <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[#5A6C7D] text-sm">Active Members</p>
              <Users className="w-5 h-5 text-[#FF6B35]" />
            </div>
            <p className="text-3xl font-bold text-[#1F2937]">1,247</p>
            <p className="text-sm text-[#2E865F] mt-1">+23 this week</p>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-[#2E865F]/5 rounded-2xl blur-xl" />
          <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[#5A6C7D] text-sm">Posts This Week</p>
              <MessageCircle className="w-5 h-5 text-[#2E865F]" />
            </div>
            <p className="text-3xl font-bold text-[#1F2937]">156</p>
            <p className="text-sm text-[#2E865F] mt-1">+18% from last week</p>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-[#A855F7]/5 rounded-2xl blur-xl" />
          <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[#5A6C7D] text-sm">Total Engagement</p>
              <Heart className="w-5 h-5 text-[#A855F7]" />
            </div>
            <p className="text-3xl font-bold text-[#1F2937]">3.2K</p>
            <p className="text-sm text-[#A855F7] mt-1">Likes & comments</p>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-[#F59E0B]/5 rounded-2xl blur-xl" />
          <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[#5A6C7D] text-sm">Your Contributions</p>
              <Zap className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <p className="text-3xl font-bold text-[#1F2937]">12</p>
            <p className="text-sm text-[#F59E0B] mt-1">Posts & comments</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-3 space-y-6">
          {/* Create Post */}
          <div className="relative group">
            <div className="absolute inset-0 bg-[#FF6B35]/5 rounded-2xl blur-xl" />
            <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-linear-to-r from-[#FF6B35] to-[#E65A2D] rounded-full flex items-center justify-center">
                  <span className="text-lg">👤</span>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Share your thoughts, ask questions, or showcase your projects..."
                    className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 focus:border-[#FF6B35]/50 transition-all"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-3 bg-[#FF6B35] text-white rounded-xl hover:bg-[#E65A2D] transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Post</span>
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
                    className={`px-3 py-2 rounded-lg font-medium transition-all text-sm ${
                      selectedCategory === category.id
                        ? 'bg-[#FFE8E0] text-[#FF6B35] border border-[#FF6B35]/30'
                        : 'bg-[#F9FAFB] text-[#5A6C7D] hover:text-[#1F2937] hover:bg-white border border-[#E5E7EB]'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5A6C7D] w-4 h-4" />
              <input
                type="text"
                placeholder="Search posts..."
                className="pl-10 pr-4 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 focus:border-[#FF6B35]/50 transition-all"
              />
            </div>
          </div>

          {/* Posts Feed */}
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className={`relative group border-l-4 ${getEngagementColor(post.engagement)}`}>
                <div className="absolute inset-0 bg-[#FF6B35]/5 rounded-r-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-white border border-[#E5E7EB] rounded-r-2xl p-6 hover:shadow-lg transition-all ml-0">
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{post.author.avatar}</div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-[#1F2937]">{post.author.name}</h4>
                          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getLevelColor(post.author.level)}`}>
                            {post.author.level}
                          </span>
                          {post.isPinned && <Pin className="w-4 h-4 text-[#FF6B35]" />}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-[#5A6C7D]">
                          {getTypeIcon(post.type)}
                          <span>{post.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-[#1F2937] group-hover:text-[#FF6B35] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-[#5A6C7D] leading-relaxed">{post.content}</p>
                    
                    {post.media && (
                      <div className="p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
                        <p className="text-[#FF6B35] text-sm">{post.media}</p>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-[#F9FAFB] text-[#5A6C7D] text-xs rounded-lg hover:bg-[#FFE8E0] hover:text-[#FF6B35] transition-colors cursor-pointer border border-[#E5E7EB]">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#E5E7EB]">
                    <div className="flex items-center space-x-6">
                      <button className="flex items-center space-x-2 text-[#5A6C7D] hover:text-[#DC2626] transition-colors">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-[#5A6C7D] hover:text-[#FF6B35] transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-[#5A6C7D] hover:text-[#2E865F] transition-colors">
                        <Share className="w-4 h-4" />
                        <span className="text-sm">{post.shares}</span>
                      </button>
                    </div>
                    
                    <button className="text-[#FF6B35] hover:text-[#E65A2D] transition-colors text-sm font-medium">
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
            <div className="absolute inset-0 bg-[#A855F7]/5 rounded-2xl blur-xl" />
            <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#1F2937] flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-[#A855F7]" />
                  Trending Topics
                </h3>
              </div>

              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-xl hover:bg-[#F3F4F6] transition-colors cursor-pointer">
                    <div>
                      <p className="font-medium text-[#1F2937]">#{topic.tag}</p>
                      <p className="text-sm text-[#5A6C7D]">{topic.posts} posts</p>
                    </div>
                    <span className="text-[#2E865F] text-sm font-medium">{topic.growth}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Contributors */}
          <div className="relative group">
            <div className="absolute inset-0 bg-[#F59E0B]/5 rounded-2xl blur-xl" />
            <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#1F2937] flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-[#F59E0B]" />
                  Top Contributors
                </h3>
              </div>

              <div className="space-y-3">
                {topContributors.map((contributor, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-[#F9FAFB] rounded-xl hover:bg-[#F3F4F6] transition-colors cursor-pointer">
                    <div className="text-lg">{contributor.avatar}</div>
                    <div className="flex-1">
                      <p className="font-medium text-[#1F2937] text-sm">{contributor.name}</p>
                      <div className="flex items-center space-x-2 text-xs text-[#5A6C7D]">
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
            <div className="absolute inset-0 bg-[#FF6B35]/5 rounded-2xl blur-xl" />
            <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
              <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Community Guidelines</h3>
              <div className="space-y-3 text-sm text-[#5A6C7D]">
                <p>• Be respectful and constructive in discussions</p>
                <p>• Share knowledge and help fellow learners</p>
                <p>• Use appropriate tags for better discoverability</p>
                <p>• No spam or promotional content</p>
              </div>
              <button className="mt-4 text-[#FF6B35] hover:text-[#E65A2D] transition-colors text-sm font-medium">
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
