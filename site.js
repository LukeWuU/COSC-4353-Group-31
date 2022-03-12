const uri = 'api/UserItems';
let clients = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to display user(s).', error));
}

function addItem() {
    const addNameTextbox = document.getElementById('add-name');
    //const addAddressTextbox = document.getElementById('add-address');

    const item = {
        isComplete: false,
        name: addNameTextbox.value.trim(),
        //address: addAddressTextbox.value.trim()
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addNameTextbox.value = '';
            addAddressTextbox.value = '';;
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    const item = clients.find(item => item.id === id);

    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-username').value = item.username;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-address').value = item.address;
    document.getElementById('edit-city').value = item.city;
    document.getElementById('edit-state').value = item.state;
    document.getElementById('edit-zip').value = item.zipcode;
    document.getElementById('edit-isComplete').checked = item.isComplete;
    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        isComplete: document.getElementById('edit-isComplete').checked,
        name: document.getElementById('edit-name').value.trim(),
        username: document.getElementById('edit-username').value.trim(),
        address: document.getElementById('edit-address').value.trim(),
        city: document.getElementById('edit-city').value.trim(),
        state: document.getElementById('edit-state').value.trim(),
        zip: document.getElementById('edit-zip').value.trim()
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'client displayed' : 'clients displayed';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
    const tBody = document.getElementById('clients');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        let isCompleteCheckbox = document.createElement('input');
        isCompleteCheckbox.type = 'checkbox';
        isCompleteCheckbox.disabled = false;
        isCompleteCheckbox.checked = item.isComplete;

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        td1.appendChild(isCompleteCheckbox);

        let td2 = tr.insertCell(1);
        let textNode = document.createTextNode(item.name);
        td2.appendChild(textNode);

        let td3 = tr.insertCell(2);
        td3.appendChild(editButton);        

        let td4 = tr.insertCell(3);
        td4.appendChild(deleteButton);
    });

    clients = data;
}