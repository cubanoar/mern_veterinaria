import mongoose from 'mongoose';

const conectarDB = async () => {
  mongoose.set('strictQuery', true);
  /*Cuando strictQuery opción se establece en true , Mongoose se asegurará de que solo los campos que se especifican en su esquema se guarden en la base de datos, y todos los demás campos no se guardarán (si se envían otros campos). https://stackoverflow.com/questions/74747476/deprecationwarning-mongoose-the-strictquery-option-will-be-switched-back-to*/
  try {
    const db = await mongoose.connect(`${process.env.MONGO_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const url = `${db.connection.host}:${db.connection.port}`;

    console.log(`Conectado a Mongo en: ${url}`);
  } catch (error) {
    console.log(`error: ${error}`);
    process.exit(1);
  }
};

export default conectarDB;
