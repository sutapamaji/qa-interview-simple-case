import Chance from 'chance';

const chance = new Chance();

export async function signup() {
  // Generate random first and last name 
  const firstName = chance.first();
  const lastName = chance.last();

  // Generate other static details for the new user
  const newUser = {
    firstName: firstName,
    lastName: lastName,
    email: `test_${firstName.toLowerCase()}_${lastName.toLowerCase()}@mail.com`,
    password: 'password123!'
  };

  // Return the new user object
  return newUser;
}
