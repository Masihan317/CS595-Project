import Sidebar from "./Sidebar"
import "../index.css"
import Summarization from "../pages/Summarization"

const Layout = () => {
  return (
    <div className="layout-grid">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main">
        <Summarization />
      </div>
    </div>
  )
}

export default Layout