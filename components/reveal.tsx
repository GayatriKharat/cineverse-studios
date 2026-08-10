"use client";
import { motion } from "framer-motion";
export function Reveal({children,className=""}:{children:React.ReactNode,className?:string}){return <motion.div className={className} initial={{opacity:0,y:34}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.8,ease:[.2,.65,.2,1]}}>{children}</motion.div>}
