const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logs = require('./middleware/log');
const members = require('./Members');

const app = express();

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
app.get('/', (req, res) =>
  res.render('index', {
    title: 'Member App',
    members
  })
);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members API Routes
app.use('/api/apifile', require('./routes/api/apifile'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
