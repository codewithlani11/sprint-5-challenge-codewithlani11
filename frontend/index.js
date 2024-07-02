async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  async function fetchData() {
    try {
      const learnersResponse = await axios.get('http://localhost:3003/api/learners');
      const mentorsResponse = await axios.get('http://localhost:3003/api/mentors');
      return {
        learners: learnersResponse.data,
        mentors: mentorsResponse.data,
      };
    } catch (error) {
      console.error('Error fetching data', error);
    }
  }
  
  function combineData(learners, mentors) {
    return learners.map(learner => {
      return {
        ...learner,
        mentors: learner.mentors.map(mentorId => {
          const mentor = mentors.find(m => m.id === mentorId);
          return mentor ? mentor.name : 'Unknown';
        }),
      };
    });
  }
  
  function createLearnerCard(learner) {
    const card = document.createElement('div');
    card.className = 'learner-card';
  
    const learnerInfo = `
      <h2>${learner.fullName}</h2>
      <p>Email: ${learner.email}</p>
      <button class="toggle-mentors">Show Mentors</button>
      <ul class="mentor-list" style="display: none;">
        ${learner.mentors.map(mentor => `<li>${mentor}</li>`).join('')}
      </ul>
    `;
  
    card.innerHTML = learnerInfo;
  
    card.querySelector('.toggle-mentors').addEventListener('click', () => {
      const mentorList = card.querySelector('.mentor-list');
      mentorList.style.display = mentorList.style.display === 'none' ? 'block' : 'none';
    });
  
    return card;
  }
  
  function renderLearners(learners) {
    const container = document.getElementById('learners-container');
    learners.forEach(learner => {
      const card = createLearnerCard(learner);
      container.appendChild(card);
    });
  }
  
  document.addEventListener('DOMContentLoaded', async () => {
    const data = await fetchData();
    const combinedData = combineData(data.learners, data.mentors);
    renderLearners(combinedData);
  
    const learnerCards = document.querySelectorAll('.learner-card');
    learnerCards.forEach(card => {
      card.addEventListener('click', () => {
        learnerCards.forEach(c => c.classList.remove('highlighted'));
        card.classList.add('highlighted');
      });
    });
  });
  


  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
