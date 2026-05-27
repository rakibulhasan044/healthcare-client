import LogoutButton from "@/components/shared/LogoutButton";
import { getCookie } from "@/services/auth/tokenHandler";

const CommonDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const accessToken = await getCookie("accessToken");
  return (
    <>
      {accessToken && <LogoutButton />}
      {children}
    </>
  );
};

export default CommonDashboardLayout;
