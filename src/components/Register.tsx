'use client'

import { useState } from "react";
import userRegister from "@/libs/userRegister";
import { useRouter } from "next/navigation";

export default function Register() {

  const [username, setUsername] = useState<string|null>(null)
  const [email, setEmail] = useState<string|null>(null)
  const [tel, setTel] = useState<string|null>(null)
  const [password, setPassword] = useState<string|null>(null)
  const [success, setSuccess] = useState<boolean|null>(null)

  const router = useRouter()

  const handleClick = () => {
    if (!username || !email || !tel || !password) {
      setSuccess(false);
      return;
    }
  
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
  
    const user: User = {
      name: username,
      tel: tel,
      email: email,
      role: 'user',
      password: password
    };
  
    userRegister(user)
      .then(() => {
        router.push('/api/auth/signin');
      })
      .catch(() => {
        setSuccess(false);
      });
  };
  

  return (
    <main className="py-4 px-6 bg-pink-200 rounded-lg md:rounded-xl m-10 pb-8 md:pb-10">
      <div className="text-2xl sm:text-3xl md:text-4xl text-slate-700 text-center font-bold m-4 md:m-6 lg:m-8 mb-6 sm:mb-7 md:mb-8">
        Register Here
      </div>

      <div className="flex flex-col justify-center items-center space-y-4 md:space-y-5 lg:space-y-6">
        <input
          type="text" required id="name" name="name" placeholder="Name"
          className="bg-white border-2 border-gray-200 rounded-lg md:rounded-xl w-[80%] md:w-[70%] lg:w-[60%] py-1.5 md:py-2 px-4 md:px-5
                    text-gray-700 focus:outline-none focus:border-blue-700 text-sm md:text-base lg:text-lg"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="text" required id="tel" name="tel" placeholder="Tel"
          className="bg-white border-2 border-gray-200 rounded-lg md:rounded-xl w-[80%] md:w-[70%] lg:w-[60%] py-1.5 md:py-2 px-4 md:px-5
                    text-gray-700 focus:outline-none focus:border-blue-700 text-sm md:text-base lg:text-lg"
          onChange={(e) => setTel(e.target.value)}
        />

        <input
          type="text" required id="email" name="email" placeholder="Email"
          className="bg-white border-2 border-gray-200 rounded-lg md:rounded-xl w-[80%] md:w-[70%] lg:w-[60%] py-1.5 md:py-2 px-4 md:px-5
                    text-gray-700 focus:outline-none focus:border-blue-700 text-sm md:text-base lg:text-lg"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input type="password" required id="password" name="password" placeholder="Password"
          className="bg-white border-2 border-gray-200 rounded-lg md:rounded-xl w-[80%] md:w-[70%] lg:w-[60%] py-1.5 md:py-2 px-4 md:px-5
                    text-gray-700 focus:outline-none focus:border-blue-700 text-sm md:text-base lg:text-lg"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-pink-500 hover:bg-pink-600 text-slate-700 text-white border-2 border-pink-500 py-2 md:py-3 px-5 md:px-6 lg:px-10
                    rounded-full text-sm md:text-base lg:text-lg font-normal"
          onClick={handleClick} >
          Sign up
        </button>

        {
          success===false? <div className="text-center">Register failed</div> : null
        }
        </div>
    </main>
  );
}
