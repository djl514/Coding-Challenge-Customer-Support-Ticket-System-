const ticketList = document.getElementById('ticketList');
const errorNote = document.getElementById('error');


// 2. Fetch Tickets using Async/Await and handle Errors
// Async function to fetch customer and order data
async function displayCustomerOrders(tickets) {
    try {
        const customerResponse = await fetch(`https://jsonplaceholder.typicode.com/posts`);
        if (!customerResponse.ok) {
            throw new Error('Failed to fetch customer data');
        }
        const customer = await customerResponse.json();
        console.log('Customer:', customer);

        const ordersResponse = await fetch(`https://jsonplaceholder.typicode.com/posts`);
        if (!ordersResponse.ok) {
            throw new Error('Failed to fetch orders');
        }
        const orders = await ordersResponse.json();
        console.log('Orders:', orders);

        orders.forEach(ticket => {
            // 3. display tickets dynamically
            const listItem = document.createElement('div');
            listItem.innerHTML = 
            `
            <ul><b>Ticket Id:</b> ${ticket.id}
            <br><b>Name:</b> ${ticket.userId}
            <br><b>Description:</b> ${ticket.title}
            <br><b>Details:</b> ${ticket.body}
            <hr width="50%">

            </ul>
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
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(tickets => {
        displayCustomerOrders(tickets);
    })
    .finally(()=> {
        console.log('Complete!');
    })
