import bcrypt from 'bcryptjs';

const fixPassword = async () => {
  const password = 'admin123';
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  console.log('Nuevo hash generado:', hash);
  console.log('');
  console.log('Ejecuta este SQL en tu base de datos:');
  console.log(`UPDATE usuarios SET password_hash = '${hash}' WHERE email = 'admin@allevo.com';`);
};

fixPassword();