import Header from "@/components/publicheader";
import Sidebar from "@/components/sidebar";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <div>
          <h1>Welcome to Next.js!</h1>
          <p>This is the home page.</p>
        </div>
      </div>
    </div>
  );
}
