import axios from 'axios';
import { searchModules } from './librariesApi';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('librariesApi', () => {
  describe('searchModules', () => {
    it('should fetch modules and their contributors', async () => {
      const modulesResponse = [
        {
          name: 'example-module',
          platform: 'npm',
          repository_url: 'https://github.com/example/example-module',
          stars: 123,
        },
      ];

      mockedAxios.get.mockResolvedValueOnce({ data: modulesResponse });

      const modules = await searchModules('example', 1);

      expect(modules).toHaveLength(1);
      expect(modules[0].name).toBe('example-module');
    });
  });
});
