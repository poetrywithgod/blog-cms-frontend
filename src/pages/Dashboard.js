import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  FiHome,
  FiFileText,
  FiPlusSquare,
  FiUsers,
  FiSettings,
  FiBell,
  FiSearch,
  FiTrendingUp,
  FiEye,
  FiEdit,
  FiTrash2,
  FiMenu,
  FiX,
  FiCalendar,
  FiMessageSquare,
  FiUserPlus,
  FiMoon,
  FiSun,
  FiBarChart2,
  FiPieChart,
} from "react-icons/fi";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setDropdownOpen(false);
      setNotifOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Dummy stats with better trending data
  const stats = [
    { 
      label: "Total Posts", 
      value: 42, 
      icon: <FiFileText />, 
      color: "text-blue-600", 
      bgColor: "bg-blue-50",
      trend: "+12%",
      description: "From last week"
    },
    { 
      label: "Published", 
      value: 36, 
      icon: <FiEye />, 
      color: "text-green-600", 
      bgColor: "bg-green-50",
      trend: "+8%",
      description: "Live articles"
    },
    { 
      label: "Drafts", 
      value: 6, 
      icon: <FiEdit />, 
      color: "text-amber-600", 
      bgColor: "bg-amber-50",
      trend: "-2%",
      description: "In progress"
    },
    { 
      label: "Total Users", 
      value: 15, 
      icon: <FiUsers />, 
      color: "text-purple-600", 
      bgColor: "bg-purple-50",
      trend: "+5%",
      description: "Registered users"
    },
  ];

  const recentPosts = [
    { id: 1, title: "Understanding React Hooks", status: "Published", date: "2025-09-14", views: 1245, img: "https://source.unsplash.com/random/60x40?tech" },
    { id: 2, title: "TailwindCSS Tips and Tricks", status: "Draft", date: "2025-09-13", views: 0, img: "https://source.unsplash.com/random/60x40?design" },
    { id: 3, title: "React Router v6 Complete Guide", status: "Published", date: "2025-09-12", views: 2897, img: "https://source.unsplash.com/random/60x40?react" },
    { id: 4, title: "Building Modern Dashboards", status: "Published", date: "2025-09-11", views: 3456, img: "https://source.unsplash.com/random/60x40?dashboard" },
    { id: 5, title: "API Security Best Practices", status: "Draft", date: "2025-09-10", views: 0, img: "https://source.unsplash.com/random/60x40?security" },
  ];

  const chartData = [
    { name: "Sep 10", posts: 2, visitors: 124 },
    { name: "Sep 11", posts: 4, visitors: 256 },
    { name: "Sep 12", posts: 3, visitors: 189 },
    { name: "Sep 13", posts: 5, visitors: 312 },
    { name: "Sep 14", posts: 6, visitors: 421 },
  ];

  const categoryData = [
    { name: "Technology", value: 35 },
    { name: "Design", value: 25 },
    { name: "Business", value: 20 },
    { name: "Lifestyle", value: 15 },
    { name: "Travel", value: 5 },
  ];

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899"];

  const quickActions = [
    { title: "Create New Post", desc: "Start writing a new blog post", icon: <FiPlusSquare />, color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300", link: "/create-post" },
    { title: "Invite Users", desc: "Invite team members to collaborate", icon: <FiUserPlus />, color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300", link: "/users" },
    { title: "View Comments", desc: "Check recent comments on your posts", icon: <FiMessageSquare />, color: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300", link: "/comments" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 p-6 transition-transform duration-300 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 shadow-lg md:shadow-none`}>
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold flex items-center text-gray-800 dark:text-white">
            <FiTrendingUp className="mr-2 text-blue-600" />
            CMS Admin
          </h2>
          <button 
            className="md:hidden text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX size={20} />
          </button>
        </div>
        
        <nav className="space-y-2">
          {[
            { to: "/dashboard", icon: <FiHome />, label: "Dashboard" },
            { to: "/posts", icon: <FiFileText />, label: "Posts" },
            { to: "/create-post", icon: <FiPlusSquare />, label: "Create Post" },
            { to: "/users", icon: <FiUsers />, label: "Users" },
            { to: "/settings", icon: <FiSettings />, label: "Settings" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center p-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors duration-200"
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Top Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-4">
              <button 
                className="md:hidden text-gray-700 dark:text-gray-300 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                onClick={() => setSidebarOpen(true)}
              >
                <FiMenu size={24} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
                <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's your content performance</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 w-full sm:w-64"
                />
              </div>

              {/* Dark Mode Toggle */}
              <button 
                onClick={() => setDarkMode(!darkMode)} 
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>

              {/* Notifications */}
              <div className="relative">
                <button 
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setNotifOpen(!notifOpen);
                  }}
                >
                  <FiBell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                {notifOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 z-10">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <p className="font-semibold">Notifications</p>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-center">No new notifications</p>
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu */}
              <div className="relative">
                <button 
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownOpen(!dropdownOpen);
                  }}
                >
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="User" 
                    className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600"
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 z-10">
                    <div className="p-2">
                      <Link to="/profile" className="block px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Profile</Link>
                      <Link to="/settings" className="block px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Settings</Link>
                      <button className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-red-600 dark:text-red-400">
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white mb-8 shadow-lg">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">Welcome back, Admin! 👋</h1>
                <p className="opacity-90 mb-4">Here's what's happening with your blog today.</p>
                <div className="flex items-center text-blue-100">
                  <FiCalendar className="mr-2" />
                  <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
              <div className="mt-4 lg:mt-0">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-sm opacity-90">Your blog is performing great this week!</p>
                  <p className="text-lg font-semibold">+15% more visitors</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      <CountUp end={stat.value} duration={2.5} />
                    </p>
                    <div className="flex items-center mt-2">
                      <span className={`text-sm font-medium ${
                        stat.trend.startsWith("+") ? "text-green-600" : "text-red-600"
                      }`}>
                        {stat.trend}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{stat.description}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor} dark:bg-opacity-20`}>
                    <div className={`text-xl ${stat.color}`}>{stat.icon}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            {/* Line Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <FiBarChart2 className="text-blue-600" />
                  <h2 className="text-lg font-semibold">Posts Analytics</h2>
                </div>
                <select className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                      borderColor: darkMode ? '#374151' : '#e5e7eb',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="posts" 
                    stroke="#3B82F6" 
                    strokeWidth={3} 
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }} 
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="visitors" 
                    stroke="#10B981" 
                    strokeWidth={3} 
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-6">
                <FiPieChart className="text-purple-600" />
                <h2 className="text-lg font-semibold">Content Distribution</h2>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie 
                    data={categoryData} 
                    cx="50%" 
                    cy="50%" 
                    innerRadius={60} 
                    outerRadius={100} 
                    paddingAngle={2}
                    dataKey="value" 
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Percentage']}
                    contentStyle={{ 
                      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                      borderColor: darkMode ? '#374151' : '#e5e7eb',
                      borderRadius: '0.5rem'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Posts */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-semibold mb-2 sm:mb-0">Recent Posts</h2>
                <Link to="/posts" className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm">
                  View all posts →
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Post</th>
                    <th className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                    <th className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Views</th>
                    <th className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {recentPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={post.img} alt={post.title} className="w-12 h-8 rounded-lg object-cover" />
                          <Link to={`/posts/${post.id}`} className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                            {post.title}
                          </Link>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          post.status === "Published" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                            : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                        }`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{post.date}</td>
                      <td className="p-4">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <FiEye className="mr-1" size={16} />
                          {post.views.toLocaleString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded transition-colors">
                            <FiEdit size={16} />
                          </button>
                          <button className="p-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded transition-colors">
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${action.color} dark:bg-opacity-20`}>
                    {action.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{action.desc}</p>
                <Link 
                  to={action.link} 
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm"
                >
                  Get started
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;