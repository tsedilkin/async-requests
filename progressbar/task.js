const progress = document.getElementById('progress');
const form = document.getElementById('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const xhr = new XMLHttpRequest();

  xhr.open('POST', form.action);

  xhr.upload.addEventListener('progress', (event) => {
    if (event.lengthComputable) {
      progress.value = event.loaded / event.total;
    }
  });

  xhr.send(formData);
});
