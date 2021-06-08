import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  subirArchivo( archivo: any, carpeta: string ) {

    return new Promise( (resolve, reject ) => {

      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append( 'file', archivo, archivo.name );
      formData.append( 'folder', carpeta );

      xhr.onreadystatechange = function() {

        if ( xhr.readyState === 4 ) {

          if ( xhr.status === 200 ) {
            //console.log( 'Imagen subida' );
            resolve( JSON.parse( xhr.response ) );
          } else {
            //console.log( 'Fallo la subida' );
            reject( xhr.response );
          }

        }
      };

      let url = 'https://api.cloudinary.com/v1_1/dksstmpfu/image/upload?upload_preset=fxfc1clo';

      xhr.open('POST', url, true );
      xhr.send( formData );

    });
  }

}