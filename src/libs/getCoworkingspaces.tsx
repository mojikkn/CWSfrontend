export default async function getCwSpaces() {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/coworkingspaces`, {next:{tags:['cwSpaces']}});
    
    if (!response.ok) {
        throw new Error('Failed to fetch coworking spaces');
    }

    return await response.json();
}