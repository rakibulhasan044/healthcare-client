import PaymentSuccessContent from "@/components/modules/Payment/PaymentSuccessContent";
import { serverFetch } from "@/lib/server-fetch";

// Force dynamic rendering to ensure fresh data after payment
export const dynamic = "force-dynamic";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const sessionId = params?.session_id;

  if (sessionId && typeof sessionId === "string") {
    try {
      await serverFetch.get(`/payment/verify-stripe?sessionId=${sessionId}`);
    } catch (err) {
      console.error("Failed to verify stripe payment:", err);
    }
  }

  return <PaymentSuccessContent />;
}
