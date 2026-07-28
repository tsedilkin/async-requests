const progress = document.getElementById('progress');
const form = document.getElementById('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  progress.value = 0;

  const formData = new FormData(form);
  const xhr = new XMLHttpRequest();

  xhr.open('POST', form.action);

  xhr.upload.addEventListener('progress', (event) => {
    if (event.lengthComputable) {
      progress.value = event.loaded / event.total;
    }
  });

  xhr.addEventListener('load', () => {
    if (xhr.status !== 200 && xhr.status !== 201) {
      return;
    }

    progress.value = 1;

    // Даём браузеру отрисовать заполненный прогресс до блокирующего alert
    setTimeout(() => {
      alert('Загрузка успешно завершена!');
    }, 100);
  });

  xhr.send(formData);
});
