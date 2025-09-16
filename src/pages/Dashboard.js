import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
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
} from "react-icons/fi";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dummy stats
  const stats = [
    {
      label: "Total Posts",
      value: 42,
      icon: <FiFileText size={24} />,
      color: "bg-blue-500",
      trend: "+12%",
    },
    {
      label: "Published",
      value: 36,
      icon: <FiEye size={24} />,
      color: "bg-green-500",
      trend: "+8%",
    },
    {
      label: "Drafts",
      value: 6,
      icon: <FiEdit size={24} />,
      color: "bg-yellow-500",
      trend: "-2%",
    },
    {
      label: "Total Users",
      value: 15,
      icon: <FiUsers size={24} />,
      color: "bg-purple-500",
      trend: "+5%",
    },
  ];

  const recentPosts = [
    {
      id: 1,
      title: "Understanding React Hooks",
      status: "Published",
      date: "2025-09-14",
      views: 1245,
    },
    {
      id: 2,
      title: "TailwindCSS Tips and Tricks",
      status: "Draft",
      date: "2025-09-13",
      views: 0,
    },
    {
      id: 3,
      title: "React Router v6 Complete Guide",
      status: "Published",
      date: "2025-09-12",
      views: 2897,
    },
    {
      id: 4,
      title: "Building Modern Dashboards",
      status: "Published",
      date: "2025-09-11",
      views: 3456,
    },
    {
      id: 5,
      title: "API Security Best Practices",
      status: "Draft",
      date: "2025-09-10",
      views: 0,
    },
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`bg-white w-64 p-6 shadow-xl transition-all duration-300 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0 fixed md:static h-full z-50`}
      >
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <FiTrendingUp className="mr-2 text-blue-600" />
            CMS Admin
          </h2>
          <button
            className="md:hidden text-gray-700"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX size={20} />
          </button>
        </div>
        <nav className="space-y-2">
          <Link
            to="/dashboard"
            className="flex items-center p-3 text-blue-600 bg-blue-50 rounded-lg font-medium"
          >
            <FiHome className="mr-3" />
            Dashboard
          </Link>
          <Link
            to="/posts"
            className="flex items-center p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium"
          >
            <FiFileText className="mr-3" />
            Posts
          </Link>
          <Link
            to="/create-post"
            className="flex items-center p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium"
          >
            <FiPlusSquare className="mr-3" />
            Create Post
          </Link>
          <Link
            to="/users"
            className="flex items-center p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium"
          >
            <FiUsers className="mr-3" />
            Users
          </Link>
          <Link
            to="/settings"
            className="flex items-center p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium"
          >
            <FiSettings className="mr-3" />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content - Fixed margin class */}
      <div className="flex-1 min-w-0 md:ml-64 p-4 md:p-6">
        {/* Top Navbar - Mobile Responsive */}
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between mb-6 gap-2 md:gap-0">
          {/* Menu Button */}
          <button
            className="md:hidden text-gray-700 p-2"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu size={24} />
          </button>

          {/* Search Input */}
          <div className="flex-1 relative w-full md:w-auto">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-2 md:space-x-4 mt-2 md:mt-0">
            {/* Notifications */}
            <div className="relative">
              <button className="text-gray-600 hover:text-gray-800 p-2 relative">
                <FiBell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>

            {/* Avatar */}
            <div>
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=32&h=32&q=80"
                alt="User"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Welcome Header - Improved mobile padding */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 md:p-6 text-white mb-6 md:mb-8 shadow-lg">
          <h1 className="text-xl md:text-2xl font-bold mb-2">
            Welcome back, Admin!
          </h1>
          <p className="opacity-90 text-sm md:text-base">
            Here's what's happening with your blog today.
          </p>
          <div className="flex items-center mt-3 md:mt-4">
            <FiCalendar className="mr-2" size={16} />
            <span className="text-sm md:text-base">September 15, 2025</span>
          </div>
        </div>

        {/* Stats Cards - Improved mobile grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-xs md:text-sm">
                    {stat.label}
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-gray-800 mt-1">
                    {stat.value}
                  </p>
                  <p
                    className={`text-xs mt-2 ${
                      stat.trend.startsWith("+")
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {stat.trend} from last week
                  </p>
                </div>
                <div
                  className={`p-2 md:p-3 rounded-full ${stat.color} text-white`}
                >
                  {React.cloneElement(stat.icon, { size: 20 })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section - Stack on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Posts Analytics */}
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-0">
                Posts Analytics
              </h2>
              <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 w-full md:w-auto">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="posts"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: "#3B82F6", strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5, fill: "#3B82F6" }}
                />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ fill: "#10B981", strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5, fill: "#10B981" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Categories Distribution */}
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
              Content Distribution
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {categoryData.map((entry, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className="w-2 h-2 md:w-3 md:h-3 rounded-full mr-1 md:mr-2"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-xs md:text-sm text-gray-600">
                    {entry.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Posts Table - Improved mobile scrolling */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-0">
              Recent Posts
            </h2>
            <Link
              to="/posts"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View all →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px] md:min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2 md:p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="p-2 md:p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="p-2 md:p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="p-2 md:p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="p-2 md:p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentPosts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-2 md:p-3 text-gray-700 font-medium text-sm md:text-base">
                      {post.title}
                    </td>
                    <td className="p-2 md:p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          post.status === "Published"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="p-2 md:p-3 text-gray-500 text-sm">
                      {post.date}
                    </td>
                    <td className="p-2 md:p-3">
                      <div className="flex items-center">
                        <FiEye className="text-gray-400 mr-1" size={12} />
                        <span className="text-gray-600 text-sm">
                          {post.views.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="p-2 md:p-3">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 p-1">
                          <FiEdit size={14} />
                        </button>
                        <button className="text-red-600 hover:text-red-800 p-1">
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions - Stack on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-3 md:mb-4">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600 mr-3">
                <FiPlusSquare size={18} />
              </div>
              <h3 className="font-medium text-gray-800 text-sm md:text-base">
                Create New Post
              </h3>
            </div>
            <p className="text-gray-500 text-xs md:text-sm mb-3 md:mb-4">
              Start writing a new blog post
            </p>
            <Link
              to="/create-post"
              className="text-blue-600 text-xs md:text-sm font-medium hover:text-blue-800"
            >
              Create Post →
            </Link>
          </div>

          <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-3 md:mb-4">
              <div className="p-2 bg-green-100 rounded-lg text-green-600 mr-3">
                <FiUserPlus size={18} />
              </div>
              <h3 className="font-medium text-gray-800 text-sm md:text-base">
                Invite Users
              </h3>
            </div>
            <p className="text-gray-500 text-xs md:text-sm mb-3 md:mb-4">
              Invite team members to collaborate
            </p>
            <button className="text-blue-600 text-xs md:text-sm font-medium hover:text-blue-800">
              Invite Users →
            </button>
          </div>

          <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-3 md:mb-4">
              <div className="p-2 bg-purple-100 rounded-lg text-purple-600 mr-3">
                <FiMessageSquare size={18} />
              </div>
              <h3 className="font-medium text-gray-800 text-sm md:text-base">
                View Comments
              </h3>
            </div>
            <p className="text-gray-500 text-xs md:text-sm mb-3 md:mb-4">
              Check recent comments on your posts
            </p>
            <button className="text-blue-600 text-xs md:text-sm font-medium hover:text-blue-800">
              View Comments →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
