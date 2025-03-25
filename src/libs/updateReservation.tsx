export default async function updateReservation(reservationItem: any, token: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/reservations/${reservationItem.id}`, {
        method: 'PUT',
        headers: {
            "authorization": `Bearer ${token}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            rsvtDate: reservationItem.rsvtDate,
        })
    })

    const json = await response.json()

    if (!response.ok) throw new Error(json.message)

    return json
}