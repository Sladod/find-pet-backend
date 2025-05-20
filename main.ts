const http = require('http');
const url = require('url');

const pets = {
  list: [
    {
      id: 1,
      age: 2,
      sex: 0,
      name: 'Рокки',
      description: 'Любит играть и бегать по дому. Очень дружелюбный.',
      imageUrl: 'https://picsum.photos/400/400',
      datalist: [
        { type: 'weight', value: '4 кг' },
        { type: 'breed', value: 'Шиба-ину' },
        { type: 'favoriteToy', value: 'Мячик' },
      ],
      contact: '@rocky_helper',
    },
    {
      id: 2,
      age: 3,
      sex: 1,
      name: 'Оливия',
      description: 'Спокойная и ласковая кошка. Отлично ладит с детьми.',
      imageUrl: 'https://picsum.photos/400/400',
      datalist: [
        { type: 'weight', value: '3.5 кг' },
        { type: 'breed', value: 'Неизвестно' },
        { type: 'favoriteToy', value: 'Мышка' },
      ],
      contact: '@olivia_home',
    },
    {
      id: 3,
      age: 1,
      sex: 0,
      name: 'Лео',
      description: 'Маленький исследователь. Любит всё новое.',
      imageUrl: 'https://picsum.photos/400/400',
      datalist: [
        { type: 'weight', value: '2 кг' },
        { type: 'breed', value: 'Мейн-кун' },
        { type: 'favoriteToy', value: 'Пищалка' },
      ],
      contact: '@leo_contact',
    }
  ]
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathParts = parsedUrl.pathname.split('/').filter(Boolean);

  res.setHeader('Content-Type', 'application/json');

  // GET /pets
  if (req.method === 'GET' && pathParts[0] === 'pets' && pathParts.length === 1) {
    res.writeHead(200);
    res.end(JSON.stringify(pets));
    return;
  }

  // GET /pets/:id
  if (req.method === 'GET' && pathParts[0] === 'pets' && pathParts.length === 2) {
    const id = parseInt(pathParts[1], 10);
    const pet = pets.list.find(p => p.id === id);

    if (!pet) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Питомец не найден' }));
      return;
    }

    res.writeHead(200);
    res.end(JSON.stringify(pet));
    return;
  }

  // 404 fallback
  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Ресурс не найден' }));
});

server.listen(3000, () => {
  console.log('🐾 Pet server running at http://localhost:3000');
});
