import { reactive } from 'vue';

export type Store = {
    schema: string;
    value: string;
};

const init = (): Store => {
    const q = new URLSearchParams(location.search);
    const schema = q.get('schema') ?? '';
    const value = q.get('value') ?? '';

    return { schema, value };
};

export default reactive<Store>(init());