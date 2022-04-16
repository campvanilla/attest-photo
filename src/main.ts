import './style.css';

const imageUploadForm = document.getElementById('image-upload-form');

imageUploadForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (event.target) {
    const data = new FormData(event.target as HTMLFormElement);
    console.log(data);
  }
});
