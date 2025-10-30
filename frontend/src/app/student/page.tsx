'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { 
  BookOpen, 
  Trophy, 
  Code, 
  Rocket, 
  Users, 
  Award,
  ChevronRight,
  CheckCircle,
  Star,
  TrendingUp,
  Target,
  Zap
} from '@/components/icons';

export default function StudentLandingPage() {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Interactive Courses",
      description: "Learn coding and DeFi through hands-on, project-based courses designed by industry experts.",
      color: "from-[#0A4A7A] to-[#0D5C94]"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Real-World Projects",
      description: "Build actual DeFi applications, smart contracts, and treasury management tools that matter.",
      color: "from-[#2E865F] to-[#1E5A42]"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Competitive Leaderboard",
      description: "Compete with peers, earn points, and climb the ranks to showcase your skills.",
      color: "from-[#FF6B35] to-[#CC5629]"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Earn Certificates",
      description: "Get recognized with blockchain-verified certificates upon course completion.",
      color: "from-[#0A4A7A] to-[#083A5E]"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Support",
      description: "Join a vibrant community of learners, mentors, and industry professionals.",
      color: "from-[#2E865F] to-[#0A4A7A]"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Career Opportunities",
      description: "Connect with top protocols looking for talented developers and treasury managers.",
      color: "from-[#FF6B35] to-[#0A4A7A]"
    }
  ];

  const learningPath = [
    {
      step: "1",
      title: "Choose Your Path",
      description: "Select from Web3 Development, DeFi Protocol Management, or Full-Stack courses.",
      icon: <Target className="w-6 h-6" />
    },
    {
      step: "2",
      title: "Learn & Build",
      description: "Follow structured lessons and build real projects as you progress.",
      icon: <Code className="w-6 h-6" />
    },
    {
      step: "3",
      title: "Compete & Earn",
      description: "Participate in challenges, earn points, and climb the leaderboard.",
      icon: <Trophy className="w-6 h-6" />
    },
    {
      step: "4",
      title: "Launch Your Career",
      description: "Showcase your portfolio and connect with hiring companies.",
      icon: <Rocket className="w-6 h-6" />
    }
  ];

  const benefits = [
    "100% Free to start learning",
    "Self-paced learning modules",
    "Live coding sessions with experts",
    "Peer code reviews and feedback",
    "Access to exclusive hackathons",
    "Job placement assistance",
    "Lifetime access to course materials",
    "Regular content updates"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#FAFBFC] to-white">
      <Navbar />
      
      <main className="relative pt-24">
      {/* Hero Section */}
      <section className="relative pt-8 pb-20 px-6 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#0A4A7A] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block px-4 py-2 bg-[#FFE8E0] border border-[#FF6B35] rounded-full text-[#CC5629] text-sm font-medium"
            >
              🎓 For Learners
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-[#0A4A7A]">
              Master Coding & Finance
            </h1>

            <p className="text-xl md:text-2xl text-[#525252] max-w-3xl mx-auto leading-relaxed">
              Transform from beginner to professional developer with our comprehensive 
              courses in Web3, DeFi, and Full-Stack Development.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <Link
                href="/dashboard/student"
                className="group px-8 py-4 bg-[#FF6B35] text-white rounded-full font-semibold hover:bg-[#CC5629] hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              >
                <span>Start Learning Now</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/dashboard/student/leaderboard"
                className="px-8 py-4 border-2 border-[#0A4A7A] text-[#0A4A7A] rounded-full hover:bg-[#0A4A7A] hover:text-white transition-all duration-300 flex items-center space-x-2"
              >
                <Trophy className="w-5 h-5" />
                <span>View Leaderboard</span>
              </Link>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-4xl mx-auto"
            >
              {[
                { value: "50+", label: "Courses" },
                { value: "10K+", label: "Students" },
                { value: "95%", label: "Success Rate" },
                { value: "500+", label: "Projects Built" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="p-4 bg-white backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm"
                >
                  <div className="text-3xl font-bold tabular-nums text-[#FF6B35]">{stat.value}</div>
                  <div className="text-sm text-[#737373]">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 relative bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A4A7A] mb-4">
              Why Choose Learn2Launch?
            </h2>
            <p className="text-xl text-[#525252] max-w-2xl mx-auto">
              Everything you need to become a successful developer and launch your career
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group p-6 bg-white backdrop-blur-sm rounded-2xl border border-gray-200 hover:border-[#FF6B35] hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-xl bg-linear-to-br ${feature.color} flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0F0F0F] mb-2">{feature.title}</h3>
                <p className="text-[#737373]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-20 px-6 relative bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A4A7A] mb-4">
              Your Learning Journey
            </h2>
            <p className="text-xl text-[#525252]">
              A clear path from beginner to professional
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {learningPath.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                {/* Connector Line */}
                {index < learningPath.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-linear-to-r from-[#0A4A7A] to-transparent" />
                )}

                <div className="relative p-6 bg-white backdrop-blur-sm rounded-2xl border border-gray-200 hover:border-[#0A4A7A] hover:shadow-lg transition-all duration-300">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-linear-to-br from-[#FF6B35] to-[#CC5629] rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg">
                    {item.step}
                  </div>

                  <div className="mt-4">
                    <div className="w-12 h-12 bg-[#FFE8E0] rounded-lg flex items-center justify-center text-[#FF6B35] mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#0F0F0F] mb-2">{item.title}</h3>
                    <p className="text-[#737373] text-sm">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 relative bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#0A4A7A] mb-6">
                Everything You Need to Succeed
              </h2>
              <p className="text-xl text-[#525252] mb-8">
                Join thousands of students who have transformed their careers with Learn2Launch
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-[#2E865F] shrink-0" />
                    <span className="text-[#525252]">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative p-8 bg-linear-to-br from-[#F5F5F5] to-white rounded-3xl border-2 border-[#0A4A7A] backdrop-blur-sm shadow-xl">
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-6 -right-6 w-20 h-20 bg-linear-to-br from-[#FF6B35] to-[#CC5629] rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <Star className="w-10 h-10 text-white" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-linear-to-br from-[#2E865F] to-[#1E5A42] rounded-xl flex items-center justify-center shadow-lg"
                >
                  <Zap className="w-8 h-8 text-white" />
                </motion.div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
                    <span className="text-[#525252]">Course Progress</span>
                    <span className="text-[#0A4A7A] font-bold tabular-nums">78%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
                    <span className="text-[#525252]">Projects Completed</span>
                    <span className="text-[#0A4A7A] font-bold tabular-nums">12/15</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
                    <span className="text-[#525252]">Leaderboard Rank</span>
                    <span className="text-[#FF6B35] font-bold tabular-nums">#47</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
                    <span className="text-[#525252]">Certificates Earned</span>
                    <span className="text-[#2E865F] font-bold tabular-nums">3</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-12 bg-linear-to-br from-[#0A4A7A] to-[#083A5E] rounded-3xl border-2 border-[#0D5C94] text-center overflow-hidden shadow-2xl"
          >
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-10">
              <motion.div
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                className="w-full h-full"
                style={{
                  backgroundImage: 'radial-gradient(circle, #FFFFFF 1px, transparent 1px)',
                  backgroundSize: '50px 50px',
                }}
              />
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-gray-200 mb-8">
                Join thousands of students already learning and building amazing projects
              </p>

              <Link
                href="/dashboard/student"
                className="inline-flex items-center space-x-2 px-10 py-5 bg-[#FF6B35] text-white rounded-full font-bold text-lg hover:bg-[#CC5629] hover:shadow-xl transition-all duration-300 group"
              >
                <span>Access Student Dashboard</span>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>

              <p className="text-sm text-gray-300 mt-6">
                No credit card required • Start learning in minutes
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}
