// Adiciona um evento de "submit" ao formulário com o ID "converter"
document.getElementById("converter").addEventListener("submit", function(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    // Obtém o valor do campo de entrada com o ID "postfix"
    const postfix = document.getElementById("postfix").value;
    const stack = []; // Inicializa uma pilha vazia para armazenar os tokens
    const operators = { // Define um objeto com operadores e suas funções correspondentes
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      '/': (a, b) => a / b,
    };
  
    // Converte a expressão postfix em infix
    const infix = postfix
      .split(" ") // Divide a string em um array de tokens
      .reverse() // Inverte a ordem dos tokens
      .map((token) => {
        if (isNaN(token)) { // Verifica se o token não é um número
          const operator = operators[token]; // Obtém a função do operador correspondente
          const b = stack.pop(); // Remove o último elemento da pilha e atribui a 'b'
          const a = stack.pop(); // Remove o próximo elemento da pilha e atribui a 'a'
          stack.push(`(${a} ${token} ${b})`); // Adiciona uma expressão infix na pilha
        } else {
          stack.push(token); // Adiciona o token à pilha
        }
        return null; // Retorna null para manter o mesmo tamanho do array
      })
      .reverse() // Inverte novamente a ordem dos tokens
      .filter(x => x !== null) // Remove os valores null do array
      .join(" "); // Converte o array em uma string
  
    let result = 0; // Inicializa a variável para armazenar o resultado da expressão
  
    // Avalia a expressão postfix
    postfix.split(" ").forEach((token) => {
      if (isNaN(token)) { // Verifica se o token não é um número
        const operator = operators[token]; // Obtém a função do operador correspondente
        const b = parseFloat(stack.pop()); // Remove o último elemento da pilha e converte para float
        const a = parseFloat(stack.pop()); // Remove o próximo elemento da pilha e converte para float
        result = operator(a, b); // Calcula o resultado da expressão usando o operador
        stack.push(result); // Adiciona o resultado à pilha
      } else {
        stack.push(token); // Adiciona o token à pilha
      }
    });
  
    // Verifica se a pilha contém mais de um elemento (erro)
    if (stack.length > 1) {
      console.error("Expressão inválida: ocorreu um erro durante a conversão");
    } else if (stack.length === 1) { // Verifica se a pilha contém exatamente um elemento (resultado)
      result = stack[0]; // Atribui o resultado à variável
    }
  
    // Atualiza o elemento com o ID "resultado" com o resultado da expressão
    document.getElementById("resultado").innerHTML = `
      <p>Resultado: <code>${result}</code></p>
    `;
});
