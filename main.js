const ticketList = document.getElementById('ticketList');
const errorNote = document.getElementById('error');

// 2. Fetch Tickets using Async/Await and handle Errors
// Async function to fetch customer and order data
async function displayCustomerOrders(userId) {
    try {
        const customerResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${userId}`);
        if (!customerResponse.ok) {
            throw new Error('Failed to fetch customer data');
        }
        const customer = await customerResponse.json();
        console.log('Customer:', customer);

        const ordersResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${userId}`);
        if (!ordersResponse.ok) {
            throw new Error('Failed to fetch orders');
        }
        const orders = await ordersResponse.json();
        console.log('Orders:', orders);

        orders[0].forEach(ticket => {
            // 3. display tickets dynamically
            const listItem = document.createElement('li');
            listItem.textContent = `
            Ticket Id: ${ticket.id}, Customer Name: ${ticket.userId}, Issue Description: ${ticket.title}, Details: ${ticket.body}
            `;
            ticketList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error:', error.message);
        const listError = document.createElement('p');
        listError.textContent = `Error: ${error.message}`;
        errorNote.appendChild(listError);
    }
}

// Fetch and display tickets
displayCustomerOrders(2);