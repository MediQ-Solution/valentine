"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { Heart } from "lucide-react"
import Image from "next/image"

export default function ValentineProposal() {
  const [showProposal, setShowProposal] = useState(false)
  const [response, setResponse] = useState<string | null>(null)
  const [balloonPosition, setBalloonPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      setBalloonPosition({
        x: Math.sin(Date.now() / 1000) * 10,
        y: Math.cos(Date.now() / 1000) * 10,
      })
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const handleShowProposal = () => {
    setShowProposal(true)
  }

  const handleResponse = (answer: "yes" | "no") => {
    setResponse(answer)
    if (answer === "yes") {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-red-100 flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <Image src="/hearts-bg.png" alt="Hearts background" layout="fill" objectFit="cover" />
      </div>

      <motion.div animate={balloonPosition} className="absolute top-10 right-10">
        <Image src="/balloon.png" alt="Cute balloon" width={100} height={150} />
      </motion.div>

      <AnimatePresence>
        {!showProposal && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white text-red-500 font-bold py-4 px-8 rounded-full shadow-lg text-xl font-cute"
            onClick={handleShowProposal}
          >
            Open my heart! 💌
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showProposal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-center bg-white p-8 rounded-3xl shadow-xl max-w-md w-full"
          >
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-red-600 mb-4 font-cute"
            >
              Will you be my Valentine?
            </motion.h1>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center space-x-4 mt-8"
            >
              <button
                onClick={() => handleResponse("yes")}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-110 font-cute text-xl"
              >
                Yes, I'd love to! 😍
              </button>
              <NoButton onNo={() => handleResponse("no")} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="mt-8 text-center bg-white p-6 rounded-3xl shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4 font-cute">
              {response === "yes" ? "Yay! You've made me the happiest person! 🎉" : "Oh no! Maybe next time? 😢"}
            </h2>
            {response === "yes" && <FloatingHearts />}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-5 left-5">
        <Image src="/teddy-bear.png" alt="Cute teddy bear" width={100} height={100} />
      </div>
    </div>
  )
}

function NoButton({ onNo }: { onNo: () => void }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseEnter = () => {
    const newX = Math.random() * 200 - 100
    const newY = Math.random() * 200 - 100
    setPosition({ x: newX, y: newY })
  }

  return (
    <motion.button
      animate={position}
      onMouseEnter={handleMouseEnter}
      onClick={onNo}
      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out font-cute text-xl"
    >
      No, thanks 😅
    </motion.button>
  )
}

function FloatingHearts() {
  return (
    <div className="relative h-40">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: 0, x: Math.random() * 100 - 50 }}
          animate={{
            y: -200,
            x: Math.sin(i) * 50,
            transition: {
              duration: 2 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "easeInOut",
            },
          }}
          className="absolute"
        >
          <Heart className="text-pink-500" size={16 + Math.random() * 16} />
        </motion.div>
      ))}
    </div>
  )
}

