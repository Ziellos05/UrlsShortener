// Ruta de la API del servidor que permite llamar a la API del Backend que permite loguear a un usuario
export async function POST(req: Request) {

  const request = await req.json();

  const user = {
    username: request.username,
    password: request.password
  }

  const response = await fetch(process.env.SPRINGBOOT_API+"/user", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      "Authorization": request.token
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(user), // body data type must match "Content-Type" header
  });

  return response;
}