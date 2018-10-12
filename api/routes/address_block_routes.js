module.exports = function(app, db) {

  app.get('/', (request, response) => {
    db.all(`SELECT * FROM block_address`).then((result) => {
      response.send(result);
    })
  });

  app.get('/address/:address', (request, response) => {
    db.all(`SELECT * FROM block_address WHERE address = '${request.params.address}'`).then((result) => {
      let parsed;
      switch(request.query.format) {
        case 'tsv':
          parsed = result.map((row) => {
            return `${row.block_number}\t${row.tx_index}\t${row.address}`
          }).join('\n').concat('\n');
          break;
        default:
        parsed = result;
      }
      response.send(parsed);
    })
  });

  app.post('/', (request, response) => {
    let arr;
    switch(request.get('content-type')) {
      case 'text/plain':
        //assuming tab separated...
        console.log(request.body);
        arr = request.body.split('\n').map((str) => {
          let row = str.split('\t');
          return {blockNumber: row[0],
                  txIndex: row[1],
                  address: row[2]};
        });
        break;
      default:
        arr = request.body;
    }
    arr.map((row) => {(
      db.run(
        `INSERT INTO block_address (block_number, tx_index, address) VALUES (?, ?, ?)`,
        [row.blockNumber, row.txIndex, row.address]
      )
    )})
    response.send('Hello')
  });

};
