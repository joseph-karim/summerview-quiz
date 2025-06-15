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
        <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"
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
                    ? 'bg-gradient-to-r from-blue-500 to-teal-500 border-blue-500 text-white'
                    : 'bg-white border-gray-300 text-gray-400'
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
                <div className={`text-sm font-medium ${
                  selectedMonth === item.month ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  Month {item.month}
                </div>
                <div className="text-xs text-gray-500 max-w-20 leading-tight">
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
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-teal-50 border-blue-200">
          <div className="flex items-start space-x-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              selectedData?.month <= 3 
                ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white'
                : 'bg-white border-2 border-blue-300 text-blue-600'
            }`}>
              <span className="text-xl font-bold">
                {selectedData?.month === 0 ? '0' : selectedData?.month}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedData?.title}
                </h3>
                {selectedData?.status === 'active' && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                    Current Phase
                  </span>
                )}
              </div>
              <p className="text-blue-800 font-medium mb-3">
                {selectedData?.description}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {selectedData?.details}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Expected results summary */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Expected Results Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">85%</div>
            <p className="text-gray-600">Patient satisfaction rate</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">30%</div>
            <p className="text-gray-600">Average hair density increase</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">6</div>
            <p className="text-gray-600">Months to full results</p>
          </div>
        </div>
      </div>
    </div>
  )
}