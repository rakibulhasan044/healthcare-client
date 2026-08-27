"use client";

import { Search, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LargeSparkleIcon, SparkleIcon } from "@/assets/icons/SparkleIcon";
import { HeroProps } from "@/types/heroPros";
import { motion } from "framer-motion";

export function Hero({
  badge = {
    text: "AI-Powered Healthcare",
  },
  heading = {
    line1: "Find Your Perfect",
    line2: "Doctor with AI",
  },
  description = [
    "Our advanced AI technology analyzes your symptoms, medical",
    "history, and preferences to match you with the best-fit doctors",
    "in seconds.",
  ],
  buttons = {
    primary: {
      text: "Find Your Doctor",
    },
    secondary: {
      text: "Book Appointment",
    },
  },
  stats = [
    { value: "50K+", label: "Patients Served" },
    { value: "1000+", label: "Expert Doctors" },
    {
      value: "4.9",
      label: "Patient Rating",
      icon: <Star className="size-6 fill-yellow-400 stroke-yellow-400" />,
    },
  ],
  formCard = {
    title: "AI Doctor Finder",
    symptomLabel: "What are your symptoms?",
    symptomPlaceholder: "e.g., headache, fever, cough",
    specialtyLabel: "Preferred specialty",
    specialtyOptions: [
      "General Physician",
      "Cardiologist",
      "Dermatologist",
      "Pediatrician",
      "Orthopedic",
    ],
    defaultSpecialty: "General Physician",
    submitText: "Get AI Recommendations",
    footerText:
      "✨ Powered by advanced AI algorithms for accurate doctor matching",
  },
}: HeroProps) {
  const ease = [0.21, 0.47, 0.32, 0.98] as const;

  return (
    <div className="w-full relative">
      {/* Radial Gradient Background from Bottom */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 90%, #fff 30%, #155DFC 100%)",
        }}
      />
      {/* Content Container */}
      <div className="w-full px-4 py-8 md:px-8 lg:px-16 relative">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left Column - Hero Content */}
            <div className="flex flex-col justify-center space-y-6">
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-3 self-start rounded-full bg-white px-4 py-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
              >
                <SparkleIcon />
                <span className="text-[11.9px] font-medium text-blue-700">
                  {badge.text}
                </span>
              </motion.div>

              {/* Heading */}
              <div className="space-y-2">
                <motion.h1
                  className="text-[51px] leading-[60px]"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, ease }}
                >
                  {heading.line1}
                </motion.h1>
                <motion.h1
                  className="text-[51px] leading-[60px]"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease }}
                >
                  {heading.line2}
                </motion.h1>
              </div>

              {/* Description */}
              <motion.div
                className="space-y-1 text-[17px] leading-7 text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease }}
              >
                {description.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </motion.div>

              {/* Buttons */}
              <motion.div
                className="flex flex-col gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease }}
              >
                {buttons.primary && (
                  <Button
                    onClick={buttons.primary.onClick}
                    className="h-[63.622px] gap-3 rounded-xl bg-blue-600 px-8 text-[15.3px] hover:bg-blue-700"
                  >
                    <Search className="size-5" />
                    {buttons.primary.text}
                  </Button>
                )}
                {buttons.secondary && (
                  <Button
                    onClick={buttons.secondary.onClick}
                    variant="outline"
                    className="h-[63.622px] gap-3 rounded-xl border-blue-600 px-8 text-[15.3px] text-blue-600 hover:bg-blue-50"
                  >
                    <Calendar className="size-5" />
                    {buttons.secondary.text}
                  </Button>
                )}
              </motion.div>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-3 gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease }}
              >
                {stats.map((stat, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <p className="text-[25.5px] leading-9">{stat.value}</p>
                      {stat.icon}
                    </div>
                    <p className="text-[13.6px] leading-6 text-gray-600">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Column - Form Card */}
            <motion.div
              className="flex items-center justify-center lg:justify-end"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
            >
              <div className="w-full max-w-[559.929px] rounded-2xl bg-white p-8 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]">
                {/* Card Header */}
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-[20.4px] leading-6">{formCard.title}</h2>
                  <LargeSparkleIcon />
                </div>

                {/* Form */}
                <form className="space-y-6">
                  {/* Symptoms Input */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="symptoms"
                      className="text-[11.9px] text-gray-700"
                    >
                      {formCard.symptomLabel}
                    </Label>
                    <Input
                      id="symptoms"
                      name="symptoms"
                      placeholder={formCard.symptomPlaceholder}
                      className="h-[49.787px] rounded-xl border-gray-300"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="h-[59.986px] w-full rounded-xl bg-blue-600 text-[15.3px] hover:bg-blue-700"
                  >
                    {formCard.submitText}
                  </Button>
                </form>

                {/* Footer */}
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <p className="text-center text-[11.9px] leading-5 text-gray-600">
                    {formCard.footerText}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}