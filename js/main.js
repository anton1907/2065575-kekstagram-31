const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
];
const NAMES = [
  'Александр',
  'Виктория',
  'Дмитрий',
  'Ульяна',
  'Владимир',
  'Яна',
  'Григорий',
  'Зоя',
];
const DESCIPTION = [
  'Прекрасный день для прогулки!',
  'Взгляни на эту красоту природы!',
  'Очаровательный закат',
  'Это место - настоящий рай на земле!',
  'Какая атмосфера!',
  'Подарок для глаз и души!',
  'Как прекрасен этот мир!',
  'Моменты счастья на каждом шагу.',
  'Подарок от природы.',
  'Это место наполнено энергией и покоем.',
  'Как же здесь красиво!',
  'Давайте насладимся этой красотой вместе!',
  'Великолепная атмосфера для творчества.',
  'Этот вид заставляет забыть обо всём на свете.',
];

//Генерация чисел
const SIMILAR_WIZARD_COUNT = 25;

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

//Генерация разных чисел
function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const generatePhoto = createRandomIdFromRangeGenerator(1, 25);

//функцию-генератор для получения уникальных идентификаторов
function createIdGenerator () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

const generateId = createIdGenerator();

//Генерация списока комментариев
const commentListGeneration = function () {
  const comments = [];
  for (let i = 1; i <= getRandomInteger(1, 30); i++) {
    const id = i;
    const avatar = `img/avatar-${getRandomInteger(1, 6)}.svg`;
    const name = getRandomArrayElement(NAMES);
    const message = getRandomArrayElement(MESSAGE);
    comments.push({
      id,
      avatar,
      message,
      name
    });
  }
  return comments;
};

//Объект
const createWizard = () => ({
  id: generateId(),
  url: `photos/${generatePhoto()}.jpg`,
  description: getRandomArrayElement(DESCIPTION),
  likes: getRandomInteger(15, 200),
  comments: commentListGeneration(),
});

const similarWizards = Array.from({length: SIMILAR_WIZARD_COUNT}, createWizard);
console.log(similarWizards);
