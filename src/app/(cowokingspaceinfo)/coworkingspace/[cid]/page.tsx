import Image from "next/image";
import getCwSpace from "@/libs/getCoworkingspace";
import Link from "next/link";
import { getServerSession } from "next-auth";
import authOptions from "@/libs/auth/authOptions";

export default async function CwsDetailPage({ params }: { params: { cid: string } }) {
  const cwsDetail = await getCwSpace(params.cid);
  const session = await getServerSession(authOptions);

  return (
    <main className="p-6 max-w-5xl mx-auto">
      {/* ชื่อสถานที่ */}
      <h1 className="text-3xl font-bold text-center mt-5 mb-6">{cwsDetail.data.name}</h1>

      {/* Layout หลัก: รูปอยู่ซ้าย ข้อมูลอยู่ขวา */}
      <div className="flex flex-col md:flex-row items-center md:items-start">
        {/* รูปภาพ */}
        <Image
          src={cwsDetail.data.picture}
          alt="Cws Image"
          width={500}
          height={300}
          sizes="100vw"
          className="rounded-lg w-full md:w-1/2 h-auto mb-6 md:mb-0"
        />

        {/* ข้อมูลทางขวา */}
        <div className="md:ml-8 flex flex-col space-y-4 text-left">
          <h2 className="text-xl font-semibold">Details</h2>
          <table className="text-md">
            <tbody>
              <tr className="h-6">
                <td className="pr-5 font-medium">Address:</td>
                <td>{cwsDetail.data.address}, {cwsDetail.data.district}, {cwsDetail.data.province}</td>
              </tr>
              <tr className="h-8">
                <td className="pr-5 font-medium">Tel:</td>
                <td>{cwsDetail.data.tel}</td>
              </tr>
              <tr className="h-8">
                <td className="pr-5 font-medium">Opening Time:</td>
                <td>{cwsDetail.data.openTime}</td>
              </tr>
              <tr className="h-8">
                <td className="pr-5 font-medium">Closing Time:</td>
                <td>{cwsDetail.data.closeTime}</td>
              </tr>
            </tbody>
          </table>

          {/* ปุ่มจองพื้นที่ */}
          <Link href={`/reservation?id=${cwsDetail.data._id}`}>
            <button className="bg-pink-500 hover:bg-pink-700 text-white font-medium py-3 px-6 rounded-full mt-4 md:mt-6 w-full md:w-auto">
              Make Reservation
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
