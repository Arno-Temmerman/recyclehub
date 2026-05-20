import CustomersRepository from './customers_client.js';

const repository = new CustomersRepository();

let currentCustomer = null;

init();

async function init() {

  const customerId = getCustomerIdFromUrl();

  if (!customerId) {
    alert('Geen klant-id gevonden');
    return;
  }

  try {

    currentCustomer = await repository.getCustomerById(customerId);

    fillForm(currentCustomer);

    setupSaveButton();
    setupDeleteButton();

  } catch (error) {

    alert(error.message);

  }
}

function getCustomerIdFromUrl() {

  const params =
    new URLSearchParams(window.location.search);

  return params.get('id');
}

function fillForm(customer) {
  document.getElementById('id').value =
    customer.id;

  document.getElementById('firstName').value =
    customer.firstName;

  document.getElementById('lastName').value =
    customer.lastName;

  document.getElementById('email').value =
    customer.email;

  document.getElementById('phone').value =
    customer.phone;

  document.getElementById('street').value =
    customer.address.street;

  document.getElementById('postalCode').value =
    customer.address.postalCode;

  document.getElementById('city').value =
    customer.address.city;

  document.getElementById('balance').value =
    customer.balance;
}

function setupSaveButton() {

  const form =
    document.getElementById('customer-form');

  form.addEventListener('submit', async (e) => {

    e.preventDefault();

    try {

      const updatedCustomer = {

        id: currentCustomer.id,
        firstName: currentCustomer.firstName,
        lastName: currentCustomer.lastName,
        email: currentCustomer.email,
        phone: currentCustomer.phone,
        balance: currentCustomer.balance,
        bins: currentCustomer.bins,
        createdAt: currentCustomer.createdAt,

        address: {
          street:
            document.getElementById('street').value,

          postalCode:
            document.getElementById('postalCode').value,

          city:
            document.getElementById('city').value
        }
      };

      await repository.updateCustomer(updatedCustomer);

      alert('Klant succesvol bijgewerkt.\n(Merk op dat de klant ongewijzigd zal blijven in het overzicht, aangezien we werken met een mock API.)');

      window.location.href = 'customers.html';

    } catch (error) {

      alert(error.message);

    }
  });
}

function setupDeleteButton() {

  const deleteButton =
    document.getElementById('deleteBtn');

  deleteButton.addEventListener('click', async () => {

    const confirmed =
      confirm('Ben je zeker dat je deze klant wil verwijderen?');

    if (!confirmed) return;

    try {

      await repository.deleteCustomer(currentCustomer.id);

      alert('Klant verwijderd.\n(Merk op dat de klant nog aanwezig zal zijn in het overzicht, aangezien we werken met een mock API.)');

      window.location.href = 'customers.html';

    } catch (error) {

      alert(error.message);

    }
  });
}