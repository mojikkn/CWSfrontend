export default async function userRegister(user: User) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: user.name,
            tel: user.tel,
            email: user.email,
            role: user.role,
            password: user.password
        }) 
    })

    if (!response.ok) throw new Error('Cannot register new user')

    return await response.json()
}