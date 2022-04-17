/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import './style.css';

const imageUploadForm = document.getElementById('image-upload-form');
const workspaceCanvas = document.getElementById('workspace-canvas') as HTMLCanvasElement;

function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = function () {
      if (fileReader.result) {
        const blob = new Blob([fileReader.result]);

        const base64EncodedImage = URL.createObjectURL(blob);

        resolve(base64EncodedImage);
      } else {
        reject();
      }
    };

    fileReader.readAsArrayBuffer(file);
  });
}

type FormValues = {
  image: File;
  attestationText: string;
};

async function loadCanvas(data: FormValues) {
  const fileToUpload = data.image;

  const base64File = await readFile(fileToUpload);

  if (workspaceCanvas.getContext) {
    const canvasContext = workspaceCanvas.getContext('2d');
    const imageToAttest = new Image();
    imageToAttest.src = base64File;

    imageToAttest.onload = function () {
      if (canvasContext) {
        workspaceCanvas.width = imageToAttest.width;
        workspaceCanvas.height = imageToAttest.height;
        canvasContext.drawImage(imageToAttest, 0, 0);
      }
    };
  }
}

imageUploadForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (event.target) {
    const formData = new FormData(event.target as HTMLFormElement);

    const formValues: FormValues = {
      image: formData.get('image') as File,
      attestationText: formData.get('attestation-text') as string,
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    loadCanvas(formValues);
  }
});
