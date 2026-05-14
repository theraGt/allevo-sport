import bcrypt from 'bcryptjs';

const hashPassword = async () => {
  const password = 'admin123';
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  console.log('Hash generated:', hash);
  console.log('');
  console.log('SQL to run:');
  console.log(`UPDATE usuarios SET password_hash = '${hash}' WHERE email = 'admin@allevo.com';`);
};

hashPassword();