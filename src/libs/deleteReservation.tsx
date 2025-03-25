export default async function deleteReservation(id: string, token: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/reservations/${id}`, {
        method: 'DELETE',
        headers: {
            "authorization": `Bearer ${token}`
        }
    })

    if (!response.ok) throw new Error("Cannot delete reservation")

    return await response.json();
}