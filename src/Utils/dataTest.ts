import { listDebt } from 'src/Models/listDebtsModel';
import { Product } from 'src/Models/productModel';

export class datos_de_prueba {
  public static listPrueba: listDebt[] = [
    {
      _id: '1',
      Name: 'Juan García',
      Phone: '123456789',
      Debt: 500,
      Date: new Date('2023-01-15'),
      Detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod lacus sit amet neque mattis, nec aliquet odio tempor. Proin laoreet, ligula nec tincidunt consequat, sem enim mattis dui, eget ultricies metus magna nec ipsum. Duis vitae vestibulum nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam varius felis eu ipsum convallis, nec fermentum libero vehicula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum maximus sem quis efficitur pulvinar. Duis ut posuere orci. Morbi id aliquet quam.'
    },
    {
      _id: '2',
      Name: 'María Rodríguez',
      Phone: '987654321',
      Debt: 750,
      Date: new Date('2023-02-20'),
      Detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod lacus sit amet neque mattis, nec aliquet odio tempor. Proin laoreet, ligula nec tincidunt consequat, sem enim mattis dui, eget ultricies metus magna nec ipsum. Duis vitae vestibulum nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam varius felis eu ipsum convallis, nec fermentum libero vehicula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum maximus sem quis efficitur pulvinar. Duis ut posuere orci. Morbi id aliquet quam.'
    },
    {
      _id: '3',
      Name: 'Carlos Martínez',
      Phone: '456789123',
      Debt: 300,
      Date: new Date('2023-03-10'),
      Detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod lacus sit amet neque mattis, nec aliquet odio tempor. Proin laoreet, ligula nec tincidunt consequat, sem enim mattis dui, eget ultricies metus magna nec ipsum. Duis vitae vestibulum nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam varius felis eu ipsum convallis, nec fermentum libero vehicula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum maximus sem quis efficitur pulvinar. Duis ut posuere orci. Morbi id aliquet quam.'
    },
    {
      _id: '4',
      Name: 'Laura López',
      Phone: '654321987',
      Debt: 1000,
      Date: new Date('2023-04-05'),
      Detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod lacus sit amet neque mattis, nec aliquet odio tempor. Proin laoreet, ligula nec tincidunt consequat, sem enim mattis dui, eget ultricies metus magna nec ipsum. Duis vitae vestibulum nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam varius felis eu ipsum convallis, nec fermentum libero vehicula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum maximus sem quis efficitur pulvinar. Duis ut posuere orci. Morbi id aliquet quam.'
    },
    {
      _id: '5',
      Name: 'Pedro González',
      Phone: '321987654',
      Debt: 250,
      Date: new Date('2023-05-12'),
      Detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod lacus sit amet neque mattis, nec aliquet odio tempor. Proin laoreet, ligula nec tincidunt consequat, sem enim mattis dui, eget ultricies metus magna nec ipsum. Duis vitae vestibulum nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam varius felis eu ipsum convallis, nec fermentum libero vehicula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum maximus sem quis efficitur pulvinar. Duis ut posuere orci. Morbi id aliquet quam.'
    },
    {
      _id: '6',
      Name: 'Ana Hernández',
      Phone: '789123456',
      Debt: 800,
      Date: new Date('2023-06-18'),
      Detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod lacus sit amet neque mattis, nec aliquet odio tempor. Proin laoreet, ligula nec tincidunt consequat, sem enim mattis dui, eget ultricies metus magna nec ipsum. Duis vitae vestibulum nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam varius felis eu ipsum convallis, nec fermentum libero vehicula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum maximus sem quis efficitur pulvinar. Duis ut posuere orci. Morbi id aliquet quam.'
    },
    {
      _id: '7',
      Name: 'Diego Díaz',
      Phone: '234567891',
      Debt: 600,
      Date: new Date('2023-07-22'),
      Detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod lacus sit amet neque mattis, nec aliquet odio tempor. Proin laoreet, ligula nec tincidunt consequat, sem enim mattis dui, eget ultricies metus magna nec ipsum. Duis vitae vestibulum nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam varius felis eu ipsum convallis, nec fermentum libero vehicula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum maximus sem quis efficitur pulvinar. Duis ut posuere orci. Morbi id aliquet quam.'
    },
    {
      _id: '8',
      Name: 'Sofía Pérez',
      Phone: '567891234',
      Debt: 400,
      Date: new Date('2023-08-30'),
      Detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod lacus sit amet neque mattis, nec aliquet odio tempor. Proin laoreet, ligula nec tincidunt consequat, sem enim mattis dui, eget ultricies metus magna nec ipsum. Duis vitae vestibulum nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam varius felis eu ipsum convallis, nec fermentum libero vehicula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum maximus sem quis efficitur pulvinar. Duis ut posuere orci. Morbi id aliquet quam.'
    },
    {
      _id: '9',
      Name: 'Lucía Sanchez',
      Phone: '891234567',
      Debt: 900,
      Date: new Date('2023-09-08'),
      Detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod lacus sit amet neque mattis, nec aliquet odio tempor. Proin laoreet, ligula nec tincidunt consequat, sem enim mattis dui, eget ultricies metus magna nec ipsum. Duis vitae vestibulum nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam varius felis eu ipsum convallis, nec fermentum libero vehicula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum maximus sem quis efficitur pulvinar. Duis ut posuere orci. Morbi id aliquet quam.'
    },
    {
      _id: '10',
      Name: 'Eduardo Ramirez',
      Phone: '987654321',
      Debt: 700,
      Date: new Date('2023-10-11'),
      Detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod lacus sit amet neque mattis, nec aliquet odio tempor. Proin laoreet, ligula nec tincidunt consequat, sem enim mattis dui, eget ultricies metus magna nec ipsum. Duis vitae vestibulum nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam varius felis eu ipsum convallis, nec fermentum libero vehicula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum maximus sem quis efficitur pulvinar. Duis ut posuere orci. Morbi id aliquet quam.'
    },
  ];

  public static productListTest: Product[] = [
    {
      _id: '1',
      Name: 'Leche',
      UnitPrice: 2.5,
      QuantityInStock: 100,
      MoneyInvested: 1234
    },
    {
      _id: '2',
      Name: 'Pan',
      UnitPrice: 1.2,
      QuantityInStock: 200,
      MoneyInvested: 13454356
    },
    {
      _id: '3',
      Name: 'Huevos',
      UnitPrice: 0.2,
      QuantityInStock: 150,
      MoneyInvested: 456456
    },
    {
      _id: '4',
      Name: 'Arroz',
      UnitPrice: 1.8,
      QuantityInStock: 120,
      MoneyInvested: 467645
    },
    {
      _id: '5',
      Name: 'Frijoles',
      UnitPrice: 2.0,
      QuantityInStock: 80,
      MoneyInvested:4563
    },
    {
      _id: '6',
      Name: 'Aceite',
      UnitPrice: 3.0,
      QuantityInStock: 90,
      MoneyInvested: 674
    },
    {
      _id: '7',
      Name: 'Azúcar',
      UnitPrice: 1.5,
      QuantityInStock: 110,
      MoneyInvested: 675654
    },
    {
      _id: '8',
      Name: 'Sal',
      UnitPrice: 0.8,
      QuantityInStock: 130,
      MoneyInvested: 3563
    },
    {
      _id: '9',
      Name: 'Café',
      UnitPrice: 4.0,
      QuantityInStock: 70,
      MoneyInvested: 4563
    },
    {
      _id: '10',
      Name: 'Chocolate',
      UnitPrice: 2.7,
      QuantityInStock: 85,
      MoneyInvested: 4564
    },
  ];
}
