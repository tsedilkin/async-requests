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
  const pollId = response.id;
  const { title, answers } = response.data;

  pollTitle.textContent = title;

  answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.className = 'poll__answer';
    button.textContent = answer;

    button.addEventListener('click', () => {
      alert('Спасибо, ваш голос засчитан!');

      const voteXhr = new XMLHttpRequest();
      voteXhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
      voteXhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      voteXhr.send(`vote=${pollId}&answer=${index}`);

      voteXhr.addEventListener('load', () => {
        if (voteXhr.status !== 200 && voteXhr.status !== 201) {
          return;
        }

        const voteResponse = JSON.parse(voteXhr.responseText);
        const totalVotes = voteResponse.stat.reduce((sum, item) => sum + item.votes, 0);

        pollAnswers.innerHTML = '';

        voteResponse.stat.forEach((item) => {
          const percent = totalVotes
            ? ((item.votes / totalVotes) * 100).toFixed(2)
            : '0.00';
          const result = document.createElement('div');
          result.className = 'poll__result';
          result.textContent = `${item.answer}: ${percent}%`;
          pollAnswers.appendChild(result);
        });
      });
    });

    pollAnswers.appendChild(button);
  });
});
