import { supabase } from "~/utils/supabase";
import { Database } from "~/database.types";
import { observable } from "@legendapp/state";
import { Member } from "~/components/MemberListItem";

export const members$ = observable<Record<string, Member>>({});

export const fetchInitialMembers = async () => {
    console.log("Fetching initial members");
    const { data, error } = await supabase
        .from("members")
        .select("*")
        .order("wc_sen_roster");

    if (error) {
        console.error("Error fetching members:", error);
        return;
    }

    if (Array.isArray(data) && data.length > 0) {
        const membersRecord: Record<string, Member> = {};
        data.forEach((member, index) => {
            if (member && member.pin_number) {
                membersRecord[member.pin_number] = member;
            } else {
                console.warn(`Invalid member at index ${index}:`, member);
            }
        });

        members$.set(membersRecord);
    } else {
        members$.set({});
    }
};

export const setupRealtimeSubscription = () => {
    console.log("Setting up realtime subscription");
    const channel = supabase
        .channel("members_changes")
        .on("postgres_changes", {
            event: "*",
            schema: "public",
            table: "members",
        }, (payload) => {
            console.log("Change received!", payload);
            if (
                payload.eventType === "INSERT" || payload.eventType === "UPDATE"
            ) {
                if (payload.new && payload.new.id) {
                    console.log("Updating member:", payload.new);
                    members$.set({ [payload.new.id]: payload.new as Member });
                }
            } else if (payload.eventType === "DELETE") {
                if (payload.old && payload.old.id) {
                    console.log("Deleting member:", payload.old.id);
                    members$.set(
                        Object.fromEntries(
                            Object.entries(members$.get()).filter(([key]) =>
                                key !== payload.old.id
                            ),
                        ),
                    );
                }
            }
            // Log the current state after each change
            console.log("Current state after change:", members$.get());
        })
        .subscribe();

    return () => {
        console.log("Unsubscribing from realtime updates");
        supabase.removeChannel(channel);
    };
};
