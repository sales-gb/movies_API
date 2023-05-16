export default {
  movieTemplate: {
    name: 'Filme 1',
    price: 5,
    duration: 60,
  },
  movieComplete: {
    name: 'O Filme: Parte 1',
    description: 'Descrição sobre "O Filme: Parte 1"',
    price: 40,
    duration: 200,
  },
  moviePartial: {
    duration: 130,
    price: 200,
  },
  movieUnique: {
    name: 'Filme 1',
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
