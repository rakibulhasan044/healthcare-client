import MyProfile from "@/components/modules/MyProfile/MyProfile";
import { getUserInfo } from "@/services/auth/getUserInfo";

export default async function AdminProfilePage() {
  const userInfo = await getUserInfo();
  return <MyProfile userInfo={userInfo} />;
}
