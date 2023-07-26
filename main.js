const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const newField = [];

const generateField = (newField) => {
  for (let i = 0; i < 10; i++) {
    newField.push([]);
    for (let j = 0; j < 10; j++) {
      newField[i].push('░');
    }
  }
  return newField;
}
generateField(newField);
newField[0][0] = pathCharacter;

const hatPosition = (newField) => {
  let hatPlace = false;
  while (!hatPlace) {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    if (newField[x][y] === '░') {
      newField[x][y] = hat;
      hatPlace = true;
    }
  }
  return newField;
};
hatPosition(newField);

const holePosition = (newField) => {
  let counter = 0;
  while (counter !== 20) {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    if (newField[x][y] === '░') {
      newField[x][y] = hole;
      counter++;
    }
  }
  return newField;
};
holePosition(newField);

const printField = (newField) => {
  for (let i = 0; i < 10; i++) {
    console.log(newField[i].join(''));
  }
};

let x = 0;
let y = 0;

const testStr = (inputString, newField) => {
  let input = inputString.toString().toUpperCase().trim(); 

  // Encontrar a posição atual do caminho
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (newField[i][j] === pathCharacter) {
        x = i; // Utilizando a variável global x
        y = j; // Utilizando a variável global y
        break;
      }
    }
  }

  // Atualizar a posição anterior do caminho para o caractere correto
  newField[x][y] = fieldCharacter;

  // Verificar se o movimento é válido (ainda dentro do campo)
  switch (input) {
    case 'L':
      if (y > 0) y--;
      break;
    case 'R':
      if (y < 9) y++;
      break;
    case 'U':
      if (x > 0) x--;
      break;
    case 'D':
      if (x < 9) x++;
      break;
    default:
      console.log('Sorry, not a valid character! Use "L", "R", "U" or "D" to move.');
      return;
  }

  // Verificar se a posição após o movimento é um buraco ou um espaço vazio
  if(newField[x][y] === hat){
    newField[x][y] = pathCharacter;
    printField(newField);
    console.log('Congratulations, you found your hat!');
    process.exit(0);
  }if (newField[x][y] !== hole) {
    // Atualizar a posição do caminho
    newField[x][y] = pathCharacter;
    // Exibir o campo atualizado
    printField(newField);
    process.stdout.write('Which way? (L/R/U/D) ');
  } else {
    console.log('Try again, you found a hole.');
    return;
  }
};

// Chamada inicial da função testStr()
printField(newField);
process.stdout.write('Which way? (L/R/U/D) ');
process.stdin.on('data', (input) => testStr(input, newField));

