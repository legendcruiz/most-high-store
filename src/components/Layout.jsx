import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-4">
        {children}
      </div>
    </div>
  );
}