import { useEffect } from "react";
import { supabase } from "~/utils/supabase";
import { useRoster } from "~/contexts/RosterContext";

export default function useRealtimeSubscription() {
    const { triggerRosterUpdate } = useRoster();

    useEffect(() => {
        const subscription = supabase
            .channel("members_changes")
            .on("postgres_changes", {
                event: "*",
                schema: "public",
                table: "members",
            }, (payload) => {
                console.log("Change received!", payload);
                triggerRosterUpdate();
            })
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, [triggerRosterUpdate]);
}
