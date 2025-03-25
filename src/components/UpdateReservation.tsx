"use client";

import DateReserve from "./DateReserve";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import updateReservation from "@/libs/updateReservation";

export default function UpdateReservation() { 
    const urlParams = useSearchParams();
    const id = urlParams.get("id");
    const rsvtDate = urlParams.get("rsvtDate");

    if (!id) return null;

    const router = useRouter();
    const [reserveDate, setReserveDate] = useState<Dayjs>(dayjs(rsvtDate));
    const [reserveStatus, setReserveStatus] = useState<string | null>(null);
    const { data: session } = useSession();

    const handleClick = () => {
        if (!session) return;
        if (rsvtDate) {
            const reservationItem: any = {
                id: id,
                rsvtDate: reserveDate.toISOString(),
            };
            updateReservation(reservationItem, session.user.token)
                .then(() => {
                    setReserveStatus("Updated successfully");
                    router.push("/myreservation");
                    router.refresh();
                })
                .catch((err) => {
                    setReserveStatus(err.message);
                });
        } else {
            setReserveStatus("Please enter update reserve information");
        }
    };

    return (
        <div className="w-full max-w-md bg-white border border-pink-300 p-6 space-y-4 shadow-lg shadow-indigo-200 rounded-lg mx-auto">
            <div className="text-lg font-bold text-gray-700 text-center">Reservation Date</div>
            <div className="flex flex-col items-center space-y-2">
                <DateReserve onDateChange={(value: Dayjs) => setReserveDate(value.add(7, "hour"))} />
            </div>

            <button 
                className="w-full rounded-full bg-pink-400 hover:bg-pink-600 px-5 py-2 text-white shadow font-bold uppercase tracking-wide"
                onClick={handleClick}
            >
                Update
            </button>

            {reserveStatus && <div className="text-center text-sm text-gray-600">{reserveStatus}</div>}
        </div>
    );
}
