import { Auth } from "@/components/auth/auth";
import UserDetails from "@/components/userDetails";

export default function Page() {
  return (
    <div>
        <div className="flex flex-col items-center justify-between gap-6 p-12">
            <Auth></Auth>
            <UserDetails/>
        </div>
    </div>
  );
}