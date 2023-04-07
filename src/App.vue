<template>
  <div class="gap-3 layout w-100 h-100 p-3">
    <h1><a href="https://json-schema.org/" class="link-primary">jsonschema</a> test</h1>
    <Schema style="grid-area: schema"></Schema>
    <Value style="grid-area: value">a</Value>
    <Errors style="grid-area: errors">a</Errors>
  </div>
  {{ historypush }}
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Schema from './Schema.vue';
import Value from './Value.vue';
import Errors from './Errors.vue';
import store from './store';

export default defineComponent({
  components: {
    Schema, Value, Errors,
  },
  mounted() {
    addEventListener('popstate', this.historypop);
  },
  unmounted() {
    removeEventListener('popstate', this.historypop);
  },
  computed: {
    historypush() {
      const { schema, value } = store;
      const q = new URLSearchParams({ schema, value });
      const uri = `${location.origin}${location.pathname}?${q.toString()}`;

      const state: HistoryState = { uri, schema, value };
      history.pushState(state, '', uri);
    }
  },
  methods: {
    historypop(e: PopStateEvent) {
      const state: HistoryState | undefined = e.state;
      if (!state) {
        console.warn('no history occurred');
        return;
      }
      const { schema, value } = state;
      store.schema = schema;
      store.value = value;
    }
  }
});

type HistoryState = {
  uri: string;
  value: string;
  schema: string;
}
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
}

.layout {
  display: grid;
  grid-auto-flow: column;
  grid-template:
    "title  title" auto
    "value errors" 1fr
    "schema  errors" 1fr
    / 1fr 300px;
}
</style>
