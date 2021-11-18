import { createStore } from 'devextreme-aspnet-data-nojquery';
import { RequestsService } from '../shared/requests.service';

export function createCustomStore(apiEndpoint, config = {}) {
    const apiUrl = RequestsService.baseURL + apiEndpoint;
    const defaultConfig = {
      key: 'id',
      loadUrl: apiUrl,
      insertUrl: apiUrl,
      updateUrl: apiUrl,
      updateMethod: 'PATCH',
      deleteUrl: apiUrl,
    };
    return createStore({ ...defaultConfig, ...config });
}