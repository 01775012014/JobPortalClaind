import React from 'react';
import jobs1 from "../../Img/img2.jpg";

import Jobs2 from "../../Img/img1.jpg"
import { motion } from "motion/react"

const Thambel = () => {
    return (
       <div className="hero bg-base-200 min-h-97">
  <div className="hero-content flex-col lg:flex-row-reverse">
    {/* img div  */}

    <div className=''>
      <motion.img
      animate={{y: [100,150,100]}}
      transition={{duration: 5, repeat: Infinity}}
      src={jobs1}
      className="max-w-sm border-blue-600 rounded-t-[40px] border-s-8 border-b-8 shadow-2xl"
    />

    <motion.img
      animate={{x: [100,150,100]}}
      transition={{duration: 10, repeat: Infinity}}
      src={Jobs2}
      className="max-w-sm border-blue-600 rounded-t-[40px] border-s-8 border-b-8 shadow-2xl"
    />
    </div>
    {/* <img
      src={Jobs2}
      className="max-w-sm border-blue-600 rounded-t-[40px] border-s-8 border-b-8  shadow-2xl"
    /> */}
    <div>
      {/* <motion.h1 
      // animate={{
      //   rotate:180,
      //   transition: {duration:4}
      // }}
      className="text-5xl font-bold">Latest <motion.span
      animate={
        {
          color:["#F54927","#E39507","#9DE307","#0BE307","#0AF09B","#0AD5F0","#4B0AF0","#BE0AF0","#F00A90"],
          transition:{duration:4, repeat:Infinity}
        }
      }
      >Jobs</motion.span> For you!</motion.h1> */}

      <motion.h1 
  className="text-5xl font-bold"
>
  Latest{" "}
  <motion.span
    animate={{
      color: [
        "#F54927",
        "#E39507",
        "#9DE307",
        "#0BE307",
        "#0AF09B",
        "#0AD5F0",
        "#4B0AF0",
        "#BE0AF0",
        "#F00A90",
      ],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      repeatType: "loop", // repeat কাজ করার জন্য দরকার
    }}
  >
    Jobs
  </motion.span>{" "}
  For you!
</motion.h1>



      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
    );
};

export default Thambel;