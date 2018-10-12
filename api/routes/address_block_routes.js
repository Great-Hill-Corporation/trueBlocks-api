module.exports = function(app, db) {

  app.get('/', (request, response) => {
    db.all(`SELECT * FROM block_address`).then((result) => {
      response.send(result);
    })
  });

  app.get('/address/:address', (request, response) => {
    db.all(`SELECT * FROM block_address WHERE address = '${request.params.address}'`).then((result) => {
      response.send(result);
    })
  });

  app.post('/', (request, response) => {
    let arr = request.body;
    arr.map((row) => {(
      db.run(
        `INSERT INTO block_address (block_number, tx_index, address) VALUES (?, ?, ?)`,
        [row.blockNumber, row.txIndex, row.address]
      )
    )})
    response.send('Hello')
  });

};
