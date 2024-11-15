import App from './app'
import connectDB from './db/mongoosee'

const app = new App()



connectDB().then(() => {
  console.log("MongoDB connected")
  app.start()
})
.catch((err) => console.log(err));


