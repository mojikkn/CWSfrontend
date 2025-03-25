import CwsSelector from "@/components/CwsSelector";
import getCwSpaces from "@/libs/getCoworkingspaces";
import ReservationMenu from "@/components/ReservationMenu";

export default async function Reservation() {
  const cws = await getCwSpaces();

  return (
    <main className="max-w-5xl mx-auto mt-10 p-6">
      {/* หัวข้อ */}
      <h1 className="text-3xl font-bold text-center mb-8">Make a Reservation</h1>

      {/* Layout หลัก */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* เมนูด้านซ้าย */}
        <div className="md:col-span-1">
          <ReservationMenu />
        </div>

        {/* ส่วนเลือกสถานที่ (CwsSelector) */}
        <div className="md:col-span-2 flex flex-col items-center">
          <CwsSelector cws={cws} />
        </div>
      </div>
    </main>
  );
}
