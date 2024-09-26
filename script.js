document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const votingForm = document.getElementById('votingForm');
    const registerMessage = document.getElementById('registerMessage');
    const loginMessage = document.getElementById('loginMessage');
    const voteMessage = document.getElementById('voteMessage');
    const resultsDiv = document.getElementById('results');

    // Registration logic
    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const voterId = document.getElementById('voterId').value;
            const aadhaar = document.getElementById('aadhaar').value;
            const photoFront = document.getElementById('photoFront').files[0];
            const photoBack = document.getElementById('photoBack').files[0];

            if (photoFront && photoBack) {
                let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
                const userExists = users.some(user => user.voterId === voterId || user.aadhaar === aadhaar);

                if (!userExists) {
                    users.push({ voterId, aadhaar });
                    localStorage.setItem('users', JSON.stringify(users));
                    registerMessage.textContent = 'Registration successful! Please login.';
                    registerMessage.style.color = 'green';
                } else {
                    registerMessage.textContent = 'User already registered with this Voter ID or Aadhaar number.';
                    registerMessage.style.color = 'red';
                }
            } else {
                registerMessage.textContent = 'Please upload both front and back photos of your voter ID.';
                registerMessage.style.color = 'red';
            }
        });
    }

    // Login logic
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const voterId = document.getElementById('voterIdLogin').value;
            const aadhaar = document.getElementById('aadhaarLogin').value;
            let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
            const userExists = users.some(user => user.voterId === voterId && user.aadhaar === aadhaar);

            if (userExists) {
                loginMessage.textContent = 'Login successful!';
                loginMessage.style.color = 'green';
                setTimeout(() => {
                    window.location.href = 'vote.html';
                }, 1000);
            } else {
                loginMessage.textContent = 'Invalid Voter ID or Aadhaar number.';
                loginMessage.style.color = 'red';
            }
        });
    }

    // Voting logic
    if (votingForm) {
        votingForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const selectedCandidate = document.querySelector('input[name="candidate"]:checked');
            if (selectedCandidate) {
                let votes = localStorage.getItem('votes') ? JSON.parse(localStorage.getItem('votes')) : [];
                votes.push(selectedCandidate.value);
                localStorage.setItem('votes', JSON.stringify(votes));
                voteMessage.textContent = `You voted for ${selectedCandidate.value}. Thank you for voting!`;
                voteMessage.style.color = 'green';
                setTimeout(() => {
                    window.location.href = 'results.html';
                }, 1000);
            } else {
                voteMessage.textContent = 'Please select a candidate before voting.';
                voteMessage.style.color = 'red';
            }
        });
    }

    // Display results logic
    if (resultsDiv) {
        const results = {
            'Candidate 1 ': 0,
            'Candidate 2': 0,
            'Candidate 3': 0
        };

        const votes = JSON.parse(localStorage.getItem('votes')) || [];
        votes.forEach(vote => {
            if (results[vote]) {
                results[vote]++;
            }
        });

        for (const [candidate, count] of Object.entries(results)) {
            const resultItem = document.createElement('p');
            resultItem.textContent = `${candidate}: ${count} votes`;
            resultsDiv.appendChild(resultItem);
        }
    }
});
