document.getElementById('emailForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const emailInput = document.getElementById('email');
    const messageDiv = document.getElementById('message');
    const email = emailInput.value.trim();
    
    try {
        const response = await fetch('http://localhost:5000/api/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
            messageDiv.textContent = data.message;
            messageDiv.className = 'success';
            emailInput.value = '';
        } else {
            messageDiv.textContent = data.message;
            messageDiv.className = 'error';
        }
    } catch (error) {
        messageDiv.textContent = 'An error occurred. Please try again later.';
        messageDiv.className = 'error';
    }
}); 