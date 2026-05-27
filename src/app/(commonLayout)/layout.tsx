import PublicNavbar from "@/components/shared/PublicNavbar";

const CommonDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PublicNavbar />
      {children}
    </>
  );
};

export default CommonDashboardLayout;
