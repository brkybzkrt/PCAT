const express = require('express');

const port = 3000;

const app = express();

app.get("/",(req,res)=>{

  const image={id:1,name:"foto_name",descrition:"foto description"}
  res.send(image)
})

app.listen(port, () => {
  console.log(` Server started at port ${port}`);
});
