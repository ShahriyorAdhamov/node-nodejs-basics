const parseArgs = () => {
  const args = process.argv.slice(2);
  const result = [];

  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].startsWith('--') ? args[i].slice(2) : args[i];
    const value = args[i + 1] || '';
    
    if (key) {
      result.push(`${key} is ${value}`);
    }
  }

  console.log(result.join(', '));
};

parseArgs();