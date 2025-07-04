
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
  cloud_name: process.env.CLAUDINARY_NAME,
  api_key: process.env.CLAUDINARY_KEY,
  api_secret: process.env.CLAUDINARY_SECRET,
});

export async function POST(request: NextRequest) {
  const data = await request.formData();

  let files: File[] | null  = []
  for (const /*pair*/  [key, value]  of data) {
    const file= data.get(key) as unknown as File;
    files.push( file )
  }

  if (!files) {
    return NextResponse.json({ success: false });
  }

  // const bytes = await file.arrayBuffer();
  // const buffer = Buffer.from(bytes);

  let bytes: ArrayBuffer[] | null= []
  for (const byte of files) {
    const byt = await byte.arrayBuffer()
    bytes.push(byt)
  }
  let buffers: Buffer[] | null = []
  for (const buffer of bytes) {
    const buff = Buffer.from(buffer)
    buffers.push(buff)
  }

  // console.log("bytes: ", bytes)

  // Con los datos del archivo en el buffer, puedes hacer lo que quieras con ellos.
  // Para esto, simplemente los escribiremos en el sistema de archivos en una nueva ubicación.
  // const filePath = `/tmp/${file.name}`

  const uploadPromises=  buffers.map( (buffer) => { 
    return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, (err, resul) => {
        if (err) {
          reject(err);
        }
        resolve(resul);
      })
      .end(buffer);
    })
  })
    
  const response: string/* unknown */ [] = []
  try {
    const results = await Promise.all(uploadPromises);

    results.map((result:any, idx) => {
    response[idx]= result?.secure_url
    })

    // console.log('response:', response);
  // console.log("results:", results )
  } catch (error) {
    console.error('Error al subir archivos:', error);
  }

  //guardar en base datos
  //procesar imagen

  return NextResponse.json({
    success: true,
    urls: response
  });
}
