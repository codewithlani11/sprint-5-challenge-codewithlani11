async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');
  
    async function sprintChallenge5() {
      const footer = document.querySelector('footer');
      const currentYear = new Date().getFullYear();
      footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;
  
      // Fetching data using Axios
      async function fetchData() {
        try {
          const learnersResponse = await axios.get('http://localhost:3003/api/learners');
          const mentorsResponse = await axios.get('http://localhost:3003/api/mentors');
  
          const learners = learnersResponse.data;
          const mentors = mentorsResponse.data;
  
          console.log('Learners Data: ', learners);
          console.log('Mentors Data: ', mentors);
  
          // Combine the data
          const combinedData = learners.map(learner => {
            const learnerMentors = learner.mentors.map(mentorId => {
              const mentor = mentors.find(mentor => mentor.id === mentorId);
              return mentor ? `${mentor.firstName} ${mentor.lastName}` : 'Unknown Mentor';
            });
  
            return {
              ...learner,
              mentors: learnerMentors
            };
          });
  
          console.log('Combined Data: ', combinedData);
          renderLearners(combinedData); // Pass combinedData to renderLearners
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      }
  
      function renderLearners(learners) {
        console.log('Rendering learners...', learners);
        const container = document.querySelector('.cards');
  
        if (!container) {
          console.error('Container element not found');
          return;
        }
  
        container.innerHTML = ''; // Clear any existing content
  
        learners.forEach(learner => {
          const card = createLearnerCard(learner);
          container.appendChild(card);
        });
      }
  
      function createLearnerCard(learner) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h2>${learner.fullName}</h2>
            <p>Email: ${learner.email}</p>
            <p>Mentors: ${learner.mentors.join(', ')}</p>
        `;
        return card;
      }
  
      // Call fetchData to initiate data fetching and rendering
      fetchData();
    }
  
    // Call the main function
    sprintChallenge5();
  });
  



  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
