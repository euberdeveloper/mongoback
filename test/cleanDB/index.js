const mongoCleaner = require('mongo-cleaner');

async function clean() {
    mongoCleaner.clean();
}

clean()
    .then(() => console.log('MongoDB cleaned succesfully!!!'))
    .catch(error => console.error('Error in cleaning MongoDB ', error));