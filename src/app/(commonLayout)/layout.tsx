import PublicFooter from "@/components/shared/PublicFooter";
import PublicNavbar from "@/components/shared/PublicNavbar";
import { PageTransition } from "@/components/shared/Animations";

const CommonDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PublicNavbar />
      <PageTransition>{children}</PageTransition>
      <PublicFooter />
    </>
  );
};

export default CommonDashboardLayout;
