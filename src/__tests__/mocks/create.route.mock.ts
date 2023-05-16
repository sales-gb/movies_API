export default {
  movieComplete: {
    description: 'Descrição sobre o filme 1',
    name: 'Filme 1',
    duration: 200,
    price: 40,
  },
  movieWithoutDescription: {
    name: 'Filme 1',
    duration: 200,
    price: 40,
  },
  movieUnique1: {
    name: 'Filme 2',
    duration: 140,
    price: 84,
  },
  movieUnique2: {
    name: 'Filme 2',
    duration: 140,
    price: 84,
  },
  movieInvalidBody: {
    name: 1234,
    duration: '12345',
  },
  movieInvalidBody2: {
    name: 'um nome com mais de cinquenta caracteres! 123456789',
    duration: -1,
    price: 1.5,
  },
};
