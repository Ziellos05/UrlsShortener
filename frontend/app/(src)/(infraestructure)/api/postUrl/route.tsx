// Ruta de la API del servidor que permite llamar a la API del Backend para crear una nueva URL
export async function POST(req: Request) {
  const request = await req.json();

  const data = {
    original: request.original,
    shortened: request.shortened
  }

  const response = await fetch(process.env.SPRINGBOOT_API+"/createshortened", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {  
      "Content-Type": "application/json",
      "Authorization": request.token
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });  

  return response;
}