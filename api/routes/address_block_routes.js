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

  app.get('/addressTx/:ad', (request, response) => {
    db.all(`SELECT * FROM block_address WHERE address = '${request.params.ad}'`).then((result) => {
      let arr = result;
      var gotem = arr.map((thing) => {
        return `${thing.block_number}\t${thing.tx_index}\t${thing.address}`;
      }).join('\n');
      response.send(gotem+"\n");
    });
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
