function delete_account(id) {
    const data = { id };
    if (confirm("Are you sure you want to delete this account?")) {
        fetch('/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(data.error || 'Error occurred while deleting the account');
                    });
                }
                return response.json();
            })
            .then(data => {
                alert(data.message);
                location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error: ' + error.message);
            });
    }
}
