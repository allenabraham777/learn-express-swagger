const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const fileUpload = require('express-fileupload');

const swaggerDocument = YAML.load('./swagger.yaml');

const PORT = process.env.PORT || 3000;

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(fileUpload());

let courses = [
  {
    id: '11',
    name: 'Learn ReactJS',
    price: 299
  },
  {
    id: '22',
    name: 'Learn Angular',
    price: 399
  },
  {
    id: '33',
    name: 'Learn Django',
    price: 499
  },
]

app.get('/', (req, res)=>{
  res.send("Hello World");
});

app.get('/api/v1/lco', (req, res)=>{
  res.send("Hello from lco docs");
});

app.get('/api/v1/lcoobject', (req, res)=>{
  res.send({id: "55", name: "Learn Backend", price: 999});
});

app.get('/api/v1/courses', (req, res)=>{
  res.send(courses);
});

app.post('/api/v1/courses', (req, res) => {
  courses.push(req.body);
  res.send(true);
});

app.get('/api/v1/courses/query', (req, res) => {
  const { location, device } = req.query;
  res.send({location, device});
});

app.post('/api/v1/courses/upload', (req, res)=>{
  const file = req.files.file;
  let path = __dirname + "/images/" + Date.now() + ".jpg";

  file.mv(path, err => {
    if(err) return res.sendStatus(500)
    return res.send(true);
  })
});

app.get('/api/v1/courses/:courseId', (req, res)=>{
  const { courseId } = req.params;
  const course = courses.find(({id})=>id === courseId);
  if(!course) return res.sendStatus(404);
  res.send(course)
});

app.listen(PORT, (err) => {
  if(err) {
    console.error(err);
    process.exit(0);
  }
  console.log(`Server is listening to port ${PORT}...`);
})