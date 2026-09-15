const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());

const readJson = (file) => {
  const filePath = path.join(__dirname, 'data', file);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

app.get('/routes/cities', (req, res) => {
  const name = (req.query.name || '').toString().toLowerCase().trim();
  if (!name) {
    return res.status(400).json({ error: 'Поле name обязательно для заполнения' });
  }
  const cities = readJson('cities.json');
  const filtered = cities
    .filter((city) => city.name.toLowerCase().startsWith(name))
    .sort((a, b) => a.name.localeCompare(b.name));
  res.json(filtered);
});

app.get('/routes/last', (req, res) => {
  const last = readJson('last.json');
  res.json(last);
});

app.get('/routes/:id/seats', (req, res) => {
  const seats = readJson('seats.json');
  res.json(seats);
});

app.get('/routes', (req, res) => {
  const {
    from_city_id,
    to_city_id,
    sort,
    limit,
    offset,
    have_first_class,
    have_second_class,
    have_third_class,
    have_fourth_class,
    have_wifi,
    have_express,
    price_from,
    price_to,
  } = req.query;

  const routes = readJson('routes.json');

  const filtered = routes.filter((route) => {
    if (from_city_id && route.from_city_id !== from_city_id) return false;
    if (to_city_id && route.to_city_id !== to_city_id) return false;
    if (have_first_class === 'true' && !route.have_first_class) return false;
    if (have_second_class === 'true' && !route.have_second_class) return false;
    if (have_third_class === 'true' && !route.have_third_class) return false;
    if (have_fourth_class === 'true' && !route.have_fourth_class) return false;
    if (have_wifi === 'true' && !route.have_wifi) return false;
    if (have_express === 'true' && !route.is_express) return false;
    if (price_from && route.min_price < Number(price_from)) return false;
    if (price_to && route.min_price > Number(price_to)) return false;
    return true;
  });

  if (sort === 'date') {
    filtered.sort((a, b) => a.from.datetime - b.from.datetime);
  } else if (sort === 'price') {
    filtered.sort((a, b) => a.min_price - b.min_price);
  } else if (sort === 'duration') {
    filtered.sort((a, b) => a.duration - b.duration);
  }

  const total_count = filtered.length;
  const startIndex = Number(offset) || 0;
  const endIndex = startIndex + (Number(limit) || total_count);

  const sliced = filtered.slice(startIndex, endIndex);

  const items = sliced.map((route) => {
    const {
      from_city_id: _from,
      to_city_id: _to,
      duration,
      train,
      from,
      to,
      price_info,
      ...rest
    } = route;

    return {
      ...rest,
      departure: {
        _id: route._id,
        have_first_class: route.have_first_class,
        have_second_class: route.have_second_class,
        have_third_class: route.have_third_class,
        have_fourth_class: route.have_fourth_class,
        have_wifi: route.have_wifi,
        have_air_conditioning: route.have_air_conditioning,
        is_express: route.is_express,
        min_price: route.min_price,
        duration,
        available_seats: route.available_seats,
        available_seats_info: route.available_seats_info,
        train,
        from,
        to,
        price_info,
      },
    };
  });

  res.json({ total_count, items });
});

app.get('/subscribe', (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.status(400).json({ error: 'Email обязателен' });
  }
  res.json({ status: true });
});

app.post('/order', (req, res) => {
  res.json({ status: true });
});

app.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
});