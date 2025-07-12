const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../db.json');

const init = () => {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { users: [] };
  }
};

const findOne = async ({ email }) => {
  const data = init();
  const user = data.users.find(u => u.email === email);
  if (!user) return null;

  return {
    ...user,
    _id: user.id
  };
};

module.exports = {
  findOne
};