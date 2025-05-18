import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#BCDDFC] flex flex-col items-center justify-center min-h-screen p-6">
      <div className="flex items-center justify-center">
        <Image src="/logo.jpeg" alt="UnifyIQ Logo" width={300} height={300} />
      </div>
      <div className="text-center pt-5">
        <h1 className="text-4xl font-bold">Welcome to UnifyIQ</h1>
        <p className="mt-4 text-lg">
          Build applications with ease and efficiency.
        </p>
      </div>
      <footer className="text-sm text-gray-500">
        © {new Date().getFullYear()} UnifyIQ. All rights reserved.
      </footer>
    </div>
  );
}
