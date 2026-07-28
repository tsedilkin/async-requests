const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');
xhr.send();

xhr.addEventListener('load', () => {
  if (xhr.status !== 200) {
    return;
  }

  const response = JSON.parse(xhr.responseText);
  const { title, answers } = response.data;

  pollTitle.textContent = title;

  answers.forEach((answer) => {
    const button = document.createElement('button');
    button.className = 'poll__answer';
    button.textContent = answer;

    button.addEventListener('click', () => {
      alert('Спасибо, ваш голос засчитан!');
    });

    pollAnswers.appendChild(button);
  });
});
