import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getTopRatedDoctors } from "@/services/doctor/doctor.service";
import { IDoctor } from "@/types/doctor.interface";
import { FadeUp } from "@/components/shared/Animations";
import DoctorsGrid from "./DoctorsGrid";

const TopRatedDoctors = async () => {
  const response = await getTopRatedDoctors(6);
  const doctors: IDoctor[] = Array.isArray(response?.data)
    ? response.data
    : response?.data?.data || [];

  return (
    <section className="bg-gradient-to-b from-blue-50/60 to-white py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <FadeUp>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full mb-4">
              Expert Care
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Our Top Rated Doctors
            </h2>
            <p className="text-muted-foreground mt-4 text-base">
              Access medical experts from various specialties, ready to provide
              you with top-notch healthcare services.
            </p>
          </div>
        </FadeUp>

        {doctors.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No doctors available at the moment.
          </p>
        ) : (
          <DoctorsGrid doctors={doctors} />
        )}

        <FadeUp delay={0.2}>
          <div className="text-center mt-14">
            <Link href="/consultation">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 px-8 rounded-full text-base font-semibold shadow-md"
              >
                View All Doctors
              </Button>
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default TopRatedDoctors;
