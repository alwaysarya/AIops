import React from 'react'
import { AlertTriangle } from 'lucide-react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen bg-[#030303] text-white flex-col items-center justify-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Something went wrong.</h1>
          <p className="text-zinc-400 mb-6">Please refresh the page or contact support.</p>
          <button onClick={() => window.location.reload()} className="bg-white text-black px-6 py-2 rounded-xl font-semibold hover:bg-gray-200">Reload Page</button>
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
