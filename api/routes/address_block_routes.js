module.exports = function(app, db) {

  app.get('/', (request, response) => {
    db.all(`SELECT * FROM block_address`).then((result) => {
      response.send(result);
    })
  });

  app.post('/', (request, response) => {
    let arr = request.body;
    arr.map((row) => {(
      db.run(
        `INSERT INTO block_address (block_number, tx_index, trace_id, address, reason, proof) VALUES (?, ?, ?, ?, ?, ?)`,
        [row.blockNumber, row.txIndex, row.traceId, row.address, row.reason, row.proof]
      )
    )})
    response.send('Hello')
  });

};
