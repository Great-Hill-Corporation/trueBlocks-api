module.exports = function(app, db) {

  let handleGet = (request, result, response) => {
    let parsed;
    switch(request.query.format) {
      case 'tsv':
        response.set('Content-Type', 'text/plain');
        parsed = result.map((row) => {
          return `${row.block_number}\t${row.tx_index}\t${row.address}`
        }).join('\n').concat('\n');
        break;
      default:
      parsed = result;
    }
    return response.send(parsed);
  }

  app.get('/', (request, response) => {
    db.all(`SELECT * FROM block_address ORDER BY block_number LIMIT 500`).then((result) => {
      handleGet(request, result, response);
    })
  });

  app.get('/address/:address', (request, response) => {
    db.all(`SELECT * FROM block_address WHERE address = '${request.params.address}' ORDER BY block_number`).then((result) => {
      handleGet(request, result, response);
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
    response.send('Hello\n')
  });

};
