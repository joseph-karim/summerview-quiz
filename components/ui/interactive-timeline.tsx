"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { CheckCircle, Circle } from 'lucide-react'

const timelineData = [
  {
    month: 0,
    title: "Treatment Day",
    description: "PRP procedure completed in-office",
    details: "Blood drawn, platelets separated, and injected into scalp. Minimal discomfort, about 60 minutes total.",
    status: "completed"
  },
  {
    month: 1,
    title: "Initial Shedding",
    description: "Some hair may shed (normal)",
    details: "Don't worry! This is your hair follicles making room for new, stronger growth. This phase typically lasts 2-3 weeks.",
    status: "completed"
  },
  {
    month: 2,
    title: "Recovery Phase",
    description: "Scalp heals, follicles activate",
    details: "Your scalp has fully healed and hair follicles are beginning to respond to the platelet growth factors.",
    status: "completed"
  },
  {
    month: 3,
    title: "Early Growth",
    description: "First signs of new hair",
    details: "You may notice fine, new hairs starting to appear. Hair texture may also begin to improve.",
    status: "active"
  },
  {
    month: 4,
    title: "Visible Improvement",
    description: "Hair becomes thicker and stronger",
    details: "Existing hair strands become noticeably thicker. New growth becomes more apparent to you and others.",
    status: "upcoming"
  },
  {
    month: 6,
    title: "Full Results",
    description: "Maximum improvement achieved",
    details: "Peak results are typically seen at this point. Hair is fuller, thicker, and healthier-looking.",
    status: "upcoming"
  }
]

export function InteractiveTimeline() {
  const [selectedMonth, setSelectedMonth] = useState(3)

  const selectedData = timelineData.find(item => item.month === selectedMonth)

  return (
    <div className="space-y-8">
      {/* Timeline Navigator */}
      <div className="relative">
        {/* Progress line */}
        <div className="absolute top-6 left-0 right-0 h-1 bg-summerview-gray rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-summerview-brown to-summerview-teal rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${(selectedMonth / 6) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Timeline points */}
        <div className="relative flex justify-between">
          {timelineData.map((item) => (
            <button
              key={item.month}
              onClick={() => setSelectedMonth(item.month)}
              className="flex flex-col items-center group"
            >
              <motion.div
                className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all duration-200 ${
                  item.month <= selectedMonth
                    ? 'bg-summerview-teal border-summerview-teal text-summerview-white'
                    : 'bg-summerview-white border-summerview-gray text-summerview-dark-gray'
                } ${selectedMonth === item.month ? 'scale-110 shadow-lg' : ''} group-hover:scale-105`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.month <= 3 ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </motion.div>
              <div className="mt-3 text-center">
                <div className={`text-sm font-medium font-poppins ${
                  selectedMonth === item.month ? 'text-summerview-teal' : 'text-summerview-dark-gray'
                }`}>
                  Month {item.month}
                </div>
                <div className="text-xs text-summerview-dark-gray max-w-20 leading-tight font-lato">
                  {item.title}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected month details */}
      <motion.div
        key={selectedMonth}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-6 bg-summerview-tan/10 border-summerview-tan">
          <div className="flex items-start space-x-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              selectedData?.month <= 3 
                ? 'bg-summerview-teal text-summerview-white'
                : 'bg-summerview-white border-2 border-summerview-tan text-summerview-brown'
            }`}>
              <span className="text-xl font-bold font-poppins">
                {selectedData?.month === 0 ? '0' : selectedData?.month}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-xl font-bold text-summerview-black font-poppins">
                  {selectedData?.title}
                </h3>
                {selectedData?.status === 'active' && (
                  <span className="bg-summerview-teal text-summerview-white text-xs font-medium px-2 py-1 rounded-full font-lato">
                    Current Phase
                  </span>
                )}
              </div>
              <p className="text-summerview-brown font-medium mb-3 font-poppins">
                {selectedData?.description}
              </p>
              <p className="text-summerview-dark-gray leading-relaxed font-lato">
                {selectedData?.details}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Expected results summary */}
      <div className="bg-summerview-white rounded-lg p-6 border border-summerview-gray">
        <h3 className="font-poppins font-semibold text-summerview-black mb-4">Expected Results Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-summerview-teal mb-1 font-poppins">85%</div>
            <p className="text-summerview-dark-gray font-lato">Patient satisfaction rate</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-summerview-brown mb-1 font-poppins">30%</div>
            <p className="text-summerview-dark-gray font-lato">Average hair density increase</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-summerview-tan mb-1 font-poppins">6</div>
            <p className="text-summerview-dark-gray font-lato">Months to full results</p>
          </div>
        </div>
      </div>
    </div>
  )
}