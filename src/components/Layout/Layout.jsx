"use client"

import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../Sidebar/Sidebar.jsx"
import Header from "../Header/Header.jsx"
import Footer from "../Footer/Footer.jsx"
import "./Layout.css"

const Layout = ({ darkMode, toggleTheme }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const toggleMobileSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarOpen && !event.target.closest(".sidebar") && !event.target.closest(".sidebar-mobile-toggle")) {
        setSidebarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [sidebarOpen])

  return (
    <div className={`app-container ${darkMode ? "dark" : "light"}`}>
      <Sidebar
        collapsed={sidebarCollapsed}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        darkMode={darkMode}
      />
      <div className={`main-content ${sidebarCollapsed ? "active" : ""}`}>
        <Header
          toggleSidebar={toggleSidebar}
          toggleMobileSidebar={toggleMobileSidebar}
          sidebarCollapsed={sidebarCollapsed}
          darkMode={darkMode}
          toggleTheme={toggleTheme}
        />
        <div className="content-area">
          <Outlet />
        </div>
        <Footer darkMode={darkMode} />
      </div>
    </div>
  )
}

export default Layout
