class Transaction {
  
  // we create a transaction object that holds the inputs and outputs UTXOs
  constructor(inputUTXOs, outputUTXOs) {
      this.transaction = { inputUTXOs, outputUTXOs}
  }
  execute() {
    
    // we avoid double-spend by checking to see if the input transaction has already been spent
      const isDoubleSpend = this.transaction.inputUTXOs.findIndex(utxo => utxo.spent == true);
      if (isDoubleSpend !== -1) throw new Error('exist transaction that already was spend');

      const oldInputUTXOs = [...this.transaction.inputUTXOs];
      const oldOutputUTXOs = [...this.transaction.outputUTXOs];

      // get the addition of the total amount of all UTXOs in both inputs and outputs 
      const totalInputsUTXOs = oldInputUTXOs.reduce((acc, cur) => acc + cur.amount, 0)
      const totalOutputUTXOs = oldOutputUTXOs.reduce((acc, cur) => acc + cur.amount, 0);

      if (totalInputsUTXOs < totalOutputUTXOs) throw new Error('total amount of inputs cannot be less that total amount of outputs');

      // set all input UTXOs to spent to avoid double-spending and get a new list of UTXOs
      const newInputUTXOs = oldInputUTXOs.map(inputUTXO => inputUTXO.spent = true);
      this.transaction.inputUTXOs = newInputUTXOs;

      // get the remainder of the difference between the sum of the input UTXOs and the output UTXOs, which is the transaction fee
      const fee = totalInputsUTXOs - totalOutputUTXOs;

      this.fee = fee
  }
}

module.exports = Transaction;