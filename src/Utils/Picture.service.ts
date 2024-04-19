import { Injectable, inject } from "@angular/core";
import { Camera, CameraResultType, CameraSource, Photo } from "@capacitor/camera";
import { Capacitor } from "@capacitor/core";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { Platform } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class PictureService {

    private platform: Platform;
    private _platform = inject(Platform)
    

    public async addNewToGallery(): Promise<Result> {
        this.platform = this._platform;
        // Take a photo
        const capturedPhoto = await Camera.getPhoto({
          resultType: CameraResultType.Uri,
          source: CameraSource.Camera,
          quality: 100
        });
        
        return {url: capturedPhoto.webPath, saveFile: await this.savePicture(capturedPhoto)};
    }
    
    private async savePicture(photo: Photo) {
        const base64Data = await this.readAsBase64(photo);

        // Write the file to the data directory
        const fileName = Date.now() + '.jpeg';
        const savedFile = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: Directory.Data,
        });

        if (this.platform.is('hybrid')) {
            // Display the new image by rewriting the 'file://' path to HTTP
            // Details: https://ionicframework.com/docs/building/webview#file-protocol
            return {
            filepath: savedFile.uri,
            webviewPath: Capacitor.convertFileSrc(savedFile.uri),
            };
        } else {
            // Use webPath to display the new image instead of base64 since it's
            // already loaded into memory
            return {
            filepath: fileName,
            webviewPath: photo.webPath,
            };
        }
    }

    private async readAsBase64(photo: Photo) {
        if (this.platform.is('hybrid')) {
            const file = await Filesystem.readFile({
            path: photo.path!,
            });

            return file.data;
        } else {
            // Fetch the photo, read as a blob, then convert to base64 format
            const response = await fetch(photo.webPath!);
            const blob = await response.blob();

            return (await this.convertBlobToBase64(blob)) as string;
        }
    }

    private convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
        resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    });
}

export interface UserPhoto {
    filepath: string;
    webviewPath?: string;
}
interface Result {
    url: string;
    saveFile: UserPhoto;
}