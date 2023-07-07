// Ruta de la API del servidor que permite llamar a la API del Backend para obtener todas las URLs generadas por el usuario
export async function POST(req: Request) {
  const request = await req.json();

  const response = await fetch(process.env.SPRINGBOOT_API+"/urls", {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      "Authorization": request
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
  });

  return response;
}