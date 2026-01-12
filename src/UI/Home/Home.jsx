import React, { useState, useEffect } from "react";
import TextType from "../Text_animation.jsx";

const Home = () => {
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen md:grid-cols-1 justify-center p-6 items-center text-gray-100  grid lg:grid-cols-2 gap-[80px]  relative overflow-hidden">
      <div className=" w-[100%] bg-green-700 h-[500px] flex justify-center items-center ">
        <section className=" bg-amber-800 w-[90%] h-[90%] ">
          <h1 className=" font-black text-4xl mb-1.5">Hi i'm Jerry</h1>
          <p className=" text-3xl ">
            {" "}
            <TextType
              text={[
                "Frontend Developer",
                "UI/UX Enthusiast",
                "React Specialist",
              ]}
              typingSpeed={75}
              pauseDuration={400}
              showCursor={true}
              cursorCharacter="|"
            />
          </p>
        </section>
      </div>

    
      
    </div>
  );
};

export default Home;
