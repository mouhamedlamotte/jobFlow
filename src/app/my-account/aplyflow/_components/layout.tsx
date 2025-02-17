import type React from "react"
import Timeline from "./timeline"

interface LayoutProps {
  children: React.ReactNode
  currentStep: number
}

const Layout: React.FC<LayoutProps> = ({ children, currentStep }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/4 p-6 bg-white shadow-lg">
        <Timeline currentStep={currentStep} />
      </div>
      <div className="w-3/4 p-6">{children}</div>
    </div>
  )
}

export default Layout

