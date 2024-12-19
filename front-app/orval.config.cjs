module.exports = {
  chamada: {
    output: {
      mode: 'split',
      target: './src/chamada.ts',
      schemas: './src/model',
      client: 'react-query',
      mock: false,
      override: {
        mutator: {
          path: './src/api/mutator/custom-instance.ts',
          name: 'customInstance',
        },
      },
    },
    input: {
      target: './schemas.json',
    },
  },
  chamadaZod: {
    input: {
      target: './schemas.json',
    },
    output: {
      mode: 'tags-split',
      client: 'zod',
      target: './src/schemas/endpoints',
      fileExtension: '.zod.ts',
    },
  },
};