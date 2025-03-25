export default async function addReservation(reservationItem: ReservationItem, token: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/coworkingspaces/${reservationItem.cwsID}/reservations`, {
        method: 'POST',
        headers: {
            "authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            rsvtDate: reservationItem.rsvtDate,
        })
    })

    const json = await response.json()

    if (!response.ok) throw new Error(json.message)

    return json
}