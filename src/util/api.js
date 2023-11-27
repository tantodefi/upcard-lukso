/**
 * Get Tour
 * @returns 
 */
export async function getTour() {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}tour`, requestOptions)
  if (!response.ok) throw new Response('Failed to get data', { status: 500 })
  return response.json()
}

/**
 * Login
 * @param {json} post 
 * @returns 
 */
export async function login(post) {
  var requestOptions = {
    method: 'POST',
    body: JSON.stringify(post),
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}login`, requestOptions)
  if (!response.ok) throw new Response('Failed to get data', { status: 500 })
  return response.json()
}

export async function getProfile() {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${getAccessToken()}`)

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  }
  const response = await fetch(`${import.meta.env.VITE_API_URL}profile/get`, requestOptions)
  if (!response.ok) throw new Response('Failed to get data', { status: 500 })
  return response.json()
}