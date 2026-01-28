import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    if (!data.user) redirect('/login');

    return ( 
        <div className="p-8 text-white">
            Logged in as: {data.user.email}
        </div>
    )
}