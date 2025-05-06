// Function to handle form submission
async function handleFormSubmit(formId) {
    const form = document.getElementById(formId);
    const emailInput = form.querySelector('input[type="email"]');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    try {
        // Disable the form while submitting
        emailInput.disabled = true;
        submitButton.disabled = true;
        submitButton.innerHTML = 'Subscribing...';
        
        const response = await fetch('/api/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: emailInput.value.trim() }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Success feedback
            submitButton.style.backgroundColor = '#4CAF50';
            submitButton.innerHTML = 'Subscribed ✓';
            emailInput.value = '';
            
            // Reset button after 2 seconds
            setTimeout(() => {
                submitButton.style.backgroundColor = '';
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
                emailInput.disabled = false;
            }, 2000);
        } else {
            // Error feedback
            throw new Error(data.message);
        }
    } catch (error) {
        // Error handling
        submitButton.style.backgroundColor = '#f44336';
        submitButton.innerHTML = error.message || 'Error! Try again';
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.style.backgroundColor = '';
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
            emailInput.disabled = false;
        }, 3000);
    }
}

// Add event listeners to both forms
document.getElementById('emailForm').addEventListener('submit', (e) => {
    e.preventDefault();
    handleFormSubmit('emailForm');
});

document.getElementById('headerEmailForm').addEventListener('submit', (e) => {
    e.preventDefault();
    handleFormSubmit('headerEmailForm');
}); 