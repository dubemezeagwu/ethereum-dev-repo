const SHA256 = require('crypto-js/sha256');

const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = []
const blocks = []


// adding a transaction to the mempool
function addTransaction (transaction) {
  mempool.push(transaction);
}

// we mine by creating a new block, 
function mine () {
  const blockSize = blocks.length;
  const newBlock = {id: blockSize, nonce: 0};

  // clone mempool and set it a new array
  const oldMempool = [...mempool];

  // filter the oldMempool and if the index is less than the max transactions 
  // remove the first element from the original mempool, return the element(tx)
  const transactions = oldMempool.filter((tx, index) => {
    if (index < MAX_TRANSACTIONS) {
      mempool.shift();
      return tx;
    }
  })

  // create a transactions header and the transactions to the current newBlock
  newBlock.transactions = transactions;


  while(BigInt(`0x${SHA256(JSON.stringify(newBlock))}`) > TARGET_DIFFICULTY){
    newBlock.nonce += 1
  }

  // generate a hash for the block by JSON stringify-ing the newBlock and passing into 
  // a SHA256 function
  const blockHash = SHA256(JSON.stringify(newBlock))

  // assign the hash of the block
  newBlock.hash = blockHash;

  // add block on to blocks array
  blocks.push(newBlock);
}



module.exports = {
TARGET_DIFFICULTY,
MAX_TRANSACTIONS,
addTransaction, 
mine, 
blocks,
mempool
};
