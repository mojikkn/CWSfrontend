"use client";

import deleteReservation from "@/libs/deleteReservation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dayjs from "dayjs";

export default function MyReservation({ reservations, user }: { reservations: Reservations, user: UserSession }) {
  const router = useRouter();

  return (
    <div className="max-w-2xl mx-auto p-6">
      {reservations.data.length !== 0 ? (
        reservations.data.map((item: Reservation) => (
          <div key={item._id} className="bg-white border border-sky-900 shadow-lg rounded-xl p-6 mb-6">
            {/* ชื่อ Co-working Space */}
            <div className="text-xl font-bold text-black mb-1">{item.coworkingspace.name}</div>

            {/* แสดง User ID (เฉพาะ Admin) */}
            {user.role === "admin" && (
              <div className="text-sm text-slate-700 mb-2">User ID: {item.user}</div>
            )}

            {/* เวลาการจอง */}
            <div className="text-sm text-gray-700 mb-4">
              Reservation Date: {dayjs(item.rsvtDate).subtract(7, "hour").format("DD/MM/YYYY HH:mm")}
            </div>

            {/* ปุ่ม Update & Delete */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <Link
                href={`/update?id=${item._id}&rsvtDate=${item.rsvtDate}`}
                className="text-sm text-white bg-cyan-600 py-2 px-4 rounded-lg w-full sm:w-auto text-center hover:bg-cyan-700"
              >
                Update Reservation
              </Link>

              <button
                className="text-sm text-white bg-red-500 py-2 px-4 rounded-lg w-full sm:w-auto hover:bg-red-700"
                onClick={() => deleteReservation(item._id, user.token).then(() => router.refresh())}
              >
                Remove Reservation
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-lg md:text-xl lg:text-2xl font-bold mt-20 mx-12">
          You don't have any reservations
        </div>
      )}
    </div>
  );
}
