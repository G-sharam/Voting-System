document.getElementById('votingForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const selectedCandidate = document.querySelector('input[name="candidate"]:checked');
    if (selectedCandidate) {
        const voterId = '1234567890'; // Replace with actual voter ID from your form
        const aadhaar = '9876543210'; // Replace with actual Aadhaar number from your form
        const party = selectedCandidate.value;

        try {
            const response = await fetch('/api/storeData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ voterId, aadhaar, party })
            });
            
            if (response.ok) {
                const { fileName } = await response.json();
                document.getElementById('voteMessage').textContent = `Vote recorded successfully. Excel file: ${fileName}`;
                document.getElementById('voteMessage').style.color = 'green';
            } else {
                document.getElementById('voteMessage').textContent = 'Failed to record vote.';
                document.getElementById('voteMessage').style.color = 'red';
            }
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('voteMessage').textContent = 'Error recording vote.';
            document.getElementById('voteMessage').style.color = 'red';
        }
    } else {
        document.getElementById('voteMessage').textContent = 'Please select a candidate before voting.';
        document.getElementById('voteMessage').style.color = 'red';
    }
});
