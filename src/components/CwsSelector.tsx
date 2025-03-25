'use client'

import { Select, MenuItem } from "@mui/material";
import DateReserve from "./DateReserve";
import { Dayjs } from "dayjs"
import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import addReservation from "@/libs/addReservation"
import { useSession } from "next-auth/react";

export default function CwsSelector({cws} : {cws: Coworkingspaces}) {

    const urlParams = useSearchParams()
    const id = urlParams.get('id')

    const router = useRouter()

    const [cwSpace, setCwSpace] = useState<string|null>(id)
    const [rsvtDate, setRsvtDate] = useState<Dayjs|null>(null)
    const [reserveStatus, setReserveStatus] = useState<string|null>(null)

    const {data: session} = useSession()

    const handleClick = () => {
        if (!session) return

        if (cwSpace && rsvtDate) {
            const reservationItem: ReservationItem = {
                userName: session.user.name,
                cwsID: cwSpace,
                rsvtDate: rsvtDate.toISOString(),
            }

            addReservation(reservationItem, session.user.token)
                .then(() => {
                    setReserveStatus('Reserved successfully')
                    router.push('/myreservation')
                    router.refresh()
                })
                .catch(err => {
                    setReserveStatus(err.message)
                })

        } else {
            setReserveStatus('Please enter reserve informations')
        }
    }

    return (
        <div className="bg-pink-100 shadow-lg shadow-pink-200 rounded-lg flex flex-col justify-center items-center p-6 w-[300px] sm:w-[400px] lg:w-[600px] space-y-5">
            <table className="table-fixed text-left border-separate border-spacing-2 w-full">
                <tbody>
                    <tr>
                        <th className="w-[90px] sm:w-[110px] lg:w-[160px]">
                            <div className="text-sm font-semibold sm:text-base sm:font-bold">
                                Co-working Space
                            </div>
                        </th>
                        <th>
                        <Select variant="outlined" name="cws" id="cws" defaultValue={id}
                            className="bg-white w-[100%] rounded-md border border-pink-300 focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-transparent box-border"
                            onChange={(e) => { setCwSpace(e.target.value) }}>

                            {cws.data.map((cwsItem) => (
                                <MenuItem key={cwsItem._id} value={cwsItem._id}>
                                    {cwsItem.name}
                                </MenuItem>
                            ))}
                            
                        </Select>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <div className="text-sm font-semibold sm:text-base sm:font-bold">
                                Reservation Date
                            </div>
                        </th>
                        <th>
                            <DateReserve onDateChange={(value: Dayjs) => { setRsvtDate(value.add(7, 'hour')) }} />
                        </th>
                    </tr>
                </tbody>
            </table>
            <button className="rounded-xl bg-pink-500 hover:bg-pink-700 px-6 py-2 text-white shadow-sm" onClick={handleClick}>
                Reserve
            </button>

            {
                reserveStatus? <div className="text-center"> {reserveStatus} </div> : null
            }
        </div>
    )
}