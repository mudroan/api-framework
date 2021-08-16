import { assert } from 'chai';
import CoreApi from '../src/http/CoreApi';
import { allure } from 'allure-mocha/runtime';

const getRandomInt = (max: number) => Math.floor(Math.random() * max) + 1;

describe('Задание 1', async () => {

    it('Поиск случайного кота + удаление + проверка', async () => {


    //Определен рандомный ID
    const AllCats = await CoreApi.getAllCats();
    const random_groups_number = getRandomInt(AllCats.data.groups.length);
    const random_cats_number = getRandomInt(AllCats.data.groups[random_groups_number].cats.length);
    random_id = AllCats.data.groups[random_groups_number].cats[random_cats_number].id;
    console.log(`Случайный ID: ${random_id}`);

//Получен случайный кот по рандомному id
const responseRandomCat_1 = await CoreApi.getCatById(random_id);
console.log(`Получен кот с случайным ID: ${responseRandomCat_1.data.cat.name}`);

//01
allure.logStep(`выполнен запрос GET /get-by-id c параметром ${random_id}`);
allure.testAttachment(
  'testAttachment',
  JSON.stringify(responseRandomCat_1.data, null, 2),
  'application/json'
);

//Статус-код
assert.equal(responseRandomCat_1.status, 200, 'Статус не соответствует');
});

it('Удалить кота', async () => {

  const responseDeleteCat = await CoreApi.removeCat(random_id);
  console.log(`Удален случайный кот (из п.1) с ID ${random_id}`);

  //02
  allure.logStep(`выполнен запрос DELETE /cats/{catId}/remove c параметром ${random_id}`);
  allure.testAttachment(
    'testAttachment',
    JSON.stringify(responseDeleteCat.data, null, 2),
    'application/json'
  );

  //Статус-код
  assert.equal(responseDeleteCat.status, 200, 'Статус не соответствует');
});

it('Кот не существует', async () => {

  const responseRandomCat_2 = await CoreApi.getCatById(random_id);

  //03
  allure.logStep(`выполнен запрос GET /get-by-id c параметром ${random_id}`);
  allure.testAttachment(
    'testAttachment',
    JSON.stringify(responseRandomCat_2.data, null, 2),
    'application/json'
  );

  //Статус-код
  assert.equal(responseRandomCat_2.status, 404, 'Статус не соответствует');
  console.log('Случайный кот не найден');
});


});

