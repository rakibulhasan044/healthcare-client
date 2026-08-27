"use client";

import { Star, Clock, DollarSign, CalendarCheck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { IDoctor } from "@/types/doctor.interface";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BookAppointmentDialog from "../Consultation/BookAppointmentDialog";

const DoctorCard = ({ doctor, isLoggedIn }: { doctor: IDoctor, isLoggedIn?: boolean }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const specialties = doctor.doctorSpecialties
    ?.slice(0, 2)
    .map((s) => s.specialties?.title)
    .filter(Boolean);

  const rating = doctor.averageRating ?? 0;

  const handleBookNow = () => {
    if (isLoggedIn) {
      setShowModal(true);
    } else {
      router.push("/login");
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group">
        {/* Top gradient banner with photo */}
        <div className="relative bg-gradient-to-br from-cyan-400 to-blue-600 pt-8 pb-14 flex justify-center">
          <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
            {doctor.profilePhoto ? (
              <Image
                src={doctor.profilePhoto as string}
                alt={doctor.name}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-blue-50">
                <User className="w-10 h-10 text-blue-400" />
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 -mt-6 mx-4 bg-white rounded-xl px-5 pt-6 pb-5 shadow-sm border border-gray-100">
          {/* Name */}
          <h3 className="text-lg font-bold text-gray-900 text-center truncate">
            {doctor.name}
          </h3>

          {/* Designation */}
          <p className="text-center text-sm text-muted-foreground mt-0.5 truncate">
            {doctor.designation}
          </p>

          {/* Specialties */}
          {specialties && specialties.length > 0 && (
            <div className="flex flex-wrap gap-1.5 justify-center mt-3">
              {specialties.map((title) => (
                <Badge
                  key={title}
                  className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-0 text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {title}
                </Badge>
              ))}
            </div>
          )}

          {/* Star Rating */}
          <div className="flex items-center justify-center gap-1.5 mt-4">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={15}
                  className={
                    i <= Math.round(rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }
                />
              ))}
            </div>
            <span className="text-sm font-bold text-gray-800">
              {rating.toFixed(1)}
            </span>
          </div>

          {/* Info chips */}
          <div className="flex items-center justify-center gap-3 mt-4">
            {doctor.experience !== undefined && (
              <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 text-xs text-gray-600">
                <Clock size={12} className="text-blue-500" />
                <span>{doctor.experience}+ yrs</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 text-xs text-gray-600">
              <DollarSign size={12} className="text-green-500" />
              <span>${doctor.appointmentFee}/visit</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-5">
            <Link href={`/consultation/doctor/${doctor.id}`} className="w-full">
              <Button
                variant="outline"
                className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg font-semibold"
              >
                View Profile
              </Button>
            </Link>
            <Button 
              onClick={handleBookNow}
              className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold gap-1.5"
            >
              <CalendarCheck size={15} />
              Book Now
            </Button>
          </div>
        </div>
      </div>

      <BookAppointmentDialog
        doctor={doctor}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default DoctorCard;
