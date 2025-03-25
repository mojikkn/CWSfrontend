import CwsCatalog from "@/components/CWSCatalog"
import getCwSpaces from "@/libs/getCoworkingspaces"
import { Suspense } from "react"
import { CircularProgress } from "@mui/material"

export default async function CoworkingSpaces() {
    const cwSpaces = await getCwSpaces()

    return (
        <main className="text-center p-5">
            <div className="text-3xl font-bold mt-5">Explore Our Co-working Spaces</div>
            <Suspense fallback={
                <div className="flex flex-col items-center justify-center mt-[15%]">
                    <CircularProgress className="mb-2" />
                    <p>Loading...</p>
                </div>}>
                <CwsCatalog cwsJson={cwSpaces} />
            </Suspense>
        </main>
    )
}
