"use client";

import { IDoctor } from "@/types/doctor.interface";
import {
  StaggerContainer,
  StaggerItem,
  HoverCard,
} from "@/components/shared/Animations";
import DoctorCard from "./DoctorCard";

interface DoctorsGridProps {
  doctors: IDoctor[];
  isLoggedIn?: boolean;
}

const DoctorsGrid = ({ doctors, isLoggedIn }: DoctorsGridProps) => {
  return (
    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {doctors.map((doctor) => (
        <StaggerItem key={doctor.id}>
          <HoverCard>
            <DoctorCard doctor={doctor} isLoggedIn={isLoggedIn} />
          </HoverCard>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
};

export default DoctorsGrid;
