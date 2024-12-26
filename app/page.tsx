import { Auth } from "@/components/auth/auth";

export default function Home() {
  return (
    <div>
        <div className="flex flex-col items-center justify-between gap-6 p-12">
            <Auth></Auth>
        </div>
    </div>
  );
}